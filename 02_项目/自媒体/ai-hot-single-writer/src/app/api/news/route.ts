import { NextResponse } from "next/server";
import { fetchAihotNews } from "@/lib/aihot";

export async function GET() {
  try {
    const items = await fetchAihotNews();

    return NextResponse.json({
      ok: true,
      items,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "拉取 AI HOT 新闻失败。",
      },
      { status: 500 },
    );
  }
}
