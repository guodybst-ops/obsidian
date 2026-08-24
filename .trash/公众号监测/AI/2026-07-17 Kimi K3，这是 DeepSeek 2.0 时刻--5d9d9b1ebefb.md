---
title: "Kimi K3，这是 DeepSeek 2.0 时刻"
公众号: "AGI Hunt"
发布日期: 2026-07-17
抓取时间: 2026-07-18 21:43:02
类别: AI
自动检查结果: "B 存参考资料"
相关度评分: 10
命中词: ["AI", "大模型"]
原始链接: "https://mp.weixin.qq.com/s/zXtIUSjbtTTBvCZ5rTR_PQ"
文章ID: "2453486666_1"
---

# Kimi K3，这是 DeepSeek 2.0 时刻

Kimi K3，应该所有人都知道了， 也抱歉我来晚了……（今天太忙了）

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFl1o90Gd8Pn5dNru0cJxzfdowcevQib01oeiaR5JMic0FscqYuyUouKIVvzCdqIZjLHicSQ1eibExR5OJNFjiceGTUYxZKT2GyCKX03I/0?wx_fmt=png&from=appmsg)

这两天的 X、HN、Reddit，还有各个微信群，聊的几乎全是它。而全球一众网友的评价是：

“    这是 DeepSeek 2.0 时刻（the DeepSeek 2.0 moment）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlxWYPg3QssZH467ftK60giaQD4KUicyKu0iaRNcvQ9lKmgDuopkwMCpmeiayZvMxYiaCAjIP4cV360yqRkQuP4zFLcicaHvNHt5lea0/640?from=appmsg)

DeepSeek 2.0 moment 推文     知名 AI 博主 kimmonismus 在推文里写道：

“    Kimi K3 可能就是 DeepSeek 2.0 时刻。基准测试结果已经出来了，非常出色……我相信这就是 DeepSeek 2.0 时刻。听起来夸张吗？乍看也许是。但一个整体优于 Opus 4.8 的开源权重模型，来自中国。好好消化一下这句话。我是认真的：整个游戏已经变了。

The Rundown 也表示，这可能是今年的 DeepSeek 时刻。

而比较绝的还得是 DeepSeek 的各个官方群，网友们在群里聊的都是 K3……

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFnfQaKTRQibvcotwCzCeiaeR3lXmGF4ZwcLk6LVlvGltlUKVK4sxK9o6sJ3zbD3TsLK8E3s2m2ulLqibFp904y11st9JHMnlXO0FU/640?from=appmsg)

DeepSeek 群里聊 K3     即使价格比 DeepSeek 要高出不少，但网友仍觉得超值：   难怪那么自信出 100 的价   ……

好在 DeepSeek 也是一贯的大度和沉默，换其他厂可能要红温踢人了……但这一幕，也真就更有了点 2.0 moment 的味道。

01
##  预告片
先从发布前说起。

Kimi 官方在昨天便提前在 x 发了一条 36 秒的预告视频：一台老式的弹簧秤，托盘上放有一颗金属球，指针缓缓转动。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmYAsVqtS0iajwhNOF27eoLzRHzDCvMZJTYUBAbjtjECVMa8BWpHdEgXbGVI2bFaicS9D8M5w0mLTT2kLW6jibR0M0bCn2Dhsgjyw/640?from=appmsg)

官方预告视频     没有额外一个字的说明。

但当然，所有人都看懂了：要发大的了，K3 要来了！

其实在这之前，Kimi 开放平台就短暂上线又秒删了一个「K3 launch」的充值促销页，还被网友抓包看到了参数说明和 1M 上下文的字样……（估计这事也是 K3 干的吧）

而同时，LMArena 上也出现了一个叫 Kivine 的马甲模型，自称来自 moonshot labs。然后连 FT 都发了报道，说 Moonshot 即将发布迄今最大的中国模型。

网友们的猜测和期待，就这么足足被吊了两三天。

然后，Kimi K3 正式发布了。

02
##  2.8 万亿参数
来看官方的正式介绍。

Kimi K3 是一个 2.8 万亿参数的模型，基于 KDA（Kimi Delta Attention）混合线性注意力和注意力残差（Attention Residuals）构建，原生支持视觉理解，上下文窗口 100 万 token。

官方称它是全球首个开源的 3 万亿级别模型，完整权重会在 7 月 27 日前放出。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ZKqVLiaIpzFkSf5BjAmkonhj7FSrg1xp9NXxClM1maWYtcib2IHaOpqwV2dysOb3GAh7ee8QNWTMXFAUYrd4TujibZQvsTVJ5icrn94RWXdvZLw/640?from=appmsg)

K3 架构图     架构上，MoE 稀疏度做到了 896 个专家里激活 16 个，配合训练方法的优化，整体扩展效率相比 K2 提升了约 2.5 倍。

官方发布文章的措辞也很 DeepSeek，原话是：

“    虽然 Kimi K3 的整体表现仍落后于最强的闭源模型 Claude Fable 5 和 GPT-5.6 Sol，但它在我们的整套评测中展现出前沿水平的能力，并稳定超过了其他所有模型。

即：这是仅次于 Fable 和 GPT-5.6 Sol 的模型。

而在发布文章的开头，月之暗面在公众号里写的是一句古文：

“    犯其至难而图其至远者，发之以勇，守之以专，达之以强。

出自苏轼的《思治论》，其大意是：   向最难处下手，去谋最远大的目标；以勇气开局，以专注坚守，以强大抵达   。

放在一家一直在追赶最前沿智能的公司身上，结合当前的中美模型态势，这句话的分量之重，相信你应该能感受得到。

官方给的演示有很多，比如 48 小时自主 Agent 从头设计并验证了一块芯片、两小时复现了一项通常要资深研究员一到两周的天体物理计算工作，中间交叉验证了 20 多篇论文、写了 3000 多行 Python……我就不一一重复了。

价格部分则是如 ds 网友所言既贵又值：API 每百万 token 输入 20 元（命中缓存 2 元）、输出 100 元。

差不多正好就是 Claude Sonnet 5 的价格。

而在 14 项 benchmark 的对比里，它对 Opus 4.8 是 14 比 0 全胜（对 Fable 5 则是 6 胜 8 负）。

Sonnet 的价格，超过 Opus 的体验   ，你说值不值？！

03
##  Fable 退居第二？
发布后没多久，LMArena 官方发布公告：

“    重大消息：Moonshot 的 Kimi-K3 现已登顶 Frontend Code Arena（前端代码竞技场），得分 1679 分，超越 Claude Fable 5。这是从 Kimi-K2.6 的第 18 名到第 1 名的一次 17 位跃升。在前端 7 个细分领域中，Kimi-K3 拿下 6 个第一，仅在 Gaming 领域排第二，落后 Fable 5。完整模型权重将于 7 月 27 日前发布。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ZKqVLiaIpzFm2nUDve2t4CDlnmxmvcp0cicbpABDwjLl8OTCn8O6s4RZ5grl1yuic0dzBytM06keHP8Lt0nwiav2veQ3GLTiaX68pTl3UmgD1ibro/640?from=appmsg)

前端竞技场榜单     于是，Fable 5 是第二名的剧情，就这么真的出现了……

按 LMArena 的口径，K3 的两两对战胜率是 76%。也就是说，让 K3 和其他任何模型正面 PK 时，平均 76% 的情况下被评为更好。

另两个高贵的模型作为参照：Fable 5 是 63%，GPT-5.6 Sol 是 58%。

LMArena 还补了一张图，说 K3 移动了这个榜单的帕累托前沿。在性能和价格的坐标系上，最优边界被它整个往上推了一格：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ZKqVLiaIpzFkLxYaxbb1IDMkXVxfKhtsoNEld58RIxC23TgtiaktayYm05l668ibMQib3iaob1KBLDLG6PdoZwkfrJBGhaN8uib7iclkzQ57fJrzNk/640?from=appmsg)

K3 移动帕累托前沿     Artificial Analysis 给出的排名是：全球第三。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFnPULYKx0FGSaEYmoiavZ35X9vlnPx4s6yoGqxrF7YrxAQtLMc632rGNtAh9iblbXh95iaYmMV7CEoicgQJZonmzbpqCx0cfdjua58/640?from=appmsg)

AA 排名     04
##  大模型的味道
X 上对新模型的发布有个流行的手艺活：让模型画 SVG。

之前 Fable 5 发布时，博主 scaling01 用这套题测过它，评价是「超级干净」。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFlVT0CKQdoktIcb1hz1cHbbDcQHfswaFra1YwbZRNH9ffLnOtSnrlics1IOE1JOLPuLicZPMraMAs211nWiauksccBbZ0PVpPzYBc/640?from=appmsg)

Fable 5 画 svg     这次他把同一套题丢给了 K3，结论则变成了：

“    Kimi-K3 绝对有那股「大模型的味道」（big model smell），它在这里打败了 Fable。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFmaNDGyCWicA8ELmkswD4tHTEiawEctxiaZCqGSXgKHHiafu4jTGKlH58NstoxKj9oVqvotrRqgADr7qCdjoLviawEpqQ9ic9s7K8vXQ/640?from=appmsg)

K3 画 svg     再往前，他还有 Opus 4.6 和 4.5 版本的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlq7lCmDUR1QKBj8cDLGIN1ZGsz4XNibIDpt1Id8Wdo8OzgXhyrjmmZbI7PeKjXX3VEByo8wFer9cFdVsWiaRLz0H5YJ0NS7QEAY/640?from=appmsg)

Opus 4.6 / 4.5 画 svg     好了，别人的测试看完了。我当然也得是：自己上手，开始干活！

05
##  复刻纪念碑谷
上学的时候，我有段时间一直沉迷于手机上的纪念碑谷。主要是喜欢它的画面、关卡设计，还有配乐。于是第一个任务，我让便 K3 尝试来复刻它。

在确认它知道埃舍尔式的不可能几何后，我告诉 K3 说：

“    现在，我要使用网页复刻这款游戏，先梳理一套实现方案，包括技术选型。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnrBu27LIvLLeia26yXZahNLiblhhx0ictfLAOicJsoVvPUrd5zGkLCLnwuNnnNPg9FHxp1hTG2eKuU8kaktKyprkJpeI67963RiaU4/640?from=appmsg)

K3 拆解纪念碑谷     它想了一分多钟，把这个游戏最要命的几个点拆了出来：不可能几何（3D 里没接上的路，在固定正交视角下屏幕坐标重合就算连通）、机关旋转时实时变化的可行走路径、角色跟着平台一起转的骑乘运动。还特意强调了一句：玩家不能旋转相机，这是原作的铁律。

第一版做出来是这样，有了基本的角色和场景元素，不过比较朴素：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFmuHY5WBoVnc7qxr3Z0rsXjcGv2rv1gt6PicGEgZqibM8W9SvIcECp7ia3E3LS5CKnUV8BpFSTeu1ZCw1UwPNm0n3pYo9xE7VskBI/640?from=appmsg)

第一版比较朴素     于是我让它优化了一下场景和布局，加了草甸、云朵、蝴蝶和小旗子，一下就细腻了很多：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFlRvb0jdlD4TOdRp8BX4VWBSue3CvMktPkunPz8BpkkWpOd06YV63octQItBm3oXHPhwLX6g0PosTG5bZIhBnPic9b7V8S4MmCM/640?from=appmsg)

优化后的画面     然后又让它增加了一些复杂的关卡，这次有爬梯子、转轮盘的机关联动：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlYF2AiaiakFdJy6MKRdibzLOdamMatSYBjuibTibFqLXY50g2n8vvfUxBQK1AoaqUdvjembWSibcNzoyxa4CUjibXk5tqXnfl6ebFgJU/640?from=appmsg)

第六章双塔     最终它一共做出了六个章节，还配了个章节选择页：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkoKlcIgY4IJYrn7nszmAbeoz08riaYxFIibn4QdUhr2sicAbJHmKQ9jxmOupHKk99X43EBd8IiaeK1R172ibDrLUibLqA9CIeea7zw8/640?from=appmsg)

六个完整章节     完整六章的通关过程如下：

同样的提示词，我又拿去跑了 Fable 5、Claude Opus 4.8 和 GPT-5.6 Sol。

先说 Fable 5。它很懂事地起了个原创名字叫「幻境谷」，还自己抓了三个 bug：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFmK1EGMbuIHEvuOhneYWmYwK5DhdzD4Ks6xdLHwYOjDmvMicF5MsiacsBxdhY14jYuwiaKGJVr87qNTrKOYNTNAiabibK617cGFPUWI/640?from=appmsg)

Fable 5 的幻境谷

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFltgCbvhvn7sdz4nzWqib54ia8y6slozb22ec7I2H9XbC27BfDKSxs4oZefo7ia4bQzVnicUUkr3LDQhdpGVcQlbVwSEp1Pz3CO7Gk/640?from=appmsg)

Fable 5 成品     画面显然还是很精美的。但有些细节，比如成功时的一些视觉特效、关卡的实现，以及画面整体的美感和游戏的体感上，我的评价是 K3 还是显著要比 Fable 好很多。

且 K3 一次完成了六关，Fable 5 可能知道自己贵吧……只做了一关。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/ZKqVLiaIpzFmp92xKpEpMO1Tlzkaoj9WQ6hy4bRfrO2NeRPLCnvEk1VnIonwod9eOjJ3mJicIInD8T0lVL2Sj7fORAgTWw9OCG2fP3sHGlwYM/640?from=appmsg)

Fable 5 实机演示     Opus 4.8 的结果，则有点一言难尽，生成的画面比较挤，而且很是抽象：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFnYrkicpDaHIJJuudOtJoekQicrte0J9489s9sO4qbnyVmpfzQknohZ74uORbvp5MNA9Zx6q7vicGftc0E2EcqQJgf1PNEvMQgb1s/640?from=appmsg)

Opus 4.8 的版本     GPT-5.6 Sol 的画面则偏写实，相比原作更加立体，但稍显杂乱，还原度不如 K3：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnvPcibibyfaEoVvgufmtbGKaXwwwZNp6LrUyPtbfJHciakcYezEYFFaSlDSnfxkibFBSbdr38DNsQnqX07ZP8XqSe6fayn5wsYYrA/640?from=appmsg)

GPT-5.6 Sol 的版本     06
##  抢滩登陆
第二个任务，依旧是游戏，经典的抢滩登陆。这游戏其实我自己没玩过，但我舍友当年是真的经常通宵地在玩……

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFnejzbwjkvTngJcibdcz0E57kQbhSUMZeA3YHakMS9TcuqFGD4tOwJ8reuA6Owwdq9o6ohssjp5LTXYpZeBfcvA6N3XvPSG1Awo/640?from=appmsg)

抢滩登陆任务下达     虽然我把射击打成了「设计」……好在它看懂了）：

“    开发一款第一人称设计游戏，类似于抢滩登陆那种，可以切换各种武器，支持瞄准，装弹。敌人设置不同的难度，随着时间推移难度增加，画风偏向于二战风格。重点要突出 3D 效果，击败特效、掉血等反馈。先不要求游戏有太长的流程，重点先实现基础玩法和画面体验。先梳理方案，等我确认再开发

这次 K3 一共 thinking 了 23 次、调了 48 个工具：将 Three.js 下载到本地避免 CDN 依赖，WebGL 创建失败自己换 SwiftShader 软渲染重试，最后还用 puppeteer 驱动我本机的 Chrome，按真实时间跑游戏截图自行排查……

成品如下：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFkvxdpMCj4uThsFwQREicNSPaxkkw3JrBGg1y1jfmxGlfIKb8nRAIAOD7KJlZTLJxhUVCyqse88478rAVCdibFmxHZia3ZXH5UVUg/640?from=appmsg)

抢滩登陆实机画面     三把武器（Kar98k 步枪、MG42 机枪、Panzerfaust 火箭筒）各有独立的伤害、射速、后坐力和换弹时间；敌人分普通兵、蛇形走位的老兵和精英兵，波次越往后数量、血量、速度全面上升。击杀有血雾和粒子爆散，命中区分头部和身体，低血量还有红晕脉冲警示……

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmUMlIe2R7LjaHMV7dBZHCzJZRHfcibkoKFJUqrFxrBse7uxqmyNJPPh1zg6LplMqwiceONHom2ia3VWlFI56Pp9X4pkw88YW17cI/640?from=appmsg)

完成汇报     音效全部用 WebAudio 程序合成，零外部素材。它甚至在无头 Chrome 里实机跑了 120 秒确认零报错，自己打到了第 2 波、击杀了足足 22 个才收工……怎么感觉有点贪玩。

但它是真的能教会这个游戏的门外汉，把子弹数、换弹时间、敌人难度这些因素一个个都有考虑周全，做出一个可玩性不低的游戏。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/ZKqVLiaIpzFlGvAGBjZ9vaIxaHgOmoTC0zzTsIaHJnW4vDibyPHiavjfpYKgibe4oyWqgTL9tCWkFxUCzcprC4hHsibdZkTKHJfkwtQqXmebY6t4/640?from=appmsg)

MG42 扫射实录     07
##  Blender 渲染吉他
在 ChatGPT 发布之前，我曾想这行业是不是快不行了要不改个行……于是我还特意置办了一把 TA 的电琴并且平均每天 2 小时+ 都花在撸琴上，之前甚至能完整弹下（不是弹好……）Comfortably Numb 和 Hotel California 等名曲。

但现在，我可能连弹个《小星星》都有点困难了……

而最近，我在用 Blender 做点经典吉他的模型，想着要不搞点 3D 打印。那我就想，要不先用 K3 渲染一套吉他模型，放到网页上展示看看，要支持 3D 多角度旋转，可以查看细节。

于是我让 K3 用 Blender 试着渲染几把吉他：

“    我是一名吉他爱好者，现在，想用 blender 渲染 5 种类型最受欢迎的吉他，最具有代表性的，方便我放到网页中展示，可以旋转角度查看细节。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFnSR3AGicQlhRcDDGx2UxvibEL3Ioav4pFyAJYoOcdWCleTv5v7WLjPhoEV0MwKyEFJpvyl1NibaJGIC5M9kEsJwUVDZAOCv7j1ics/640?from=appmsg)

Blender 建模过程     有个意外是，这次的任务途中 Blender 还被 K3 给干崩了一次，好在 K3 自己重启了 Blender 接着继续干，且会读自己的渲染图自查。

看到改进后给自己还会来上一句：Big improvement!

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnsz0YZ1XlzAyeJq983WMxqI7vSQVqcDp6K2c8p9j3iaiaW3ammwEg1WQdSrnvib0t8SD1KYhVic2g1qSS09mEficYrolXAyWYRUY6Y/640?from=appmsg)

给自己叫好     ……

渲染结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFn4pjPLbiaZH8jBO62jyFzdWMl9Ddz8lTzTYCxWzjuJfvGQClBs8Uj14scIZ49N4O43ajicZnXFicMh1x2DTaKgthSLkM0Zk02z9o/640?from=appmsg)

Blender 里的五把吉他     古典、民谣 Dreadnought、Stratocaster、Les Paul、半空心 ES-335，五把全部齐活。

除了模型，它还直接生成了一个展示页面，每把琴都能拖动旋转、滚轮缩放：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnyhGctuRT0R2ib7iajxOa1p5qzicPxFKHKhqIunicibmGyFtVCsMHa1U0oJL634IRicTJKlO1MxOFkmng0AYGibUGVyqdKmbJQoaics64/640?from=appmsg)

吉他 3D 展廊     不过初版渲染出来的吉他，其实有些箱体和尺寸问题，还是需要再调整一下。于是第二轮，我便明示它要给自己找个裁判：

“    几把电吉他的形状长得不太对，尤其是箱体。请找一个子agent作为裁判和参考的吉他形状进行对比点评，然后你反复修正，直到没有特别大的问题

裁判子 agent 拿真琴照片按品丝标定测量，三把电吉他全部判了 FAIL：颈袋上沿过高、琴角拓扑错误、腰线错位……然后 K3 按裁判给的控制点一处处改。

第二轮在 Blender 里看着已经显然要好了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmaUp4oXDIhZQkkxDnDlXCkhPzD4eSfM9laumuDtIG6VPPDMlTb2dQ64STXTM5uzcB4xvKkfPf6egGEINng2KgWy85vRlq8B6Y/640?from=appmsg)

第二轮修正后     K3 跑这种长任务是真的久，对应的也就要等很久（显然也不可能一直盯着看）。最后跑完的成品，是一个深色的 3D 展廊页面，五把琴的形体和质感都上了一个台阶：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFk0g0ibry0ianSENBdXMRUHTwrkvIuO58Yf06eglje9Zic5cejfR1PcdickMObibEdapAlFgzz4QOye2KGqDSo3InCSUxnr4t6I89HI/640?from=appmsg)

第二轮的 3D 展廊

![图片](https://mmbiz.qpic.cn/mmbiz_gif/ZKqVLiaIpzFmoSFzb9HSXGia4O6tNm6L2rNYrcbxjkrmdaicxjDvz9TccHSxIwOv7S0KIBtr0bzQ0yhePUDquqDFpyzyqupd29eL0ib5br2KTMs/640?from=appmsg)

吉他展廊实机旋转     08
##  3D 摇滚演唱会
我想，单把吉他还是太单调了，还是要在乐队里躁起来。

于是我换了个玩法：先让 Kimi 帮我生成一条指令，要求做一个能在浏览器里跑的 3D 摇滚演唱会现场，然后把这条指令原样扔给 K3。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFlBy28Zy0GWMLboDJn79ZjqezjiapyJG393HbicYnKZ45EbS608ZibwfVuic9hekEWOtGLRQcm9kTicboeDoowKz23F32PB1rUFRqco/640?from=appmsg)

Kimi 生成的演唱会指令     这条指令的要求可以说是相当之苛刻：Web Audio 程序化合成一段摇滚乐段，鼓、贝斯、失真电吉他分轨编排；十来个摇头电脑灯的体积光束，副歌展开扇形激光；2000 名以上的观众随节拍跳跃，相位还要随机错开避免整齐划一的假感……目标是：   打开页面 1 秒内就让人哇出来   。

第一轮它 thinking 了 46 次、调用 100 个工具，并行派发了 5 个模块的开发任务，验收时对着 17 张分场景截图逐轮修问题，最后还自己调 Cloudflare 的 API 建 DNS 记录、配好 nginx，直接部署上了线（过程中它还识破了我本机代理的 fake-ip 拦截……）。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFnV4jyaPiafolBVoqiaovTVnThOVL1FTjnPic1pc55iab1X438rGxeujvvxc8axWPbGibPswCB6SWcCPL4wzchK33dGFUiby163PqmKg/640?from=appmsg)

第一轮完成汇报     之后一共跑了三轮，每轮我都提了一些改进。第二轮把观众从胶囊体换成人形，它连「手机要举过头顶所以灯的高度从 1.9 抬到 2.0」这种细节都自己给想到了；第三轮我嫌乐手「像是搭积木搭出来的」，它便把所有方体零件换成了胶囊体和球体的组合，顺手还修了一个频闪灯像白墙糊脸的穿帮。

最后这个视频还是非常自然（之燃）的：

超燃现场

我发群里后大家觉得真是太  躁  了……

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkcX9TCYZxMQvUjoZ3PLjgTIlzdJeM9clhp7Y3Jf7HoRTFzO8uRcTicRC7465lLQKW3fA4e5NibFBccdcq2NJZ9dnteLekEiaqiaIc/640?from=appmsg)

群友点评     但除了  躁  ……K3 也是真的吵。它甚至在半夜突然播放声音，把我给吵醒了……我电脑是把亮度调到最暗，然后睡觉时就这么跑着一批 case。

所以非要说 K3 有什么缺点，那对我来说可能就是它太吵人了，让我没有睡好。

09
##  Kimi K3 专题
我有个几年前做的 AI 资讯网站：https://agihunt.info。果然打开首页时，K3 已经毫不客气地霸占了榜单的一二三名和趋势榜的第一名：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnMicG81OEQUIAJsDjEqb145Pg140wYkK3EqQboJx0sT8mO0TjZZJkBNibuaXibmqrw1dHJHpZ5D6KnAgZBNEzS1dhUqbhdvRFAVA/640?from=appmsg)

K3 霸榜 agihunt 首页     但我突然发现有个问题：按我的预期，K3 应该只有榜单第一，你怎么能霸全榜呢？其他位置是诸如「Gemini-3.5 Pro 延期」这样的，而不是被你一家全部给霸占了啊……所以我就把这个问题扔给 K3，让它去排查：

“    下面几个 cluster 怎么没有聚上？请看一下是确实不应该聚上，还是说有什么地方需要改进。这里需要注意的是：如果你调整任何阈值或算法，那要评估会对其他 feed 带来的可能影响。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFl64q79rfnSLJPD2qb61CIGZzCYrrIB1vmfRqq9U5a0NuDnbjRlOIOBfAuwL8xzrfr5D1fvM7Xy4RicdpccVjhL6AZnvgOMYcGA/640?from=appmsg)

排查任务下达     不过一顿分析之后，K3 告诉我说，这确实是符合预期的。

因为我之前其实还加过一个逻辑：如果一个重大事件（比如模型发布）分为多个阶段，它们不要全部聚在一起，而是应该把发布前的剧透、网友的传言、正式发布的过程以及发布后的讨论，分为多个阶段，归为一个专题。所以它告诉我，是专题的逻辑出问题了：聚类本身没坏，坏的是专题的事件线，这几个簇本该串成一条「传闻到发布」的专题，现在关联字段全是空的。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkj1aBnR8ib5NSSERgTFibS9iapIqFv7uOKriciaD6kicZ0qjF1jqkNpCcuzfhAUv8fWjYmynP9DhXKVn4Z4RJaMFVYQs3bPKmQvEdAY/640?from=appmsg)

K3 排查结论     我大概也看了一下它的排查过程：哪些是先前有意为之的设计、哪些是真正的问题，还评估了改动对其他 feed 的影响如何。通常这样的活，我是不太放心给 Fable 和 GPT 5.6 之外的模型去做的，但这次看完 K3 的分析过程，我想我应该是能放心的，所以我告诉它：「干吧！」

但在过程中，我还是稍微有所防备和警惕地去观察，因为毕竟这可是直接让一个 AI 去操作生产环境啊！

当然，我也是有测试环境的，但我或者 AI 会经常图方便，直接就干生产了……（别学我）

最后，K3 把 14 个簇串成了一条从泄露到发布的 10 集事件线：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFl1aWv4CmBICBdAvBdEm7icEueyCvSRNJLHzNa5DibQkwzI5rwLPsSLMb1arjsUj83HaY7BDWHRI1tnKLjRBesfcmvYRsOS2QbiaA/640?from=appmsg)

10 集专题事件线     首页的 feed 里，也全都挂上了「专题第 N 集」的徽章：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFlic0ttBJ1vWibX1sLd7XbNhBAlIEu7mQgfMzcKrjqS8hjia8RxA6wGd5CpD6ukM4MYMFq9lbXbfZxJugGOZX2RN183SSyXjTDK7o/640?from=appmsg)

首页专题徽章     交付报告里它还主动交代了「三件需要你知道的事」，包括一个它自己拿不准的隐蔽 bug，建议我观察几天日志再说……

10
##  复活 Muse
最后这个，又再次回到吉他……是我最在意最有实用价值的一个。它其实也是我最早开始跑但最晚完成的一个。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmHUtdKVFwf9J2ahQLFkbPic494547k4AuybDziaaRlogwQaI8LAQnoxbVlo3P7emFMDic97XT8cic6oH98B7sjGtgw9Z9APrO5laI/640?from=appmsg)

Muse 配图（K3 给找到的）     如上图（K3 给我找来的图），你应该能感受到 Muse 或许真的是上一个时代的吉他谱软件了，它跑在 Windows 的较早版本的 OS （如 XP）上。Muse 非常好地支持国内广大吉他群体偏爱的简谱、六线谱记谱法，而不是五线谱（我看五线谱还真有些费劲……得开启 thinking 模式）。如果你不幸曾报过班学过木吉他买过《吉他入门三月通》等入门教程，那可能你看过的很多曲谱 90% 都是这个软件做的——至少在我高中开始学木吉他的时代是这样。

但现在这个软件已经很难用上了，而我也不再制作谱子也很少用到 muse 了，所以我其实不知道现在哪个软件更好用，偶尔用也是用 Guitar Pro 了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ZKqVLiaIpzFkKdnAbNvleKhLBakVYEZ1100nicEbeI6alHzR1KIAJCauYgUS77E0bV6yLpS8OB0WzIR0NskbEU90Ak47z14axRAAbFwjb4bw8/640?wx_fmt=jpeg)

“就行”的朋友     但我有个古早的名为 Mr.Rock 吉他朋友这几年总一直来找我，问我说你不是搞软件很厉害吗？就不能给我把 Muse 做好用一点？或者简单一点，只加一个可以一边编辑一边看谱的功能就行。

“就行”……哥，你不知道这软件是需要付费的吗？你自己用的也是盗版好吗，要给他加个功能可不是“就行”就行的……

虽然没有满口答应他，但我其实还是想给他个惊喜的。而这个任务，我几乎在每个新的强大模型发布后都会去测试一下，但真的是从来没有任何一个模型能符合我的要求。

我每次的指令基本都是：把 Muse 这个软件的使用文档（朋友发给我的 doc 文档）扔给模型，然后让它去网上搜索资料并进行复刻。当然，我只要求它只复刻好的地方，那些老旧的 Windows 风格图标就还是别保留了……不需要这么复古。

之前我用 Opus 4.8 制作并发布过一个版本，甚至还上线了：https://duet.agihunt.info/ （这个 case 确实没用 Fable 5 去跑……因为 Fable 跑这种任务还是太肉疼了）。但上线后我其实也没有发给朋友，因为交付质量上，还是没有过了我这一道关：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFkQqOGRrTl99Dvu7BjAHuyHhvAKsVE6bTJgVkSbibCZJgFFvU0j72ibWiaNGNME2D8Wq2cYh25DpWib63B71mSw7tBSZv304as01Qc/640?from=appmsg)

Opus 4.8 的版本     而这一次，K3 交出来的版本：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFn2Be8VDUP0YtibwBKub8zPWGQbsTZv5oSsk4Ve9UibKqb6MvwjpbQWzXLQfpANh8hVHRGiajibsG8iaCKQCaREBTTxoatbqrXqxc3s/640?from=appmsg)

K3 版 Duet 页面视图     对比看来，一个像 demo，一个已经像软件了。

过程中它还干了件我漏了的关键的事：左右双屏的实时编辑，左边改脚本、右边谱面实时刷新。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnUldbOxiax6qTA6omxIEQQaHWmjUBX5U8kyJ4pRWxKWW500T1Vic1dShibyCCZrniatJh0InVaHkVTsGhFp8SmhUdcHxvy7wOhWicw/640?from=appmsg)

初版交付     这是原版 Muse 没有、但我那位朋友一直想要的“就行”的功能：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFkTpm5iavDgEGduP7siaOffIUo9CjiaicibHLibaVqEBlvA7U5SQ0oRwpCjE6VrPvHFrm0vtu6gSya1ibAsaDUjk3RLq5xpFadGmvyboM/640?from=appmsg)

双屏展示     虽然我忘了提需求，但 K3 居然擅自做主，自己给做了……

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/ZKqVLiaIpzFlMFt1lKicguc0uKYOFSRensGb4jibbIicTsL7N44Q1A9HJD1p2p3MvFibxBfDtD7WmUCNZeG0WIXLebJy1icCngJCzS7Bt5o6CaneQ/640?from=appmsg)

左右分屏实时编辑     这一次的尝试，我觉得非常非常接近预期了。虽然也做了两三轮的打磨，但现在在我看来，基本已经达到可用的状态。我还没发布上线，因为还有一些细节需要调整，等我周末再微调好后再发布出去。

目前的功能我还录了个屏，可以看看（并提出指导意见）：

11
##  Coding Plan
前面的所有测试，除了 Muse 的复刻用的 Claude Code，其余我全程都是在 Kimi Code 中进行的。Mac 上安装 Kimi Code 非常简单，一行命令就好：

●    ●    ●

curl-fsSLhttps://code.kimi.com/kimi-code/install.sh    |    bash
└

（Windows……我还真不知道怎么装，你可以在 kimi.com 里问一下 Kimi。

装好后    /model    选择 K3 的模型便可。

建议你都去买个 Coding Plan（我的是每个月 699 元的那档，在犹豫要不再升一档），有可能后面……需要靠抢了（GLM 的 Coding Plan 我可是好不容易才弄到了一个的）。

这是我跑完这一堆 case 之后的用量：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFkfq157iachficqTKYMDicNouY86wZibyNFqmia7T8WZibTglTUu33ica53xRPWmGdDiagezGa3eE3iaIU07lhBuvbw9uch8olJsbhWofZ8/640?from=appmsg)

我的额度     一周的额度用掉了 40%，（我其实还跑了非常多的测试和实际的任务，强度和上两周 Fable 即将退出订阅差不多，只是这一篇文章实在是讲不完了……）。K3 真的是非常适合睡觉前输入指令，醒来收割结果（记得静音，别问我怎么知道的）。

12
##  写在最后
DeepSeek 的时刻，把中美模型（开闭源模型）之间曾经的差距大幅的缩小到：从那一刻起，开源，就等于中国。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/ZKqVLiaIpzFmtp4atpq03Lue7sjulCicxhhp9zcTxJTsJ6w9LRHNhgyEqoicgkh7oc1pblkGWG1WcjFVVk3z673LibW55qYltyBK7Q9AXTemxXY/640?from=appmsg)

现在 Kimi K3 再一次打造了大模型的 DeepSeek 时刻，而这个 2.0 版本的时刻，可以说是在正式宣告：

从今天起，开源等于中国，更等于最强大的模型。

◇ ◆ ◇

Kimi K3 官推：https://www.kimi.com/

LMArena 官方推文：https://x.com/arena/status/2077824029126504525

kimmonismus 的「DeepSeek 2.0 moment」推文：https://x.com/kimmonismus/status/2077836497739304968

K3 官方演示之黑洞卡冈图雅：https://blackhole-visualizer.ok.kimi.link/

Duet（Opus 4.8 旧版）：https://duet.agihunt.info/

Kimi K3 专题：  https://agihunt.info/story/19f6c8c08086222e658d8f14c23

## 来源

- 公众号：AGI Hunt
- [查看微信原文](https://mp.weixin.qq.com/s/zXtIUSjbtTTBvCZ5rTR_PQ)
