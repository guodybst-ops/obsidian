---
title: "Seed 开启持续进化，Fable 5 点评：Opus 4.8 水准、不比我差"
公众号: "AGI Hunt"
发布日期: 2026-07-16
抓取时间: 2026-07-18 21:43:01
类别: AI
自动检查结果: "B 存参考资料"
相关度评分: 10
命中词: ["AI", "学习"]
原始链接: "https://mp.weixin.qq.com/s/Cf841IWbjNReH_Rkz2SFXQ"
文章ID: "2453486640_1"
---

# Seed 开启持续进化，Fable 5 点评：Opus 4.8 水准、不比我差

三周前，我实测了刚发布的 Doubao Seed 2.1，并用它[从零到一，开源了一个大学生就业补贴的公益网站](https://mp.weixin.qq.com/s?__biz=MzA4NzgzMjA4MQ==&mid=2453486266&idx=1&sn=349f0b4ba72f273a22aacbfe70b125dc&scene=21#wechat_redirect)。

而三周后的今天，模型就再次更新了，并有了个新身份：   Doubao-Seed-Evolving   。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/ZKqVLiaIpzFkFqHdia80K0esDfpInUecbic9Csm2tbpcK5KruQYsw5DgibtWiaMCk7LGJv7ZZEUo5UVackCuvNSIQ0q4p4iawgZcoenGaQZRphZIw/640?wx_fmt=jpeg)

按官方的说法，这是一张「不断更新」的模型卡片：

“    我们会聚焦 Coding 和 Agent 场景，并以高频的速度升级。持续使用 Doubao-Seed-Evolving 的开发者，将感受到肉眼可见的模型进步速度。

统一的 Model ID，新版本自动生效，不用换模型名、不用迁移 Endpoint。接入一次，之后你手里的就一直是最新的模型。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/ZKqVLiaIpzFkhPVFEt3kcicDNun1gyrdl8Is9YXt0BCVyl5WicRibORia0UAKGrmplEmdDljPK0yEVibMMKmZeqQiaG4TPaxtibnq8TvriczJYmHsYZo/640?wx_fmt=jpeg)

而第一次升级也已经完成，官方给的三个点是：

上下文窗口扩大到    1M tokens   ； 长程任务 更稳定（在 Claude Code、Hermes、Openclaw 框架的开发者众测盲评中，质量评分显著超过上一代 Seed-2.1-pro）； tokens 效率提升 ，工具调用轮次更简洁。

说起「永远最新」这个……我是真有点感触的。

截止目前我都还一直在薅 OpenAI 的羊毛：给 OpenAI 贡献出我那自动化在跑的后台任务的数据后，我便能得到 11M / 天 的token 额度，这羊毛当然不薅白不薅。

但问题是每次 OpenAI 有新模型发布，我都得 换模型 ID、改脚本、重启服务 ……  手动去改一遍配置，甚至我还给自己搞了一条「首选＋两备选」的降级链（各种抠钱节省日常开支）。钱是省了，但各家模型名全是写死的模型号，每次升级都得动一遍。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmSxHYeSIgUJkdEjmGhhsy0fGx91ianyrVakKB1xUrbMwrUDlHT95ywK7QuR5xOCRyP9ZTINQo8BfL9HEUiad0iabqwxVZ9GONNrM/640?from=appmsg)

我的免费模型降级链，可以看出我已经懒很早且懒太久了……     而 Evolving 这样始终指向最新的方式，等于把这些活全免了。这真的是站在开发者角度换位思考过的，非常友好，建议所有模型厂商快速跟进学习。

01
##  如何接入
和上次一样，改个环境变量的事，   ~/.claude/settings.json    里加三行：

●    ●    ●

{
"env"    : {
"ANTHROPIC_AUTH_TOKEN"    :     "<你的 ARK API Key>"    ,
"ANTHROPIC_BASE_URL"    :     "https://ark.cn-beijing.volces.com/api/compatible"    ,
"ANTHROPIC_MODEL"    :     "doubao-seed-evolving"
}
}
└

只是这事我显然不会自己来干，我让 Claude Code 给我配了个    claude-seed-evolving    的快捷命令（我电脑里还躺着一排类似的命令，可以一键切换各家模型）。

启动后，还是多问一句「你是哪个模型」，确保无误：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFlxGSLP6TUmf7Lxm0ZBNEMicGlouiblTB65yxIkvQTnPyc6ic1RWHOdaI7azVStrgw6dEUJJ4lY1aQoibQibkUfVtUHdrCicxCWR2UMc/640?from=appmsg)

模型确认     好了，开始干活！

02
##  旧网站大改版
第一个 case，我自然是  条件反射的直接翻出了上次 Seed 2.1 pro 的旧账：

上次用 Seed 2.1 做补贴网站时，前端的第一版是有点点一言难尽的（丑……），在我提了一轮具体要求之后才算是基本过关。所以这次，我把同样的需求原样丢给了 Doubao-Seed-Evolving，不带任何附加指点：

“    现在请基于 data/policy_rows.json 里的政策数据，创建一个 React 单页应用（用 Vite + React），功能：
1. 首页展示一个搜索框＋城市筛选（按一线/新一线/二线分组）＋可信度筛选（高/中）
2. 搜索结果以卡片形式展示每条政策：城市、补贴项目名称、适用对象、补贴标准、申请渠道、可信度标签（高=绿色、中=黄色）、来源链接可点击
3. 注意要使用合理的配色（不要蓝紫色啥的）及响应式设计

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkS66QTpa32nwglHMsheMrfNTsNBOsR6JRPnVwTjiaM6a08s7D4KDySog1icqqLIH8XKuyVW21Kc3cNXibaneTbuNzWocibfLsicCgE/640?from=appmsg)

任务开跑     3 分 56 秒后，跑完了（算是很快了）。

它自己选了暖米白底＋赭石主色的配色方案，卡片、筛选、响应式设计……全都安排好了，甚至还贴心地交待了生产构建的产物大小：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFk8rb1nsewRXRNn0Y8JUVk1GnhqfWF0neHomTb1zpPaadCUYlIMaOppwZkkt9OQlkWdT1hCfmhu9Kibf4jib8kfL90cURoflBJlw/640?from=appmsg)

完成与配色说明     出来的效果是这样的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnR0ickwEZM5bLV78MV5FQkNuUfibzQHAqOLt7wWf8HxROnNB1pWiavI3XKrn9dKYpPhF1u2Wx1vSJFnwuUbZ735yWb5eFYQFf99A/640?from=appmsg)

新版首页     而上次那个被我指点过一轮之后的版本，则长这样：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmn25ogBP268t7BHcGUibFqgW08VhL8omuOVhwJ3cIe9ObXEohib1Gw6XbWLs3BADP7ry3e9JeDE3lGVNI4mclmWoibJIxKyKUYV4/640?from=appmsg)

上次的版本     对比之下，可以看出新模型还是非常之有点东西的，单就这个 case 来看，可以说确实进步神速，这三周是  真的  在 evolving。

如果你有兴趣，可以去试试原始数据（见文末 repo 链接）和指令，还可以试试其他的模型，我就偷个懶不一个个试了。模型在前端上的审美，甚至可以说已经不输 Opus 了（下面还有些 case）。

在确认其他功能上都没问题后，我便让它接着把 repo 和线上服务也一并进行更新：

“    可以可以，做得确实很好！请使用 gh 命令把 https://github.com/Johnixr/graduate-subsidy-guide 中的前端部分进行替换整理最新的方案，然后 SSH 到我的机器上完成服务的更新

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlebJib7YrQ9Q3Fp8ZkAz6ibkprB3bpPLph3mGqrttBPO3j4VgabxmnQf7cuZRaGfn2U1icSMUg2RQUANtdIdogSzD3ibicFjlcoo9I/640?from=appmsg)

部署指令     过程里还有些有意思的小细节：

构建完它看产物列表觉得不对劲，「啊，有问题」，自己怀疑自己排查了一轮，确认是    ls    把目录内文件也打印出来造成的错觉，然后发现是虚惊一场……然后想着把 node_modules 和 package-lock 加进    .gitignore   ，更新 README，再提交推送。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkqzKsAibctcg9DyNnnSGtwfkiaavQMFj9IwEibVxQ6KLkNHU7lWnwDsbWgkxibT9pZXUKGBjSauzdcNWxylKPEcwJjDXVskfkGA9M/640?from=appmsg)

部署过程     上线后，我也再次确认了下移动端响应式的设计：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/ZKqVLiaIpzFmu9Yey3wQtdCibViaWdYHDLxGWicagibpqNNk0doatic8YhaDznJqRhHic1NatYwdfljHZibIx6QeaRl4lFfkibSIbIwE9eia52LcGfBic0/640?from=appmsg)

移动端效果     03
##  营销号清理
不过前端毕竟只是技术里的一个小领域，虽然前端最容易打动人类这种视觉动物……但实操中稳不稳，往往还得看后端、算法、数据、运维、安全、架构、质量等这些不那么“靠前”的幕后综合性任务。

正好，我手里攒着一个拖了两年的活……

这个活的背景是：我为了提高自己获取 AI 信息的效率，大约三年前（ChatGPT 发布后一个月吧）就一直在持续采集十几个平台的 AI 内容然后用 AI 进行整理和汇总，并全都放进了我自用的网站 https://agihunt.info 里。量级上每天约采集 2 万条，时效上稳定保持在 30 秒内。也就是说，如果 Sam Altman 发了个帖子，15 秒左右我的 AI 就能监测到。

而这批被采集的账号不是固定的，我有做了些新账号的自动发现机制，也（曾经激进放开）让网友自己添加了些想监测和关注的号，目前累计已经有约 5000 个 x 的 AI 账号，几乎把全球的 AI 研究员和从业者全给覆盖上了。

但这两年过程中总有人带着些非常标题党的截图来质问我：怎么这么水的内容也被你采进来了，能不能智能点清理一下？我自然是每次都痛快地答应说好好好，然后……一直 delay 到了现在。

正好上周末又被催了，我也确实忍了那么几个号很久了，索性就想把这批号汏换一轮。而 X 平台的账号最多、内容最多、营销号也最多，我便尝试让 Seed-Evolving 从它开始：

“    请帮我看一下，我目前在追踪的的几千个 X 的 AI 博主中，哪一些是营销号需要取关的？这些对我来说价值不大

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFkGgApXyANNL4LDibd0QKQoNIYlzMn1zzAANFAEicXSCJw8UiaHMlRX91Qg1mhdb8CzH2Shb9gxibCNBg2DMvcLI9clxJwYy0Xj6Zo/640?from=appmsg)

清理任务开跑     Seed-Evolving 的做法是：先把近几天内活跃的    2745 个账号、99801 条推文   的数据拉出来，写了个打分制的分类器。

初版跑完后，它自己主动查了一遍，发现有些误伤和漏判：把「Affiliate Assistant Prof」这种学术头衔当成了联盟营销，「go viral」「DM for collabs」这类营销词的权重又给低了……

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmCfb3zWIUjyqBt0601Kqicibx0dCNsgL2I3utBwIJQqMOutMlnq48K4XPQic7LNX00XI0Ribg9IiaCY7H1DMwkxNPoS5I9eqHvuVfM/640?from=appmsg)

排查误伤与漏判     接下来的过程还是挺有些意思的。它一版一版地修正则、调权重，嘴里念念有词的各种 碳言碳语 式判断：「研究员/大厂员工即使有 DM for collab 也必须降分」「真人有真互动要保底」「Founder of Sentient ＋ We make you go viral，被 founder 洗白了」……

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlQO60nicbKSSIcLAYQ6m7IHr8FKUR1pMr7nQJbDZe7oa8tFf3WFJwITyDJKdIh74e7nTjH2N4jWiaRia8yIYZZu3yECcDX9mQnDE/640?from=appmsg)

修正判定规则     对于几个边界账号，它也没有硬判，而是拉了白名单留给我来人工核对。像 Paul Triolo 这种正经的地缘政治分析员，差点因为推文带链接的占比 100% 被误杀，被它按边界处理捞了回来……

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlZXicTYLaibuqXdVwUdXqo9tVQtSaavzC5eS3DuZmicCiboAJqibgnygwF13UPvo7iamOhm5nASLTNxKSK2m1gW1ex0k1ZiaYvjAhfTw/640?from=appmsg)

边界账号处理     最终结果：初筛出的 2745 个嫌疑活跃账号中命中 27 个。   15 个强烈建议取关   （典型营销/割韭菜号）、7 个倾向取关、5 个它拿不准，备注了「需要你本人瞄一眼」。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlicQmusbw0wr8M5Fr3z77fDksJ9fopQs4CQZI4gm9SXdmVL2EicicibhHUmmNfR766TrVibbX8ibSnSkIR9U1eL1R2ibwR4PDS1Ff8pg/640?from=appmsg)

强烈取关清单     中文账号我还是打个码吧……要有不小心没打上的您要看到了那就是 seed 的幻觉 seed 的锅千万不能怪我！

![图片](https://res.wx.qq.com/t/wx_fed/we-emoji/res/assets/newemoji/Yellowdog.png)

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnk3XvC2PVSWWibNUiaaG6f2gR6uhBylpBqqchjmgkOFzZHfnsD44rjDh7pgiaqowJ9QDfu2DpNuKQPQBjicJOIZ1q8y1lLqq27srE/640?from=appmsg)

倾向取关与人工核     我抽查了几个 A 档的，可以说一抓一个准……比如这位，bio 里，居然明晃晃入写着代写文章、品牌策划服务：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFk9sibltvmxPRhyFLyGv6AJypcU2GDYYvMa7f2dVRHTtkKjjpzWp7bB6w0icxa1PZwmCib2COKmFJaHlsSZK5ZoKJP3MLZgTzWYro/640?from=appmsg)

营销号样本一     还有这位横幅上直接挂着「DM for paid collab」的：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFmzvkibzRWVYY5SxGNT23RVajkYHicKwlmH9RHyrc2g5NH1IU48ZjyFVNY3qG5JhPWApUN9k3qHD6mqUdRGia5A8ZCJMDX93322Uc/640?from=appmsg)

营销号样本二     我索性还让它把结果做成一个页面，方便我挨个核对和跳转主页：

“    请制作一个 HTML 页面，我可以打开去查看你建议的这些账号，并且标明对应的理由和相关的数据，同时我可以点击去前往他的主页

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFkZ81ichQfmMNicLFCibc5vbYK89EgRj1zWFrZYBxemORib7iaYrU2CtB0ZPfhTA0bttkFmrVL6nFHpFb7veqM1GL3KGKhHTPmicqibwU/640?from=appmsg)

核对页面     （Double Check：审美属实进化了）

我照着单子过了一遍后，果断把该取关的都取关了。世界仿佛一下子清静了不少，也算是把欠了两年的债还上了……（有在使用我网站的朋友，可以留意一下最近内容的质量是不是有改善）

04
##  AI Lab 招聘分析
我在 agihunt 上有个招聘页 /jobs，会一直采集和监测 OpenAI、Anthropic、DeepMind 这些前沿 AI Lab 的官网职位变动，再用 AI 来观察各家 AI Lab 的动向：谁在扩张、谁在收缩、招聘重心从研究挪向了产品还是安全。其实都是很好的行业前瞻信号，我的机制人每天都会发我一份日报，我几乎每天都会翻开来看一下（有需要的吗？）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnuXWh7nTZUGXicnTJciahicIQHvWF28IpcRbZx34icB5zJZjbhcGoNscRjZLJKatNdK0j2kTBM6GeOiaVZMhXXkyxaV1BT0LspxCgA/640?from=appmsg)

原招聘页     但在采的公司一直是 19 家（Fable 一把梭干的），但其实如果仔细一看，便会发现显然漏了几家（比如字节自己居然都没在……我强烈怀疑是 Fable 太小心眼故意的）。于是我把任务交给了 Seed-Evolving：

“    看一下我们目前在采集的 jobs 里面的公司招聘官网都有哪几家，然后全面分析、调研一下，还有哪一些是我们需要去采集但目前没有采的。当然你要判断好，应该选择比较重要、值得去采集的，用来判断 Frontier AI Lab 在招聘上的一些变动；那些无关紧要的就没必要采了。找好之后先给我确认一下，没问题的话，就把他们的采集也加上，加到 Jobs 页面里

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmyzGPxXGVvHC8ic79g3reZKcqfHhicfic7v9Bj4y1fPzbkGlRibhicBR3ib8mgPE3oWYOMdw7cvndkBYF9Y8X5vZFPNasELTqQCuOns/640?from=appmsg)

扩容任务下达     这个任务的难度在于指令很是模糊：哪些算 Frontier AI Lab、哪些值得采、技术上能不能采到，我都不管……全都得它自己去判断和验证（高级打工人不就得这样吗！）。

而 Seed-Evolving 的应对方式是拆子 agent：一个先摸清现有 19 家的采集方式，另一个在后台跑了 29 分钟，挨家去验证各公司招聘系统的接口是否真实可访问能采集到。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnNiakSasfq0JACMq0Pt7LJv2RfYibLqH2lmapBH7pV1u2B0x4IgEMDyYydtyTcWjFep7bmycgF81TSZ60LXMu0Ny5RgFD3074hQ/640?from=appmsg)

子 agent 调研中     调研回来的结论，是这样的一份清单：建议新增 12 家（海外 7 家、国内 5 家——字节也带上了），每家都带岗位数、招聘系统类型和入选理由：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFnRUmBxhPts7UIXiaGEIObXOrfXn2y2kRSQxA5aCGr5DATbfV3qk5zmOuEvupB04UPebxfkaVJ9PKkjeCGpZzbRVfOGLbvBUOyg/640?from=appmsg)

新增公司清单     这里还有点意思的是「明确不建议加的」那部分：Stability AI 只剩 3 个岗且大幅裁员，Databricks 783 个岗里只有约 7 个前沿研究、信噪比差……

它甚至还单独留了个疑问给我：Qwen 毫无疑问该采，但阿里用的 Moka 加密 API 没挖到 siteId，问我是先跳过，还是这次就硬挖出来？

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkTOozicmUGQfKa8cR0f9Fe4P1Xb8fk3bBSESotY5Rj3XxxjMZ9B7whyHOl16XiaqWLqsd41CHmEiaFJzonIpmGsvQBw5hQKvdfOU/640?from=appmsg)

不建议项与遗留疑问     我当然是全都要啊！

“      1.    全加 2. 补 3. 硬挖。

然后……它就全干完了（在上一轮已经打好的数据采集的基础，这把显然快了很多）：13 家全部上线，新增    1829 个在招岗位   ，招聘页现在是 32 家公司、约 6000 个岗位。

还有个细节是，字节因为全集团岗位上万，它还聪明地用关键词加正则筛出了 940 个真正的前沿岗（基础模型/预训练/多模态/Seed/豆包/infra 等）；而被要求「硬挖」的 Qwen，它最后也没死磕 Moka，而是找到了阿里自研的招聘 portal，走 cookie＋XSRF 流程拿到了 28 个岗位，且确实全是千问团队的 JD。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFlDXI9bicshcdIib9aBfBvgUibiaPZ8r2tfQ1NvticTk2DXTMNibRjuQKRVQlqT8ZskXibDz7JibEdOQvzPFn2DpeNoWTPUPpP39lRPT7I/640?from=appmsg)

最终交付清单     交付的同时还给我了备注，给我说明执行口径：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFm47hJDN4l1QrFgKkeyyAXYRvRJVSibSQKvLFibMGwny9jy85gm1vWOU0WgPX7KUGEP4AmNVxaw75a9gsD4dwmdBJU99zkkmaysU/640?from=appmsg)

交付备注     来看下新版招聘页，一排新公司的职位采集已经上线：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFkUVP1CZibUPHPudxlnE56lMicZyvpJMgO8MXO0ho5NGNRbkc2h065nCAiacY64OIWghVrbtzb0cYGhl4xqtmPTTeibXicOT7NORH8g/640?from=appmsg)

新版招聘页     05
##  logo 返工
当然，如果你细心看，会发现还是有些翻车的地方（上次的 Fable 也翻了些不一样的车，有几空公司的 logo 缩放不对，只有小小的一个点，我后来让给改好了）。

新公司上线后我扫了一眼页面，发现有几家的 logo 明显不对，居然是个纯色方块。

我自然也是继续让它来：

“    但好像有几家的 logo 你找的是纯色的啊，是不是没找对？你要查看下图片来判断啊，不对得重新找！

Seed-Evolving 表示：字节、腾讯、商汤三家因为 Google favicon 被拦了，所以它用生成的品牌色字母块顶了位……

然后，就到了 Seed 展示其视觉能力的环节了：它把 13 张 logo 图片文件挨个「亲眼」看了一遍，给出的全是用眼睛看过的纯视觉判断：cohere 这张「像 Figma 多色圆」、cerebras「像 WiFi 波纹的 C」、pika「像熊猫剪影」、qwen 是「紫 T 字母，不像 Q」……

盘点下来后给出的结论是，3 张它自己的占位块必须换，5 张 favicon 长得不像正经 logo 需要重新找，5 张确认没问题。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFmKvoW5z59eWP8eDlWCKIMfaueTNBbNxrgDia1nJHATqLUMm7eTHAw73KNUxgA02MAQd2FYO0PG4x5TQVE4ewgRbvr0xTMsDFVk/640?from=appmsg)

logo 逐张盘点     这里其实是 Seed 的另一个看家能力： VLM 。豆包系模型的视觉理解确实一直都是国内领先的水平，且在我实测的许多场景下并不差于 Gemini。

而  有人可能会想，视觉理解能力和 Coding 有什么关系呢？  这关系还真的非常之大，  Agent 在实际干活时，能「 自己看一眼图对不对 」是个必备技能：验收 UI、截图  核对  、看图标……全都得靠这双眼睛，是 /goal 达成的必须 verify 的条件。

接下来的排障过程，就有点漫长而（对人类而言的）无聊了：本地网络连不上 wikimedia 和 simpleicons，它便 ssh 到我的海外服务器上去下载；SVG 转 PNG 缺 cairo 原生库，装了 cairosvg 还是找不到 dylib，换 rsvg-convert 搞定；商汤的国内站不通，于是又绕去了香港站……

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFmAku1ickUrSct2TG3O6Ye39A5cPw5L9C27afhx3MX5mIrhEicxmf2Mc00lSnIlWSaD8hFicBpNnWhvxHwuw76DexiaibvEf8LAQTro/640?from=appmsg)

logo 排障中     最终，13 家 logo 全部换成了真品牌图标。

换完它还又 亲眼复验了一遍新的图 ：字节是「蓝色音符」、腾讯「蓝白太极球」、商汤「红黄飘带 S」，连 genmo 和 minimax 两张只有 32/48px 的小图，都给升采样到了 128px（居然没踩之前 Fable 踩过的坑）。

然后才提交上线：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFk0BVWun2Hut8zia7ESelxrS2iap9310vQe9yiauJHORibPFuXYV7xbBr5SSqwxtRybIMLoicOE42ZMn25LBqwvCZH2ZCAA0Ox9EPoA/640?wx_fmt=png&from=appmsg)

而为了避免前端 cache 导致我看不到最新的，它还特意加了个 cache-bust 参数让浏览器强制换新：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFn54raPUkDsI9jZ7oP03kEU5rTFjuHziaiborNpy3kXdJ0OybBIzEG2qB6LEnjYeBGwlyhPgjYq9yluTMnkzKIntV44PWdSheSFo/640?from=appmsg)

logo 修复完成     我还让它自己统计了下工具调用量：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkcK8eDoenofibU0Qo6FDKVAicpVdicm7U1hayDpd9nnlic0NzxLib0SVKicES950INFNHIhKu5lJPYNUcUbeQgCEuDjTVD3ekUibMXMc/640?from=appmsg)

工具调用统计     Seed-Evolving 给来的结论是：这一整个 jobs 任务跑下来，四轮对话，工具调用一共    388 次   （光调研那个子 agent 就单跑了 260 次），果真是够长的「长程任务」了。

06
##  Fable 裁判
活干完了，我起了个坏心思：要不让 Fable 5 来 review 一下 Seed-Evolving 的工作质量如何：

“    有一个 AI 完成了我的任务后总结说：已提交并 push:482c0d1 feat(jobs): 新增 13 家 Frontier AI Lab 采集。
请 review 一下它的工作质量，指点一番，并和你自己的能力进行下对比有什么做的好的或差的地方

Fable 也没客气，先跑了十几条命令，把这个 commit 的实际内容和周边约定都摸了一遍：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFmFOOLcia8kLG0Zed0lUujJnrpWP1Fq5YHoLM8ib1rW7ZjJibvTib78bGcXnpVdRVAtvdUqaXXpC4IyhgbchmEod75y8hAyIW4zOMU/640?from=appmsg)

Fable 开始 review     在一顿分析后，Fable 5 给出的评价是：   代码质量相当高   ，13 家里 12 家的新采集器对真实接口跑冒烟测试全部一次通过；但收尾处的纪律有些短板：部署状态没说清、排序序号撞了现有数据、文档没同步。总分 B+，核心难点漂亮，外围粗糙。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFn8mjuf6Jat8xEgWN9ryvhLaFOR4CqJ1NEhZEmPIn2R4YXvUwUuWic4utkSNY0T7YAPicwsoiabMPPe6KcK7gNBffU0KBxhib5Mmt0/640?from=appmsg)

Fable 的结论     而在「和我自己比」这一段，Fable 的原话是：

“    说实话，最难的部分它   不比我差   ：接口逆向一次到位靠的是真实测，这是硬功夫，换我做法也一样。差距在收尾纪律，这恰是可复制的习惯而非能力。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFktia8QQic2Z0mIodnyibMbuibpDpiavLWQ9w1DicjMicXPxB9wsagia8SSuTp7iceIqlzcOfRqpJE0biaG3RxTVfGniaMUWc25j4gqzczXlk/640?from=appmsg)

和我自己比     我又追了一刀：

“    那这个模型的交付质量，和你的小弟 Opus 4.8 相比的话，会是怎么样的呢？谁更能胜出？公平点地说啊，不允许偏心！！！

Fable 先坦白了前提：单看 commit 没法鉴定出自哪个模型，单样本噪音很大，听个大概就好。然后给出核心判断：

“    这活儿的水平就在 Opus 4.8 的正常发挥区间内，不高也不低。……所以裁决是：这份交付 ≈ Opus 4.8 标准水平。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFk7VxHzTB9RVnFwvNN4Ylb8jgk8EosbicwprWCODYCm70YMlKj4j19sm9R8A5W784ARw5CupMLAKyiaQleOqOuvEWxLGvX9dhdibc/640?from=appmsg)

Fable 对比 Opus 4.8     它还补充说，做错的那几条基本都不算能力问题，而是纪律问题：

“    这四条，任何模型状态不好、上下文快满、或者没被要求验证时都会犯——   包括我   。

一个模型对另一个模型的惺惺相惜（？），大家自行感受一下。

（当然，这样的评测不太严谨，仅供参考了……）

07
##  跑完欠费
最后说说价格。

上次测试    doubao-seed-2-1-pro-preview    时我充了 200 块结果全程只用了 20 块，后来我又偶尔用用还剩下 100 出头。这次我就没再充，直接拿余额开跑：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZKqVLiaIpzFlfSL1KLJfWGpZQuJJhJukKgkuMUXUTCJ0n5A0KMOkDC1jv0DOMJ5SqLtwcNRuwZMuIZmN159pcdCa7ye4UcFIOK9InUicJmDOM/640?from=appmsg)

初始余额     然后上面这些 case 全部跑完后……终于给干成欠费了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFkTvq7ljwjiaLFa0xnicJThSCwZd9CLLRCwxYGQCibNqicAibhRNdQicb58nAMWTuMZB3ibt5ib3j5nVbmbyj2U9ckXHVAELHq835ibV5oM/640?from=appmsg)

欠费通知     从 100.71 到 -6.39，共花费约 107 块钱。

听起来好像也不算太便宜？不过今天的工作是一个完整的前端项目重做加部署、一次几千多个账号的数据分析工程、一个 388 次工具调用的长程采集项目。这要是换 Opus 来干，以我对 ccusage 的使用经验，100 美元应该是打不住的……

当然，我不够聪明的一点是……我忘了火山引擎还有个 9 块 9 包月的 Agent Plan，里面也已经上线了   Seed-Evolving 模型。

我是在跑完上面的测试后才买的，而且还莫名其妙地用了个优惠券实现 0 元购……

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZKqVLiaIpzFmRTLNS2RpdQNXNM2dr1z0vG6qjIHbawwHpWvtb5UkBc8h2GBtCNelffbOibFNn7OLQ8H9vo6KVKA9R1Ek4aHpqH7z5O4gcvBe8/640?wx_fmt=png&from=appmsg)

08
##  三周后的体感
7 月真是模型发布密到离谱的一个月：Grok 4.5、GPT-5.6、Meta Muse Spark 1.1、腾讯混元 Hy3、Seed-Evolving，可能还有憋着大招的 Opus 5.0 和其他蠢蠢欲动的模型……

而 Seed 这边，距离上次发布的    doubao-seed-2-1-pro-preview    只隔了三周。

仅用三周的时间，模型能力就得到了如此之大的提升，非常神速。在前端、后端、长程任务和工具的使用上，我的感受是已经非常之强。

如果说之前的   doubao-seed-2-1-pro-preview   偶然还能让我感受到和 cc 官方 opus 的差别（尤其前端），那此次的 Seed-Evolving 真的很难再有这方面差异的感受，非常多的任务我都能放心地交给它去做。

并且这种进步速度，是肉眼可见（审美）和明确感受（长程任务、速度）得到的。

字节在视频、图片的多模态生成上已经是后发居上的第一梯队（Seedance 排第一应该没什么人反对），如今再看它对 Coding 和 Agent 的重点投入，加上 Evolving 每周升级的发布方式，加上 seed 一直以来可抗衡 Gemini 的 VLM 视觉能力，我觉得真可以期待一下：

在 2026 年内的某一次进化之后，Seed-Evolving >= Fable 5。

到时候，我们再来让 Fable 当一次裁判，看它是否还会嘴硬。

最后，建议你还是亲自去试试，不要轻信他人（和我）。

◇ ◆ ◇

相关链接：

•     火山方舟 API：https://console.volcengine.com/ark

• 火山引擎 Agent Plan:   https://www.volcengine.com/activity/agentplan

•     补贴查询网站：https://subsidy.agihunt.info

•     GitHub 仓库：https://github.com/Johnixr/graduate-subsidy-guide

•     AGI Hunt 招聘页：https://agihunt.info/jobs

•     [实测 Seed 2.1：从零到一，开源一个大学生就业补贴的公益网站](https://mp.weixin.qq.com/s?__biz=MzA4NzgzMjA4MQ==&mid=2453486266&idx=1&sn=349f0b4ba72f273a22aacbfe70b125dc&scene=21#wechat_redirect)

## 来源

- 公众号：AGI Hunt
- [查看微信原文](https://mp.weixin.qq.com/s/Cf841IWbjNReH_Rkz2SFXQ)
