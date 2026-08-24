---
title: "Lemonade 原生接入ModelScope，助力端侧AI推理"
公众号: "魔搭ModelScope社区"
发布日期: 2026-07-23
抓取时间: 2026-07-23 22:51:49
类别: AI
自动检查结果: "B 存参考资料"
相关度评分: 10
命中词: ["AI", "大模型"]
原始链接: "https://mp.weixin.qq.com/s/5LDJwCFKoQ4dV8GrwJH94w"
文章ID: "2247511034_1"
---

# Lemonade 原生接入ModelScope，助力端侧AI推理

对开发者来说，模型生态的价值不仅在于模型数量，更在于能否便捷地发现、下载并真正运行起来。现在，Lemonade 已正式支持 ModelScope：在最新的 v11.5 版本中，ModelScope 作为全新的模型注册源接入 Lemonade，与 Hugging Face 并列，为开发者提供更丰富、更灵活的模型获取选择。

Lemonade地址：

-     网页端：        http://localhost:13305/app

-     客户端：      https://lemonade-server.ai/

01

一个搜索框，打通两大模型库

从 v11.5 开始，Lemonade 正式支持       ModelScope        作为模型注册表，与 Hugging Face       并列使用      。你现在可以像搜 Hugging Face 一样搜 ModelScope：直接在模型管理器里输入关键词，然后从任一来源下载你需要的模型。

这个功能对以下几类场景尤其实用：

-     所在地区访问 ModelScope 镜像速度明显更快；

-     某些模型首发在 ModelScope。

最重要的是——零配置。 不需要额外注册账号，也不需要改任何配置。搜模型名、选 GGUF 变体、点下载，三步搞定。

同时可避免无效下载       。Lemonade 会在展示结果前，先去仓库里扫一遍实际文件结构，确认确实有可用的 GGUF 文件，才会显示下载按钮。      所见即所得，      你看到的，就是      可运行的      。

02

操作指南

打开 Lemonade 客户端（或访问网页端       http://localhost:13305/app      ），进入 Model Manager。输入模型名称（例如 Qwen 2.5），输入三个字符后自动触发搜索，      本地模型下方将出现两个全新分区      ：FROM HUGGING FACE 和 FROM MODELSCOPE。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ia2awwZLWFZT8ra26d3ZWLcFibst45V8WEXPCAMwTHHtT5aFWXRkvVY0iaLX76OX44xI5ToUMOcO2YXHa7FwlpVWyCzxIbn99Vf0ibaM5RWpeRU/640?wx_fmt=png&from=appmsg)

每条搜索结果在下载前展示完整信息：仓库名称、来源标识（MS / HF）、下载体积、社区拉取次数。如需更换量化规格，在下拉菜单选择对应档位 —— 系统默认预选 Q4_K_M 这一均衡稳妥选项，随后点击下载等待任务执行即可。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ia2awwZLWFZRD0kafNVzUejUWjb9IK4bFmfUyFtP9gADSh6yXVfo8aX4PtsIs3Ojg7iaAlBNzc0bZB7kcvDEwbwvGfS51R3EicMenlZ2ibHVIew/640?wx_fmt=png&from=appmsg)

下载完成后模型自动注册，立即可用：你可以在对话面板选中模型，或是将兼容 OpenAI 协议的客户端对接服务，操作方式和 Lemonade 中其他模型完全一致。模型一旦下载至本地，来源仓库不再影响后续使用。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ia2awwZLWFZSGFF4IyQvaIU2I0ju63Jl6F1TicnBBm7iaelRiceY9T5pGlGWeWXnMsGppNBpVObnwEIYFRpMaJsjnEPBHicibMBjrThI8fQbO2Mvk/640?wx_fmt=png&from=appmsg)

03

习惯终端操作？

CLI 也支持 ModelScope。给 lemonade pull 一个 checkpoint，并指定从哪里查找——或者直接粘贴 modelscope.cn 的模型 URL，      程序自动解析剩余参数      。

使用 CLI 从 ModelScope 拉取

-

lemonade  pull Qwen/Qwen2. 5 - 3 B-Instruct-GGUF --source modelscope

如果你是在 Lemonade Server 之上构建应用，模型管理器使用的同一个搜索能力也可以仅通过一次 GET 请求访问：

通过 REST API 搜索

-

curl   "http://localhost:13305/v1/registry/search?source=modelscope&query=qwen"

添加 format=gguf 可以让结果更偏向 GGUF 仓库；也可以使用 limit 控制返回数量（1-50，默认 12）。响应中包含标签、任务、下载次数，以及每个模型的 GGUF 提示——完整结构请参考       API 文档      。

API文档：      https://lemonade-server.ai/docs/api/lemonade/

04

发现更多新内容

升级到 Lemonade v11.5，用一个搜索框同时搜索两个注册表。

安装 Lemonade        ：      https://lemonade-server.ai/docs/guide/

Star on Github      ：      https://github.com/lemonade-sdk/lemonade

加入 Discord      ：      discord.gg/5xXzkMu8Zk

👇点击关注ModelScope公众号获取

更多技术信息~

## 来源

- 公众号：魔搭ModelScope社区
- [查看微信原文](https://mp.weixin.qq.com/s/5LDJwCFKoQ4dV8GrwJH94w)
