export type NewsCategory =
  | "ai-models"
  | "ai-products"
  | "industry"
  | "paper"
  | "tip"
  | "ai-education"
  | "other";

export type NewsItem = {
  id: string;
  title: string;
  titleEn?: string | null;
  summary: string;
  url: string;
  permalink: string;
  source: string;
  publishedAt?: string | null;
  category: NewsCategory;
  score?: number | null;
  selected?: boolean;
};

export type DraftTone = "direct" | "sharp" | "plain" | "deep";

export type GenerateArticleInput = {
  news: NewsItem;
  tone: DraftTone;
  targetLength: number;
  extraDirection?: string;
};

export type ArticleDraft = {
  titleOptions: string[];
  recommendedTitle: string;
  oneSentenceSummary: string;
  bodyMarkdown: string;
  coverPrompt: string;
  inlineImagePrompts: string[];
  factChecklist: string[];
  riskNotes: string[];
  sourceLinks: {
    label: string;
    url: string;
  }[];
};

export type ImageResult = {
  mode: "prompt" | "image";
  prompt: string;
  imageDataUrl?: string;
  model?: string;
};

export type SaveDraftInput = {
  draft: ArticleDraft;
  news: NewsItem;
  image?: ImageResult | null;
};
