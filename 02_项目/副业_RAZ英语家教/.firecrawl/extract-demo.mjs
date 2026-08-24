// extract-demo.mjs
// 用途：用 JSON Schema（Zod）让 LLM 帮你从页面里抽出结构化字段。
// 运行：npm run extract -- <url>      或   node extract-demo.mjs <url>
import "dotenv/config";
import Firecrawl from "@mendable/firecrawl-js";
import { z } from "zod";

const url = process.argv[2] || "https://en.wikipedia.org/wiki/Reading_A-Z";
if (!process.env.FIRECRAWL_API_KEY) { console.error("❌ 缺 API KEY"); process.exit(1); }

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

const schema = z.object({
  product_name: z.string(),
  target_age: z.string(),
  features: z.array(z.string()),
  pricing: z.array(z.object({ plan: z.string(), price: z.string() })).optional(),
});

const result = await app.extract([url], {
  prompt: "从页面中抽取 RAZ 产品的核心信息",
  schema,
  // enableWebSearch: true,   // 允许它去谷歌补全信息（额外计费）
});

if (!result.success) { console.error("抽取失败：", result.error); process.exit(1); }
console.log(JSON.stringify(result.data, null, 2));
