---
tags: [概念, stub, AI应用, Agent]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [AI代理, 智能体, 自主Agent]
source_count: 3
sources:
  - show: "42章经"
    episode: "003"
    speaker: "路宇"
  - show: "42章经"
    episode: "035"
    speaker: "朱哲清Bill"
  - show: "42章经"
    episode: "039"
    speaker: "吴翼"
  - show: "42章经"
    episode: "040"
    speaker: "王文锋"
---

# Agent

## 一句话

让大模型利用推理能力、上下文和工具，完成连续动作达成目标的技术形态。从"帮你更快完成事"走向"替你完成事"，成熟后像一个员工。

## 为什么需要这个概念

传统大模型应用是"单次对话回答一个问题"——但复杂任务（订机票、写程序、做竞品分析）需要多步推理、调用多个工具、反复自我纠正。Agent 把这种"多步自主完成"的能力封装成一个概念，对应人机交互从 Copilot 到 Autopilot 的跃迁。

## 定义

Agent 的核心构成：
1. **推理引擎**：大模型的 reasoning 能力——把复杂任务拆成子任务
2. **工具调用**：搜索 API、数据库查询、代码执行、外部 API
3. **记忆和上下文**：长程记忆（记住之前的推理步骤和结果）
4. **自主决策**：判断"接下来该做什么"——而不是等人类下指令

当前三种形态：
- **手工编排**：人类规定 step 1 → 2 → 3 → 4（最可控但最不智能）
- **完全自主**：模型自己决定一切步骤（不可控，成本极高）
- **混合状态**：部分编排 + 部分自主（最接近当前可落地路径）

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 003 路宇 | "Agent 到了一定成熟度，它就是一个员工。为什么人们对 Agent 这么兴奋——因为它实现了一种技术平权，一个工程师可以一敌百。" | [归纳] |
| [[42章经]] 012 曲凯 | "未来 SaaS 公司可能都变成 BaaS（Bot as a Service）" | [归纳] |

## 辨析

- vs **Copilot**：Copilot 是"帮人更快做"，人仍然是核心决策者；Agent 是"替人做"，模型本身就是决策者。Copilot→Agent 是一个连续光谱。
- vs **Chatbot**：Chatbot 的本质是单次对话，Agent 是多步任务完成。Chatbot 是"你问一句它答一句"，Agent 是"你给一个目标它自己跑完"。
- vs **RPA**：RPA 是固定规则自动化（if-then），Agent 是不确定推理驱动自动化（自主判断下一步做什么）。

## 概念关系

- 与 [[LLMOps]] 紧密相关——Agent 的编排、反馈和迭代是 LLMOps 的核心场景
- Agent 是 [[Bot社会]]（03概念）中 bot 的高级形态

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
