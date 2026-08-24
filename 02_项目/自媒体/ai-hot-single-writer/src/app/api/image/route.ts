import { NextResponse } from "next/server";
import { generateImageDataUrl, hasOpenAIKey } from "@/lib/openai";
import type { ImageResult } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string };
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json(
        { ok: false, message: "缺少封面图提示词。" },
        { status: 400 },
      );
    }

    const imageMode = process.env.AI_IMAGE_MODE ?? "prompt";

    if (imageMode !== "image") {
      const result: ImageResult = {
        mode: "prompt",
        prompt,
      };

      return NextResponse.json({
        ok: true,
        result,
        message:
          "当前是提示词模式。把 AI_IMAGE_MODE 设为 image 后，会直接调用图片模型生成封面。",
      });
    }

    if (!hasOpenAIKey()) {
      return NextResponse.json(
        { ok: false, message: "缺少 OPENAI_API_KEY，无法生成图片。" },
        { status: 400 },
      );
    }

    const imageDataUrl = await generateImageDataUrl(prompt);
    const result: ImageResult = {
      mode: "image",
      prompt,
      imageDataUrl,
      model: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2",
    };

    return NextResponse.json({
      ok: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "生成封面图失败。",
      },
      { status: 500 },
    );
  }
}
