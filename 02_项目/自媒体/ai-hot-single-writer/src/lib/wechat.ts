import type { ArticleDraft, NewsItem } from "./types";

export function isWechatDraftEnabled() {
  return process.env.WECHAT_DRAFT_ENABLED === "true";
}

export function getWechatMissingConfig() {
  const missing: string[] = [];

  if (!process.env.WECHAT_APP_ID) {
    missing.push("WECHAT_APP_ID");
  }

  if (!process.env.WECHAT_APP_SECRET) {
    missing.push("WECHAT_APP_SECRET");
  }

  return missing;
}

export async function createWechatDraft(_draft: ArticleDraft, _news: NewsItem) {
  if (!isWechatDraftEnabled()) {
    return {
      ok: false,
      status: "disabled",
      message:
        "公众号草稿箱接口当前未启用。确认公众号认证、AppID/AppSecret、IP 白名单、素材上传权限后，再把 WECHAT_DRAFT_ENABLED 设为 true。",
    };
  }

  const missing = getWechatMissingConfig();

  if (missing.length > 0) {
    return {
      ok: false,
      status: "missing_config",
      message: `缺少公众号配置：${missing.join(", ")}`,
    };
  }

  return {
    ok: false,
    status: "not_implemented",
    message:
      "发布链路已预留。下一步需要接入微信 access_token、图片素材上传、封面 media_id、draft/add 草稿接口。",
  };
}
