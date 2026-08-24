import type { DraftTone, GenerateArticleInput } from "./types";

export const articleSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "titleOptions",
    "recommendedTitle",
    "oneSentenceSummary",
    "bodyMarkdown",
    "coverPrompt",
    "inlineImagePrompts",
    "factChecklist",
    "riskNotes",
    "sourceLinks",
  ],
  properties: {
    titleOptions: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: { type: "string" },
    },
    recommendedTitle: { type: "string" },
    oneSentenceSummary: { type: "string" },
    bodyMarkdown: { type: "string" },
    coverPrompt: { type: "string" },
    inlineImagePrompts: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: { type: "string" },
    },
    factChecklist: {
      type: "array",
      minItems: 4,
      maxItems: 10,
      items: { type: "string" },
    },
    riskNotes: {
      type: "array",
      minItems: 2,
      maxItems: 8,
      items: { type: "string" },
    },
    sourceLinks: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["label", "url"],
        properties: {
          label: { type: "string" },
          url: { type: "string" },
        },
      },
    },
  },
};

const toneMap: Record<DraftTone, string> = {
  direct: "直接、清楚、像一个长期关注 AI 的自媒体作者，不端着。",
  sharp: "判断更锋利，敢下结论，但不要夸大事实。",
  plain: "更适合普通读者，少术语，多解释。",
  deep: "偏深度解读，加入背景、行业影响和后续观察。",
};

export function buildArticlePrompt(input: GenerateArticleInput) {
  const { news, tone, targetLength, extraDirection } = input;

  const system = [
    "你是一个中文公众号编辑，任务是把单条 AI 热点新闻改写成一篇单篇公众号文章。",
    "你必须基于事实写作，不能编造发布时间、融资金额、模型参数、产品功能、价格、用户数据。",
    "你的文章不是新闻通稿，也不是简单同义词改写，而是基于新闻事实的二次创作和解读。",
    "保留来源链接，提醒作者对关键事实回原文核查。",
    "不要生成热点合集，不要把其他新闻混进正文。",
    "不要使用过度营销词，比如：赋能、重塑、颠覆式、未来已来、重磅炸弹、遥遥领先。",
    "正文用 Markdown 输出，适合后续转换成微信公众号排版。",
  ].join("\n");

  const user = [
    `写作风格：${toneMap[tone]}`,
    `目标长度：约 ${targetLength} 字。`,
    extraDirection ? `额外要求：${extraDirection}` : "",
    "",
    "新闻信息：",
    `标题：${news.title}`,
    news.titleEn ? `英文标题：${news.titleEn}` : "",
    `来源：${news.source}`,
    news.publishedAt ? `发布时间：${news.publishedAt}` : "",
    `原文链接：${news.url}`,
    `AI HOT 链接：${news.permalink}`,
    `摘要：${news.summary}`,
    "",
    "请按以下要求生成：",
    "1. 给 5-8 个公众号标题，标题要具体、有判断，但不要标题党。",
    "2. 推荐一个标题。",
    "3. 写一篇单篇公众号文章，只围绕这一条新闻。",
    "4. 文章结构建议：开头一句话说明发生了什么；解释这件事为什么值得看；拆解对普通 AI 用户、创作者或行业的影响；最后给出后续观察点。",
    "5. 文章要有作者自己的判断，不要只复述摘要。",
    "6. 给一条封面图生成提示词，要求中文公众号封面风格，但提示词不要要求图片模型直接生成中文大字。",
    "7. 给 2-4 条正文配图提示词。",
    "8. 给事实核查清单和风险提示。",
  ]
    .filter(Boolean)
    .join("\n");

  return { system, user };
}

export function buildPromptOnlyDraft(input: GenerateArticleInput) {
  const { news, tone, targetLength, extraDirection } = input;

  const title = `这条 AI 新闻，真正值得看的不是热闹`;
  const sourceLinks = [
    { label: news.source, url: news.url },
    { label: "AI HOT 原条目", url: news.permalink },
  ];

  return {
    titleOptions: [
      title,
      `${news.title}：它可能意味着什么？`,
      `别只看发布，${news.title}背后还有一层变化`,
      `今天这条 AI 消息，普通人要不要关心？`,
      `从${news.title.slice(0, 18)}看 AI 产品的新方向`,
    ],
    recommendedTitle: title,
    oneSentenceSummary:
      "这是一篇本地占位稿：配置 OPENAI_API_KEY 后，可生成完整公众号正文。",
    bodyMarkdown: [
      `# ${title}`,
      "",
      `今天看到一条 AI 热点：**${news.title}**。`,
      "",
      `根据 AI HOT 摘要，这条消息来自「${news.source}」，核心信息是：${news.summary}`,
      "",
      "## 我会怎么写这篇",
      "",
      "第一段先讲清楚发生了什么，不急着下大判断。",
      "",
      "第二段解释它为什么值得关注：是模型能力变化、产品入口变化、成本变化，还是行业竞争变化。",
      "",
      "第三段翻译成普通读者听得懂的话：这件事会不会影响我们使用 AI、做内容、做产品或学习新工具。",
      "",
      "最后给一个克制的判断：哪些信息已经确定，哪些还需要回到原文继续核查。",
      "",
      "## 下一步",
      "",
      "在项目根目录复制 `.env.example` 为 `.env.local`，填入 `OPENAI_API_KEY` 后，点击页面里的“生成单篇稿”，系统会自动生成完整文章。",
    ].join("\n"),
    coverPrompt: [
      "公众号科技封面，主题是单条 AI 新闻解读，画面包含抽象 AI 芯片、信息流、新闻编辑台、明亮但克制的科技质感。",
      "不要在图片里生成中文文字，预留上方标题区域，16:9 横版，高级、清晰、适合公众号封面。",
    ].join(" "),
    inlineImagePrompts: [
      "一张 AI 新闻事实卡片风格插图，展示来源、时间、核心变化三个信息块，不包含可读文字。",
      "一张产品经理视角的 AI 趋势分析插图，包含模型、用户、产品入口三个抽象节点。",
    ],
    factChecklist: [
      "回原文确认新闻标题是否准确。",
      "回原文确认发布时间。",
      "确认摘要里的模型名、公司名、产品名是否存在误写。",
      "确认涉及数据、价格、参数的表述是否来自原文。",
    ],
    riskNotes: [
      "当前为未调用模型的占位稿，不应直接发布。",
      "不要只基于 AI HOT 摘要发布，重要事实需要回原文核查。",
    ],
    sourceLinks,
  };
}
