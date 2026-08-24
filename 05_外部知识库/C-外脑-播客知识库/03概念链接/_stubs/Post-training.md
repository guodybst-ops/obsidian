---
tags: [概念, stub, AI, 大模型]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [后训练, 模型后训练, 微调层, post training]
source_count: 1
sources:
  - show: "42章经"
    episode: "032"
    speaker: "Ted"
---

# Post-training

## 一句话

预训练模型和用户真正喜欢的产品体验之间的中间层——通过SFT、偏好对齐（DPO/RLHF）、用户反馈和数据管线，把一个"不太会说人话"的大模型调成适合具体场景的模型。

## 为什么需要这个概念

很多人把大模型开发等同于pre-training。Ted指出，pre-training给出一个强模型后，post-training才是决定产品体验差异化的关键环节。没有这个概念，容易低估SFT、偏好对齐、评估和反馈管线的重要性。

## 定义

Post-training是预训练之后的所有模型调整工作，核心目标是让模型更符合特定场景的用户偏好。区别于pre-training（学习语言本身，需要海量数据），post-training使用的是更高质量、更贴近目标场景的数据，且是动态持续的过程。

**Post-training的核心环节**：
1. **SFT**：用高质量对话数据教模型"说人话"，学会在特定场景下应该如何回答
2. **偏好对齐（DPO/RLHF）**：让模型学习人类偏好差异——哪个回答更好
3. **反馈与评估**：收集用户在产品中的各种行为信号，转化为训练数据
4. **迭代管线**：快速收集→快速构建训练数据→快速训练评估→快速A/B→形成可复用know-how

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 032 Ted | "Post-training的本质，是把一个不太会说人话的模型，调成适合与人对话的模型。" | [归纳] |
| [[42章经]] 032 Ted | "Post-training位于预训练模型与用户真正喜欢的产品之间，横跨模型、数据、产品、工程和评估。" | [归纳] |

## 辨析

- vs **Pre-training**：Pre-training是学语言本身（海量数据，学会了"续写"），Post-training是学特定场景下的行为偏好（高质量数据，学会了"回答"）。Pre-training决定了模型的智力上限，Post-training决定了产品体验的下限。
- vs **Fine-tuning**：Fine-tuning是Post-training的一种技术手段。Post-training涵盖更广——包括SFT、DPO、RLHF、反馈收集、评估体系和迭代管线。
- vs **Prompt工程**：Prompt工程是在不改变模型参数的情况下引导输出，Post-training是改变模型参数让默认行为更接近目标。

## 概念关系

- 可操作化为 [[02方法流程/_stubs/Post-training高效迭代管线]]
- 与 [[LLMOps]] 紧密相关——Post-training的运营化版本
- Post-training人才的价值：连接底层模型和用户体验的关键环节

---
> ⚠️ stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
