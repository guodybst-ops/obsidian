---
title: "从理解到行动：InternVLA-A1.5开源发布，探索具备未来感知能力的通用机器人操作基础模型"
公众号: "魔搭ModelScope社区"
发布日期: 2026-07-16
抓取时间: 2026-07-20 16:52:21
类别: AI
自动检查结果: "B 存参考资料"
相关度评分: 10
命中词: ["AI", "人工智能", "学习", "智能体"]
原始链接: "https://mp.weixin.qq.com/s/r_Bk4P92gArGm-poR3SLiA"
文章ID: "2247510765_1"
---

# 从理解到行动：InternVLA-A1.5开源发布，探索具备未来感知能力的通用机器人操作基础模型

近日，上海人工智能实验室推出 InternVLA-A1.5，一种统一架构的机器人操作基础模型。该模型通过统一视觉语言理解、潜在未来推理与连续动作生成能力，使机器人不仅能够理解复杂任务指令，还能够预测环境演化趋势并执行长程操作。

InternVLA-A1.5 是物理世界模型建设中操作智能持续迭代的阶段性基础，模型展现出完成长程化学实验操作的能力，可为 AGI4S 中各领域干湿闭环实验室的物理智能体提供支持。

项目主页：（文本点击阅读原文可直达）

https://internrobotics.github.io/internvla-a15.github.io

Model：

https://modelscope.cn/collections/InternRobotics/InternVLA-A15

论文：

InternVLA-A1.5: Unifying Understanding, Latent Foresight, and Action for Compositional Generalization（https://arxiv.org/pdf/2607.04988）

代码与模型权重已全面开源，欢迎社区基于 InternVLA-A1.5 进行机器人策略初始化、任务微调以及真实机器人部署探索。

#

#   面向通用机器人的下一代VLA基础模型

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/p7PUMlicoEqibTlxdO0MBmRGJhOj8AsRA2cfdoW5L7A1hwa6Je6ftpSAqqiaToLZibmFDEWBWhYercBaiaJfzswaOLib6ia1GX1e8JjIm0KaOnK0D0/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

近年来，视觉语言模型（Vision-Language Models, VLMs）展现出强大的语义理解和推理能力，为机器人赋予了理解自然语言指令和复杂场景的能力。然而，机器人操作不仅需要理解当前状态，还需要具备对未来环境变化的预测能力：

-   物体移动后会处于什么状态？

-   倾倒液体会如何改变环境？

-   多步骤任务应该如何规划和执行？

为增强机器人对物理世界的理解，近年来世界模型（World Model）与世界动作模型（World Action Model, WAM）类方法尝试通过预测未来视觉状态来提升机器人操作能力。然而，这类方法通常需要在推理阶段持续生成未来视频帧以辅助动作规划，昂贵的视频生成过程带来了显著的额外计算开销，限制了机器人的实时部署。

InternVLA-A1.5提出了一种新的解决方案：

通过引入一组可学习的查询token，在训练阶段蒸馏预训练世界模型中的动态演化先验，推理阶段无需调用视频生成模型，即可实现具备未来感知能力的实时机器人控制。

#

#   潜在未来推理：让机器人具备“预判能力”

![图片](https://mmbiz.qpic.cn/mmbiz_png/p7PUMlicoEq9uHP7cojlLpWq1zzqeRL9ubVPViaiaibnrW7LdPVGicH1iaOCt3Qct8R0BGiaj0vSkkZIaY48frFxTQsQX4PQIqib3icHHbTovgXqU8gE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

InternVLA-A1.5的核心创新之一是提出    Latent Foresight Reasoning（潜在未来推理）机制   。

不同于现有WAM方法在推理阶段显式生成未来视频，InternVLA-A1.5将未来预测重新定义为一个潜在表示查询（latent querying）问题，引入少量可学习的 foresight tokens：

-   foresight tokens 从当前视觉语言上下文中提取与任务相关的未来信息；

-   利用预训练视频生成模型提供的时空动态知识进行监督；

-   将未来状态压缩为紧凑的潜在表示，用于辅助动作生成。

值得注意的是，视频生成模型仅用于训练阶段，在实际机器人推理过程中完全移除，因此不会增加部署成本。这一设计使机器人能够继承大规模视频模型中的世界动态知识，同时保持实时控制能力。

#   混合大规模预训练：兼顾语义理解与机器人操作能力

![图片](https://mmbiz.qpic.cn/mmbiz_png/p7PUMlicoEqicqNHCwjl2ibiaNK0LyEFv2SXTn7LLmsmKBWnI4FsSSbr8VNUvMAtY92LicSUSPXicsXHdk0t54wP6fyVWBibDYD0huBbdOTtBx4DAA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

InternVLA-A1.5采用混合大规模预训练策略，将多模态理解数据与机器人操作数据统一到同一训练框架中。模型预训练使用约300万规模的视觉语言多模态数据，以及120万条机器人操作轨迹数据。其中，视觉语言数据来自实验室   自研具身场景多模态数据 InternData-M1   ，机器人操作数据融合了实验室   自研仿真数据 InternData-A1    以及多来源真实机器人数据。

通过这种混合预训练方式，InternVLA-A1.5能够在保留预训练视觉语言模型强大理解能力的同时，逐步建立面向机器人操作的动作生成能力，为后续复杂任务泛化和真实机器人部署提供坚实基础。

#   多场景验证：从通用机器人操作到科学实验自动化

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/p7PUMlicoEqicexuqvwiasH9dQdXAETM0BZ000tnF4SiaRyzcCwAKZpM5LzBSJyom9xOH385qEpDvecEAlzic45hW9bImHn14fZJEBSIGYIzgZiaI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

为全面评估 InternVLA-A1.5 的通用操作能力，团队在多个仿真基准和真实机器人环境中进行了系统验证。

在仿真实验中，InternVLA-A1.5覆盖了包括    LIBERO、LIBERO-Plus、RoboTwin 2.0、DOMINO、EBench 和 SimplerEnv    在内的六个代表性机器人操作基准（benchmark），涵盖单臂操作、双臂协作、动态交互以及移动操作等多种场景。

实验结果表明，InternVLA-A1.5在六个benchmark上均取得领先或具有竞争力的表现，验证了模型在不同机器人形态、任务类型和环境变化下的通用操作能力。

#   面向开放世界的组合泛化能力

![图片](https://mmbiz.qpic.cn/mmbiz_png/p7PUMlicoEqibgoGU8oaJuxIZ7kyicoMQ4ibq8pdxg4sSicDgwiaibVzwXpaPHP852ygcUCk69FtlicGZFibgnTGk2jmTxX55INjkU7NJbtia9HVTQ2aY/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

![图片](https://mmbiz.qpic.cn/mmbiz_png/p7PUMlicoEqibEmkZWbKGZB4bljnIoZFibVRAiax5neacIHSlTxeVP2PQdR8GZYO22OfUdne3yEjhiae9ORH9RBsOTa8C3uL2D2jwpFOhyUCo7RA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

真实世界中的机器人往往需要面对训练数据中未出现的新任务组合，例如新的物体-目标关系、新的语言指令组合以及不同的环境变化。

针对这一挑战，InternVLA-A1.5进一步设计了真实机器人实验，重点测试模型的    compositional generalization（组合泛化能力）   。

在 Sort Tubes、Insert Tubes 和 Move Tubes 三个任务中，机器人需要根据语言指令理解不同物体与目标之间的关系，而部分组合在训练阶段从未出现。

实验结果显示，InternVLA-A1.5在未见过的指令组合（OOD instruction bindings）下仍保持稳定表现，体现出模型并非简单记忆训练轨迹，而是真正学习了语言、视觉与动作之间的关联。

从机器人操作到AI for Science：长程科学实验自动化探索

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/p7PUMlicoEqibV2SWl9nnZR3PncYvic63nzE8MaiaxsiaBkWDfSzD2CVH5hpEeqTIGmRHp3tQOodT7RBrRabVEWe2Tk5w1NdwMoGibcjMvBSu4t1k/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

除了通用操作任务外，InternVLA-A1.5进一步探索了具身智能在    AI     for Science    领域的应用潜力。

团队设计了一个长程化学实验自动执行任务——   MOF（Metal-Organic Framework）制备流程   ，模拟真实实验室中的多步骤实验操作。

该任务包含多个连续阶段：

-   获取实验器具；

-   插入漏斗；

-   转移并倾倒液体；

-   转移实验容器、安装塞子；

-   启动反应设备。

整个流程包含15个连续子任务，需要机器人持续理解实验进展，并根据环境状态变化完成后续操作。

实验结果显示，在该长程科学实验任务中，InternVLA-A1.5达到    76.4%的成功率   ，显著优于已有方法（π0.5：29.3%）。这一结果表明，具备未来感知和任务状态理解能力的机器人基础模型，有望进一步应用于复杂科学实验流程自动化。

#   全面开源，共建通用机器人智能生态
InternVLA-A1.5现已全面开源，包括预训练模型、代码和完整使用说明。书生希望InternVLA-A1.5能够成为一个开放的机器人基础模型，为机器人研究、任务迁移以及AI for Science场景下的自动化实验提供便捷、高效的预训练起点。

欢迎全球研究者和开发者基于InternVLA-A1.5进行进一步探索，共同推动物理智能的发展。

项目主页：

https://internrobotics.github.io/internvla-a15.github.io

InternVLA-A系列开源代码：

https://github.com/InternRobotics/InternVLA-A-series

HuggingFace模型：https://huggingface.co/collections/InternRobotics/internvla-a15

魔搭社区：https://www.modelscope.cn/collections/InternRobotics/InternVLA-A15

点击  阅读原文，  即可跳转模型合集~

👇点击关注ModelScope公众号获取

更多技术信息~

## 来源

- 公众号：魔搭ModelScope社区
- [查看微信原文](https://mp.weixin.qq.com/s/r_Bk4P92gArGm-poR3SLiA)
