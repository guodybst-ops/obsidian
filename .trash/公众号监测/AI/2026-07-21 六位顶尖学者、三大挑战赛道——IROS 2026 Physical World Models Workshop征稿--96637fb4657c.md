---
title: "六位顶尖学者、三大挑战赛道——IROS 2026 Physical World Models Workshop征稿"
公众号: "量子位"
发布日期: 2026-07-21
抓取时间: 2026-07-21 16:51:45
类别: AI
自动检查结果: "B 存参考资料"
相关度评分: 10
命中词: ["AI", "学习", "智能体"]
原始链接: "https://mp.weixin.qq.com/s/rRdGg4BskRb7Vsr5cHOp8g"
文章ID: "2247905505_3"
---

# 六位顶尖学者、三大挑战赛道——IROS 2026 Physical World Models Workshop征稿

IROS 2026 Workshop 投稿
量子位 | 公众号 QbitAI

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/A6fTew8FFGEuQkdJOmH0srUkGj5SU8pb177pPia4fcl7zA54mjJlOeJuiaqwAKqPdLMSOx4UrpVm4hicFBlcKicia5GKO9TdRXUjic6icLfZwz4HOw/640?wx_fmt=png&from=appmsg)

2026年10月1日，IROS 2026 Workshop——   Physical World Models for Scaling Embodied AI   将在美国匹兹堡举行。论文征集现已开放，8月10日截止；WorldArena 2.0 Challenge三大赛道已于7月10日开赛，总奖金$7500。

-    时间：   2026年10月1日（周四）13：00–17：30

-    地点：   David L.Lawrence Convention Center, Pittsburgh, PA, USA（IROS 2026会场，线下举办）

-    论    文截止：   2026年8月10日（非存档·4页·双盲）

-    挑战赛截止：   2026年8月30日（已开赛）

-    官网：   physical-world-models.github.io/IROS2026

##  具身智能撞上“数据墙”
过去几年，大语言模型吃下了互联网级的文本，视觉基础模型吃下了数十亿量级的图像与视频。每一次能力跃迁的背后，都是一次数据规模的跃迁。

但轮到具身智能   （Embodied AI）   ，这条路突然变窄了。机器人学习需要的不是静态的文本和图片，而是   带动作、带反馈、带物理后果的交互经验   ——这样的数据，互联网上没有。

现有的三条获取路径，各有各的天花板。真机遥操作数据最真实，但一条一条采，贵、慢，永远覆盖不了长尾场景。传统仿真器可以无限生成，却受限于场景真实感与sim-to-real gap，策略换到真实世界常常失灵。互联网视频数量庞大，却只有观测、没有动作标签，更没有物理反馈，无法直接用于策略学习。

换句话说，具身智能缺的不是“更多数据”，而是   一种能把物理经验规模化生产、组织和复用的基础设施。

##  生成得好看，不等于用得上
世界模型 （World Models） 被寄予厚望：它学习环境状态如何随动作演化，能“想象”出机器人执行动作后的未来。视频生成模型的飞速进步，更让人觉得世界模型离真正“能干活”只有一步之遥。

但WorldArena 2.0基准的一组实验显示，这一步远比想象中大。

在视触觉操作评测中，Wan2.2的触觉预测质量全场最优 （PSNR 21.26/SSIM 0.746） ，也确实在HDMI插入任务上拿到100%成功率；可换到同样需要预测接触和受力的瓶体抬升任务，   同一个模型   的成功率直接归零——而没有任何预测能力的ACT基线，反而做到了80%。

感知指标再漂亮，也不保证任务能力可靠地泛化。   生成得好看，不等于用得上。

这个gap不是给世界模型判死刑——恰恰相反，它把真正的问题摆上了台面：如何让世界模型从“视频生成器”，变成能稳定支撑真实机器人任务的经验引擎和决策引擎。这正是本次Workshop要讨论的主题。

##  两大方向：造经验，然后用经验
Direction I·从视频生成到经验引擎    第一个方向回答”经验从哪里来”——如何把人类经验和机器人经验，变成可规模化使用的数据资源。欢迎但不限于以下研究：

-    从人类视频、示范与人-物交互中学习：   从真实场景与第一视角的人类示范中提取任务目标、物体affordance、动作片段、接触事件与交互先验，用于物理世界模型训练和机器人策略学习

-    跨本体机器人数据规模化与迁移：   构建多机器人数据混合、共享的state/action表征、本体感知元数据与动作重定向方法，让经验在机械臂、夹爪、移动操作平台、人形机器人等不同平台间迁移

-    Real2Sim2Real与数字孪生：   从真实世界观测重建可编辑的仿真环境，生成可控rollout，并利用真实世界反馈持续修正仿真与世界模型

-    3D/4D世界建模与生成：   对场景几何、物体状态、动态变化、affordance、遮挡、接触区域与不确定性进行建模，支撑物理接地的数据生成

-    面向策略学习与评测的合成数据生成：   生成可控示范、仿真rollout、场景与物体状态变体、初始状态、稀有事件、失败案例与评测episode，用于训练、压测和比较机器人策略

-    面向接触密集操作的视触觉数据生成：   生成并标注同步的视觉、触觉、力/力矩、本体感知与动作信号，用于学习物理交互

-    世界模型生成数据的benchmark与评测协议：   度量合成数据、仿真rollout及真实-合成数据混合，在不同任务、本体与感知模态下对下游策略性能的实际影响

Direction II·从预测未来到利用未来行动    第二个方向回答”经验如何变成动作”——World Action Models   （WAM，世界动作模型）   把未来预测与动作生成放进同一个模型。欢迎但不限于以下研究：

-    基于视频的世界动作模型（Video-based WAM）：   利用视频世界模型与视频-动作联合预测，推演未来观测、任务进展与可执行的机器人动作，服务操作、导航与全身控制

-    几何感知的世界动作模型（Geometry-aware WAM）：   将动作生成锚定在3D/4D场景结构、物体状态、空间关系、点流、接触几何与多视角一致性之上，产生物理可靠的具身动作

-    面向高效规划的潜空间世界动作模型（Latent WAM）：   学习紧凑的潜在动力学、潜在动作、视觉子目标与动作条件表征，支撑低延迟的预测、规划与机器人控制

-    面向接触密集操作的视触觉世界动作模型（Vision-tactile WAM）：   耦合视觉、触觉、力/力矩、本体感知与动作表征，预测接触状态转换、滑移、形变与受力演化，并为精细操作生成纠正动作

-    面向任务级推理的长时序世界动作模型（Long-horizon WAM）：   将未来预测与子目标发现、时间抽象、价值估计、风险感知和记忆机制结合，支撑多步操作、移动操作与具身规划

-    预测式策略评估与安全动作选择：   在真实执行前，利用世界模型rollout估计任务成功率、风险、约束违反与失效模式，进而选择可靠动作

-    Agentic 与自我改进的世界动作模型：   让具身智能体从想象rollout、部署反馈、人工干预、失败与恢复轨迹中学习，实现自主数据收集、策略改进与持续适应

两个方向合起来，是一条完整的生产链：   Direction I造经验，Direction II用经验。   以“让机器人插好一根HDMI线”为例：从人类视频学习接触先验，用Real2Sim2Real搭建训练场，用视触觉WAM预测滑移并实时纠错，执行前用rollout评估风险——这恰好也是WorldArena 2.0 Challenge的真实赛题。

14个具体研究方向的完整列表，见Workshop官网。

##  Call for Papers：距截止不足三周
本次Workshop为   非存档（non-archival）   ：录用论文不进入IROS proceedings，不影响后续投稿其他会议或期刊。

-    格式：   4–8页（不含参考文献），IROS Workshop模板，双盲评审

-    类型：   技术论文、立场论文、数据集、基准、挑战赛报告、负面结果均欢迎

-    展示：   录用论文以poster展示，部分受邀oral spotlight；设Best Poster Award$500

-    时间：   8月10日投稿截止→8月20日录用通知→9月20日camera-ready

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/A6fTew8FFGFiaibskYCGDEpLOe7VX7CtMyLWyVBEBgPAcCyGWzhxmgl0hnuWDiaEEN3fYYtRiaW4URpK2lzszdPCaYX9Eh1kuVC3Yhamg5iaSuvA/640?wx_fmt=png&from=appmsg)

△   征稿指南
##  六位讲者，一条链路
六位invited speakers恰好覆盖了从“造经验”到“用经验”的完整链路：Jiajun Wu（Stanford）研究物理场景的结构化理解；Katerina Fragkiadaki（CMU）深耕几何感知的世界模型；Rudra P.K. Poudel（Toshiba Europe）将围绕世界模型与强化学习的鲁棒策略学习展开报告；Hongyang Li（HKU）主导了UniAD与AgiBot World；Abhinav Valada（Freiburg）专注开放世界机器人学习；Ding Zhao（CMU）研究安全可信的具身系统。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/A6fTew8FFGHeDpibbn5FmSCFOPk47icbU8aZrUu3JMVZA7sRj2rxAzbMc0bgOibRWHDDsnlLuL63h4PPzfdPSYFKrH6edLUMtQyz7eB0J9ib7fM/640?wx_fmt=png&from=appmsg)

△   演讲嘉宾     当天议程（10月1日，13：00–17：30）：   13：00开场致辞（Haibao Yu）→三场keynote→14：40茶歇与海报展示→三场keynote→16：30Best Paper/Best Poster展示→16：50WorldArena 2.0 Challenge赛果发布与冠军团队分享→17：30结束。

##  WorldArena 2.0 Challenge：已开赛
WorldArena 2.0 Challenge已于   7月10日开赛，8月30日提交截止。

![图片](https://mmbiz.qpic.cn/mmbiz_png/A6fTew8FFGG75unbEN3PEcqbdXZ33JJI8yeF8GjJ7Wnoh2x29Ueiaf3PhthYMnL2OZZibzJ1T1uotQQSRiaGAkh2Vsn5vjxibNpctHQbgqYCROo/640?wx_fmt=png&from=appmsg)

△   WorldArena 2.0沿模态、功能与平台三条轴线扩展具身世界模型评测。    它不是又一个视频生成比赛。三个赛道构成一条完整的评测链，分别回答三个递进的问题：

-    Track 1·Video Quality Evaluation   ——生成是否可信？评测视觉与运动质量、内容一致性、物理合理性、3D准确性与可控性。

-    Track 2·World Model as RL Environment   ——能否用于学习？把世界模型当作在线强化学习环境，考察它能否提供稳定可用的状态转移。目前的结果是“有潜力、有差距”：最好的世界模型环境能把策略成功率从SFT的约44%提升到约75%，但仍低于真仿真器RL的约87%。

-    Track 3·Real-World WAM Manipulation   ——能否转化为真实动作？在视触觉与纯视觉两种设置下，评测真实物理环境下的真机操作表现。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/A6fTew8FFGGALv3uf8J915HQM4LQhnGC2cxsz1g4IC43dZzlFEMZzO1N1M0cy0pVE29vRicakPG19Sncib4lL45iaZF5HKGN1M7hTDkWP2qEIU/640?wx_fmt=png&from=appmsg)

△   WorldArena 2.0 Challenge比赛概览    三个赛道各设一、二、三等奖，   总奖金$7,000，   各赛道一等奖团队将受邀在Workshop现场报告。时间线：7/10开赛（进行中）→8/3提交截止→9/15公布最终结果→10/1现场颁奖与分享。

##  组织团队
Workshop由来自CMU、Imperial College London、NTU、清华大学、MBZUAI、Stanford、HKU、UCLA等机构的研究者共同组织，覆盖computer vision、robotics、world models与embodied intelligence；八位Program Committee成员负责论文评审。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/A6fTew8FFGHNRriaOx7Cic6PlA0qQ1y3LhOspljgZV5e0odyEaXxQmNJqrXEwKFJn5VzDek2iczn7HAJThUj3Y07tn2DqiaUYXKC1ibDAodNLN5E/640?wx_fmt=png&from=appmsg)

△   会议组织者名单

![图片](https://mmbiz.qpic.cn/mmbiz_png/A6fTew8FFGGI4E4rUzhEic6P63MqZGyTR8SQFSJwy2ZGIM0I6NJrKJJepdQxYYet7735zd83sOpk7sQqJu3xudjgQibufSOWT34xrZEiaWqJ44/640?wx_fmt=png&from=appmsg)

△   程序委员会名单
##  在匹兹堡，一起回答三个问题
今天的世界模型，仍有三件事做不好：   长时序的力控稳定、可靠的多步状态转移、跨平台的sim-to-real。   这三个开放问题，正是邀请你到匹兹堡的理由。

-   投一篇4–8页论文（8月10日前，OpenReview入口已开放）

-   组队参加挑战赛（8月30日前）

-   10月1日，现场交流

##  相关链接

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/A6fTew8FFGF8MtsnhaeRuzRkjm5Lu1sJhNGZ0z2NJooa7JPriczXYSib66aibGBicPwNuQfXQFUK0lPFLjA8cjPZDx6Cdpib5YmgHo9d2XWIQemY/640?wx_fmt=png&from=appmsg)

△   赞助商与联系方式    Workshop相关问题可咨询：

Contact：yuhaibao94@gmail.com | lei.yang@ntu.edu.sg
IROS 2026 Workshop官网：https://physical-world-models.github.io/IROS2026/
论文投稿：https://openreview.net/group?id=IEEE.org/IROS/2026/Workshop/PWMS
挑战赛官网：http://iros2026challenge.world-arena.ai
WorldArena 2.0项目主页：http://v2.world-arena.ai
挑战赛代码：https://github.com/WorldArena2/WorldArena-2.0
挑战赛实时榜单：https://huggingface.co/spaces/WorldArena/WorldArena2.0

一键三连     「点赞」「转发」「小心心」

欢迎在评论区留下你的想法！

—    完    —

【学术投稿】请在工作日发送邮件至：     ai@qbitai.com     ，标题注明【投稿】，并告诉我们：     你是谁     ，   从哪来   ，   投稿内容   附上   项目/主页链接   ，以及   联系方式   。

🎓    我们会 (尽量) 及时回复你 :)

🌟 点亮星标 🌟

科技前沿进展每日见

## 来源

- 公众号：量子位
- [查看微信原文](https://mp.weixin.qq.com/s/rRdGg4BskRb7Vsr5cHOp8g)
