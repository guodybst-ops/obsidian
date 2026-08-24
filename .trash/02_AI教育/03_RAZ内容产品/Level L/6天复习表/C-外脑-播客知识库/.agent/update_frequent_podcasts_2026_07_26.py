from __future__ import annotations

import argparse
import datetime as dt
import email.utils
import html
import json
import re
import sys
import unicodedata
import warnings
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit, urlunsplit

import requests
from bs4 import BeautifulSoup, MarkupResemblesLocatorWarning
from lxml import etree


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")
warnings.filterwarnings("ignore", category=MarkupResemblesLocatorWarning)


TODAY = dt.datetime.now().astimezone().date().isoformat()
ROOT = Path(__file__).resolve().parents[1]
VAULT_ROOT = ROOT.parent
RAW_ROOT = ROOT / "99原始资料"
NOTE_ROOT = ROOT / "89单集笔记"
LOG_ROOT = ROOT / "_system" / "_log"
SHADOW_ROOT = VAULT_ROOT / "_system" / "_log" / "podcast-automation-shadow"
STATE_PATH = SHADOW_ROOT / "podcast_check_state.json"
REPORT_PATH = SHADOW_ROOT / "podcast_check_report.json"
QUEUE_PATH = SHADOW_ROOT / "podcast_processing_queue.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/126.0 Safari/537.36 CodexPodcastUpdater/1.0"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}
HTTP = requests.Session()
HTTP.trust_env = False

INVALID_FILENAME_CHARS = '<>:"/\\|?*'
NOTE_STRIP_PROGRAMS = {"平民创业手册", "搞钱女孩"}


@dataclass
class Episode:
    podcast: str
    title: str
    pub_date_raw: str = ""
    pub_date_iso: str = ""
    guid: str = ""
    eid: str = ""
    link: str = ""
    description: str = ""
    audio_url: str = ""
    rss_length: int | None = None
    media_type: str = ""
    duration: int | str | None = None
    source: str = ""
    podcast_title: str = ""
    podcast_author: str = ""
    raw_seq: int | None = None
    note_seq: int | None = None
    raw_file: str = ""
    note_file: str = ""

    def identity_tokens(self) -> set[str]:
        tokens: set[str] = set()
        for value in [self.guid, self.eid, self.link, canonical_url(self.link), self.audio_url]:
            if value:
                tokens.add(str(value).strip())
        title_key = normalize_title_key(self.title)
        if title_key:
            tokens.add(f"title:{title_key}")
        tokens.update(show_number_tokens(self.title))
        return tokens

    def to_json(self) -> dict[str, Any]:
        data: dict[str, Any] = {
            "title": self.title,
            "pubDate": self.pub_date_raw or self.pub_date_iso,
            "pubDateIso": self.pub_date_iso,
            "guid": self.guid,
            "eid": self.eid,
            "link": self.link,
            "description": self.description,
            "audioUrl": self.audio_url,
            "rssLength": self.rss_length,
            "type": self.media_type,
            "duration": self.duration,
            "podcastTitle": self.podcast_title or self.podcast,
            "podcastAuthor": self.podcast_author,
            "source": self.source,
        }
        if self.raw_seq is not None:
            data["index"] = self.raw_seq
        if self.raw_file:
            data["rawMarkdown"] = self.raw_file
        if self.note_file:
            data["noteMarkdown"] = self.note_file
        data["ingestStatus"] = "metadata_only"
        return {k: v for k, v in data.items() if v not in ("", None)}


@dataclass
class ProgramCatalog:
    program: str
    raw_files: list[Path]
    note_files: list[Path]
    id_tokens: set[str] = field(default_factory=set)
    episode_meta_tokens: set[str] = field(default_factory=set)
    raw_by_title: dict[str, Path] = field(default_factory=dict)
    note_by_title: dict[str, Path] = field(default_factory=dict)
    next_raw_seq: int = 1
    next_note_seq: int = 1


def now_utc() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def iso_now() -> str:
    return now_utc().isoformat(timespec="seconds").replace("+00:00", "Z")


def local_now_iso() -> str:
    return dt.datetime.now().astimezone().isoformat(timespec="seconds")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig", errors="replace")


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8")


def read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(read_text(path))
    except json.JSONDecodeError:
        return default


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def numeric_md_files(folder: Path) -> list[Path]:
    if not folder.exists():
        return []
    return sorted(p for p in folder.glob("*.md") if p.is_file() and re.match(r"^\d{3}\b", p.name))


def seq_from_path(path: Path) -> int | None:
    match = re.match(r"^(\d{3})\b", path.name)
    return int(match.group(1)) if match else None


def strip_three_digit_prefix(stem: str) -> str:
    return re.sub(r"^\d{3}\s*-\s*", "", stem).strip()


def strip_episode_prefix(title: str) -> str:
    title = title.strip()
    patterns = [
        r"^第?\s*\d{1,4}\s*[.\-、:：]\s*",
        r"^E\s*\d{1,4}\s*[|｜.\-、:：]\s*",
        r"^\d{1,4}\s+(?=[^\d\s])",
    ]
    for pattern in patterns:
        title = re.sub(pattern, "", title, flags=re.I).strip()
    return title


def show_number_tokens(title: Any) -> set[str]:
    text = html.unescape(strip_three_digit_prefix(str(title))).strip()
    patterns = [
        r"^第?\s*(\d{1,4})\s*[.\-、:：|｜]\s*",
        r"^E\s*(\d{1,4})\s*[|｜.\-、:：]\s*",
        r"^(\d{1,4})\s+(?=[^\d\s])",
    ]
    for pattern in patterns:
        match = re.match(pattern, text, flags=re.I)
        if match:
            number = int(match.group(1))
            return {f"show_no:{number}"}
    return set()


def normalize_title_key(title: str) -> str:
    text = html.unescape(strip_three_digit_prefix(str(title)))
    text = strip_episode_prefix(text)
    text = unicodedata.normalize("NFKC", text).lower()
    text = text.replace("&nbsp;", " ")
    text = re.sub(r"\s+", "", text)
    text = re.sub(r"[^\w\u4e00-\u9fff]+", "", text)
    return text


def sanitize_filename(name: str, max_len: int = 118) -> str:
    cleaned = html.unescape(str(name))
    cleaned = "".join(" " if ch in INVALID_FILENAME_CHARS else ch for ch in cleaned)
    cleaned = cleaned.replace("|", " ").replace("｜", " ")
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" .")
    return cleaned[:max_len].rstrip(" .") or "未命名"


def note_title_for(program: str, title: str) -> str:
    title = html.unescape(title).strip()
    if program in NOTE_STRIP_PROGRAMS:
        title = strip_episode_prefix(title)
    return title.strip() or "未命名"


def canonical_url(url: str) -> str:
    if not url:
        return ""
    parts = urlsplit(str(url).strip())
    return urlunsplit((parts.scheme, parts.netloc, parts.path.rstrip("/"), "", ""))


def parse_datetime(value: str | None) -> dt.datetime | None:
    if not value:
        return None
    raw = str(value).strip()
    try:
        parsed = email.utils.parsedate_to_datetime(raw)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=dt.timezone.utc)
        return parsed.astimezone(dt.timezone.utc)
    except Exception:
        pass
    try:
        normalized = raw.replace("Z", "+00:00")
        parsed = dt.datetime.fromisoformat(normalized)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=dt.timezone.utc)
        return parsed.astimezone(dt.timezone.utc)
    except Exception:
        return None


def date_iso(value: str | None) -> str:
    parsed = parse_datetime(value)
    if not parsed:
        return ""
    return parsed.isoformat(timespec="seconds").replace("+00:00", "Z")


def html_to_text(value: str | None) -> str:
    if not value:
        return ""
    soup = BeautifulSoup(str(value), "html.parser")
    text = soup.get_text(" ", strip=True)
    text = html.unescape(text)
    text = text.replace("\ufffd", "")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def clean_scalar(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, (int, float)):
        return str(value)
    return html.unescape(str(value)).replace("\ufffd", "").strip()


def yaml_quote(value: Any) -> str:
    text = clean_scalar(value)
    text = text.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{text}"'


def yaml_list(values: list[str]) -> list[str]:
    if not values:
        return ["[]"]
    return [""] + [f"  - {yaml_quote(v)}" for v in values]


def split_frontmatter(text: str) -> tuple[str, str]:
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n?", text, re.S)
    if not match:
        return "", text
    return match.group(1), text[match.end() :]


def get_fm_value(text: str, key: str) -> str | None:
    fm, _ = split_frontmatter(text)
    match = re.search(rf"^{re.escape(key)}\s*:\s*(.*?)\s*$", fm, re.M)
    return match.group(1).strip() if match else None


def set_fm_fields(text: str, fields: dict[str, str]) -> str:
    fm, body = split_frontmatter(text)
    lines = fm.splitlines() if fm else []
    for key, value in fields.items():
        pattern = re.compile(rf"^{re.escape(key)}\s*:")
        for i, line in enumerate(lines):
            if pattern.match(line):
                lines[i] = f"{key}: {value}"
                break
        else:
            lines.append(f"{key}: {value}")
    return "---\n" + "\n".join(lines).rstrip() + "\n---\n" + body.lstrip("\n")


def child_text(node: etree._Element, local_name: str) -> str:
    for child in node.iterchildren():
        if etree.QName(child).localname == local_name:
            return html_to_text(child.text or "".join(child.itertext()))
    return ""


def first_value(*values: Any) -> str:
    for value in values:
        text = clean_scalar(value)
        if text:
            return text
    return ""


def request_url(url: str) -> requests.Response:
    response = HTTP.get(url, headers=HEADERS, timeout=25)
    response.raise_for_status()
    return response


def fetch_rss(program: str, feed_url: str) -> list[Episode]:
    response = request_url(feed_url)
    parser = etree.XMLParser(recover=True, resolve_entities=False)
    root = etree.fromstring(response.content, parser=parser)
    channel_title = ""
    channel_author = ""
    channel = root.find("channel")
    if channel is not None:
        channel_title = child_text(channel, "title")
        channel_author = child_text(channel, "author")
    episodes: list[Episode] = []
    for item in root.xpath("//item"):
        title = child_text(item, "title")
        if not title:
            continue
        guid = child_text(item, "guid")
        link = child_text(item, "link")
        pub_raw = child_text(item, "pubDate") or child_text(item, "published")
        desc = first_value(
            child_text(item, "description"),
            child_text(item, "summary"),
            child_text(item, "encoded"),
        )
        duration = first_value(child_text(item, "duration"))
        author = first_value(child_text(item, "author"), channel_author)
        enclosure_url = ""
        enclosure_length: int | None = None
        enclosure_type = ""
        for child in item.iterchildren():
            if etree.QName(child).localname == "enclosure":
                enclosure_url = child.get("url") or ""
                enclosure_type = child.get("type") or ""
                try:
                    enclosure_length = int(child.get("length") or "0") or None
                except ValueError:
                    enclosure_length = None
                break
        eid = ""
        match = re.search(r"/episode/([A-Za-z0-9]+)", link)
        if match:
            eid = match.group(1)
        episodes.append(
            Episode(
                podcast=program,
                title=title,
                pub_date_raw=pub_raw,
                pub_date_iso=date_iso(pub_raw),
                guid=guid,
                eid=eid,
                link=link,
                description=html_to_text(desc),
                audio_url=enclosure_url,
                rss_length=enclosure_length,
                media_type=enclosure_type,
                duration=duration or None,
                source="rss-check",
                podcast_title=channel_title or program,
                podcast_author=author,
            )
        )
    return sort_episodes(episodes)


def find_podcast_payload(data: Any) -> dict[str, Any] | None:
    if isinstance(data, dict):
        episodes = data.get("episodes")
        if isinstance(episodes, list) and episodes:
            return data
        for value in data.values():
            found = find_podcast_payload(value)
            if found:
                return found
    elif isinstance(data, list):
        for value in data:
            found = find_podcast_payload(value)
            if found:
                return found
    return None


def nested_get(data: Any, *keys: str) -> Any:
    cur = data
    for key in keys:
        if not isinstance(cur, dict):
            return None
        cur = cur.get(key)
    return cur


def extract_page_audio(ep: dict[str, Any]) -> tuple[str, str, int | None]:
    candidates = [
        nested_get(ep, "enclosure", "url"),
        nested_get(ep, "media", "source", "url"),
        nested_get(ep, "media", "url"),
        ep.get("audioUrl"),
        ep.get("audio_url"),
    ]
    audio_url = first_value(*candidates)
    media_type = first_value(
        nested_get(ep, "enclosure", "type"),
        nested_get(ep, "media", "mimeType"),
        nested_get(ep, "media", "type"),
    )
    length: int | None = None
    for value in [
        nested_get(ep, "enclosure", "length"),
        nested_get(ep, "media", "size"),
        nested_get(ep, "media", "length"),
    ]:
        try:
            length = int(value)
            break
        except Exception:
            continue
    return audio_url, media_type, length


def fetch_xiaoyuzhou_page(program: str, page_url: str) -> list[Episode]:
    response = request_url(page_url)
    soup = BeautifulSoup(response.text, "html.parser")
    script = soup.find("script", id="__NEXT_DATA__")
    if not script or not script.string:
        raise RuntimeError("小宇宙页面未找到 __NEXT_DATA__")
    data = json.loads(script.string)
    payload = find_podcast_payload(data)
    if not payload:
        raise RuntimeError("小宇宙页面未找到 episodes 数据")
    podcast_title = first_value(payload.get("title"), program)
    podcast_author = first_value(nested_get(payload, "author", "nickname"), payload.get("author"))
    episodes: list[Episode] = []
    for ep in payload.get("episodes", []):
        if not isinstance(ep, dict):
            continue
        title = first_value(ep.get("title"))
        if not title:
            continue
        eid = first_value(ep.get("eid"), ep.get("id"), ep.get("episodeId"))
        link = first_value(ep.get("link"))
        if not link and eid:
            link = f"https://www.xiaoyuzhoufm.com/episode/{eid}"
        pub_raw = first_value(ep.get("pubDate"), ep.get("publishedAt"), ep.get("createdAt"))
        desc = first_value(ep.get("description"), ep.get("shownotes"), ep.get("summary"))
        audio_url, media_type, length = extract_page_audio(ep)
        duration = ep.get("duration") or nested_get(ep, "media", "duration")
        episodes.append(
            Episode(
                podcast=program,
                title=title,
                pub_date_raw=pub_raw,
                pub_date_iso=date_iso(pub_raw),
                guid=eid,
                eid=eid,
                link=link,
                description=html_to_text(desc),
                audio_url=audio_url,
                rss_length=length,
                media_type=media_type,
                duration=duration,
                source="page-check",
                podcast_title=podcast_title,
                podcast_author=podcast_author,
            )
        )
    return sort_episodes(episodes)


def sort_episodes(episodes: list[Episode]) -> list[Episode]:
    def key(ep: Episode) -> tuple[dt.datetime, str]:
        parsed = parse_datetime(ep.pub_date_raw) or parse_datetime(ep.pub_date_iso)
        if not parsed:
            parsed = dt.datetime.min.replace(tzinfo=dt.timezone.utc)
        return parsed, normalize_title_key(ep.title)

    return sorted(episodes, key=key)


def load_catalog(program: str) -> ProgramCatalog:
    raw_files = numeric_md_files(RAW_ROOT / program)
    note_files = numeric_md_files(NOTE_ROOT / program)
    raw_nums = [n for n in (seq_from_path(p) for p in raw_files) if n is not None]
    note_nums = [n for n in (seq_from_path(p) for p in note_files) if n is not None]
    catalog = ProgramCatalog(
        program=program,
        raw_files=raw_files,
        note_files=note_files,
        next_raw_seq=(max(raw_nums) + 1 if raw_nums else 1),
        next_note_seq=(max(note_nums) + 1 if note_nums else 1),
    )

    for path in raw_files:
        title = strip_three_digit_prefix(path.stem)
        key = normalize_title_key(title)
        if key:
            catalog.raw_by_title[key] = path
            catalog.id_tokens.add(f"title:{key}")
        catalog.id_tokens.update(show_number_tokens(title))
    for path in note_files:
        title = strip_three_digit_prefix(path.stem)
        key = normalize_title_key(title)
        if key:
            catalog.note_by_title[key] = path
            catalog.id_tokens.add(f"title:{key}")
        catalog.id_tokens.update(show_number_tokens(title))
        try:
            text = read_text(path)
        except OSError:
            continue
        source_transcript = get_fm_value(text, "source_transcript")
        if source_transcript:
            source_key = normalize_title_key(Path(source_transcript.strip('"')).stem)
            if source_key:
                catalog.note_by_title.setdefault(source_key, path)
                catalog.id_tokens.add(f"title:{source_key}")
        for fm_key in ["guid", "eid", "source_url", "audio_url"]:
            value = get_fm_value(text, fm_key)
            if value:
                token = value.strip('"')
                catalog.id_tokens.add(token)
                if fm_key == "source_url":
                    catalog.id_tokens.add(canonical_url(token))

    episodes_path = RAW_ROOT / program / "_episodes.json"
    meta = read_json(episodes_path, {})
    for item in meta.get("episodes", []) if isinstance(meta, dict) else []:
        if not isinstance(item, dict):
            continue
        for key in ["guid", "eid", "trackId", "link", "audioUrl"]:
            value = clean_scalar(item.get(key))
            if value:
                catalog.id_tokens.add(value)
                catalog.episode_meta_tokens.add(value)
                if key == "link":
                    catalog.id_tokens.add(canonical_url(value))
                    catalog.episode_meta_tokens.add(canonical_url(value))
        title_key = normalize_title_key(item.get("title", ""))
        if title_key:
            catalog.id_tokens.add(f"title:{title_key}")
            catalog.episode_meta_tokens.add(f"title:{title_key}")
        for token in show_number_tokens(item.get("title", "")):
            catalog.id_tokens.add(token)
            catalog.episode_meta_tokens.add(token)
    return catalog


def is_known(ep: Episode, catalog: ProgramCatalog) -> bool:
    return bool(ep.identity_tokens() & catalog.id_tokens)


def is_in_episode_meta(ep: Episode, catalog: ProgramCatalog) -> bool:
    return bool(ep.identity_tokens() & catalog.episode_meta_tokens)


def discover_subscriptions() -> dict[str, dict[str, Any]]:
    state = read_json(STATE_PATH, {})
    subscriptions: dict[str, dict[str, Any]] = {}
    for program, cfg in (state.get("podcasts") or {}).items():
        if isinstance(cfg, dict):
            subscriptions[program] = dict(cfg)

    for episodes_json in RAW_ROOT.glob("*/_episodes.json"):
        program = episodes_json.parent.name
        meta = read_json(episodes_json, {})
        cfg = subscriptions.setdefault(program, {"feedUrl": None, "pageUrl": None, "podcastId": None})
        source = clean_scalar(meta.get("source")) if isinstance(meta, dict) else ""
        if source and not cfg.get("feedUrl") and re.search(r"feed\.xyzfm\.space|ximalaya\.com/.+\.xml", source):
            cfg["feedUrl"] = source
        if not cfg.get("podcastId") and isinstance(meta, dict):
            cfg["podcastId"] = meta.get("podcastId")
    return dict(sorted(subscriptions.items(), key=lambda item: item[0]))


def fetch_program(program: str, cfg: dict[str, Any]) -> tuple[list[Episode], str]:
    feed_url = clean_scalar(cfg.get("feedUrl"))
    page_url = clean_scalar(cfg.get("pageUrl"))
    if feed_url:
        return fetch_rss(program, feed_url), feed_url
    if page_url and "xiaoyuzhoufm.com/podcast/" in page_url:
        return fetch_xiaoyuzhou_page(program, page_url), page_url
    raise RuntimeError("缺少可检查的 RSS 或小宇宙节目页")


def find_new_episodes(episodes: list[Episode], catalog: ProgramCatalog) -> list[Episode]:
    if not episodes:
        return []
    known_positions = [i for i, ep in enumerate(episodes) if is_known(ep, catalog)]
    if known_positions:
        start = max(known_positions) + 1
        candidates = episodes[start:]
    else:
        candidates = [ep for ep in episodes if not is_known(ep, catalog)]
    return [ep for ep in candidates if not is_known(ep, catalog)]


def episodes_to_backfill(episodes: list[Episode], catalog: ProgramCatalog) -> list[Episode]:
    backfill: list[Episode] = []
    for ep in episodes:
        if is_known(ep, catalog) and not is_in_episode_meta(ep, catalog):
            key = normalize_title_key(ep.title)
            raw_path = catalog.raw_by_title.get(key)
            note_path = catalog.note_by_title.get(key)
            if raw_path:
                ep.raw_file = raw_path.name
                ep.raw_seq = seq_from_path(raw_path)
            if note_path:
                ep.note_file = note_path.name
            backfill.append(ep)
    return backfill


def compact_description(text: str, limit: int = 700) -> str:
    text = html_to_text(text)
    if len(text) <= limit:
        return text or "待补充"
    cut = text[:limit].rstrip()
    punctuation = max(cut.rfind("。"), cut.rfind("！"), cut.rfind("？"))
    if punctuation >= 160:
        cut = cut[: punctuation + 1]
    return cut.rstrip() + "..."


def extract_keywords(title: str, description: str, limit: int = 8) -> list[str]:
    text = f"{title} {description}"
    pieces = re.split(r"[，。！？、；：:|｜/\s《》（）()【】\[\]\"'“”]+", text)
    keywords: list[str] = []
    stop = {"本期", "节目", "播客", "嘉宾", "主播", "我们", "大家", "如何", "什么", "一个", "一起", "欢迎", "收听"}
    for piece in pieces:
        piece = piece.strip()
        if 2 <= len(piece) <= 14 and piece not in stop and not piece.isdigit():
            if piece not in keywords:
                keywords.append(piece)
        if len(keywords) >= limit:
            break
    return keywords


def duration_text(duration: int | str | None) -> str:
    if duration in (None, ""):
        return "待补充"
    try:
        seconds = int(float(str(duration)))
    except ValueError:
        return str(duration)
    hours, rem = divmod(seconds, 3600)
    minutes, secs = divmod(rem, 60)
    if hours:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"


def build_raw_markdown(ep: Episode, raw_seq: int, fetched_at: str) -> str:
    title_safe = sanitize_filename(ep.title)
    aliases = [ep.title]
    lines: list[str] = [
        "---",
        f"tags: [播客原料, {ep.podcast}, 官方元数据, shownotes]",
        f"created: {TODAY}",
        f"podcast: {yaml_quote(ep.podcast)}",
        "source_kind: episode_metadata_show_notes",
        f"source_url: {yaml_quote(ep.link)}",
        f"audio_url: {yaml_quote(ep.audio_url)}",
        f"guid: {yaml_quote(ep.guid or ep.eid)}",
        f"pubDate: {yaml_quote(ep.pub_date_iso or ep.pub_date_raw)}",
        f"fetched_at: {yaml_quote(fetched_at)}",
        "transcript_status: not_transcribed",
        "layer: scene",
        "status: raw_metadata",
        "confidence: 0.82",
        "provenance: external",
        "viewpoint_owner: external_author",
        "raw_material: true",
        "aliases:" + "\n".join(yaml_list(aliases)),
        "---",
        f"# {raw_seq:03d} - {title_safe}",
        "",
        "> 入库说明：本文件来自官方 RSS 或小宇宙节目页的单集元数据与 shownotes，不是逐字稿。后续精读前应补转录或回源听音频。",
        "",
        "## 官方信息",
        "",
        f"- 节目：{ep.podcast}",
        f"- 标题：{ep.title}",
        f"- 发布时间：{ep.pub_date_iso or ep.pub_date_raw or '待补充'}",
        f"- 时长：{duration_text(ep.duration)}",
        f"- 官方链接：{ep.link or '待补充'}",
        f"- 音频地址：{ep.audio_url or '待补充'}",
        f"- GUID/EID：{ep.guid or ep.eid or '待补充'}",
        "",
        "## 官方简介 / Shownotes",
        "",
        ep.description or "待补充",
        "",
    ]
    return "\n".join(lines)


def build_note_markdown(ep: Episode, note_seq: int, raw_path: Path, fetched_at: str) -> str:
    note_title = sanitize_filename(note_title_for(ep.podcast, ep.title))
    summary = compact_description(ep.description, 650)
    keywords = extract_keywords(ep.title, ep.description)
    raw_link = f"[[99原始资料/{ep.podcast}/{raw_path.stem}|原始资料]]"
    tags = [f"播客笔记", ep.podcast, "更新入库", "metadata_only"]
    lines: list[str] = [
        "---",
        f"tags: [{', '.join(tags)}]",
        f"created: {TODAY}",
        f"source: {yaml_quote(ep.podcast)}",
        f"author: {yaml_quote(ep.podcast_author or '待补充')}",
        "layer: extract",
        "status: draft",
        "confidence: 0.45",
        "quality: metadata_only",
        "aliases:" + "\n".join(yaml_list([ep.title, note_title])),
        "rejected_drafts: []",
        "cherry_picked: false",
        "provenance: external",
        "viewpoint_owner: external_author",
        "raw_material: false",
        f"episode: {yaml_quote(f'{note_seq:03d}')}",
        f"pubDate: {yaml_quote(ep.pub_date_iso or ep.pub_date_raw or '待补充')}",
        "extraction_status: pending",
        "quantity_closure_status: 89_ready",
        "curation_status: pending_transcription_or_human_review",
        f"source_material: {yaml_quote(raw_link)}",
        f"source_url: {yaml_quote(ep.link)}",
        f"audio_url: {yaml_quote(ep.audio_url)}",
        f"guid: {yaml_quote(ep.guid or ep.eid)}",
        f"fetched_at: {yaml_quote(fetched_at)}",
        "---",
        f"# {note_seq:03d} - {note_title}",
        "",
        "> 状态说明：本入口仅依据官方简介 / shownotes 生成，用于先进入知识库和后续排队；不是完整逐字稿整理稿。",
        "",
        "## 摘要",
        "",
        summary,
        "",
        "## 官方信息摘要",
        "",
        f"- 节目：{ep.podcast}",
        f"- 发布时间：{ep.pub_date_iso or ep.pub_date_raw or '待补充'}",
        f"- 时长：{duration_text(ep.duration)}",
        f"- 来源：{ep.link or '待补充'}",
        f"- 原料：{raw_link}",
        "",
        "## 可检索线索",
        "",
    ]
    if keywords:
        lines.extend([f"- {keyword}" for keyword in keywords])
    else:
        lines.append("- 待转录后补充")
    lines.extend(
        [
            "",
            "## 后续处理",
            "",
            "- [ ] 补充音频转录或人工听音频复核。",
            "- [ ] 基于逐字稿重写摘要、金句、核心要点和关键问答。",
            "- [ ] 需要时再拆到人物、方法、概念和判断层。",
            "",
            "## 来源",
            "",
            f"- {raw_link}",
            f"- 官方链接：{ep.link or '待补充'}",
            "",
        ]
    )
    return "\n".join(lines)


def write_new_episode_files(program: str, episodes: list[Episode], catalog: ProgramCatalog, dry_run: bool) -> list[dict[str, str]]:
    writes: list[dict[str, str]] = []
    raw_seq = catalog.next_raw_seq
    note_seq = catalog.next_note_seq
    fetched_at = iso_now()
    for ep in episodes:
        raw_title = sanitize_filename(ep.title)
        note_title = sanitize_filename(note_title_for(program, ep.title))
        raw_path = RAW_ROOT / program / f"{raw_seq:03d} - {raw_title}.md"
        note_path = NOTE_ROOT / program / f"{note_seq:03d} - {note_title}.md"
        ep.raw_seq = raw_seq
        ep.note_seq = note_seq
        ep.raw_file = raw_path.name
        ep.note_file = note_path.name
        writes.append({"podcast": program, "raw": str(raw_path), "note": str(note_path), "title": ep.title})
        if not dry_run:
            if raw_path.exists() or note_path.exists():
                raise FileExistsError(f"目标文件已存在，停止避免覆盖：{raw_path} / {note_path}")
            write_text(raw_path, build_raw_markdown(ep, raw_seq, fetched_at))
            write_text(note_path, build_note_markdown(ep, note_seq, raw_path, fetched_at))
        raw_seq += 1
        note_seq += 1
    return writes


def update_episodes_json(program: str, source_url: str, fetched: list[Episode], backfill: list[Episode], new_eps: list[Episode], dry_run: bool) -> dict[str, int]:
    path = RAW_ROOT / program / "_episodes.json"
    meta = read_json(path, {})
    if not isinstance(meta, dict):
        meta = {}
    existing = meta.get("episodes")
    if not isinstance(existing, list):
        existing = []
    existing_tokens: set[str] = set()
    for item in existing:
        if not isinstance(item, dict):
            continue
        for key in ["guid", "eid", "trackId", "link", "audioUrl"]:
            value = clean_scalar(item.get(key))
            if value:
                existing_tokens.add(value)
                if key == "link":
                    existing_tokens.add(canonical_url(value))
        title_key = normalize_title_key(item.get("title", ""))
        if title_key:
            existing_tokens.add(f"title:{title_key}")
        existing_tokens.update(show_number_tokens(item.get("title", "")))

    appended = 0
    for ep in [*backfill, *new_eps]:
        if ep.identity_tokens() & existing_tokens:
            continue
        item = ep.to_json()
        existing.append(item)
        appended += 1
        existing_tokens.update(ep.identity_tokens())

    if appended:
        existing = sorted(
            existing,
            key=lambda item: (
                parse_datetime(clean_scalar(item.get("pubDate") or item.get("pubDateIso")))
                or dt.datetime.min.replace(tzinfo=dt.timezone.utc),
                normalize_title_key(item.get("title", "")),
            ),
        )
        for idx, item in enumerate(existing, start=1):
            if isinstance(item, dict):
                item.setdefault("index", idx)
                item.setdefault("total", len(existing))
        meta["episodes"] = existing
        meta["episodeCount"] = len(existing)
        meta["fetchedAt"] = iso_now()
        meta["source"] = source_url or meta.get("source")
        meta["order"] = "chronological"
        if fetched:
            meta["latestFetched"] = fetched[-1].to_json()
        if not dry_run:
            write_json(path, meta)
    return {"metadata_appended": appended, "episode_count": len(existing)}


def note_status(path: Path) -> str:
    try:
        value = get_fm_value(read_text(path), "extraction_status")
    except OSError:
        return "(unreadable)"
    return value if value is not None else "(missing)"


def link_for(root: str, program: str, path: Path, label: str) -> str:
    return f"[[{root}/{program}/{path.stem}|{label}]]"


def write_program_index(program: str, dry_run: bool) -> dict[str, Any]:
    raw_files = numeric_md_files(RAW_ROOT / program)
    note_files = numeric_md_files(NOTE_ROOT / program)
    note_by_title: dict[str, Path] = {}
    note_by_seq: dict[int, Path] = {}
    for note in note_files:
        note_seq = seq_from_path(note)
        if note_seq is not None:
            note_by_seq[note_seq] = note
        keys = {normalize_title_key(strip_three_digit_prefix(note.stem))}
        try:
            text = read_text(note)
        except OSError:
            text = ""
        source_transcript = get_fm_value(text, "source_transcript") if text else None
        if source_transcript:
            keys.add(normalize_title_key(Path(source_transcript.strip('"')).stem))
        source_value = get_fm_value(text, "source") if text else None
        if source_value and "｜" in source_value:
            keys.add(normalize_title_key(source_value.split("｜", 1)[1].strip('" ')))
        for key in keys:
            if key:
                note_by_title.setdefault(key, note)
    rows: list[dict[str, str]] = []
    missing = 0
    used_notes: set[Path] = set()
    for raw in raw_files:
        archive_no = seq_from_path(raw)
        title = strip_three_digit_prefix(raw.stem)
        key = normalize_title_key(title)
        note = None
        if archive_no is not None:
            if program == "搞钱女孩":
                note = note_by_seq.get(archive_no - 1)
            else:
                note = note_by_seq.get(archive_no)
        if not note:
            note = note_by_title.get(key)
        if note:
            used_notes.add(note)
            note_cell = link_for("89单集笔记", program, note, f"{seq_from_path(note) or 0:03d}")
            status = note_status(note)
        else:
            note_cell = "缺"
            status = "missing"
            missing += 1
        rows.append(
            {
                "archive_no": f"{archive_no or 0:03d}",
                "title": title,
                "raw": link_for("99原始资料", program, raw, f"{archive_no or 0:03d} 原始资料"),
                "note": note_cell,
                "status": status,
            }
        )
    unmatched_notes = [p for p in note_files if p not in used_notes]
    lines = [
        "---",
        f"tags: [MOC, 播客笔记, {program}, 更新入库]",
        f"created: {TODAY}",
        f"updated: {TODAY}",
        "layer: index",
        "status: active",
        "---",
        f"# {program}｜播客索引",
        "",
        f"> {TODAY} 自动重建。匹配规则以标题/来源为主，避免 `000` 序言或节目内编号与归档序号不一致时误判。",
        "",
        "## 概览",
        "",
        "| 指标 | 数量 |",
        "|---|---:|",
        f"| 原始资料 | {len(raw_files)} |",
        f"| 89 单集笔记 | {len(note_files)} |",
        f"| 未匹配原料 | {missing} |",
        f"| 未匹配笔记 | {len(unmatched_notes)} |",
        "",
        "## 单集列表",
        "",
        "| 归档号 | 标题 | 原始资料 | 89 单集笔记 | extraction_status |",
        "|---|---|---|---|---|",
    ]
    for row in rows:
        title = row["title"].replace("|", " ")
        lines.append(f"| {row['archive_no']} | {title} | {row['raw']} | {row['note']} | {row['status']} |")
    if unmatched_notes:
        lines.extend(["", "## 未匹配笔记", ""])
        for note in unmatched_notes:
            lines.append(f"- [[89单集笔记/{program}/{note.stem}|{note.name}]]")
    if not dry_run:
        write_text(NOTE_ROOT / program / f"00-{program}｜播客索引.md", "\n".join(lines) + "\n")
    return {
        "program": program,
        "raw_count": len(raw_files),
        "note_count": len(note_files),
        "missing_raw_matches": missing,
        "unmatched_notes": len(unmatched_notes),
    }


def write_total_index(program_stats: list[dict[str, Any]], dry_run: bool) -> dict[str, Any]:
    total_raw = sum(item["raw_count"] for item in program_stats)
    total_notes = sum(item["note_count"] for item in program_stats)
    total_missing = sum(item["missing_raw_matches"] for item in program_stats)
    total_unmatched_notes = sum(item["unmatched_notes"] for item in program_stats)
    lines = [
        "---",
        "tags: [MOC, 播客笔记, 资料审计, 更新入库]",
        "created: 2026-06-18",
        f"updated: {TODAY}",
        "source: C-外脑-播客知识库",
        "layer: index",
        "status: active",
        "confidence: 0.86",
        "provenance: mixed",
        "viewpoint_owner: ai_synthesis",
        "raw_material: false",
        "extraction_status: complete",
        f"extracted_at: {TODAY}",
        "---",
        "# 播客笔记总索引",
        "",
        "> 本索引按当前 `99原始资料` 与 `89单集笔记` 的数字编号 Markdown 文件重建；匹配时优先使用标题，避免节目内编号和归档序号不一致造成误判。",
        "",
        "## 总体审计",
        "",
        "| 项目 | 数量 |",
        "|---|---:|",
        f"| 节目 | {len(program_stats)} |",
        f"| 原始资料 | {total_raw} |",
        f"| 89 单集笔记 | {total_notes} |",
        f"| 未匹配原料 | {total_missing} |",
        f"| 未匹配笔记 | {total_unmatched_notes} |",
        f"| 标题匹配覆盖率 | {((total_raw - total_missing) / total_raw * 100 if total_raw else 0):.1f}% |",
        "",
        "## 节目整理进度",
        "",
        "| 节目 | 原始资料 | 89 单集笔记 | 未匹配原料 | 未匹配笔记 | 状态说明 |",
        "|---|---:|---:|---:|---:|---|",
    ]
    for item in sorted(program_stats, key=lambda row: row["program"]):
        if item["missing_raw_matches"]:
            state = "存在原料未匹配 89 入口"
        elif item["unmatched_notes"]:
            state = "89 数量齐，含额外入口或序言"
        else:
            state = "数量闭环完成，质量以单集记录为准"
        lines.append(
            f"| {item['program']} | {item['raw_count']} | {item['note_count']} | "
            f"{item['missing_raw_matches']} | {item['unmatched_notes']} | {state} |"
        )
    lines.extend(
        [
            "",
            "## 本轮说明",
            "",
            f"- {TODAY}：检查常用播客是否更新，并将新集以官方元数据 / shownotes 原料和 89 单集入口形式入库。",
            "- `quality: metadata_only` 表示仅完成入库与可追溯入口，尚未完成逐字稿转录和人工精读。",
            "- 节目索引采用标题匹配，不用单纯三位编号判断缺口。",
        ]
    )
    if not dry_run:
        write_text(NOTE_ROOT / "00-播客笔记总索引.md", "\n".join(lines) + "\n")
    return {
        "programs": len(program_stats),
        "raw": total_raw,
        "notes": total_notes,
        "missing_raw_matches": total_missing,
        "unmatched_notes": total_unmatched_notes,
    }


def latest_known(ep: Episode | None) -> dict[str, str]:
    if not ep:
        return {}
    return {
        "title": ep.title,
        "pubDateRaw": ep.pub_date_raw,
        "pubDateIso": ep.pub_date_iso,
        "link": ep.link,
        "guid": ep.guid or ep.eid,
        "source": ep.source,
    }


def update_state_and_report(results: dict[str, Any], subscriptions: dict[str, dict[str, Any]], dry_run: bool) -> None:
    checked_at = results["checkedAt"]
    state = read_json(STATE_PATH, {})
    if not isinstance(state, dict):
        state = {}
    state.setdefault("createdAt", checked_at)
    state["updatedAt"] = local_now_iso()
    state["source"] = "official-rss-and-xiaoyuzhou-pages"
    state["lastCheckAt"] = checked_at
    state.setdefault("podcasts", {})
    for item in results["programs"]:
        program = item["podcast"]
        cfg = dict(subscriptions.get(program, {}))
        current = state["podcasts"].setdefault(program, {})
        for key in ["feedUrl", "pageUrl", "podcastId"]:
            if cfg.get(key):
                current[key] = cfg.get(key)
            else:
                current.setdefault(key, cfg.get(key))
        current["latestKnown"] = item.get("latestKnown") or current.get("latestKnown", {})
        current["lastCheckedAt"] = checked_at
    report = {
        "checkedAt": checked_at,
        "checkedAtLocal": results["checkedAtLocal"],
        "checkedPodcastCount": len(results["programs"]),
        "updatedCount": len(results["updates"]),
        "newEpisodeCount": sum(item["count"] for item in results["updates"]),
        "noUpdateCount": len(results["noUpdates"]),
        "failureCount": len(results["failures"]),
        "updates": results["updates"],
        "noUpdates": results["noUpdates"],
        "failures": results["failures"],
        "metadataBackfill": results["metadataBackfill"],
        "notes": results["notes"],
    }
    if not dry_run:
        write_json(STATE_PATH, state)
        write_json(REPORT_PATH, report)


def update_processing_queue(results: dict[str, Any], dry_run: bool) -> None:
    queue = read_json(QUEUE_PATH, {})
    if not isinstance(queue, dict):
        queue = {}
    items = queue.setdefault("items", [])
    if not isinstance(items, list):
        items = []
        queue["items"] = items
    existing = {
        (clean_scalar(item.get("podcast")), clean_scalar(item.get("title")))
        for item in items
        if isinstance(item, dict)
    }
    added = 0
    for update in results["updates"]:
        for ep in update.get("episodes", []):
            key = (update["podcast"], ep["title"])
            if key in existing:
                continue
            items.append(
                {
                    "podcast": update["podcast"],
                    "title": ep["title"],
                    "status": "pending_transcription_or_human_review",
                    "quality": "metadata_only",
                    "sourceUrl": ep.get("link", ""),
                    "raw": ep.get("raw", ""),
                    "note": ep.get("note", ""),
                    "createdAt": results["checkedAt"],
                }
            )
            existing.add(key)
            added += 1
    queue["updatedAt"] = results["checkedAt"]
    queue["pendingCount"] = len(items)
    queue["lastAddedCount"] = added
    if not dry_run:
        write_json(QUEUE_PATH, queue)


def write_log(results: dict[str, Any], index_audit: dict[str, Any], dry_run: bool) -> None:
    path = LOG_ROOT / f"常用播客更新入库-{TODAY}.md"
    lines = [
        "---",
        "tags: [播客知识库, 更新检查, 入库日志]",
        f"created: {TODAY}",
        "layer: log",
        f"status: {'dry-run' if dry_run else 'complete'}",
        "provenance: system",
        "viewpoint_owner: ai_synthesis",
        "raw_material: false",
        "---",
        f"# 常用播客更新入库-{TODAY}",
        "",
        "## 检查范围",
        "",
        f"- 检查时间：{results['checkedAtLocal']}",
        f"- 节目数：{len(results['programs'])}",
        f"- 新增节目集数：{sum(item['count'] for item in results['updates'])}",
        f"- 检查失败：{len(results['failures'])}",
        "",
        "## 有更新",
        "",
    ]
    if results["updates"]:
        for item in results["updates"]:
            lines.append(f"### {item['podcast']}（{item['count']} 集）")
            for ep in item["episodes"]:
                raw_rel = Path(ep["raw"]).relative_to(ROOT).as_posix() if ep.get("raw") else ""
                note_rel = Path(ep["note"]).relative_to(ROOT).as_posix() if ep.get("note") else ""
                lines.append(f"- {ep['pubDate'] or '待补充'}｜{ep['title']}")
                lines.append(f"  - 原料：[[{raw_rel[:-3]}|99 原料]]")
                lines.append(f"  - 笔记：[[{note_rel[:-3]}|89 入口]]")
                lines.append(f"  - 来源：{ep.get('link') or '待补充'}")
    else:
        lines.append("- 本轮没有发现新集。")
    lines.extend(["", "## 无更新", ""])
    if results["noUpdates"]:
        for program in results["noUpdates"]:
            lines.append(f"- {program}")
    else:
        lines.append("- 无")
    lines.extend(["", "## 元数据回填", ""])
    if results["metadataBackfill"]:
        for item in results["metadataBackfill"]:
            lines.append(f"- {item['podcast']}：回填 `_episodes.json` 元数据 {item['count']} 条。")
    else:
        lines.append("- 无")
    lines.extend(["", "## 失败", ""])
    if results["failures"]:
        for failure in results["failures"]:
            lines.append(f"- {failure['podcast']}：{failure['error']}")
    else:
        lines.append("- 无")
    lines.extend(
        [
            "",
            "## 索引审计",
            "",
            f"- 原始资料：{index_audit['raw']}",
            f"- 89 单集笔记：{index_audit['notes']}",
            f"- 未匹配原料：{index_audit['missing_raw_matches']}",
            f"- 未匹配笔记：{index_audit['unmatched_notes']}",
            "",
            "## 边界说明",
            "",
            "- 本轮只抓取官方 RSS / 小宇宙页面公开元数据与 shownotes。",
            "- 新增 99 原料是官方简介原料，不是逐字稿。",
            "- 新增 89 入口是 `metadata_only`，后续仍需转录或人工听音频精修。",
        ]
    )
    if not dry_run:
        write_text(path, "\n".join(lines) + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(description="检查常用播客更新并写入播客知识库。")
    parser.add_argument("--dry-run", action="store_true", help="只检查并打印计划，不写文件。")
    args = parser.parse_args()

    subscriptions = discover_subscriptions()
    checked_at = iso_now()
    results: dict[str, Any] = {
        "checkedAt": checked_at,
        "checkedAtLocal": local_now_iso(),
        "programs": [],
        "updates": [],
        "noUpdates": [],
        "failures": [],
        "metadataBackfill": [],
        "notes": [],
    }

    for program, cfg in subscriptions.items():
        catalog = load_catalog(program)
        try:
            fetched, source_url = fetch_program(program, cfg)
        except Exception as exc:
            results["failures"].append({"podcast": program, "error": str(exc), "source": cfg.get("feedUrl") or cfg.get("pageUrl")})
            continue

        new_eps = find_new_episodes(fetched, catalog)
        backfill = episodes_to_backfill(fetched, catalog)
        writes = write_new_episode_files(program, new_eps, catalog, args.dry_run)
        meta_result = update_episodes_json(program, source_url, fetched, backfill, new_eps, args.dry_run)
        if backfill:
            results["metadataBackfill"].append({"podcast": program, "count": len(backfill)})

        latest = fetched[-1] if fetched else None
        results["programs"].append(
            {
                "podcast": program,
                "source": source_url,
                "fetchedCount": len(fetched),
                "latestKnown": latest_known(latest),
                "metadataAppended": meta_result["metadata_appended"],
            }
        )
        if new_eps:
            results["updates"].append(
                {
                    "podcast": program,
                    "count": len(new_eps),
                    "episodes": [
                        {
                            "title": ep.title,
                            "pubDate": ep.pub_date_iso or ep.pub_date_raw,
                            "link": ep.link,
                            "raw": next((w["raw"] for w in writes if w["title"] == ep.title), ""),
                            "note": next((w["note"] for w in writes if w["title"] == ep.title), ""),
                        }
                        for ep in new_eps
                    ],
                }
            )
        else:
            results["noUpdates"].append(program)

    program_stats = [write_program_index(program, args.dry_run) for program in sorted([p.name for p in RAW_ROOT.iterdir() if p.is_dir()])]
    index_audit = write_total_index(program_stats, args.dry_run)
    update_state_and_report(results, subscriptions, args.dry_run)
    update_processing_queue(results, args.dry_run)
    write_log(results, index_audit, args.dry_run)

    print(json.dumps({"results": results, "indexAudit": index_audit, "dryRun": args.dry_run}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
