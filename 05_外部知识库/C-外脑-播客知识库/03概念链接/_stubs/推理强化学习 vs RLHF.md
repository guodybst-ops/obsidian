---
tags: [概念, stub, AI, 强化学习, 大模型]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [推理RL, O1式RL, 慢思考RL, reasoning RL, RLHF vs 推理RL]
source_count: 1
sources:
  - show: "42章经"
    episode: "039"
    speaker: "吴翼"
---

# 推理强化学习 vs RLHF

## 一句话

RLHF让模型"更好用"（遵从指令、符合人类偏好），推理强化学习（O1/R1式）让模型"更聪明"（通过thinking tokens和结果验证获得更强的推理能力）。前者偏alignment，后者开始形成提升智能的post-training scaling law。

## 为什么需要这个概念

很多从业者混淆了RLHF和O1式推理RL，以为都是"强化学习"。但两者的目标、训练方式、数据要求和对模型能力的影响完全不同。RLHF已经成熟（ChatGPT的核心技术），推理RL则刚刚起步——它可能成为大模型的下一个scaling law方向。

## 定义

**RLHF（Reinforcement Learning from Human Feedback）**：
- 目标：让模型好用——遵从指令、符合人类偏好
- 训练数据：人类对模型回答的排序偏好
- 奖励信号：训练一个奖励模型来模拟人类偏好
- 效果：提升可用性和对齐，但不显著提升智力上限
- 类比：让一个聪明的清华北大学生经过实习后成为公司里能打的员工

**推理强化学习（Reasoning RL / O1式）**：
- 目标：让模型更聪明——获得更强的推理和规划能力
- 训练数据：有标准答案的问题（数学、代码）
- 奖励信号：只看最终答案是否正确
- 效果：通过thinking tokens产生更好的思考，形成新的scaling law
- 类比：训练学生做更难、更长的数学证明题

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 039 吴翼 | "RLHF让模型更好用，但O1式强化学习开始让模型更聪明。" | [归纳] |
| [[42章经]] 039 吴翼 | "RLHF更像是让聪明的学生经过实习成为好员工；推理RL是训练学生做更难的数学证明——后者的能力上限是不一样。" | [归纳] |

## 辨析

| 维度 | RLHF | 推理强化学习 |
|---|---|---|
| 目标 | alignment（对齐） | intelligence（智能提升） |
| 奖励来源 | 人类偏好排序 | 标准答案（数学/代码） |
| 是否需要thinking tokens | 通常不需要 | 核心机制 |
| scaling law | 不明显 | 正在形成中 |
| 训练数据要求 | 需要人类标注偏好 | 需要可自动验证结果的问题 |
| 推理成本 | 不显著增加 | 显著增加（长思考） |

## 概念关系

- 两者不是替代关系——可以组合：先用推理RL提升推理能力，再用RLHF把模型"掰回来"（DeepSeek R1的做法）
- 推理RL是 [[Post-training]] 的新方向——从让模型更好用进化到让模型更聪明
- 与 [[Agent]] 相关——推理RL让模型能做更复杂的长步推理，是Agent能力的基础

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
