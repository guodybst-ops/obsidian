import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  buildDraftMarkdown,
  getOutputDir,
  slugifyFileName,
} from "@/lib/markdown";
import type { SaveDraftInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as SaveDraftInput;

    if (!input.draft?.recommendedTitle || !input.news?.title) {
      return NextResponse.json(
        { ok: false, message: "缺少草稿或新闻内容。" },
        { status: 400 },
      );
    }

    const outputDir = getOutputDir();
    await fs.mkdir(outputDir, { recursive: true });

    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${date} ${slugifyFileName(
      input.draft.recommendedTitle,
    )}.md`;
    const filePath = path.join(outputDir, fileName);
    const markdown = buildDraftMarkdown(input);

    await fs.writeFile(filePath, markdown, "utf8");

    return NextResponse.json({
      ok: true,
      filePath,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "保存草稿失败。",
      },
      { status: 500 },
    );
  }
}
