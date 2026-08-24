import { NextResponse } from "next/server";
import { createWechatDraft } from "@/lib/wechat";
import type { SaveDraftInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as SaveDraftInput;

    if (!input.draft?.recommendedTitle || !input.news?.title) {
      return NextResponse.json(
        { ok: false, message: "缺少要推送的草稿。" },
        { status: 400 },
      );
    }

    const result = await createWechatDraft(input.draft, input.news);

    return NextResponse.json(result, { status: result.ok ? 200 : 501 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "推送公众号草稿箱失败。",
      },
      { status: 500 },
    );
  }
}
