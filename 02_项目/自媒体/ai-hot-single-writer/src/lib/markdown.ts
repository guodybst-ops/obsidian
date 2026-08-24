import path from "node:path";
import type { ArticleDraft, ImageResult, NewsItem } from "./types";

export function slugifyFileName(input: string) {
  return input
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export function getVaultRoot() {
  return (
    process.env.OBSIDIAN_VAULT_ROOT ||
    path.resolve(process.cwd(), "..", "..", "..")
  );
}

export function getOutputDir() {
  return path.join(getVaultRoot(), "04_Outputs", "公众号草稿", "AI热点单篇");
}

export function buildDraftMarkdown({
  draft,
  news,
  image,
}: {
  draft: ArticleDraft;
  news: NewsItem;
  image?: ImageResult | null;
}) {
  const date = new Date().toISOString().slice(0, 10);

  return [
    "---",
    `title: ${JSON.stringify(draft.recommendedTitle)}`,
    `created: ${date}`,
    "type: 公众号草稿",
    "channel: AI热点单篇",
    `source: ${JSON.stringify(news.source)}`,
    `source_url: ${JSON.stringify(news.url)}`,
    `aihot_url: ${JSON.stringify(news.permalink)}`,
    `status: draft`,
    "---",
    "",
    `# ${draft.recommendedTitle}`,
    "",
    "## 标题备选",
    "",
    ...draft.titleOptions.map((title, index) => `${index + 1}. ${title}`),
    "",
    "## 一句话摘要",
    "",
    draft.oneSentenceSummary,
    "",
    "## 正文",
    "",
    draft.bodyMarkdown,
    "",
    "## 封面图",
    "",
    image?.imageDataUrl
      ? "封面图已在网页中生成。建议下载后再叠加公众号标题文字。"
      : "当前保存的是封面生成提示词。",
    "",
    "```text",
    image?.prompt ?? draft.coverPrompt,
    "```",
    "",
    "## 正文配图提示词",
    "",
    ...draft.inlineImagePrompts.map((prompt, index) => [
      `### 配图 ${index + 1}`,
      "",
      "```text",
      prompt,
      "```",
      "",
    ]).flat(),
    "## 事实核查清单",
    "",
    ...draft.factChecklist.map((item) => `- [ ] ${item}`),
    "",
    "## 风险提示",
    "",
    ...draft.riskNotes.map((item) => `- ${item}`),
    "",
    "## 来源链接",
    "",
    ...draft.sourceLinks.map((link) => `- [${link.label}](${link.url})`),
    "",
    "## 原始新闻摘要",
    "",
    `标题：${news.title}`,
    "",
    `来源：${news.source}`,
    "",
    `链接：${news.url}`,
    "",
    news.summary,
    "",
  ].join("\n");
}
