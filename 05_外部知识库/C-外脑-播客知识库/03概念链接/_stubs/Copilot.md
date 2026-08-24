---
tags: [概念, stub, AI, 开发者工具]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [AI Copilot, 代码补全助手, AI辅助编程]
source_count: 1
sources:
  - show: "42章经"
    episode: "030"
    speaker: "张海龙"
---

# Copilot

## 一句话

寄生在开发工具中、在程序员编写代码时实时提供补全、编辑和问答辅助的同步AI工具，已跑通product-market fit和product-model fit。

## 定义

Copilot是一种同步的AI辅助工具，核心功能是在程序员写代码时实时补全后续代码。它必须人在场才能工作，本质是"电钻"——帮人更快完成手头工作，而不是替代人完成整个任务。

## 为什么Copilot已跑通

两个PMF都已成立：

1. **Product-market fit**：开发者愿意为实时代码补全付费。Copilot寄生在IDE中，在用户打字时"润物细无声"地出现
2. **Product-model fit**：GPT-3.5级别以上模型的补全质量已足够好，使这个场景成立

GitHub Copilot的贡献是找到了合适的场景（IDE中实时补全）和合适的收费方式（订阅），证明了这两个PMF同时成立。

## Cursor的关键创新

Cursor在Copilot基础上进一步突破：
- 不是只往后补全，而是做全局补全
- 改一个变量/函数时，相关位置同时出现修改建议
- 用户连续tap/tab确认即可
- 极低延迟：猜测+diff显示在0.5秒以内

Cursor的非共识：用微软的IDE+微软投资的模型，去挑战微软的Copilot。靠产品体验突破。

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 030 张海龙 | "Copilot是什么概念？它还是工具范畴。需要一个人用这个Copilot去生产更多、更好的代码。本质上，Copilot是减少你打字，也就是代码补全及其衍生品。" | [归纳] |

## 辨析

- vs [[AI Coding Agent]]：Copilot是同步辅助工具（像电钻），Agent是异步独立劳动力（像小弟）。两者会长期并存
- vs 通用AI助手：Copilot深度集成在IDE中，上下文包括代码库结构和当前编辑状态，与通用聊天助手不同

## 概念关系

- [[02方法流程/_stubs/Copilot与Agent的区分及应用框架]]：Copilot与Agent的区分方法
- [[AI Coding Agent]]：概念上的对比对象

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
