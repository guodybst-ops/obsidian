import { DatabaseSync } from 'node:sqlite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [eid, status, error = ''] = process.argv.slice(2);
if (!eid || !status) throw new Error('用法：node scripts/set-status.mjs <eid> <status> [error]');
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const runtimeRoot = process.env.PODCAST_TOOL_DATA_DIR || join(process.env.LOCALAPPDATA || root, 'XiaoyuzhouPodcastTool');
const db = new DatabaseSync(join(runtimeRoot, 'data', 'podcast-tool.db'));
db.prepare('UPDATE episodes SET status = ?, error = ? WHERE eid = ?').run(status, error, eid);
console.log('updated');
