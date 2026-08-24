import type { NewsCategory, NewsItem } from "./types";

const AIHOT_SELECTED_URL =
  "https://aihot.virxact.com/api/public/items?mode=selected";
const AIHOT_DAILY_URL = "https://aihot.virxact.com/api/public/daily";

type AihotItem = {
  id?: string;
  title?: string;
  title_en?: string | null;
  summary?: string;
  url?: string;
  sourceUrl?: string;
  permalink?: string;
  source?: string;
  sourceName?: string;
  publishedAt?: string | null;
  category?: string;
  score?: number | null;
  selected?: boolean;
};

type AihotSelectedResponse = {
  items?: AihotItem[];
};

type AihotDailyResponse = {
  sections?: Array<{
    label?: string;
    items?: AihotItem[];
  }>;
};

const categoryMap: Record<string, NewsCategory> = {
  "ai-models": "ai-models",
  "ai-products": "ai-products",
  industry: "industry",
  paper: "paper",
  tip: "tip",
};

const educationKeywords = [
  "教育",
  "学生",
  "老师",
  "教师",
  "学校",
  "K12",
  "题库",
  "批改",
  "作业",
  "考试",
  "考研",
  "公式OCR",
  "NotebookLM",
  "StudyFetch",
  "Quizlet",
  "Khan",
  "TeXada",
];

function normalizeCategory(raw?: string, text = ""): NewsCategory {
  if (educationKeywords.some((keyword) => text.includes(keyword))) {
    return "ai-education";
  }

  if (!raw) {
    return "other";
  }

  return categoryMap[raw] ?? "other";
}

function normalizeItem(item: AihotItem, index: number): NewsItem | null {
  const title = item.title?.trim();
  const summary = item.summary?.trim();
  const url = item.url ?? item.sourceUrl;

  if (!title || !summary || !url) {
    return null;
  }

  const source = item.source ?? item.sourceName ?? "AI HOT";
  const id = item.id ?? item.permalink ?? `${url}-${index}`;
  const textForCategory = `${title}\n${summary}\n${source}`;

  return {
    id,
    title,
    titleEn: item.title_en ?? null,
    summary,
    url,
    permalink: item.permalink ?? url,
    source,
    publishedAt: item.publishedAt ?? null,
    category: normalizeCategory(item.category, textForCategory),
    score: item.score ?? null,
    selected: item.selected ?? true,
  };
}

function dedupeNews(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const deduped: NewsItem[] = [];

  for (const item of items) {
    const key = item.url || item.title;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(item);
  }

  return deduped;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "ai-hot-single-writer/0.1",
    },
    next: {
      revalidate: 60 * 10,
    },
  });

  if (!response.ok) {
    throw new Error(`AI HOT 请求失败：${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchAihotNews(): Promise<NewsItem[]> {
  const [selected, daily] = await Promise.allSettled([
    fetchJson<AihotSelectedResponse>(AIHOT_SELECTED_URL),
    fetchJson<AihotDailyResponse>(AIHOT_DAILY_URL),
  ]);

  const items: AihotItem[] = [];

  if (selected.status === "fulfilled") {
    items.push(...(selected.value.items ?? []));
  }

  if (daily.status === "fulfilled") {
    for (const section of daily.value.sections ?? []) {
      items.push(...(section.items ?? []));
    }
  }

  const normalized = items
    .map((item, index) => normalizeItem(item, index))
    .filter((item): item is NewsItem => Boolean(item));

  const sorted = dedupeNews(normalized).sort((a, b) => {
    const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return (
      new Date(b.publishedAt ?? 0).getTime() -
      new Date(a.publishedAt ?? 0).getTime()
    );
  });

  return sorted.slice(0, 100);
}
