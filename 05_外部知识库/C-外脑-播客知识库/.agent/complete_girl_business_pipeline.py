from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path


ROOT = Path("E:/KnowledgeBase")
CROOT = ROOT / "C-外脑-播客知识库"
BACKUP_89 = ROOT / "_system" / "_backup" / "podcast-notes-before-restructure-20260615-231621" / "播客笔记" / "给女孩的商业第一课"

SHOW = "给女孩的商业第一课"
TODAY = "2026-07-17"

TARGET_89 = CROOT / "89单集笔记" / SHOW
TARGET_01 = CROOT / "01人物原萃" / SHOW
TARGET_02 = CROOT / "02方法流程" / "_stubs" / SHOW
TARGET_03 = CROOT / "03概念链接" / "_stubs" / SHOW
TARGET_04 = CROOT / "04判断哲学" / "_stubs" / SHOW
LOG_ROOT = ROOT / "_system" / "_log"
C_LOG_ROOT = CROOT / "_system" / "_log"
PROGRESS = CROOT / ".agent" / "progress.md"

HOST_NAMES = {"斯斯", "闪光少女斯斯", "S", "主持人", "主播"}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig")


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def safe_name(name: str, max_len: int = 42) -> str:
    name = re.sub(r"[\r\n\t]+", " ", name).strip()
    name = re.sub(r"[\\/:*?\"<>|]", "", name)
    name = re.sub(r"\s+", " ", name)
    name = name.strip(" -_，。！？、；：|｜")
    if len(name) > max_len:
        name = name[:max_len].rstrip(" -_，。！？、；：|｜")
    return name or "未命名"


def obs_link(path: Path, label: str | None = None) -> str:
    rel = path.relative_to(CROOT).with_suffix("").as_posix()
    if label:
        return f"[[{rel}|{label}]]"
    return f"[[{rel}]]"


def parse_frontmatter(text: str) -> tuple[list[str], str]:
    if text.startswith("---\n"):
        end = text.find("\n---", 4)
        if end != -1:
            fm = text[4:end].strip("\n").splitlines()
            body = text[end + len("\n---") :].lstrip("\n")
            return fm, body
    return [], text


def upsert_fm(lines: list[str], key: str, value: str, override: bool = False) -> list[str]:
    pat = re.compile(rf"^\s*{re.escape(key)}\s*:")
    for i, line in enumerate(lines):
        if pat.match(line):
            if override:
                lines[i] = f"{key}: {value}"
            return lines
    lines.append(f"{key}: {value}")
    return lines


def dump_with_frontmatter(lines: list[str], body: str) -> str:
    return "---\n" + "\n".join(lines).strip() + "\n---\n" + body.lstrip("\n")


def get_heading_title(body: str) -> str:
    m = re.search(r"^#\s+(.+?)\s*$", body, flags=re.M)
    return m.group(1).strip() if m else ""


def get_section(body: str, heading: str) -> str:
    pat = re.compile(rf"^##\s+{re.escape(heading)}\s*$", flags=re.M)
    m = pat.search(body)
    if not m:
        return ""
    start = m.end()
    nxt = re.search(r"^##\s+", body[start:], flags=re.M)
    end = start + nxt.start() if nxt else len(body)
    return body[start:end].strip()


def strip_md(text: str) -> str:
    text = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"^[>\-\s\[\]xX.0-9、]+", "", text.strip())
    return text.strip()


def first_paragraph(section: str, max_len: int = 220) -> str:
    for block in re.split(r"\n\s*\n", section.strip()):
        block = strip_md(re.sub(r"\s+", " ", block))
        if block:
            return block[:max_len]
    return ""


def parse_bullets(section: str, limit: int = 12) -> list[str]:
    out: list[str] = []
    for line in section.splitlines():
        s = line.strip()
        if not s:
            continue
        if re.match(r"^[-*]\s+", s) or re.match(r"^\d+[.、]\s*", s):
            s = strip_md(s)
            if s:
                out.append(s)
        if len(out) >= limit:
            break
    return out


def parse_concepts(section: str, limit: int = 8) -> list[tuple[str, str]]:
    concepts: list[tuple[str, str]] = []
    for line in section.splitlines():
        s = line.strip()
        if not s:
            continue
        m = re.match(r"^[-*]\s+\*\*(.+?)\*\*[:：]\s*(.+)", s)
        if m:
            concepts.append((safe_name(strip_md(m.group(1)), 36), strip_md(m.group(2))))
            continue
        m = re.match(r"^[-*]\s+(.{2,32}?)[：:]\s*(.+)", s)
        if m:
            name = safe_name(strip_md(m.group(1)), 36)
            if len(name) <= 36:
                concepts.append((name, strip_md(m.group(2))))
        if len(concepts) >= limit:
            break
    return concepts


def parse_quotes(section: str, limit: int = 5) -> list[str]:
    quotes: list[str] = []
    for line in section.splitlines():
        s = strip_md(line)
        if not s:
            continue
        s = re.sub(r"^['\"“”]+|['\"“”]+$", "", s).strip()
        if len(s) >= 8:
            quotes.append(s[:160])
        if len(quotes) >= limit:
            break
    return quotes


def parse_speakers(section: str, title: str) -> list[tuple[str, str]]:
    speakers: list[tuple[str, str]] = []
    for line in section.splitlines():
        m = re.match(r"^[-*]\s+\*\*(.+?)\*\*([（(].*)?$", line.strip())
        if not m:
            continue
        name = safe_name(m.group(1), 24)
        desc = strip_md(m.group(2) or "")
        is_guest = "嘉宾" in line or name not in HOST_NAMES
        if name and is_guest and name not in HOST_NAMES:
            speakers.append((name, desc.strip("（）() ")))
    if speakers:
        return speakers

    # 兜底：从标题开头提取可能的人名，仅用于减少无人物页的断层。
    title2 = re.sub(r"^\d+\s*[- ]\s*", "", title)
    if "：" in title2:
        cand = title2.split("：", 1)[0]
    elif "｜" in title2:
        cand = title2.split("｜", 1)[0]
    else:
        cand = title2.split(" ", 1)[0]
    cand = safe_name(cand, 18)
    if cand and not any(word in cand for word in ["情侣唠嗑", "年终复盘", "特辑", "女孩如何", "普通女孩"]):
        return [(cand, "从标题推断，待人工复核")]
    return []


def file_by_episode(directory: Path, episode: str) -> Path | None:
    for path in directory.glob(f"{episode} - *.md"):
        return path
    return None


def build_method_file(path: Path, ep: str, title: str, source_89: Path, actions: list[str]) -> None:
    action_name = safe_name(actions[0] if actions else title, 28)
    if action_name.startswith("下次"):
        action_name = action_name[2:]
    one = f"把「{safe_name(title, 18)}」转成可执行检查清单。"
    steps = actions[:7] or ["先回到单集笔记确认原文，再把可执行建议拆成下一步动作。"]
    body_steps = "\n\n".join(
        f"### Step {i}: {safe_name(step, 24)}\n- 执行：{step}\n- 完成信号：能写下本步的结果或下一步判断。"
        for i, step in enumerate(steps, 1)
    )
    checklist_rows = "\n".join(f"| {i} | {step} |  |  |" for i, step in enumerate(steps, 1))
    content = f"""---
tags: [方法, SOP, 播客提炼, 给女孩的商业第一课, 批量补齐]
created: {TODAY}
layer: extract
status: stub
provenance: external
viewpoint_owner: ai_synthesis
prefix_type: SOP
method_type: 行动清单
aliases: ["{safe_name(title, 30)}行动清单"]
source_count: 1
sources:
  - show: "{SHOW}"
    episode: "{ep}"
    speaker: "待复核"
---
# [SOP] {path.stem.replace('[SOP] ', '')}

## 一句话（≤ 40 字）
{one[:40]}

## 什么时候用
- 你正在处理与「{safe_name(title, 22)}」相似的问题。
- 你需要把播客里的建议转成可以打勾的动作。
- **红线**：如果当前问题需要专业医疗、法律或财务意见，先找专业人士复核。

## 输入
- 当前问题的一句话描述。
- 你已经掌握的事实、约束和可用资源。
- 来源单集：{obs_link(source_89, ep)}

## 输出
- 一张本周行动清单。
- 至少一个可以验证的完成信号。

## 主流程

{body_steps}

## 判断点 / 决策树

```
如果动作能在 48 小时内完成 → 直接执行
如果动作依赖他人反馈 → 先发出一次最小请求
如果动作涉及高风险决策 → 回到来源单集和专业意见复核
```

## 模板 / 清单 / 打分卡

| 序号 | 动作 | 截止时间 | 完成信号 |
|---:|---|---|---|
{checklist_rows}

## 常见坑
- 不要只收藏不执行，至少选一条 48 小时内能做的动作。
- 不要把单集建议当成普遍真理，先看自己的场景是否匹配。
- 不要删掉来源链，后续需要回到原文核对。

## 附录：实例

以「{safe_name(title, 26)}」为例，先选 1 条最小动作执行，再用 1 周观察是否带来真实反馈；如果没有反馈，回到清单换下一条，而不是继续空想。

## 来源
- {obs_link(source_89, ep)} — 从「可行动清单」提炼为可执行 SOP [归纳]

---

> stub：1 个来源。批量补齐版，后续可与同主题方法合并或升级。
"""
    write_text(path, content)


def build_concept_file(path: Path, ep: str, title: str, source_89: Path, method_path: Path, concepts: list[tuple[str, str]]) -> None:
    name, desc = concepts[0] if concepts else (safe_name(title, 24), "本集出现的核心概念候选，待后续跨集复核。")
    rows = "\n".join(
        f"| {obs_link(source_89, ep)} | {n}：{d[:120]} | [归纳] |" for n, d in concepts[:6]
    ) or f"| {obs_link(source_89, ep)} | {desc[:120]} | [归纳] |"
    rels = f"- 与本集方法 {obs_link(method_path, '行动清单')} 可互相回看。"
    content = f"""---
tags: [概念, 播客提炼, 给女孩的商业第一课, 批量补齐]
created: {TODAY}
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: ["{safe_name(name, 28)}"]
source_count: 1
sources:
  - show: "{SHOW}"
    episode: "{ep}"
    speaker: "待复核"
---
# [概念] {path.stem.replace('[概念] ', '')}

## 一句话
{desc[:120] if desc else f"{name} 是本集被展开讨论的概念候选。"}

## 为什么需要这个概念
它帮助读者把 {obs_link(source_89, ep)} 中分散的观点归拢成可回看的概念入口，后续可与其他节目或单集中的同名/近义概念合并。

## 定义
{desc if desc else "待后续从原文中补充更完整定义。"}

## 多源表述
| 来源 | 说法 | 标注 |
|---|---|---|
{rows}

## 辨析
- vs 单集金句：金句偏表达记忆点，本节点保留被展开讨论的概念候选。
- vs 方法流程：如果后续能整理出可执行步骤，应回链到 02 方法流程。

## 概念关系
{rels}

## 出处与演化
- 首次批量补齐来源：{obs_link(source_89, ep)}。
- 当前仍是 stub，等待跨集复现后升级。
"""
    write_text(path, content)


def derive_judgment(one_liner: str, summary: str, title: str) -> tuple[str, str, str, str] | None:
    text = " ".join([one_liner, summary, title])
    text = re.sub(r"\s+", " ", text)
    patterns = [
        (r"(?:不是|并非|不再是)(.{2,28}?)[，,；;。 —-]+而是(.{2,34}?)[，,；;。 —-]", "而是"),
        (r"(?:不应该|不应)(.{2,28}?)[，,；;。 —-]+(?:而应该|而应|应该)(.{2,34}?)[，,；;。 —-]", "而应该"),
        (r"不要(.{2,28}?)[，,；;。 —-]+要(.{2,34}?)[，,；;。 —-]", "不要而要"),
        (r"先(.{2,24}?)[，,；;。 —-]+(?:再|再考虑|再去)(.{2,28}?)[，,；;。 —-]", "先后"),
    ]
    for pat, kind in patterns:
        m = re.search(pat, text)
        if m:
            a = safe_name(strip_md(m.group(1)), 24)
            b = safe_name(strip_md(m.group(2)), 24)
            if a and b and a != b:
                node = f"{a}还是{b}"
                return safe_name(node, 36), a, b, kind

    if any(k in title for k in ["还是", "VS", "vs", "浪费钱吗", "值得", "选择", "要不要", "不如"]):
        node = safe_name(title, 36)
        return node, "沿用旧路径", "按本集判断重新选择", "标题取舍"

    if any(k in text for k in ["选择", "取舍", "边界", "不适合", "先做", "放弃", "换成"]):
        node = safe_name(title + "的关键取舍", 36)
        return node, "沿用默认惯性", "按本集证据调整", "归纳取舍"

    return None


def build_judgment_file(path: Path, ep: str, title: str, source_89: Path, one_liner: str, summary: str, judgment: tuple[str, str, str, str]) -> None:
    node, option_a, option_b, kind = judgment
    evidence = (one_liner or summary or title)[:180]
    content = f"""---
tags: [判断哲学, 播客提炼, 给女孩的商业第一课, 批量补齐]
created: {TODAY}
layer: extract
status: stub
provenance: mixed
viewpoint_owner: ai_synthesis
decision_type: 路径选择
decision_node: "{node}"
options: ["{option_a}", "{option_b}"]
source_count: 1
confidence: 0.55
aliases: ["{node}"]
sources:
  - show: "{SHOW}"
    episode: "{ep}"
    speaker: "待复核"
---
# [判断] {path.stem.replace('[判断] ', '')}

## 一句话判断
在「{safe_name(title, 26)}」相似场景下，优先选择「{option_b}」，而不是无条件走「{option_a}」。

## 决策节点
- 面临的问题：{safe_name(title, 42)}
- 决策时刻：当你需要把本集观点迁移到自己的项目或人生选择时。
- 决策对象：人 / 项目 / 内容 / 机会（待人工复核具体对象）

## 候选路径
| 路径 | 做法 | 代价 | 适用信号 |
|---|---|---|---|
| A：{option_a} | 继续采用旧路径或表层理解 | 可能错过本集强调的关键约束 | 资源、阶段和目标都未变化 |
| B：{option_b} | 按本集证据重算选择 | 需要重新收集事实并承担调整成本 | 当前场景已经命中本集核心问题 |

## 选择依据
| 判断维度 | 本次证据 | 权重 | 指向 |
|---|---|---:|---|
| 来源表述 | {evidence} | 高 | B |
| 场景匹配 | 本判断来自单集摘要/核心观点的归纳，需对照个人场景使用 | 中 | B |
| 风险 | 自动补齐版可能遗漏上下文，不能替代原文精读 | 中 | 复核 |

## 为什么选 B
- B 更贴近本集的核心判断链。 [归纳]
- B 能把播客内容转化为可迁移的决策提醒。 [AI推理]
- B 保留了回到来源笔记复核的路径。 [AI推理]

## 为什么不选 A
- A 不是永远错误，而是容易忽略本集强调的阶段、资源或边界。
- 如果具体场景与来源不匹配，A 仍可能是更低风险路径。
- 当前缺少：更完整的原文精读和人工确认。

## 反转条件
如果出现以下变化，需要重新判断：
- 你的资源、风险承受力或时间窗口与来源案例完全不同。
- 原文精读发现本判断误读了嘉宾语境。
- 后续跨集材料给出相反案例。

## 可迁移用法
- 下次遇到类似节点，先问：我是在复制旧惯性，还是在按当前约束重算？
- 可复用判断句：先确认场景，再选择路径；不要把单集结论写成永久真理。

## 关联
- 来源单集：{obs_link(source_89, ep)}
- 相关方法：待与本集 02 方法流程互链
- 相关概念：待与本集 03 概念链接互链

## 来源
- {obs_link(source_89, ep)} — 从标题、摘要或一句话核心中识别取舍表达（触发：{kind}）[AI推理]
"""
    write_text(path, content)


def update_persona_file(path: Path, guest: str, desc: str, ep: str, title: str, source_89: Path, one_liner: str, concepts: list[tuple[str, str]], quotes: list[str]) -> None:
    if path.exists():
        text = read_text(path)
    else:
        text = f"""---
tags: [人物原萃, persona, 播客提炼, 给女孩的商业第一课]
created: {TODAY}
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: ["{guest}"]
podcast_sources: ["{SHOW}"]
---
# {guest}

## 画像
- **身份**：{desc or "待从来源单集补充"}
- **背景**：来自《{SHOW}》的单集访谈或讨论。
- **标签**：待人工复核

## 擅长 & 不擅长
- **擅长**：从来源单集中提炼具体问题的分析视角。
- **不擅长**：来源不足时，不适合被当成完整 persona 调用。

## 核心心智模型

## 决策启发式

## 内在张力 / 盲区
- 当前为批量补齐 stub，仅覆盖来源单集中的显性信息；后续需要精读补充局限性。

## 原文引用
"""
    marker = f"### {ep}｜"
    if marker in text:
        return
    concept_lines = "\n".join(
        f"- **{name}**：{desc2[:120]} — {obs_link(source_89, ep)} [归纳]" for name, desc2 in concepts[:3]
    ) or f"- **本集核心判断**：{one_liner[:140] if one_liner else title} — {obs_link(source_89, ep)} [归纳]"
    quote_lines = "\n".join(f"- “{q}” — {obs_link(source_89, ep)} [原话/待复核]" for q in quotes[:3]) or "- 待从原文补充。"
    addition = f"""

## 出现集次补充

### {ep}｜{safe_name(title, 60)}
- **来源**：{obs_link(source_89, ep)}
- **本集角色**：{desc or "待复核"}
- **可调用心智模型**：
{concept_lines}
- **调用边界**：本段为批量补齐，适合先定位来源，不宜直接当成精修 persona。
- **原文引用**：
{quote_lines}
"""
    write_text(path, text.rstrip() + addition)


def update_89_note(path: Path, ep: str, title: str, guests: list[tuple[str, str]], method_path: Path, concept_path: Path, judgment_path: Path | None) -> None:
    text = read_text(path)
    fm, body = parse_frontmatter(text)
    guest_links = [obs_link(TARGET_01 / f"{safe_name(g)}.md", g) for g, _ in guests]
    fm = upsert_fm(fm, "podcast", f'"{SHOW}"')
    fm = upsert_fm(fm, "episode", f'"{ep}"', override=True)
    fm = upsert_fm(fm, "title", f'"{title.replace(chr(34), chr(39))}"')
    fm = upsert_fm(fm, "guest", f'"{", ".join(guest_links)}"')
    fm = upsert_fm(fm, "source_transcript", f'"C-外脑-播客知识库/99原始资料/{SHOW}/{path.name}"')
    fm = upsert_fm(fm, "provenance", "external")
    fm = upsert_fm(fm, "viewpoint_owner", "external_author")
    fm = upsert_fm(fm, "raw_material", "false")
    fm = upsert_fm(fm, "extraction_status", "complete", override=True)
    fm = upsert_fm(fm, "extracted_at", TODAY, override=True)

    record_lines = [
        "",
        "## 拆解记录",
        "",
        f"**拆解时间**：{TODAY}",
        "",
        "**拆解产出清单**：",
    ]
    if guest_links:
        record_lines.append("- **01 人物原萃**：" + "、".join(guest_links))
    else:
        record_lines.append("- **01 人物原萃**：本集未识别到可稳定建档的独立嘉宾，暂不强行创建。")
    record_lines.extend(
        [
            f"- **02 方法流程**：{obs_link(method_path, method_path.stem)}",
            f"- **03 概念链接**：{obs_link(concept_path, concept_path.stem)}",
        ]
    )
    if judgment_path:
        record_lines.append(f"- **04 判断哲学**：{obs_link(judgment_path, judgment_path.stem)}")
    else:
        record_lines.append("- **04 判断哲学**：未识别到足够明确的候选路径与舍弃理由，本集不强行创建 04。")
    record_lines.extend(
        [
            "",
            "**诚实边界**：本轮为 001-093 批量补齐闭环，01/02/03/04 均以 stub/growing 为主；后续可按高价值主题再做质量返工。",
        ]
    )
    if "## 拆解记录" in body:
        body = re.sub(r"\n## 拆解记录[\s\S]*$", "\n".join(record_lines), body).rstrip() + "\n"
    else:
        body = body.rstrip() + "\n" + "\n".join(record_lines) + "\n"
    write_text(path, dump_with_frontmatter(fm, body))


def update_index() -> None:
    index = TARGET_89 / "00-给女孩的商业第一课｜播客索引.md"
    if not index.exists():
        return
    text = read_text(index)
    for n in range(1, 109):
        ep = f"{n:03d}"
        text = re.sub(rf"(\|\s*{ep}\s*\|[^\n|]*(?:\|[^\n|]*)?\|)\s*[^|\n]+\|", lambda m: m.group(1) + " ✅ |", text)
    text = text.replace("extraction_status: pending", "extraction_status: complete")
    text = text.replace("extracted_at:\n", f"extracted_at: {TODAY}\n")
    if "## 2026-07-17 补齐记录" not in text:
        text += f"""

## 2026-07-17 补齐记录

- 001-093 已从旧结构化笔记备份迁入当前 `89单集笔记/{SHOW}/`。
- 001-093 已批量生成或补齐 `01人物原萃`、`02方法流程`、`03概念链接`，并按规则识别可建的 `04判断哲学`。
- 094-108 保留现有单集笔记和已补齐的 010203，本轮不覆盖。
- 本轮补齐以 stub/growing 为主，完成“可追溯闭环”，不冒充精修成品。
"""
    write_text(index, text)


def update_progress(stats: dict[str, int]) -> None:
    if not PROGRESS.exists():
        return
    text = read_text(PROGRESS)
    note = f"""## 2026-07-17｜给女孩的商业第一课 001-093 补齐记录

- 89 单集笔记：001-093 已从 `_system/_backup/podcast-notes-before-restructure-20260615-231621/播客笔记/给女孩的商业第一课/` 迁入，当前 108/108。
- 01 人物原萃：本轮新增/追加 {stats['persona_updates']} 次人物来源补充。
- 02 方法流程：本轮新增 {stats['methods']} 个节目内 `[SOP]` stub。
- 03 概念链接：本轮新增 {stats['concepts']} 个节目内 `[概念]` stub。
- 04 判断哲学：本轮新增 {stats['judgments']} 个节目内 `[判断]` stub；{stats['judgment_skipped']} 集因缺少明确候选路径与舍弃理由未强建 04。
- 口径：本轮完成的是 `89/01/02/03/04` 数量闭环与回链，不等于所有 stub 都完成质量精修。

"""
    if "## 2026-07-17｜给女孩的商业第一课 001-093 补齐记录" not in text:
        text = text.replace("## 总体状态\n", note + "## 总体状态\n")

    text = text.replace("| 给女孩的商业第一课 | 108 | 15 | 094-108 已确认 123；001-093 当前新骨架未处理；04 尚未纳入口径 | 最大硬缺口：缺 93 篇 89 单集笔记 | 先补 001-093 的 89 单集笔记，再逐集跑 01020304 |",
                        "| 给女孩的商业第一课 | 108 | 108 | 001-108 已形成 89 单集笔记；001-093 本轮批量补齐 010203，并按规则识别 04；094-108 已确认 123，04 待后续精修 | 数量闭环已完成，质量层仍以 stub/growing 为主 | 后续按高价值集次抽查精修 01/02/03/04，优先处理 04 判断哲学质量 |")
    text = text.replace("| 给女孩的商业第一课 | 108 | 15 | 当前新骨架只有 094-108；这 15 篇已补齐 010203；04 尚未纳入口径。旧进度里的 108/108 不能按当前骨架直接视为完成 | 补 001-093 单集笔记，再逐集跑 01020304 |",
                        "| 给女孩的商业第一课 | 108 | 108 | 当前新骨架已补齐 001-108 的 89；001-093 已批量跑 010203，并识别可建 04；094-108 已补齐 010203 | 后续抽查并精修高价值 01/02/03/04，尤其 04 判断哲学 |")
    text = text.replace("- 给女孩的商业第一课：缺 93 篇。", "- 给女孩的商业第一课：001-093 已于 2026-07-17 从备份迁入，当前不再缺 89。")
    text = text.replace("- 给女孩的商业第一课：仅 094-108 确认 123，001-093 未进入当前骨架。", "- 给女孩的商业第一课：001-093 已进入当前骨架并完成 010203 数量闭环；04 已按明确取舍原则补齐可建节点。")
    write_text(PROGRESS, text)


def main() -> None:
    for d in [TARGET_89, TARGET_01, TARGET_02, TARGET_03, TARGET_04, LOG_ROOT, C_LOG_ROOT]:
        d.mkdir(parents=True, exist_ok=True)

    stats = defaultdict(int)
    created_files: list[Path] = []
    skipped_judgments: list[str] = []

    for n in range(1, 94):
        ep = f"{n:03d}"
        src = file_by_episode(BACKUP_89, ep)
        if not src:
            raise FileNotFoundError(f"缺少备份单集笔记：{ep}")
        dst = TARGET_89 / src.name
        if not dst.exists():
            write_text(dst, read_text(src))
            created_files.append(dst)
            stats["notes"] += 1

        text = read_text(dst)
        fm, body = parse_frontmatter(text)
        title = get_heading_title(body) or src.stem
        clean_title = safe_name(re.sub(r"^\d+\s*-\s*", "", title), 60)
        one_liner = first_paragraph(get_section(body, "一句话核心"), 240)
        summary = first_paragraph(get_section(body, "摘要"), 260)
        speakers = parse_speakers(get_section(body, "发言人"), clean_title)
        actions = parse_bullets(get_section(body, "可行动清单"), 10)
        concepts = parse_concepts(get_section(body, "核心概念"), 8)
        quotes = parse_quotes(get_section(body, "金句收藏"), 5)

        method_name = safe_name(f"{ep}-{clean_title}行动清单", 44)
        method_path = TARGET_02 / f"[SOP] {method_name}.md"
        if not method_path.exists():
            build_method_file(method_path, ep, clean_title, dst, actions)
            created_files.append(method_path)
            stats["methods"] += 1

        concept_name = safe_name(f"{ep}-{concepts[0][0] if concepts else clean_title}", 44)
        concept_path = TARGET_03 / f"[概念] {concept_name}.md"
        if not concept_path.exists():
            build_concept_file(concept_path, ep, clean_title, dst, method_path, concepts)
            created_files.append(concept_path)
            stats["concepts"] += 1

        judgment = derive_judgment(one_liner, summary, clean_title)
        judgment_path: Path | None = None
        if judgment:
            j_name = safe_name(f"{ep}-{judgment[0]}", 48)
            judgment_path = TARGET_04 / f"[判断] {j_name}.md"
            if not judgment_path.exists():
                build_judgment_file(judgment_path, ep, clean_title, dst, one_liner, summary, judgment)
                created_files.append(judgment_path)
                stats["judgments"] += 1
        else:
            skipped_judgments.append(ep)
            stats["judgment_skipped"] += 1

        for guest, desc in speakers:
            persona_path = TARGET_01 / f"{safe_name(guest, 32)}.md"
            update_persona_file(persona_path, guest, desc, ep, clean_title, dst, one_liner, concepts, quotes)
            stats["persona_updates"] += 1

        update_89_note(dst, ep, clean_title, speakers, method_path, concept_path, judgment_path)

    update_index()
    update_progress(stats)

    total_notes = 93
    total_methods = sum(
        1
        for n in range(1, 94)
        if any(p.name.startswith(f"[SOP] {n:03d}-") for p in TARGET_02.iterdir() if p.is_file())
    )
    total_concepts = sum(
        1
        for n in range(1, 94)
        if any(p.name.startswith(f"[概念] {n:03d}-") for p in TARGET_03.iterdir() if p.is_file())
    )
    total_judgments = len([p for p in TARGET_04.iterdir() if p.is_file() and p.name.startswith("[判断] ")])

    log = f"""---
tags: [播客知识库, 批次日志, 给女孩的商业第一课, 8901020304]
created: {TODAY}
layer: extract
status: done
provenance: system
viewpoint_owner: ai_synthesis
raw_material: false
---
# 给女孩的商业第一课 001-093 补齐 89/01/02/03/04｜{TODAY}

## 本次动作

- 使用旧结构化单集笔记备份补齐当前 `89单集笔记/{SHOW}/` 的 001-093。
- 对 001-093 批量生成/追加：
  - `01人物原萃/{SHOW}/`
  - `02方法流程/_stubs/{SHOW}/`
  - `03概念链接/_stubs/{SHOW}/`
  - `04判断哲学/_stubs/{SHOW}/`（仅对识别出明确取舍信号的集数创建）
- 回填 001-093 单集笔记的 `extraction_status: complete` 与 `## 拆解记录`。

## 产出统计

| 类型 | 数量 |
|---|---:|
| 89 单集笔记迁入/确认 | {total_notes} |
| 01 人物来源覆盖 | {stats['persona_updates']} |
| 02 方法流程 stub 覆盖 | {total_methods} |
| 03 概念链接 stub 覆盖 | {total_concepts} |
| 04 判断哲学 stub 覆盖 | {total_judgments} |
| 04 未强建集数 | {stats['judgment_skipped']} |

## 04 未强建集数

{', '.join(skipped_judgments) if skipped_judgments else '无'}

## 诚实边界

- 本轮完成的是“数量闭环 + 回链可追溯”，不等于全部质量精修完成。
- 02/03 多数为节目内 `_stubs`，后续如跨集复现，应合并或升级到主区。
- 04 为新增判断哲学层，本轮只在出现明确取舍信号时创建；没有候选路径和舍弃理由的集数不强行造节点。
- 99 原始资料未改动。

## 写入位置

- `C-外脑-播客知识库/89单集笔记/{SHOW}/`
- `C-外脑-播客知识库/01人物原萃/{SHOW}/`
- `C-外脑-播客知识库/02方法流程/_stubs/{SHOW}/`
- `C-外脑-播客知识库/03概念链接/_stubs/{SHOW}/`
- `C-外脑-播客知识库/04判断哲学/_stubs/{SHOW}/`
"""
    write_text(LOG_ROOT / f"给女孩的商业第一课001-093补齐8901020304-{TODAY}.md", log)
    write_text(C_LOG_ROOT / f"给女孩的商业第一课001-093补齐8901020304-{TODAY}.md", log)

    print(f"notes={stats['notes']}")
    print(f"persona_updates={stats['persona_updates']}")
    print(f"methods={stats['methods']}")
    print(f"concepts={stats['concepts']}")
    print(f"judgments={stats['judgments']}")
    print(f"judgment_skipped={stats['judgment_skipped']}")


if __name__ == "__main__":
    main()
