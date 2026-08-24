---
tags: [概念, stub, AI, 模型评估]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [评测与基准, 评估vs基准, 模型评估框架]
source_count: 1
sources:
  - show: "42章经"
    episode: "041"
    speaker: "丁丁"
---

# Evaluation vs Benchmark

## 一句话

Evaluation是对模型性能好坏进行分析和评估的**过程**，Benchmark是给模型出的**一套套题**。前者是动词/流程，后者是名词/工具。AI下半场的核心命题是：不再满足于刷通用benchmark，而是定义出反映真实业务场景的evaluation体系。

## 为什么需要这个概念

很多团队混淆这两个概念，以为在公开benchmark上分数高就代表产品好。但通用benchmark只覆盖了模型基础能力的一小部分，真正的产品体验由base model、system prompt、搜索API、知识库、工具接口、产品交互等多个环节共同决定。理解Evaluation和Benchmark的区别，是进入AI下半场的认知前提。

## 定义

**Evaluation（评估）**：
- 一个**过程**：对模型性能好坏进行分析和评估
- 包括：定义评估标准、选择/设计benchmark、执行评估、分析结果、与用户指标校准
- 持续迭代的，随产品和模型一起演进

**Benchmark（基准测试）**：
- 一组**题目**：输入（任务题目）、期望输出、评价标准
- 最小颗粒度：一道题 = 用户输入 + 模型输出 + reward/评分标准
- 有生命周期：当模型已解决某类题时，这些题的使命就完成了

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 041 丁丁 | "Evaluation是对模型性能好坏进行分析和评估的过程；Benchmark是给模型出的一套套题，看它表现如何。" | [归纳] |
| [[42章经]] 041 丁丁 | "当一个benchmark已经被模型解决，它的生命周期可能就结束了。团队需要不断定义不同维度、不同梯度的新benchmark。" | [归纳] |

## 辨析

- vs **通用Benchmark vs 业务Benchmark**：通用benchmark（如MMLU、HumanEval）评估基础能力；业务benchmark评估在具体场景中的效用。通用benchmark高分≠产品体验好。
- vs **Auto Eval vs Human Eval**：Auto Eval是用模型自动评价（快速但需校准），Human Eval是人评价端到端体验（高质但成本高）。两者都是Evaluation手段，都需要与用户指标持续校准。

## 概念关系

- 可操作化为 [[02方法流程/_stubs/Benchmark设计与迭代方法]]
- 与 [[02方法流程/_stubs/AI产品评估-归因-改进闭环]] 互补——Benchmark是评估的题目工具，归因闭环是评估后的行动框架
- Benchmark是AI公司的核心资产：反映了公司对"什么是好"的理解

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
