# RAZ × Firecrawl 工具集

## 这个目录是干嘛的
在 Obsidian Vault 的 `.firecrawl/` 里跑 Firecrawl 脚本，把网上的英文绘本 / 教学资料抓下来变成 Markdown 或结构化 JSON，方便你丢回 Obsidian 做课件或喂给 AI。

## 一次性安装（已完成）
```bash
cd ".firecrawl"
npm install        # 已安装 @mendable/firecrawl-js + dotenv
```

## 配置 API Key
1. 去 https://www.firecrawl.dev 注册（免费层 500 credits）
2. 控制台复制 `fc-...` 开头的 key
3. 复制 `.env.example` 为 `.env`，把 key 填进去
4. Windows PowerShell 临时设：`$env:FIRECRAWL_API_KEY="fc-xxxx"`

## 跑示例
```bash
npm run scrape   -- "https://en.wikipedia.org/wiki/Phonics"
npm run crawl    -- "https://www.gutenberg.org/browse/scores/top"
npm run extract  -- "https://en.wikipedia.org/wiki/Reading_A-Z"
npm run map      -- "https://www.gutenberg.org"
```
输出落在 `out/` 子目录里，可以直接复制进 `课文/` `教案/`。

## 在 RAZ 项目里能怎么用
| 场景 | 用哪个 API | 输入 | 产物 |
| --- | --- | --- | --- |
| 把一篇英文故事爬成 Markdown 稿 | `scrape` | 绘本/新闻 URL | `.md` |
| 批量抓 RAZ 同主题若干页 | `crawl` | 站点首页 | 多个 `.md` + 索引 CSV |
| 从故事页自动抽出 title/词汇/问题 | `extract` | URL + JSON Schema | 结构化 JSON |
| 不知道站内有什么，先列出全部 URL | `map` | 站点根 | URL 列表 |
| 搜公开资源给娃娃做素材 | `search` | 关键词 | 搜索结果 |

## 计费提醒
- 1 credit ≈ 1 个页面（scrape 1 次）
- 限制 `limit` 与 `maxDepth`，别上来就开 1000
- 免费层 500 credits 够体验
