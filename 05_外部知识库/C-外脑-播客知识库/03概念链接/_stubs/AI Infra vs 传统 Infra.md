---
tags: [概念, stub, AI Infra, 基础设施, 系统]
created: 2026-07-11
layer: extract
status: stub
provenance: external
viewpoint_owner: external_author
aliases: [AI基础设施vs传统基础设施, GPU Infra vs CPU Infra]
source_count: 1
sources:
  - show: "42章经"
    episode: "047"
    speaker: "朱亦博"
---

# AI Infra vs 传统 Infra

## 一句话

两者目标相似（大规模、可靠、高效运行），但核心硬件从 CPU 变成 GPU，对通信、存储、调度和框架优化的要求更定制、更极致。大模型时代 Infra 从后台支撑变成影响模型效果和商业竞争力的核心角色。

## 定义

- **传统 Infra**：以 CPU 为核心，处理互联网服务的高并发请求、数据存储和计算任务。代表：Hadoop、Spark、Kubernetes。
- **AI Infra**：以 GPU 为核心，处理大规模 AI 模型的训练和推理。包括计算集群、高速通信网络、训练/推理框架、调度平台。代表：NVIDIA DGX、DeepSpeed、vLLM。

## 为什么需要这个区分

很多人把 AI Infra 理解为传统 Infra 加一些 GPU。朱亦博认为这两者在技术栈和组织意义上有本质区别：

- 传统 Infra 在公司业务规模化后才变得重要
- AI Infra 从公司第一天起就是核心能力，因为大模型需要海量算力
- Infra 水平在 AI 公司中直接决定模型效果（而不只是降本）

## 辨析

| 维度 | 传统 Infra | AI Infra |
|---|---|---|
| 核心硬件 | CPU | GPU |
| 关键指标 | QPS、延迟、可用性 | MFU、decoding 速度、训练时间 |
| 组织位置 | 业务大了后才重要（后台支撑） | 创业第一天就重要（核心能力） |
| 对产品的影响 | 影响性能和成本 | 影响模型效果和商业竞争力 |
| 经济价值 | 节省服务器成本 | 提升模型效果 + 节省算力成本 |

- vs **云厂商 Infra**：云厂商提供底层水电（算力资源），AI Infra 更像装修与交付层，理解 Agent 和模型的具体痛点并包装成可用环境。

## 多源表述

| 来源 | 说法 | 标注 |
|---|---|---|
| [[42章经]] 047 朱亦博 | "大模型时代，也许十年二十年才有一次 Infra 能做到这么核心的角色。" | [原话] |

---

> stub：仅 1 个来源。跨集/跨节目再次出现时，追加来源并升级到父目录。
