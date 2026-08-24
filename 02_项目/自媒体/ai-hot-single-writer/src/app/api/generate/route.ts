import { NextResponse } from "next/server";
import { hasOpenAIKey, generateStructuredText } from "@/lib/openai";
import {
  articleSchema,
  buildArticlePrompt,
  buildPromptOnlyDraft,
} from "@/lib/prompts";
import type { ArticleDraft, GenerateArticleInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as GenerateArticleInput;

    if (!input.news?.title || !input.news?.summary) {
      return NextResponse.json(
        { ok: false, message: "缺少要改写的新闻。" },
        { status: 400 },
      );
    }

    if (!hasOpenAIKey()) {
      return NextResponse.json({
        ok: true,
        usedModel: false,
        draft: buildPromptOnlyDraft(input),
        message:
          "当前没有配置 OPENAI_API_KEY，已生成占位稿。配置后可生成完整公众号正文。",
      });
    }

    const { system, user } = buildArticlePrompt(input);

    const draft = await generateStructuredText<ArticleDraft>({
      system,
      user,
      schema: articleSchema,
    });

    return NextResponse.json({
      ok: true,
      usedModel: true,
      draft,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "生成公众号单篇稿失败。",
      },
      { status: 500 },
    );
  }
}
