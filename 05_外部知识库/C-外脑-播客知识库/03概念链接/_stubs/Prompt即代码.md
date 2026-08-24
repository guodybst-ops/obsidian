---
tags: [概念, stub, AI, Prompt, 大模型]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [Prompt是大模型的代码, Prompt即编程, 大模型的编程语言, Prompt语言]
source_count: 1
sources:
  - show: "42章经"
    episode: "016"
    speaker: "Jay 党家成"
---

# Prompt即代码

## 一句话

Prompt 与代码的类比：大模型提供 reasoning 能力（类似 CPU 提供算术能力），而 Prompt 是调用这种能力的「编程语言」。不同的底层平台 + 不同的语言特性 → 创造完全不一样的生态。

## 为什么需要这个概念

AI 出现后，很多人把 Prompt 简单理解为「对大模型说的指令」。但这个理解低估了 Prompt 的价值。Jay 认为 Prompt 不只是指令——它是让大模型这个「CPU」运转起来的「代码」，决定了能构建什么应用、什么生态。没有这个概念，我们会把 Prompt 当成一次性消费品，而不会理解它的二创、框架、开源等生态属性。

## 定义

Jay 的核心框架：

| 平台 | 底层能力 | 编程语言 |
|---|---|---|
| 传统计算机 | 算术（0/1 加法）→ CPU | 代码（C、Python、Java……） |
| AI 平台 | Reasoning（预测下一个字）→ 大模型 | Prompt |

**关键推论**：
1. Prompt 不会随模型升级而消失——就像代码不会因为 CPU 升级而消失。模型升级提升的是上下文窗口（相当于内存变大），Prompt 反而越变越长。
2. Prompt 有创作者生态和二创生态——类似 GitHub 上对代码的逻辑：维护、学习、写 patch、互相修改。
3. 好的 Prompt 衡量标准不是「写法花哨」，而是「总信息量」。
4. Prompt 不应被当商品——内置增值付费合理，用付费墙卖 Prompt 不 make sense。

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 016 Jay 党家成 | "Prompt 是大模型的代码——CPU 提供加法能力 + 代码语言；大模型提供 reasoning 能力 + Prompt 语言。" | [归纳] |
| [[42章经]] 016 Jay 党家成 | "Prompt 也是有创作者生态和二创生态的——很多人维护自己的 prompt、互相学习、写 patch，跟 GitHub 上对代码的逻辑非常像。" | [归纳] |

## 辨析

- vs **自然语言指令**：简单指令是 Prompt 的一种，但 Prompt 不只是指令——它可以是框架、Workflow、多 Agent 编排、函数调用等复杂结构。代码不只是if-else，Prompt 也不只是「帮我做X」。
- vs **API**：API 是代码层面的接口，Prompt 是 reasoning 层面的接口。两者互补而非替代——AI 应用往往需要同时使用 API（调用工具）和 Prompt（调用推理）。
- 反对意见（Sam Altman）：Altman 发推说 Prompt 是阶段性的——但 Jay 认为这是误读：Altman 说的是图片 Prompt 里的 magic word（强调修饰词），不是泛指所有 Prompt。Jay 的实测数据显示 Prompt 在不断变长，未见拐点。

## 概念关系

- AI 生成 Prompt > 人类写 Prompt → AI 生成内容可以作为代码的代码（meta-programming）
- Prompt 的「总信息量」决定质量 → 信息密度是 Prompt 工程的核心指标

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
