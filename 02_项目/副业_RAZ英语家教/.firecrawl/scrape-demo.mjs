// scrape-demo.mjs
// 用途：抓取单个页面，输出干净的 Markdown + 元数据。
// 运行：npm run scrape -- <url>      或   node scrape-demo.mjs <url>
import "dotenv/config";
import Firecrawl from "@mendable/firecrawl-js";
import { writeFile, mkdir } from "node:fs/promises";

const url = process.argv[2] || "https://en.wikipedia.org/wiki/Phonics";
if (!process.env.FIRECRAWL_API_KEY) {
  console.error("❌ 缺少 FIRECRAWL_API_KEY，请先在 .env 里填好");
  process.exit(1);
}

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// 仅保留主要内容，可选 formats 组合：markdown / html / summary / screenshot / json
const result = await app.scrapeUrl(url, {
  formats: ["markdown", { type: "summary" }],
  onlyMainContent: true,
  removeBase64Images: true,
  waitFor: 1500, // 等页面 JS 渲染完
});

if (!result.success) {
  console.error("抓取失败：", result.error);
  process.exit(1);
}

await mkdir("out", { recursive: true });
const slug = new URL(url).pathname.replace(/\W+/g, "_").slice(0, 40) || "page";
await writeFile(`out/${slug}.md`, result.markdown || "", "utf8");
console.log("✅ 已保存到 out/" + slug + ".md");
console.log("标题：", result.metadata?.title);
console.log("字数：", (result.markdown || "").length);
console.log("摘要：", result.summary?.slice(0, 120), "…");
