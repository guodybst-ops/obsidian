import { mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline, env } from '@huggingface/transformers';
import { Converter } from 'opencc-js';

const [audioUrl, outputPath] = process.argv.slice(2);
if (!audioUrl || !outputPath) throw new Error('缺少音频链接或输出路径');
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const runtimeRoot = process.env.PODCAST_TOOL_DATA_DIR || join(process.env.LOCALAPPDATA || root, 'XiaoyuzhouPodcastTool');
const workDir = join(runtimeRoot, 'data', 'work');
const modelDir = join(runtimeRoot, 'models');
await mkdir(workDir, { recursive: true });
await mkdir(modelDir, { recursive: true });
env.cacheDir = modelDir;
env.remoteHost = 'https://hf-mirror.com/';
const source = join(workDir, `audio-${Date.now()}.m4a`);
const wav = source.replace(/\.m4a$/, '.wav');
function command(name) {
  return process.platform === 'win32' ? `${name}.exe` : name;
}
function readPcm16Wav(path) {
  return readFile(path).then(buffer => {
    const data = buffer.indexOf(Buffer.from('data'));
    if (data < 0) throw new Error('无法读取转换后的 WAV 音频数据。');
    const length = buffer.readUInt32LE(data + 4);
    const start = data + 8;
    const samples = new Float32Array(Math.floor(length / 2));
    for (let i = 0; i < samples.length; i++) samples[i] = buffer.readInt16LE(start + i * 2) / 32768;
    return samples;
  });
}
try {
  await new Promise((resolve, reject) => {
    const child = spawn('curl.exe', ['-L', '--retry', '3', '--connect-timeout', '30', '--max-time', '1800', '-o', source, audioUrl], { windowsHide: true });
    let error = ''; child.stderr.on('data', c => error += c); child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error(`音频下载失败：${error.slice(-500)}`)));
  });
  const ffmpeg = process.env.FFMPEG_PATH || command('ffmpeg');
  await new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, ['-y', '-i', source, '-ar', '16000', '-ac', '1', wav], { windowsHide: true });
    let error = ''; child.stderr.on('data', c => error += c); child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error(`音频转换失败：${error.slice(-500)}`)));
  });
  const model = process.env.WHISPER_MODEL || 'Xenova/whisper-tiny';
  const transcriber = await pipeline('automatic-speech-recognition', model, { dtype: 'q8' });
  const audio = await readPcm16Wav(wav);
  const result = await transcriber(audio, { language: 'chinese', task: 'transcribe', chunk_length_s: 30, stride_length_s: 5, return_timestamps: true });
  const toSimplified = Converter({ from: 'tw', to: 'cn' });
  result.text = toSimplified(result.text || '');
  if (Array.isArray(result.chunks)) for (const chunk of result.chunks) chunk.text = toSimplified(chunk.text || '');
  await writeFile(outputPath, JSON.stringify(result), 'utf8');
  process.stdout.write(JSON.stringify({ ok: true }));
} finally {
  await rm(source, { force: true });
  await rm(wav, { force: true });
}
