---
tags: [概念, stub, Agent, AI]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [专用Agent vs 通用Agent, 垂直vs水平Agent, domain agent]
source_count: 1
sources:
  - show: "42章经"
    episode: "040"
    speaker: "王文锋"
---

# 垂直Agent vs 通用Agent

## 一句话

垂直Agent像五星级厨师——在特定领域凭借知识、工具和反馈机制达到极高结果质量；通用Agent像普通人做饭——什么都能做但都不精。行业会长期处于垂直Agent时代，因为垂直场景更容易定义环境、行动空间和奖励信号。

## 为什么需要这个概念

很多创业者追求"通用Agent什么都能干"，但王文锋认为这忽略了Agent工程的根本难点：通用场景的目标太泛，难以定义统一的状态、行动空间和奖励信号。没有清晰的反馈，Agent无法收敛和迭代。垂直Agent虽然在scope上更窄，但在结果质量上可以远超通用Agent。

## 定义

**垂直Agent**：
- 聚焦特定场景（如数据抓取分析、电商运营、客服、代码review）
- 有清晰定义的环境、行动空间和结果标准
- 可以设计有效的反馈信号
- 结果质量高、可靠性强

**通用Agent**：
- 试图处理任意任务
- 目标和行动空间几乎无限
- 难以设计统一的反馈机制
- 越通用→方法越泛化→随机性越高

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 040 王文锋 | "越通用，方法越泛化，随机性也越高。" | [原话] |
| [[42章经]] 040 王文锋 | "行业长期会处于垂直Agent时代。垂直Agent更像专业厨师，能在具体场景里做出远超普通人的结果。" | [归纳] |

## 辨析

- vs **通用Agent的"幻觉"**：很多人觉得AGI到来后通用Agent会碾压垂直Agent。但王文锋认为，即使模型能力再强，垂直场景仍有价值——因为垂直场景的反馈信号、数据积累和工程优化是通用Agent无法短期复制的。
- vs **SaaS vs Agent**：垂直Agent某种程度上是在继承SaaS的垂直化逻辑（每个行业/场景有专用工具），但用Agent的方式重新交付。
- **垂直Agent的边界**：垂直Agent不是说不成长——而是在特定场景里先做到极致，再逐步扩展。像Cursor先做好coding，再往其他方向扩展。

## 概念关系

- 可操作化为 [[02方法流程/_stubs/Agent环境-工具-反馈设计框架]]——垂直Agent更容易应用此框架
- 与 [[Agent vs SaaS]] 相关：垂直Agent可能先吃掉SaaS市场
- 与 [[Copilot与Agent的区分及应用框架]] 互补：Copilot→Agent的演进，垂直化是落地的关键路径

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
