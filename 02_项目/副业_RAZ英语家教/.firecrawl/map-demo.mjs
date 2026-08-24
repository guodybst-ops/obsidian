// map-demo.mjs
// 用途：列出网站上所有可达 URL（轻量、不抓内容），先做"侦察"再决定爬哪些。
// 运行：npm run map -- <url>   或   node map-demo.mjs <url>
import "dotenv/config";
import Firecrawl from "@mendable/firecrawl-js";

const url = process.argv[2] || "https://www.gutenberg.org";
if (!process.env.FIRECRAWL_API_KEY) { console.error("❌ 缺 API KEY"); process.exit(1); }

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const map = await app.mapUrl(url, { limit: 50, search: "ebook" });

if (!map.success) { console.error("map 失败：", map.error); process.exit(1); }
console.log("总数：", map.links?.length);
for (const l of (map.links ?? []).slice(0, 20)) {
  console.log(`- ${l.title ? "[" + l.title + "] " : ""}${l.url}`);
}
