import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const root = dirname(fileURLToPath(import.meta.url));
const publicDir = join(root, 'public');
const runtimeRoot = process.env.PODCAST_TOOL_DATA_DIR || join(process.env.LOCALAPPDATA || root, 'XiaoyuzhouPodcastTool');
const dataDir = join(runtimeRoot, 'data');
const vaultInbox = process.env.OBSIDIAN_PODCAST_OUTPUT_DIR || join(root, '..', '..', '01_收件箱', '内容', '播客');
await mkdir(dataDir, { recursive: true });
const db = new DatabaseSync(join(dataDir, 'podcast-tool.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS episodes (
    eid TEXT PRIMARY KEY, pid TEXT, podcast TEXT, title TEXT, published_at TEXT,
    duration_seconds INTEGER, audio_url TEXT, shownotes TEXT, status TEXT NOT NULL DEFAULT 'new',
    discovered_at TEXT NOT NULL
  );
`);
for (const column of ['transcript TEXT', 'markdown_path TEXT', 'error TEXT']) {
  try { db.exec(`ALTER TABLE episodes ADD COLUMN ${column}`); } catch {}
}

const xyzUrl = process.env.XYZ_URL ?? 'http://127.0.0.1:23020';
const port = Number(process.env.PORT ?? 23100);
const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
};
const getSetting = (key) => db.prepare('SELECT value FROM settings WHERE key = ?').get(key)?.value;
const setSetting = (key, value) => db.prepare('INSERT INTO settings(key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(key, value);

async function body(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}
async function xyz(path, payload = {}, accessToken) {
  const response = await fetch(`${xyzUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(accessToken ? { 'x-jike-access-token': accessToken } : {}) },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.code >= 400) {
    const error = new Error(data.msg || `xyz 请求失败（${response.status}）`);
    error.status = data.code || response.status;
    throw error;
  }
  return data;
}
function auth() {
  const token = getSetting('accessToken');
  if (!token) throw new Error('请先登录小宇宙。');
  return token;
}
async function refreshAuth() {
  const accessToken = getSetting('accessToken');
  const refreshToken = getSetting('refreshToken');
  if (!accessToken || !refreshToken) throw new Error('登录已失效，请重新短信登录。');
  const result = await xyz('/refresh_token', { 'x-jike-access-token': accessToken, 'x-jike-refresh-token': refreshToken });
  const data = result.data ?? {};
  if (!data['x-jike-access-token']) throw new Error('刷新登录失败，请重新短信登录。');
  setSetting('accessToken', data['x-jike-access-token']);
  if (data['x-jike-refresh-token']) setSetting('refreshToken', data['x-jike-refresh-token']);
  return data['x-jike-access-token'];
}
async function xyzWithAuth(path, payload = {}) {
  try { return await xyz(path, payload, auth()); }
  catch (error) {
    if (error.status !== 401 && !/认证|登录|token/i.test(error.message)) throw error;
    return xyz(path, payload, await refreshAuth());
  }
}
function normalizeEpisodes(response) {
  const payload = response?.data?.data ?? response?.data ?? {};
  return Array.isArray(payload) ? payload : (payload.data ?? payload.items ?? []);
}
async function fetchUpdates() {
  const response = await xyzWithAuth('/inbox_list', {});
  const episodes = normalizeEpisodes(response);
  const insert = db.prepare(`INSERT INTO episodes(eid,pid,podcast,title,published_at,duration_seconds,audio_url,shownotes,status,discovered_at)
    VALUES(?,?,?,?,?,?,?,?, 'new', ?)
    ON CONFLICT(eid) DO UPDATE SET podcast=excluded.podcast,title=excluded.title,published_at=excluded.published_at,duration_seconds=excluded.duration_seconds,audio_url=excluded.audio_url,shownotes=excluded.shownotes`);
  const discoveredAt = new Date().toISOString();
  for (const item of episodes) {
    insert.run(item.eid, item.pid ?? '', item.podcast?.title ?? item.author ?? '', item.title ?? '', item.pubDate ?? '', item.duration ?? 0, item.media?.source?.url ?? item.enclosure?.url ?? '', item.shownotes ?? item.description ?? '', discoveredAt);
  }
  setSetting('lastCheckedAt', discoveredAt);
  setSetting('automationError', '');
  return episodes.length;
}
function safeName(value) { return String(value || '未命名').replace(/[\\/:*?"<>|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100); }
function formatTime(seconds) { const s = Math.round(seconds || 0); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }
function localDate(value) { return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value)); }
function cleanShownotes(value) {
  return String(value || '无')
    .replace(/<a[^>]*class=["']timestamp["'][^>]*>(.*?)<\/a>/gi, '[$1]')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<\/h\d>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '- ').replace(/<\/li>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n').trim();
}
function markdown(episode, transcript) {
  const chunks = transcript.chunks || [];
  const timestamped = chunks.map(c => `- ${formatTime(c.timestamp?.[0])} ${c.text?.trim() || ''}`).join('\n');
  return `---\ntype: podcast\nstatus: 待整理\npodcast: "${String(episode.podcast).replaceAll('"', '\\"')}"\nepisode_id: ${episode.eid}\npublished: ${episode.published_at}\nduration_minutes: ${Math.round((episode.duration_seconds || 0) / 60)}\nsource: https://www.xiaoyuzhoufm.com/episode/${episode.eid}\ntags:\n  - 播客\n  - 待整理\n---\n\n# ${episode.title}\n\n> 本地 Whisper 自动转写；建议结合音频与 shownotes 校对重要表述。\n\n## 节目说明\n\n${cleanShownotes(episode.shownotes)}\n\n## 带时间戳转写\n\n${timestamped || transcript.text || '未识别到有效文字。'}\n\n## 完整转写\n\n${transcript.text || ''}\n`;
}
async function startTranscription(eid) {
  const episode = db.prepare('SELECT * FROM episodes WHERE eid = ?').get(eid);
  if (!episode) throw new Error('找不到该单集。');
  if (!episode.audio_url) throw new Error('该单集没有可获取的公开音频链接。');
  if (episode.status === 'transcribing') throw new Error('该单集正在转写。');
  const active = db.prepare("SELECT eid FROM episodes WHERE status='transcribing' LIMIT 1").get();
  if (active) throw new Error('已有单集正在转写，请等待完成。');
  db.prepare("UPDATE episodes SET status='transcribing', error=NULL WHERE eid=?").run(eid);
  const output = join(dataDir, `transcript-${eid}.json`);
  const child = spawn(process.execPath, [join(root, 'scripts', 'transcribe.mjs'), episode.audio_url, output], { windowsHide: true });
  let stderr = ''; child.stderr.on('data', c => stderr += c);
  child.on('close', async code => {
    try {
      if (code !== 0) throw new Error(stderr.slice(-800) || '本地转写失败。');
      const transcript = JSON.parse(await readFile(output, 'utf8'));
      await mkdir(vaultInbox, { recursive: true });
      const name = `${episode.published_at ? localDate(episode.published_at) : '未标日期'} ${safeName(episode.podcast)} - ${safeName(episode.title)}.md`;
      const path = join(vaultInbox, name);
      await writeFile(path, markdown(episode, transcript), 'utf8');
      db.prepare("UPDATE episodes SET status='transcribed', transcript=?, markdown_path=?, error=NULL WHERE eid=?").run(transcript.text || '', path, eid);
    } catch (error) {
      db.prepare("UPDATE episodes SET status='error', error=? WHERE eid=?").run(error.message || '转写失败', eid);
    } finally {
      setTimeout(processAutomationQueue, 1000);
    }
  });
}
async function processAutomationQueue() {
  if (getSetting('automationEnabled') !== 'true') return;
  const startedAt = getSetting('automationStartedAt');
  if (!startedAt || db.prepare("SELECT eid FROM episodes WHERE status='transcribing' LIMIT 1").get()) return;
  const next = db.prepare("SELECT eid FROM episodes WHERE status='new' AND discovered_at >= ? ORDER BY published_at ASC LIMIT 1").get(startedAt);
  if (next) await startTranscription(next.eid).catch(() => {});
}
async function automationTick() {
  if (getSetting('automationEnabled') !== 'true' || !getSetting('accessToken')) return;
  try { await fetchUpdates(); await processAutomationQueue(); }
  catch (error) {
    setSetting('automationError', error.message || '自动检查失败');
    setTimeout(automationTick, 5 * 60 * 1000);
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (req.method === 'GET' && url.pathname === '/api/status') {
      return json(res, 200, { loggedIn: Boolean(getSetting('accessToken')), xyzUrl, automationEnabled: getSetting('automationEnabled') === 'true', lastCheckedAt: getSetting('lastCheckedAt') || null, automationError: getSetting('automationError') || null });
    }
    if (req.method === 'POST' && url.pathname === '/api/send-code') {
      const { phone } = await body(req);
      await xyz('/sendCode', { mobilePhoneNumber: phone, areaCode: '+86' });
      return json(res, 200, { ok: true });
    }
    if (req.method === 'POST' && url.pathname === '/api/login') {
      const { phone, code } = await body(req);
      const result = await xyz('/login', { mobilePhoneNumber: phone, verifyCode: code, areaCode: '+86' });
      const data = result.data ?? {};
      if (!data['x-jike-access-token']) throw new Error('登录未返回授权信息，请稍后重试。');
      setSetting('accessToken', data['x-jike-access-token']);
      setSetting('refreshToken', data['x-jike-refresh-token'] ?? '');
      setSetting('userName', data?.data?.nickname ?? '小宇宙用户');
      return json(res, 200, { ok: true, userName: getSetting('userName') });
    }
    if (req.method === 'POST' && url.pathname === '/api/updates') {
      const fetched = await fetchUpdates();
      const rows = db.prepare("SELECT * FROM episodes ORDER BY published_at DESC LIMIT 100").all();
      return json(res, 200, { fetched, episodes: rows });
    }
    if (req.method === 'GET' && url.pathname === '/api/updates') {
      const rows = db.prepare("SELECT * FROM episodes ORDER BY published_at DESC LIMIT 100").all();
      return json(res, 200, { episodes: rows });
    }
    if (req.method === 'POST' && url.pathname === '/api/automation') {
      const { enabled } = await body(req);
      setSetting('automationEnabled', enabled ? 'true' : 'false');
      if (enabled && !getSetting('automationStartedAt')) setSetting('automationStartedAt', new Date().toISOString());
      if (enabled) setTimeout(automationTick, 100);
      return json(res, 200, { enabled: Boolean(enabled), startedAt: getSetting('automationStartedAt') || null });
    }
    if (req.method === 'POST' && url.pathname.startsWith('/api/transcribe/')) {
      await startTranscription(decodeURIComponent(url.pathname.split('/').pop()));
      return json(res, 202, { ok: true });
    }
    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      const page = await readFile(join(publicDir, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(page);
    }
    json(res, 404, { error: 'Not found' });
  } catch (error) {
    json(res, 400, { error: error.message || '发生未知错误' });
  }
});
db.prepare("UPDATE episodes SET status='error', error='工具重启导致任务中断，可重新点击转写' WHERE status='transcribing'").run();
setInterval(automationTick, 6 * 60 * 60 * 1000);
server.listen(port, '127.0.0.1', () => {
  console.log(`播客工具已启动：http://127.0.0.1:${port}`);
  setTimeout(automationTick, 3000);
});
