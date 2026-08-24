type OpenAIJsonResponse<T> = {
  output_parsed?: T;
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
      parsed?: T;
    }>;
  }>;
};

type ChatCompletionsResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export function hasOpenAIKey() {
  return Boolean(process.env.OPENAI_API_KEY);
}

function getBaseUrl() {
  return (process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(
    /\/$/,
    "",
  );
}

function extractText(response: OpenAIJsonResponse<unknown>) {
  if (response.output_text) {
    return response.output_text;
  }

  for (const output of response.output ?? []) {
    for (const content of output.content ?? []) {
      if (typeof content.text === "string") {
        return content.text;
      }
    }
  }

  return "";
}

async function readJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      text
        ? `接口没有返回 JSON：${text.slice(0, 200)}`
        : "接口没有返回内容。",
    );
  }
}

function extractJsonText(text: string) {
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return withoutFence;
  }

  return withoutFence.slice(start, end + 1);
}

async function generateWithResponses<T>({
  system,
  user,
  schema,
  apiKey,
}: {
  system: string;
  user: string;
  schema: Record<string, unknown>;
  apiKey: string;
}) {
  const body: Record<string, unknown> = {
    model: process.env.OPENAI_TEXT_MODEL ?? "gpt-5.5",
    input: [
      {
        role: "system",
        content: system,
      },
      {
        role: "user",
        content: user,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "wechat_single_article_draft",
        schema,
        strict: true,
      },
    },
  };

  if (process.env.OPENAI_REASONING_EFFORT) {
    body.reasoning = {
      effort: process.env.OPENAI_REASONING_EFFORT,
    };
  }

  const response = await fetch(`${getBaseUrl()}/responses`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await readJsonResponse<
    OpenAIJsonResponse<T> & {
      error?: { message?: string };
    }
  >(response);

  if (!response.ok) {
    throw new Error(json.error?.message ?? "Responses API 文本生成失败。");
  }

  if (json.output_parsed) {
    return json.output_parsed;
  }

  for (const output of json.output ?? []) {
    for (const content of output.content ?? []) {
      if (content.parsed) {
        return content.parsed;
      }
    }
  }

  return JSON.parse(extractJsonText(extractText(json))) as T;
}

async function generateWithChatCompletions<T>({
  system,
  user,
  schema,
  apiKey,
  structured,
}: {
  system: string;
  user: string;
  schema: Record<string, unknown>;
  apiKey: string;
  structured: boolean;
}) {
  const userWithSchema = [
    user,
    "",
    "只返回一个 JSON 对象，不要返回 Markdown 代码块，不要写解释。",
    "JSON 对象必须符合这个 Schema：",
    JSON.stringify(schema),
  ].join("\n");

  const body: Record<string, unknown> = {
    model: process.env.OPENAI_TEXT_MODEL ?? "gpt-5.5",
    messages: [
      {
        role: "system",
        content: system,
      },
      {
        role: "user",
        content: userWithSchema,
      },
    ],
  };

  if (structured) {
    body.response_format = {
      type: "json_schema",
      json_schema: {
        name: "wechat_single_article_draft",
        schema,
        strict: true,
      },
    };
  }

  if (process.env.OPENAI_MAX_TOKENS) {
    body.max_tokens = Number(process.env.OPENAI_MAX_TOKENS);
  }

  const response = await fetch(`${getBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await readJsonResponse<ChatCompletionsResponse>(response);

  if (!response.ok) {
    throw new Error(json.error?.message ?? "Chat Completions 文本生成失败。");
  }

  const content = json.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Chat Completions 没有返回正文。");
  }

  return JSON.parse(extractJsonText(content)) as T;
}

export async function generateStructuredText<T>({
  system,
  user,
  schema,
}: {
  system: string;
  user: string;
  schema: Record<string, unknown>;
}): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("缺少 OPENAI_API_KEY，请先在 .env.local 里配置。");
  }

  const mode = process.env.OPENAI_TEXT_API ?? "auto";
  const errors: string[] = [];

  if (mode === "responses" || mode === "auto") {
    try {
      return await generateWithResponses<T>({
        system,
        user,
        schema,
        apiKey,
      });
    } catch (error) {
      if (mode === "responses") {
        throw error;
      }

      errors.push(
        error instanceof Error ? error.message : "Responses API 调用失败。",
      );
    }
  }

  for (const structured of [true, false]) {
    try {
      return await generateWithChatCompletions<T>({
        system,
        user,
        schema,
        apiKey,
        structured,
      });
    } catch (error) {
      errors.push(
        error instanceof Error
          ? error.message
          : "Chat Completions 调用失败。",
      );
    }
  }

  throw new Error(`模型调用失败：${errors.join("；")}`);
}

export async function generateImageDataUrl(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("缺少 OPENAI_API_KEY，请先在 .env.local 里配置。");
  }

  const response = await fetch(`${getBaseUrl()}/images/generations`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2",
      prompt,
      size: process.env.OPENAI_IMAGE_SIZE ?? "1536x1024",
      quality: process.env.OPENAI_IMAGE_QUALITY ?? "low",
    }),
  });

  const json = (await response.json()) as {
    data?: Array<{ b64_json?: string }>;
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(json.error?.message ?? "OpenAI 图片生成失败。");
  }

  const b64 = json.data?.[0]?.b64_json;

  if (!b64) {
    throw new Error("图片接口没有返回图片数据。");
  }

  return `data:image/png;base64,${b64}`;
}
