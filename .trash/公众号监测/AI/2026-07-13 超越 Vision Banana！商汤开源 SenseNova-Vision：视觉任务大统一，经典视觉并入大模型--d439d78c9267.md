---
title: "超越 Vision Banana！商汤开源 SenseNova-Vision：视觉任务大统一，经典视觉并入大模型"
公众号: "魔搭ModelScope社区"
发布日期: 2026-07-13
抓取时间: 2026-07-20 16:52:09
类别: AI
自动检查结果: "B 存参考资料"
相关度评分: 10
命中词: ["AI", "人工智能", "大模型"]
原始链接: "https://mp.weixin.qq.com/s/L2y3lT_U2xif_qUbyWkGrQ"
文章ID: "2247510661_1"
---

# 超越 Vision Banana！商汤开源 SenseNova-Vision：视觉任务大统一，经典视觉并入大模型

今天，商汤科技正式发布并全面开源     日日新 SenseNova-Vision      理解生成统一视觉大模型     ，这是商汤日日新大模型体系的  重要视觉能力升级。

行业以往的 "统一视觉" 多是把检测、分割、深度预测等多个专家模型打包封装，本质还是割裂的。

SenseNova-Vision 的  核心变革是：     让视觉成为通用基础模型的原生能力，彻底融入大模型体系。     所有经典视觉任务如目标检测、图像分割、深度预测、3D重建等，由此都实现了原生统一。

GitHub:

https://github.com/OpenSenseNova/SenseNova-Vision

这种 "原生融入" 带来了双向增益：

-     数据反哺：     视觉领域几十年的高质量数据直接提升大模型底座的视觉理解能力。

-     思维赋能：     大语言模型的推理能力反过来让视觉任务融会贯通，甚至能用语言直接定义新视觉任务。

在视觉 AI 领域，     商汤已连续十年蝉联中国视觉AI市场份额第一，    并在2025年首次登顶视频分析赛道全球市场份额第一，及亚太地区市场份额第一     。SenseNova-Vision将这种行业领先的视觉能力，融入统一多模态大模型体系，代表了视觉 AI 能力的跨越式演进。依托原生统一的技术路线，模型实现了从“执行工具”向“世界理解模型”的本质蜕变，不仅真正看懂物理世界的逻辑，更为AI在物理世界的广泛应用与深度交互构建全新的通用底座。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/WdyVrOG9iattXFjD4GdAFwbClCTYBkceq5AsvXBJPvBNIel8o9cmNwfsdiaHmHic9cGibPAEh0gpiba6CvOpf91wgyiaWgTticr7iawIbSwkX9HSs9E/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

商汤日日新SenseNova-Vision能够原生统一地实现结构化视觉理解、稠密几何预测、图像分割以及多视角视觉几何等多项核心任务能力。

01

复杂场景实测：自由指令下的“视觉读心术”

传统的视觉模型往往只能“各司其职”，而且遇到复杂、有干扰的场景就会“抓瞎”。得益于原生通用底座带来的智能涌现，SenseNova-Vision在面对人类视觉都容易犯错的极端场景时，展现出了惊人的泛化能力：

1、零样本      泛化      ：未知游戏“一秒读懂”。

面对训练集中从未出现过的游戏画面，模型展现出了强悍的跨域适应力。在语言推理与原生视觉能力的交织下，它无需任何针对性重训，就能在一瞬间同时对画面中的表面法向、实例分割以及角色关键点检测进行无缝且精细化的处理。影视、游戏和数字内容创作者可以直接将其投入工作流。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iattbB5I60zkEKy3VzwIlXxXicowtDmsH9bwnhDOt0rSP0HMYzuqVGR4IP5muNC7XYfibv3KP1l1qq6OWFwynxTaN4FWfp1fR8bmIE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatv1mZLoba5ctFic2cWiaacJvtfqL34pBZWIzicHIOnKr3eJ1BXeFk9EZ57MZ5KgZ8u6gGVLjOtb8vx3KWrSseufQ4l8HoH098hY2M/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatuWtOsibZTNbq7wHowkuufc8ba6V8ofU8iccMCoHlsPm9aXka8cozYOBediaEz07nfxHPwnGmwRG5A80YgZNIZjGSvXVdBfic9yaa8/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iatupick64cAqFJ6iaeib8fsJzVMh9dFKnYWCJaTsq7wtuJ502oMpxshUHgK96h0BibufGUyoMlHicUff2Hvda6MUT7cbJ3n4AnMOt2OM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

以游戏《黑神话：悟空》的一张场景图为例，模型能对法向、分割、关键点等进行较好的处理（可点击查看大图）

2、超稠密物体分割：重叠鱼群各显其形

面对密密麻麻、高度重叠的鱼群、羊群，或是货架商品、俯拍车辆等极度稠密的场景，模型能够像外科手术般精准地将每个独立个体剥离出来。即使颜色极度相近、边缘深度交织，也能准确区分。这为工业计数、智慧仓储等场景提供了全新的解法。

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatsvGibcJzZicNMMHia1Kiaibjza8016QiaSTIzSqlSDXpCNv0SUMdQibYuqlFBW7Whvj2GzJgicXXRP5h7FbDcqiaTicffhe3DGYqU5TrQYA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iatu3UIWQe9w7WRxrWP3ua9hjzf1oTP8uMRp5M2KicNicDnnFfFuLSfW6fiaU57yibY9z1vVkjGPW4sJ22IVLfb3aMKlPQ0ZAhenQiboI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

以颜色重叠的鱼群、货架上东倒西歪的商品为例，模型能进行清晰、准确的分割

3、看穿镜面反射：正确还原空间几何

在包含镜子、玻璃的复杂室内环境中，传统视觉模型极易被镜中的倒影误导。而SenseNova-Vision能够自动过滤反射影像的迷局，准确估计出镜中物体的真实空间方向与深度关系。它不被虚拟的反射所欺骗，展现出对三维空间几何本质的深刻理解。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iatv6ia2nLWBYAQnZhdwO0rOQmKibbibM1ACef9XG8hbkZOGW8XLIcrkrziaxlhjYxicHoepZrV8R9QKV3icCcCNYVIoLOMpyqmEmUXyaY/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/WdyVrOG9iattLicyd1RAIAiaLGtpkvAdQemice9ricu3RjqyuQyJFJGRbicYg0VycOHEiaS01M85J655tibSrlFSQibusJvwPwcDPbZ9iawT2DH7THDWE/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iats3rBAbBgoxic17jdSkfGLn9NYfKNfZvh9xFTWn1qws9yFI8mXojCp4ordicickpjicSCibibR2HCukW6OKfxbsyptegUC5C4ibBAYAIY/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iats0WkWz0Nn83861UBoialELsnOib4s5oJIZLhqnwgPXVWA2U1GcV1W2WOJKRicflbpmIN48cqoy5ZEe1ZnRAXBNnPxIqb6NzmdH5M/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/WdyVrOG9iatvbicL5RT8H37lnCvMLgIqaibctSEIAD91Cgac6XibZpfjTqoeTCE5SpG7nqunVyZeSrUZ6C5dr9EDYs5ic2MAywPDlvm76EGrIJibQ/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iatspKEZRcYFfmdGBlCvHVDIBwQD5QOht40XIoCgjVvqYiclpODwESYn9v37DXIa8bLrcZD8hsCuSU6f9W8HHDBg9JdKvjYtK06L0/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

以镜面为例，模型能准确估计镜子里人的方向和深度

4、突破视觉错觉：不看表象，洞察空间本质

在充斥着视觉错觉干扰的图像中（例如经典的借位摄影），模型不仅能准确抠出被遮挡物体的完整轮廓，还能输出完全正确的表面法向估计。它不被图案和借位欺骗，正是语言模型的推理能力与稠密几何预测完美融合、看懂物理世界的具象体现。

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatt3X6PVDaLibjPHdaibaXZiatu25PyrReRauy97S29yajAWOAHeT5U6LsL2J1ufiazfKTRcBDyt9jOcyDhWIa8juAmuI7GrLlW7AJs/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iatuJF3c1eic3cb8PGjk3Ro16d9zY0iacRWJUPG4ia5tlzUgZxf3xohE0Lrp5icHpaYbqKLibIx2eAIx71lud4ZWbdyKhyabGyBmALS94/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatvib9Ua7ImIdv9A28Tayx0n0bOlCUVEkkBc0SddnH1f1nDmicBjwia3QJibM5kUSibKPiagUtMwoYem4nXPoFBI4ngjZ5VTdJfUZTCSc/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=15)

模型能正确判断纹理形成的视觉欺骗

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iattHh4xsLQ9z4CkEaI6icGckQmBwVCLwdIu45NLa0qUItTT89PFG1WrI4rjEa71lRlHHW4KHnJcmzpNwiaBFBibekUGMXXMqF2VPss/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=16)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iatvwI3PxXPlOsHw0KfHEO3NvCBtv1NNDNshk0JxW77sMnOGK2kNut4JdTggZ3zbo82JhVh052vrWqkJyTiak6gicpNic7IlkcIboXo/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=17)

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatuyT0UXUkfHX1TCRbsVkakjibc0ERcFbuBLgTSkFdEnCIgR1Dytvs3dW3WQmick8U8rzLe3LcwBJ6lrQ83ibJzVuiaTkqLibFqJR9iaw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=18)

模型对于透视成像的近大远小现象领悟的非常透彻，完全没有被误导

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iattzIXS0jnTss5PuicOicJEezg3F6rU9z7gx8fSd6iaW9Jbl7peh433dGqRHtuTpNaQJpn7Bic1C3Jfag6iaYxcQtBlUk0o3wWQFTIRw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=19)

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatvYiaMjN3XvlkeVFEgn8p8kkHKuylCVpucXM5EZfhayOagShGibQrI3V4tYgIxyPP0O3cesTFKIOe2bSPSb4CVherdKIUhIXjXQE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=20)

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iatuN1YNw1p2dAkb7EyiahNty8ba0bafCyQkOVClJQxtNxibT0nDFPmUNiaZcZnBSogibribuSGVUa3icx59A8aynrIkNP5ufnJ1N9RibB0/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=21)

前景棉花人物和后景云朵成功分离

02

核心人物领跑：多项指标比肩专用专家模型

当视觉任务融入通用多模态生成后，不仅没有削弱专项能力，反而通过跨任务知识互补实现了性能飞跃。在多项权威评测中，SenseNova-Vision以“单模型”在四大核心视觉领域大范围领跑，  比肩甚至超越了各领域的专用“专家模型”：

-     结构化视觉理解：     在目标检测、指代检测（Referring）、OCR、关键点定位等任务上全面领先同类型通用模型。在稠密小目标检测、长尾类别识别等复杂场景下表现尤为突出。

-     稠密几何预测：     深度估计、表面法向（Surface Normal）估计精度达到几何专用模型水准，在室内外多场景下均能保持极高的稳定性。

-     分割能力：     涵盖通用分割、推理分割、交互式分割等。得益于强大的多模态理解力，其在推理分割（Reasoning Segmentation）与对话式分割（GCG）表现上惊艳。

-     多视角3D几何：     仅通过单模型即可高质量完成多视角点云重建与相机位姿估计，性能在通用视觉路线中处于领先位置。

![图片](https://mmbiz.qpic.cn/mmbiz_png/WdyVrOG9iattpOC7SRTCxoib4fwIXvRTWGcHkYwJiahFicHpMdL4mC2Mic8DcicAGKqUQqlV4ictMGBTj61l9sNXRwXnMhz1gh5CyfOq6q99KChYCM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=22)

核心指标评测：SenseNova-Vision（深紫色柱状）在各项视觉任务中均处于领跑地位

横向相比优势显著：

-    对比语义导向模型（如     Youtu-VL     等）：SenseNova-Vision在检测、分割、深度等对细节要求极高的视觉任务上实现     全面领先     。

-    对比生成导向模型（如     Vision Banana     等）：展现出全面的     代际优势     。

a. 核心指标超越：     在各项权威评测的硬核对决中，SenseNova-Vision 在绝大多数指标上均实现了对 Vision Banana 的超越与领跑。

b.任务能力倍增，且全面开源：     展现出更强的多任务泛化实力。如 Vision Banana 仅能勉强应对四大核心板块中的“两类”问题，而 SenseNova-Vision 却能同时将结构化理解、稠密几何、全景分割、多视角 3D 等全任务一网打尽。在此基础上SenseNova-Vision还做到模型、数据全面开源。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/WdyVrOG9iatszGUw6TibtD0ksAxT6FHszgxibTOFhicrJUkelxQicqVDGdicPY7GIZWdcTavKmIOZoxIeR3fso8YR4AxTib7hSCW746ICxtgnSmBhI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=23)

03

重构底层逻辑：从拼接到原生统一

长期以来，视觉AI沿着“一个任务对应一个模型”的路径演进，各个任务是彼此割裂的孤岛。

SenseNova-Vision彻底打破了这种结构性瓶颈，首次将全部视觉任务，统一表述为通用基础模型可理解的多模态生成问题。     它不需要为不同任务设计专属预测头，而是直接在同一个共享的表征空间内，对文本、像素、语义信息和几何特征进行统一建模。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/WdyVrOG9iattDmh2dS5WyWAkG9t7UfXuhXibbZibkcRlXucZcAJ1ssBxrmBb19VKuZEyXDAZQc693cMWqNrO443fwQt6XibKsDGfic9R8xbJlEIk/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=24)

这种“大一统”的设计，带来了颠覆性的变化：

-     跨任务知识互补，实现1+1>2。     模型联合训练，激活了不同任务间的内在互补。深度估计的知识能强化语义分割的空间理解，分割能力又能辅助检测任务的边界判断，从而获得了单任务模型难以企及的抽象推理能力，从容应对未见过的任务与场景。

-     从“工具执行者”升级为“通用理解者”。     统一范式重新定义了视觉智能的形态。模型不再是只能执行特定指令的工具，而是作为大模型的原生能力，成长为对视觉世界拥有通用、深刻认知的基础多模态底座。

商汤SenseNova-Vision的发布和开源，成功验证了“统一多模态生成”这一全新技术路线的巨大潜能。它显著降低了视觉AI的应用门槛，开发者无需再为不同任务维护多套模型体系，单个模型即可覆盖高频视觉需求，从而大幅缩短研发周期、降低部署成本，尤其适合复杂图像、开放场景下的视觉应用开发。

同时，商汤也同步开源了包含5000万条高质量样本的视觉指令语料库      SenseNova-Vision Corpus-50M     ，为全球AI生态注入强劲动力。

未来，商汤将把SenseNova-Vision的核心技术全面融入日日新U系列大模型中，持续探索构建更加强大的统一多模态基座模型，迈向能够更深刻感知、推理和交互物理世界的通用人工智能（AGI）与世界模型。

模型开源地址：

-    魔搭社区:

https://modelscope.cn/models/SenseNova/SenseNova-Vision-7B-MoT

-    GitHub:

https://github.com/OpenSenseNova/SenseNova-Vision

👇点击关注ModelScope公众号获取

更多技术信息~

## 来源

- 公众号：魔搭ModelScope社区
- [查看微信原文](https://mp.weixin.qq.com/s/L2y3lT_U2xif_qUbyWkGrQ)
