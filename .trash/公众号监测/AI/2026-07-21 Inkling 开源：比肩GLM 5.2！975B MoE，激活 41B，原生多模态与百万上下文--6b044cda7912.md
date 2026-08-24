---
title: "Inkling 开源：比肩GLM 5.2！975B MoE，激活 41B，原生多模态与百万上下文"
公众号: "魔搭ModelScope社区"
发布日期: 2026-07-21
抓取时间: 2026-07-23 10:50:58
类别: AI
自动检查结果: "B 存参考资料"
相关度评分: 10
命中词: ["AI", "学习", "智能体"]
原始链接: "https://mp.weixin.qq.com/s/FqI8GPrEdSOplblvkUtNqg"
文章ID: "2247510924_1"
---

# Inkling 开源：比肩GLM 5.2！975B MoE，激活 41B，原生多模态与百万上下文

Thinking Machines Lab 正式    发布首个    开源模型 Inkling。该公司由前 OpenAI CTO Mira Murati 于 2025 年创立，此前推出了模型微调平台 Tinker。Inkling 在推理、代码、工具调用和指令遵循评测中，整体表现      接近 GLM 5.2、Kimi K2.6 和 DeepSeek V4 Pro       等主流开源模型。相较于侧重代码、数学或单一模态的模型，Inkling 的特点是统一支持文本、图像和音频输入，并结合百万 Token 上下文、可控推理预算，定位更偏向可定制的多模态基础模型。Inkling 总参数量 975B，每个 Token 激活 41B 参数，使用 45 万亿个文本、图像、音频和视频 Token 进行预训练，原生接收文本、图像和音频输入。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZQ0SPon0jkBXXpxpaJEBjRHjH7AHP43Xz83unwatVEQJNxKMcJlXglDXicJtpo3MvMJSf3KtQ2N4ULN2oNPJoVsbfXqPfhEJD68/640?wx_fmt=png&from=appmsg)

开源地址：

模型链接：         https://modelscope.cn/models/thinkingmachines/Inkling

技术博客：         https://thinkingmachines.ai/news/introducing-inkling/

##

01

多模态与智能体能力

Inkling 覆盖代码生成、工具调用、视觉推理、音频理解和长任务执行等能力。

在官方展示中，Inkling 一次生成了一个求职申请 Web 应用，并通过浏览器工具读取用户资料、自动填写表单。

Inkling 还根据一段完整提示生成了 9 页美食与旅行杂志《Breakfast Around the World》。内容覆盖巴黎、东京、伊斯坦布尔、墨西哥城、香港和哥本哈根，并通过网络检索核验饮食文化、城市信息和配图。这些内容具有精确的格式要求、准确的信息呈现，以及统一的风格和设计。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ia2awwZLWFZQib5e8NuYK9UicIxa62RmOnPpzIT9yoYKqGKCNy7piaHQnLLibyqic1I2X0ty0DRTEm1DE0dGIRibxl21eAdcGfXjc7w5uMGAm839y4/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZT2NCicXcTYxbOKDe3wbgxjZx7GxcW92j5pClPLNCqrbodhdXKpqWZ76WQ68nszqCd7zPQo2u6n9WxAn7aGF3HB8baFdU09h1LM/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZQjfiaDamNK1W5IhhiaNPXiaEP3nnAlvVwN0tyXOKicEsgVRFogUwsdibGdVlaCVUnm4mIL7DGh1U1mrCR3LmN5G8oq9PCpWuRKME0Y/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/mmbiz_png/ia2awwZLWFZSw64ibKcxFIo6LUZIzo5qzhDeQGLichXV4GrSMH0d2RxG3IRUSCar9oI4jiaMDlZPFff9x4Tq3sI4Uf0cF84gJ284tsQCkIgrd60/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZTwCUtzn0fM4GcygdkDagMyJjELicd4A4xSm09qtvlicD5jLicFbTa2CNNAaSQHwicyIMy8dy40sRXZrm9LIRR5JiawsCZlQsID0ibuQ/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZT03fh3TvB0DNXddpaC9l2M46ImibB1UD2azOQ7PXzn1QZ8sia0uuNjpibfkeKCKFN9ichVBZmQwlicJicFJxBIVDFmL7At0NGIku0Sw/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZSGxxNPia05DKjARJXedpg8dyu0kkpUmtF2QbdE74hYXWDBarbgwcdjMVsntzpyDWV7cricn96T4os64QTkicNXlPX74aHsf332dw/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/mmbiz_png/ia2awwZLWFZSgzgeYoy7JpL1em9LThRp2kxwsIic0tvJ3TW8GO1ESpvrn4dSZhcqb5huCdfp4ibRwU6zu9qnTWqrLKMdfaAdYWjE6x7siaOiaCr0/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZQ41usyibR3uprEOicGFJ5KibEXVpdzbYc8fHjNzwLL4hOQDWibG6aL6QOkHgiaRnlwZqVYP7yKMaL7P3wJu7vUGJ41kADhTxVT6ZH4/640?wx_fmt=png&from=appmsg)

左右滑动查看更多

在另一个案例中，Inkling 根据代码审查模型的反馈连续迭代 40 轮，完成了一个包含服务端、客户端、机器人和测试用例的多人贪吃蛇游戏。

02

模型架构与训练

Inkling 是一种仅具备解码功能的混合专家模型。该模型的总参数量为 9750 亿，其中 410 亿为活跃参数。该模型包含了许多复杂的组件：

相对注意力机制

与通常用于向 Transformer 模型中注入位置信息的 RoPE 方法不同，Inkling 采用相对注意力机制来编码位置信息。每个注意力层都会在注意力计算过程中直接学习位置信息。除了键-查询-值三元组之外，还有一个额外的投影层，用于生成每个标记、每个注意力头的相对特征 R。该投影结果会结合键向量和查询向量之间的距离信息，再被传递到注意力计算模块中。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZSBw848HMUticSAcllzFoOqW8ickvicWh9mMvQso6UoWNjLVYcjpGBKJlEeHsQYxzWiaY3fzn31ia0XO4uEUv228Dh9cDu6tWQxJpyw/640?wx_fmt=png&from=appmsg)

混合注意力机制

解码器层在全局注意力机制和滑动窗口注意力机制之间交替使用。全局注意力机制会同时考虑整个上下文信息；滑动窗口注意力机制则只关注某个固定的上下文窗口。该架构中，滑动窗口注意力层与全局注意力层的比例约为 5:1。这种混合注意力机制提升了计算效率。最后一层则利用全局注意力机制来构建内容丰富的特征表示。

短时卷积

该模型在隐藏状态上采用了特殊的短时 1D 卷积操作。SConv 会读取当前的标记以及之前的若干个隐藏状态，其中滑动窗口的大小由参数W决定。其原理在于：SConv 有助于实现局部注意力机制，同时让注意力机制和 MoE 模块不必再受局部表示的约束。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ia2awwZLWFZRiaQ1H0s8Vh7Zl1yLGEBywZoibHootYwfDiaVBagOyqxCXiburFN6o0QQicFgX0dTjsfofgR25dFdWPXWjBlkatLz0Ez3nbVwvjsXA/640?wx_fmt=png&from=appmsg)

拥有共享专家的 MoE 表现更佳

在 Inkling 中，该路由器对所有被分配到的专家以及共享专家都进行了评估。在 6 名被分配到的专家中，会选出排名靠前的 k 名专家；另外，还有 2 名共享专家始终处于活跃状态。

与每种模态分别使用独立编码器的模型不同，这种多模态处理单元是一种相当简单的结构。每张图像会被送入图像嵌入单元进行处理，音频数据被送入音频嵌入单元进行处理，从而得到相应的媒体嵌入结果。对于视频处理，图像输入还包含时间维度信息。在该处理单元中，相邻的图像元素会被组合在一起，形成一个个小的局部块，这些局部块会被送入 hMLP 模型进行处理。音频波形则会被转换为梅尔频率谱，然后再被划分为不同的梅尔频段。这些梅尔频段值会被送入音频嵌入单元，最终所有的嵌入结果会被叠加起来，从而形成最终的音频输入。

03

部署与推理

Inkling 总参数量为 975B，支持 Transformer 架构，并且能与 SGLang、vLLM 等主流推理引擎兼容。 BF16 版本显存需求约为 2 TB，NVFP4 版本约为 600 GB。通常需要多 GPU 或多节点部署。以下以 NVFP4 （面向 NVIDIA Blackwell GPU）权重和 8 卡张量并行为例。

###    模型下载
魔搭模型：         https://modelscope.cn/models/thinkingmachines/Inkling-NVFP4

-

-

-

modelscope  download  \       --model thinkingmachines/Inkling-NVFP4  \       --local_dir ./Inkling-NVFP4

###    vLLM 部署
从源码构建vLLM

-

-

-

-

-

uv venv --python 3.12 --seed --managed-python     source  .venv/bin/activate    git  clone  https://github.com/vllm-project/vllm.git     cd  vllm    uv pip install --editable . --torch-backend=auto

启动 vLLM 服务

-

-

-

-

-

-

-

-

-

-

-

export  VLLM_USE_V2_MODEL_RUNNER= 1      export  FLASH_ATTENTION_CUTE_DSL_CACHE_ENABLED= 1      vllm  serve ./Inkling-NVFP4  \       --tokenizer-mode inkling  \       --reasoning-parser inkling  \       --tool-call-parser inkling  \       --enable-auto-tool-choice  \       --tensor-parallel-size  8   \       --speculative-config '{ "method" : "mtp" , "num_speculative_tokens" : 8 }'  \       --kernel-config.enable_flashinfer_autotune=False  \       --trust-remote-code

###    SGLang 部署
从源码构建 SGLang：

-

-

-

-

-

git  clone  https://github.com/sgl-project/sglang     cd  sglang    pip3 install pip --upgrade    pip3 install  "transformers>=5.6.0"     pip3 install -e  "python"

启动 SGLang 服务

-

-

-

-

-

-

-

-

-

-

-

-

-

-

-

-

-

-

-

export  SGLANG_ENABLE_UNIFIED_RADIX_TREE= 1      python3  -m sglang.launch_server  \       --model-path ./Inkling-NVFP4  \       --tp  8   \       --quantization modelopt_fp4  \       --attention-backend fa4  \       --page-size  128   \       --fp4-gemm-backend flashinfer_trtllm  \       --moe-runner-backend flashinfer_trtllm_routed  \       --enable-torch-symm-mem  \       --mamba-radix-cache-strategy extra_buffer  \       --mem-fraction-static  0 . 85   \       --swa-full-tokens-ratio  0 . 1   \       --mamba-full-memory-ratio  0 . 1   \       --enable-multimodal  \       --reasoning-parser inkling  \       --tool-call-parser inkling  \       --host  0.0.0.0   \       --port  30000

##    附录：模型得分

![图片](https://mmbiz.qpic.cn/mmbiz_png/ia2awwZLWFZQlTxmTDMjYu4xLf5c5MXnLD9paF6rkmW8lTmbskJs8e7OMZ4VRIHKbmq9aQTEwxbvP3NApVZdzicv0G8yARJBUZ7zlDt1SR4uM/640?wx_fmt=png&from=appmsg)

点击  阅读原文，  即可跳转模型链接~

👇点击关注ModelScope公众号获取

更多技术信息~

## 来源

- 公众号：魔搭ModelScope社区
- [查看微信原文](https://mp.weixin.qq.com/s/FqI8GPrEdSOplblvkUtNqg)
