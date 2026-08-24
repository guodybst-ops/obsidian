"use client";

import {
  BookOpenText,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Loader2,
  Newspaper,
  RefreshCw,
  Save,
  Send,
  Sparkles,
} from "lucide-react";
import NextImage from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  ArticleDraft,
  DraftTone,
  ImageResult,
  NewsCategory,
  NewsItem,
} from "@/lib/types";

type Toast = {
  type: "info" | "error";
  text: string;
};

const categoryLabels: Record<NewsCategory, string> = {
  "ai-models": "模型",
  "ai-products": "产品",
  industry: "行业",
  paper: "论文",
  tip: "观点",
  "ai-education": "AI教育",
  other: "其他",
};

const toneLabels: Array<{ value: DraftTone; label: string }> = [
  { value: "direct", label: "直接清楚" },
  { value: "sharp", label: "判断锋利" },
  { value: "plain", label: "普通人能懂" },
  { value: "deep", label: "深度解读" },
];

function formatDate(value?: string | null) {
  if (!value) {
    return "时间未知";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = (await response.json()) as T & {
    ok?: boolean;
    message?: string;
  };

  if (!response.ok || json.ok === false) {
    throw new Error(json.message ?? "请求失败。");
  }

  return json;
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NewsCategory | "all">("all");
  const [tone, setTone] = useState<DraftTone>("direct");
  const [targetLength, setTargetLength] = useState(1600);
  const [extraDirection, setExtraDirection] = useState("");
  const [draft, setDraft] = useState<ArticleDraft | null>(null);
  const [imageResult, setImageResult] = useState<ImageResult | null>(null);
  const [loadingNews, setLoadingNews] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pushingWechat, setPushingWechat] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const selectedNews = useMemo(
    () => news.find((item) => item.id === selectedId) ?? null,
    [news, selectedId],
  );

  const filteredNews = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return news.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const matchQuery =
        !lowerQuery ||
        `${item.title} ${item.summary} ${item.source}`
          .toLowerCase()
          .includes(lowerQuery);

      return matchCategory && matchQuery;
    });
  }, [news, category, query]);

  const showToast = useCallback((text: string, type: Toast["type"] = "info") => {
    setToast({ text, type });
    window.setTimeout(() => setToast(null), 4800);
  }, []);

  const loadNews = useCallback(async () => {
    setLoadingNews(true);

    try {
      const response = await fetch("/api/news");
      const json = (await response.json()) as {
        ok: boolean;
        items?: NewsItem[];
        message?: string;
      };

      if (!response.ok || !json.ok) {
        throw new Error(json.message ?? "拉取新闻失败。");
      }

      setNews(json.items ?? []);
      setSelectedId((current) => current || json.items?.[0]?.id || "");
      showToast(`已拉取 ${json.items?.length ?? 0} 条 AI 热点。`);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "拉取新闻失败。",
        "error",
      );
    } finally {
      setLoadingNews(false);
    }
  }, [showToast]);

  async function generateDraft() {
    if (!selectedNews) {
      showToast("请先选择一条新闻。", "error");
      return;
    }

    setGenerating(true);
    setImageResult(null);

    try {
      const json = await postJson<{
        ok: boolean;
        draft: ArticleDraft;
        usedModel?: boolean;
        message?: string;
      }>("/api/generate", {
        news: selectedNews,
        tone,
        targetLength,
        extraDirection,
      });

      setDraft(json.draft);
      showToast(json.message ?? "单篇公众号稿已生成。");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "生成单篇稿失败。",
        "error",
      );
    } finally {
      setGenerating(false);
    }
  }

  async function generateImage() {
    if (!draft?.coverPrompt) {
      showToast("请先生成单篇稿。", "error");
      return;
    }

    setGeneratingImage(true);

    try {
      const json = await postJson<{
        ok: boolean;
        result: ImageResult;
        message?: string;
      }>("/api/image", {
        prompt: draft.coverPrompt,
      });

      setImageResult(json.result);
      showToast(json.message ?? "封面图已生成。");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "生成封面图失败。",
        "error",
      );
    } finally {
      setGeneratingImage(false);
    }
  }

  async function saveDraft() {
    if (!draft || !selectedNews) {
      showToast("请先生成单篇稿。", "error");
      return;
    }

    setSaving(true);

    try {
      const json = await postJson<{
        ok: boolean;
        filePath: string;
      }>("/api/save", {
        draft,
        news: selectedNews,
        image: imageResult,
      });

      showToast(`已保存到：${json.filePath}`);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "保存草稿失败。",
        "error",
      );
    } finally {
      setSaving(false);
    }
  }

  async function pushWechatDraft() {
    if (!draft || !selectedNews) {
      showToast("请先生成单篇稿。", "error");
      return;
    }

    setPushingWechat(true);

    try {
      const json = await postJson<{
        ok: boolean;
        message: string;
      }>("/api/wechat/draft", {
        draft,
        news: selectedNews,
        image: imageResult,
      });

      showToast(json.message);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "公众号草稿箱接口暂不可用。",
        "error",
      );
    } finally {
      setPushingWechat(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadNews();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadNews]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">AI HOT 单篇公众号工作流</span>
          <h1>把一条 AI 热点写成一篇公众号稿</h1>
          <p className="subtitle">
            左侧选一条新闻，右侧生成单篇文章、封面提示词和事实核查清单。AI 教育资讯会被标记出来，但不会默认进入合集或专题写作。
          </p>
        </div>
        <div className="status-pill" title="自动发布默认关闭">
          <BookOpenText size={18} />
          单篇内容模式
        </div>
      </header>

      <section className="workspace">
        <aside className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <Newspaper size={20} />
              今日资讯
            </h2>
            <button
              className="icon-button"
              onClick={loadNews}
              disabled={loadingNews}
              title="重新拉取 AI HOT"
            >
              {loadingNews ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <RefreshCw size={18} />
              )}
            </button>
          </div>

          <div className="toolbar">
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索公司、模型、产品"
            />
            <select
              className="select"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as NewsCategory | "all")
              }
              aria-label="按分类筛选"
            >
              <option value="all">全部</option>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="news-list">
            {filteredNews.map((item) => (
              <button
                key={item.id}
                className={`news-card ${selectedId === item.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedId(item.id);
                  setDraft(null);
                  setImageResult(null);
                }}
              >
                <div className="news-meta">
                  <span
                    className={`tag ${
                      item.category === "ai-education" ? "gold" : ""
                    }`}
                  >
                    {categoryLabels[item.category]}
                  </span>
                  {typeof item.score === "number" ? (
                    <span className="tag blue">热度 {item.score}</span>
                  ) : null}
                  <span>{formatDate(item.publishedAt)}</span>
                </div>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-summary">{item.summary}</p>
                <div className="news-meta">
                  <span>{item.source}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <FileText size={20} />
              单篇成稿
            </h2>
            <div className="controls">
              <button
                className="primary-button"
                onClick={generateDraft}
                disabled={!selectedNews || generating}
              >
                {generating ? (
                  <Loader2 size={18} className="spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                生成单篇稿
              </button>
              <button
                className="secondary-button"
                onClick={generateImage}
                disabled={!draft || generatingImage}
              >
                {generatingImage ? (
                  <Loader2 size={18} className="spin" />
                ) : (
                  <ImageIcon size={18} />
                )}
                生成封面
              </button>
              <button
                className="secondary-button"
                onClick={saveDraft}
                disabled={!draft || saving}
              >
                {saving ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                保存
              </button>
              <button
                className="ghost-button"
                onClick={pushWechatDraft}
                disabled={!draft || pushingWechat}
                title="默认未启用，需要公众号接口权限"
              >
                {pushingWechat ? (
                  <Loader2 size={18} className="spin" />
                ) : (
                  <Send size={18} />
                )}
                草稿箱
              </button>
            </div>
          </div>

          <div className="editor-grid">
            <div className="settings">
              <div className="field">
                <label htmlFor="tone">写作口吻</label>
                <select
                  id="tone"
                  className="select"
                  value={tone}
                  onChange={(event) => setTone(event.target.value as DraftTone)}
                >
                  {toneLabels.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="length">目标字数：{targetLength}</label>
                <input
                  id="length"
                  type="range"
                  min="800"
                  max="3200"
                  step="200"
                  value={targetLength}
                  onChange={(event) => setTargetLength(Number(event.target.value))}
                />
                <small>单篇快评建议 1200-1800 字，深度一点可以 2200 字以上。</small>
              </div>

              <div className="field">
                <label htmlFor="direction">额外要求</label>
                <textarea
                  id="direction"
                  className="textarea"
                  value={extraDirection}
                  onChange={(event) => setExtraDirection(event.target.value)}
                  placeholder="比如：多写普通人是否需要关注；少写技术细节；结尾给行动建议。"
                />
              </div>

              {selectedNews ? (
                <a
                  className="secondary-button"
                  href={selectedNews.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={18} />
                  打开原文
                </a>
              ) : null}
            </div>

            <div className="draft-area">
              {selectedNews ? (
                <div className="selected-news">
                  <div className="draft-meta">
                    <span className="tag">{categoryLabels[selectedNews.category]}</span>
                    <span>{selectedNews.source}</span>
                    <span>{formatDate(selectedNews.publishedAt)}</span>
                  </div>
                  <h2>{selectedNews.title}</h2>
                  <p>{selectedNews.summary}</p>
                </div>
              ) : null}

              <div className="draft-content">
                {!selectedNews ? (
                  <div className="empty-state">
                    <div className="empty-state-inner">
                      <Newspaper size={42} />
                      <h2>先选择一条 AI 热点</h2>
                      <p>左侧拉取 AI HOT 资讯后，选择一条新闻进入单篇改写。</p>
                    </div>
                  </div>
                ) : null}

                {selectedNews && !draft ? (
                  <div className="empty-state">
                    <div className="empty-state-inner">
                      <Sparkles size={42} />
                      <h2>准备生成单篇公众号稿</h2>
                      <p>
                        当前只会围绕这一条新闻写，不会生成热点合集。建议先打开原文核对关键信息，再生成草稿。
                      </p>
                    </div>
                  </div>
                ) : null}

                {draft ? (
                  <>
                    <div className="draft-block">
                      <h3>推荐标题</h3>
                      <div className="prompt-box">{draft.recommendedTitle}</div>
                    </div>

                    <div className="draft-block">
                      <h3>标题备选</h3>
                      <ol className="title-options">
                        {draft.titleOptions.map((title) => (
                          <li key={title}>{title}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="draft-block">
                      <h3>一句话摘要</h3>
                      <div className="prompt-box">{draft.oneSentenceSummary}</div>
                    </div>

                    <div className="draft-block">
                      <h3>正文</h3>
                      <article className="markdown-preview">{draft.bodyMarkdown}</article>
                    </div>

                    <div className="draft-block">
                      <h3>封面图</h3>
                      {imageResult?.imageDataUrl ? (
                        <NextImage
                          className="generated-image"
                          src={imageResult.imageDataUrl}
                          alt="生成的公众号封面图"
                          width={620}
                          height={413}
                          unoptimized
                        />
                      ) : null}
                      <div className="prompt-box">
                        {imageResult?.prompt ?? draft.coverPrompt}
                      </div>
                      <button
                        className="secondary-button"
                        onClick={() =>
                          navigator.clipboard
                            .writeText(imageResult?.prompt ?? draft.coverPrompt)
                            .then(() => showToast("封面提示词已复制。"))
                        }
                      >
                        <Download size={18} />
                        复制提示词
                      </button>
                    </div>

                    <div className="draft-block">
                      <h3>正文配图提示词</h3>
                      {draft.inlineImagePrompts.map((prompt, index) => (
                        <div className="prompt-box" key={prompt}>
                          配图 {index + 1}：{prompt}
                        </div>
                      ))}
                    </div>

                    <div className="draft-block">
                      <h3>事实核查清单</h3>
                      <ul>
                        {draft.factChecklist.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="draft-block">
                      <h3>风险提示</h3>
                      <ul>
                        {draft.riskNotes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </section>

      {toast ? <div className={`toast ${toast.type}`}>{toast.text}</div> : null}
    </main>
  );
}
