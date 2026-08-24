import { DatabaseSync } from 'node:sqlite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const runtimeRoot = process.env.PODCAST_TOOL_DATA_DIR || join(process.env.LOCALAPPDATA || root, 'XiaoyuzhouPodcastTool');
const db = new DatabaseSync(join(runtimeRoot, 'data', 'podcast-tool.db'));
const settings = Object.fromEntries(db.prepare('SELECT key, value FROM settings').all().map(row => [row.key, row.value]));
if (settings.accessToken) settings.accessToken = '[已隐藏]';
if (settings.refreshToken) settings.refreshToken = '[已隐藏]';
const startedAt = settings.automationStartedAt || '';
const stats = db.prepare(`SELECT
  COUNT(*) AS total,
  SUM(CASE WHEN status='new' THEN 1 ELSE 0 END) AS pending,
  SUM(CASE WHEN status='transcribing' THEN 1 ELSE 0 END) AS transcribing,
  SUM(CASE WHEN status='transcribed' THEN 1 ELSE 0 END) AS transcribed,
  SUM(CASE WHEN status='new' AND discovered_at >= ? THEN 1 ELSE 0 END) AS autoEligible
  FROM episodes`).get(startedAt);
console.log(JSON.stringify({ settings, stats }, null, 2));
