---
tags: [概念, stub, AI应用, LLMOps]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [大模型运维, AI应用运营, 模型运营]
source_count: 1
sources:
  - show: "42章经"
    episode: "003"
    speaker: "路宇"
---

# LLMOps

## 一句话

大模型应用开发和运营的一整套技术栈。与传统 DevOps 的区别在于：Ops 不是"运维"（服务器/可用性/性能），而是"运营"——业务人员、运营人员持续把领域经验和反馈注入 AI 应用，不断塑造和优化它。

## 为什么需要这个概念

大模型应用不是一次性开发上线就定型了——它需要持续迭代 Prompt、Agent、模型调用和知识库。如果没有专门的"运营"概念，团队容易按传统软件瀑布模式做 AI 应用（做三个月→上线→不管了），导致模型效果持续下降。

## 定义

LLMOps 包含三层：
1. **开发层**：Prompt 工程、Embedding、Fine-tuning 的工具和框架
2. **运营层**：非技术人员（业务/运营/销售）把领域经验灌入 AI 应用，持续反馈和优化
3. **监控层**：模型效果评估、成本控制、版本管理

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 003 路宇 | "LLMOps 的 ops 更偏向叫运营。AI 应用绝对不是少数几个工程师写完之后上线就定型了——它需要业务人员把他们的经验灌到大模型里面。" | [归纳] |

## 辨析

- vs **DevOps**：DevOps 的 ops 是运维（服务器监控、可用性、性能）；LLMOps 的 ops 是运营（持续反馈、知识注入、人工干预）。传统 DevOps 关注"应用是否跑得好"，LLMOps 关注"模型输出是否持续好"。
- vs **MLOps**：LLMOps 是 MLOps 在 LLM 时代的特化——核心差异在于 prompt 工程和 embedding 的工作流占比远大于传统 ML 的 feature engineering。
- 推论：AI 应用组织需要非技术角色参与运营，不能只有工程师。

## 概念关系

- 可操作化为 [[02方法流程/_stubs/大模型应用开发三层法]]
- 与 [[Agent]] 紧密相关——Agent 的编排和反馈需要 LLMOps 的运营基础设施

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
