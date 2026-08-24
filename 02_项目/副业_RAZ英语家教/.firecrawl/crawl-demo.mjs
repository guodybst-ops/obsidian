// crawl-demo.mjs
// 用途：整站抓取，限制页面数和深度，自动跟随链接。
// 运行：npm run crawl -- <startUrl>      或   node crawl-demo.mjs <startUrl>
import "dotenv/config";
import Firecrawl from "@mendable/firecrawl-js";
import { writeFile, mkdir } from "node:fs/promises";

const startUrl = process.argv[2] || "https://www.gutenberg.org/browse/scores/top";
if (!process.env.FIRECRAWL_API_KEY) { console.error("❌ 缺 API KEY"); process.exit(1); }

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// 注意 limit / maxDepth 别开太大，1 credit ≈ 1 页面
const result = await app.crawlUrl(startUrl, {
  limit: 5,
  maxDepth: 1,
  allowBackwardLinks: false,
  // includePath / excludePath 支持正则
  // includePath: ["^/ebooks/.*$"],
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true,
  },
}, 5, "raz-crawl-" + Date.now());

if (!result.success) { console.error("爬取失败：", result.error); process.exit(1); }

await mkdir("out/crawl", { recursive: true });
const rows = [["url", "title", "chars"]];
for (const page of result.data) {
  const slug = new URL(page.url).pathname.replace(/\W+/g, "_").slice(0, 50);
  await writeFile(`out/crawl/${slug || "index"}.md`, page.markdown || "", "utf8");
  rows.push([page.url, page.metadata?.title ?? "", String((page.markdown||"").length)]);
}
await writeFile("out/crawl/_index.csv", rows.map(r => r.map(v => `"${String(v).replace(/"/g,"'")}"`).join(",")).join("\n"), "utf8");
console.log(`✅ 共抓取 ${result.data.length} 页，目录：out/crawl/`);
