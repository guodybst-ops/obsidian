from __future__ import annotations

import re
from pathlib import Path


ROOT = Path("E:/KnowledgeBase")
CROOT = ROOT / "C-外脑-播客知识库"
SHOW = "给女孩的商业第一课"
TODAY = "2026-07-19"

TARGET_89 = CROOT / "89单集笔记" / SHOW
TARGET_04 = CROOT / "04判断哲学" / "_stubs" / SHOW
LOG_ROOT = ROOT / "_system" / "_log"
C_LOG_ROOT = CROOT / "_system" / "_log"
PROGRESS = CROOT / ".agent" / "progress.md"
INDEX = TARGET_89 / "00-给女孩的商业第一课｜播客索引.md"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig")


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def safe_name(name: str, max_len: int = 48) -> str:
    name = re.sub(r"[\r\n\t]+", " ", name).strip()
    name = re.sub(r"[\\/:*?\"<>|]", "", name)
    name = re.sub(r"\s+", " ", name)
    name = name.strip(" -_，。！？、；：|｜")
    if len(name) > max_len:
        name = name[:max_len].rstrip(" -_，。！？、；：|｜")
    return name or "未命名"


def obs_link(path: Path, label: str | None = None) -> str:
    rel = path.relative_to(CROOT).with_suffix("").as_posix()
    if label:
        return f"[[{rel}|{label}]]"
    return f"[[{rel}]]"


def file_by_episode(ep: str) -> Path:
    matches = sorted(TARGET_89.glob(f"{ep} - *.md"))
    if not matches:
        raise FileNotFoundError(f"未找到 {ep} 的单集笔记")
    return matches[0]


JUDGMENTS = [
    {
        "ep": "094",
        "node": "按分数兑换还是按盘子匹配",
        "option_a": "按分数兑换",
        "option_b": "按盘子匹配",
        "speaker": "林国宇",
        "decision_type": "路径选择",
        "object": "人 / 教育规划 / 机会",
        "evidence": "本集把顶级大学招生和真实商业世界都归纳为匹配思维：关键不是分数够不够，而是你对这个盘子有没有用。",
        "why_b": [
            "顶级大学更像在组一届互帮互助的 class，分数只是入场材料之一。",
            "匹配思维能迁移到求职、融资、合作等真实商业场景。",
            "普通人也可以用这个框架反问：我解决什么问题、对哪个盘子有用。",
        ],
        "why_not_a": [
            "兑换思维适合标准化考试，但在非标准化筛选里会误判规则。",
            "只盯分数会忽略产业接口、协作价值和长期网络。",
        ],
        "reverse": [
            "当前场景本来就是标准化考试或硬性准入。",
            "筛选方明确只按单一指标排序。",
        ],
    },
    {
        "ep": "095",
        "node": "硬撑高能量还是先修睡眠和不内耗",
        "option_a": "硬撑高能量",
        "option_b": "先修睡眠和不内耗",
        "speaker": "肖涵",
        "decision_type": "优先级",
        "object": "人 / 创业者 / 状态",
        "evidence": "本集把稳定高能量定义为睡大觉、不内耗、神不外驰修出来的状态，而不是靠意志硬撑出来的表现。",
        "why_b": [
            "肖涵把反复失败后仍能站稳，归因到睡眠、能量和注意力基建。",
            "高压创业中，急着接结果会让人贪、乱、谈不成事。",
            "先修状态能降低内耗，保留长期折腾的续航。",
        ],
        "why_not_a": [
            "硬撑容易把短期亢奋误当成高能量。",
            "长期睡眠、身体和心力欠账会反噬业务判断。",
        ],
        "reverse": [
            "短窗口冲刺且身体状态仍可承受。",
            "当前问题是执行不足，而不是状态崩盘。",
        ],
    },
    {
        "ep": "096",
        "node": "继续卖知识付费还是进入产业做营销服务",
        "option_a": "继续卖知识付费",
        "option_b": "进入产业做营销服务",
        "speaker": "润宇",
        "decision_type": "路径选择",
        "object": "项目 / IP / 商业模式",
        "evidence": "润宇判断知识付费是流量红利的 B 面；红利退场后，IP 更应进入产业，解决更贵的人的更贵的问题。",
        "why_b": [
            "流量红利退场后，单纯卖课难以继续承接改命型用户。",
            "营销服务能绑定真实产业、预算和业务结果。",
            "老板 IP、大厂直播和日常营销界面能形成更完整的河床模型。",
        ],
        "why_not_a": [
            "知识付费依赖信任释放和渠道红利，红利结束后复购与增长都变弱。",
            "只卖知识容易停在认知差、信息差，难进入资源差和执行差。",
        ],
        "reverse": [
            "内容本身已经具备强消费属性，用户愿意为阅读/观看体验付费。",
            "目标用户是 K12、职业教育或真实经营者，学习需求稳定存在。",
        ],
    },
    {
        "ep": "097",
        "node": "迷信大厂背景还是寻找门当户对",
        "option_a": "迷信大厂背景",
        "option_b": "寻找门当户对",
        "speaker": "敏哥",
        "decision_type": "路径选择",
        "object": "组织 / 招聘 / 人才",
        "evidence": "本集核心判断是招聘的本质是门当户对：优秀猎头挖亮点，伟大老板寻找匹配。",
        "why_b": [
            "中小公司更需要同类型公司、同频老板和真实胜任经验。",
            "大厂背景不等于适合当前阶段，很多方法离开原组织就失灵。",
            "从上往下招一号位，能让后续团队配置更顺。",
        ],
        "why_not_a": [
            "迷信阿里系、字节系 HR 容易买到贵而不适配的人。",
            "只看履历会忽略老板文化、公司阶段和候选人真实动机。",
        ],
        "reverse": [
            "公司已经进入规模化阶段，需要补齐标准化系统。",
            "候选人大厂经验能明确迁移到当前业务问题。",
        ],
    },
    {
        "ep": "098",
        "node": "靠固定属性解释人生还是按种子法则重算",
        "option_a": "靠固定属性解释人生",
        "option_b": "按种子法则重算",
        "speaker": "陈唐",
        "decision_type": "路径选择",
        "object": "人 / 关系 / 财富 / 天赋",
        "evidence": "陈唐用笔的故事说明事物没有固定属性，并把天赋、财富、关系都转译为种子开花的结果。",
        "why_b": [
            "种子法则把结果从运气、天赋或固定命格，转回到可设计的因果动作。",
            "它能解释为什么付出未必从同一个人身上返回，而可能从第三方和时间差中返回。",
            "在关系、财富、天赋三个问题上，先施于人提供了可执行入口。",
        ],
        "why_not_a": [
            "固定属性解释会把失败、冲突和迷茫写死。",
            "只靠苦练或索取，容易忽略自己正在种下的关系和行动种子。",
        ],
        "reverse": [
            "需要处理的是物理安全、合同责任或医学事实，不能只用心法解释。",
            "当下缺少具体行动时，要先回到 02 方法流程拆步骤。",
        ],
    },
    {
        "ep": "099",
        "node": "刷即时反馈还是用圆圈日重建注意力",
        "option_a": "刷即时反馈",
        "option_b": "用圆圈日重建注意力",
        "speaker": "陈唐",
        "decision_type": "优先级",
        "object": "人 / 注意力 / 日常秩序",
        "evidence": "本集把手机成瘾定义为即时反馈训练，并给出圆圈日、四时冥想和晚安读书俱乐部作为注意力重建路径。",
        "why_b": [
            "注意力不是当场拧出来的，而是一点点攒下来的。",
            "圆圈日通过隔离电子设备、沉默和自然，创造短期戒毒所。",
            "睡前锁设备读古书，是无法做长闭关时的最低门槛入口。",
        ],
        "why_not_a": [
            "即时反馈会训练人误以为世界必须立刻回应。",
            "刷手机占据睡前开放意识，第二天注意力继续被削弱。",
        ],
        "reverse": [
            "当前任务需要即时响应外部紧急信息。",
            "短期闭关会造成现实责任断裂，需先安排交接。",
        ],
    },
    {
        "ep": "100",
        "node": "用AI预测涨跌还是做风险配置和工作流升级",
        "option_a": "用 AI 预测涨跌",
        "option_b": "做风险配置和工作流升级",
        "speaker": "润宇",
        "decision_type": "风险取舍",
        "object": "投资 / 工具 / 公司工作流",
        "evidence": "润宇强调 AI 不能保证赚钱，Hard 模式里更应该让 AI 结合风险承受能力做配置，并把 AI 用在工作流升级上。",
        "why_b": [
            "高点市场里普通人没有利润垫，先考虑下行保护比追单只更重要。",
            "AI 更适合处理组合配置、资料整理、工作流封装，而不是预测明天涨跌。",
            "Skills 和工作流颗粒度升级，比单次聊天更能形成组织杠杆。",
        ],
        "why_not_a": [
            "单只涨跌预测本身不稳定，专业量化也无法长期确定。",
            "把 AI 当神谕会放大过度自信和追涨杀跌。",
        ],
        "reverse": [
            "只是用极小资金做学习实验，并明确亏损上限。",
            "有专业投研能力和完整风控体系，不把 AI 输出当结论。",
        ],
    },
    {
        "ep": "101",
        "node": "靠信息差还是靠认知模型解决贵问题",
        "option_a": "靠信息差",
        "option_b": "靠认知模型解决贵问题",
        "speaker": "刘润",
        "decision_type": "路径选择",
        "object": "项目 / 咨询 / 商业判断",
        "evidence": "刘润把商业补课拉回认知差、本价值模型和 root cause：咨询公司真正卖的不是信息，而是解释贵问题的模型。",
        "why_b": [
            "同样的信息量下，真正差距在观察框架和模型库。",
            "复杂问题往往没有可抄答案，必须反推 root cause。",
            "本价值模型要求先判断成本、价格、价值是否成立。",
        ],
        "why_not_a": [
            "信息差很快会被公开资料和 AI 拉平。",
            "只堆信息不能判断一个产品到底解决了多贵的问题。",
        ],
        "reverse": [
            "问题本身只是资料缺口，已有成熟答案可查。",
            "当前阶段不需要战略判断，只需要事实核验。",
        ],
    },
    {
        "ep": "102",
        "node": "只看价钱还是看长期价值",
        "option_a": "只看价钱",
        "option_b": "看长期价值",
        "speaker": "李欣频",
        "decision_type": "优先级",
        "object": "人 / 消费 / 时间 / 创造力",
        "evidence": "李欣频把富婆思维落到价值判断：只看价钱会让钱变成天花板，看得到价值才可能打破天花板。",
        "why_b": [
            "旅行、书、体验和交流可能沉淀为视角、创作和商业机会。",
            "知道时间能做什么的人，会用钱买时间。",
            "从竞争模式转向创造模式，需要重新编码旧的木马程序。",
        ],
        "why_not_a": [
            "只看价格会把机会成本、时间成本和认知成本隐藏起来。",
            "省钱可能伪装成安全感，实际变成新的限制程序。",
        ],
        "reverse": [
            "当前现金流水位不足，基础安全尚未建立。",
            "所谓价值无法被验证，只是消费冲动的包装。",
        ],
    },
    {
        "ep": "103",
        "node": "统一话术销售还是按人格型号适配",
        "option_a": "统一话术销售",
        "option_b": "按人格型号适配",
        "speaker": "赛维",
        "decision_type": "路径选择",
        "object": "销售 / 管理 / 合作",
        "evidence": "赛维把九型人格从标签工具转成商业识人工具：你卖的不是产品，而是对方型号最需要、最缺、最会被打动的东西。",
        "why_b": [
            "不同型号在意的证据、雷点、舞台和安全感完全不同。",
            "高客单销售、招聘和管理都需要识别对方稳定倾向。",
            "按型号适配能减少误伤，让沟通更像对方真正需要的解决方案。",
        ],
        "why_not_a": [
            "统一话术会把 1 号、3 号、6 号、8 号等不同需求混成一团。",
            "只凭感觉容易变成贴标签，无法指导具体合作动作。",
        ],
        "reverse": [
            "对方信息极少，还无法稳定判断型号。",
            "标准化低客单场景不值得做深度人格适配。",
        ],
    },
    {
        "ep": "104",
        "node": "继续学习观望还是入局下注",
        "option_a": "继续学习观望",
        "option_b": "入局下注",
        "speaker": "沈帅波",
        "decision_type": "路径选择",
        "object": "人 / 事业 / 投资 / 关系",
        "evidence": "沈帅波强调终身学习不能替代实操，真正的认知要通过付学费、入局和承担风险形成。",
        "why_b": [
            "认知不是看好，而是在关键时刻愿意投入本金、职业选择或关系资源。",
            "入局后角色坐标变化，才会暴露真正的认知缺口。",
            "人生复利来自时间点、热爱、擅长和关系持续连接。",
        ],
        "why_not_a": [
            "学习感可能成为逃避决策的挡箭牌。",
            "置身事外很难理解同一句话对不同角色意味着什么。",
        ],
        "reverse": [
            "风险超出承受能力，下注会毁掉基本盘。",
            "当前缺少必要事实和基本技能，先小样本学习更合适。",
        ],
    },
    {
        "ep": "105",
        "node": "把命理当外挂还是当参数和生命策展",
        "option_a": "把命理当外挂",
        "option_b": "当参数和生命策展",
        "speaker": "西元 / Sally",
        "decision_type": "路径选择",
        "object": "产品 / 人 / 决策",
        "evidence": "FateTell 的命理产品不是要替人解决人生，而是把命理作为额外参数，帮助用户从自动驾驶切到主动驾驶。",
        "why_b": [
            "命理报告的价值在于结构化看见自己，而不是外包人生选择。",
            "有慈悲心的命理体验会减少负向心锚，让人重新获得行动力。",
            "报告型生命策展比空输入框更能带用户进入完整体验。",
        ],
        "why_not_a": [
            "把命理当外挂会制造依赖，甚至把恐吓式预言变成自我实现。",
            "大师不能替用户承担业力、经历和选择。",
        ],
        "reverse": [
            "用户只需要娱乐型体验，且已明确不把结果当人生指令。",
            "产品无法保证解释质量和善意边界时，应降低决策权重。",
        ],
    },
    {
        "ep": "106",
        "node": "守住旧技能还是用AI把需求变成系统",
        "option_a": "守住旧技能",
        "option_b": "用 AI 把需求变成系统",
        "speaker": "火火",
        "decision_type": "路径选择",
        "object": "人 / 工作流 / 产品",
        "evidence": "火火把 30 分差生无敌解释为：不会不再是阻碍，关键是敢提问、敢交给 AI、敢把需求做成系统。",
        "why_b": [
            "AI 编程把需求到工具的门槛压低到会表达的程度。",
            "不会旧技能的人反而不容易被旧经验限制，想象空间更大。",
            "长提示词、案例和自迭代工作流能把隐性判断变成显性规则。",
        ],
        "why_not_a": [
            "旧技能会持续贬值，尤其是重复、低效、可自动化的环节。",
            "只证明自己会做，容易错过把工作产品化和自动化的机会。",
        ],
        "reverse": [
            "任务涉及高风险上线、数据安全或专业合规，不能只靠 AI 产物。",
            "需求还没讲清楚，需要先做人类侧的业务梳理。",
        ],
    },
    {
        "ep": "107",
        "node": "只讲业绩还是卖出可下注的未来剧本",
        "option_a": "只讲业绩",
        "option_b": "卖出可下注的未来剧本",
        "speaker": "Jett",
        "decision_type": "路径选择",
        "object": "组织 / 商业化 / 向上管理",
        "evidence": "Jett 把高 P 定义为看懂棋盘、设计剧本、售卖未来，而不是单点业务漂亮。",
        "why_b": [
            "在大厂里，业绩是基本牌，资源继续下注取决于老板是否相信未来。",
            "高 P 要把业务结果绑定成可解释的因果链条。",
            "小红书商业化和 AI 营销都需要从洞察走到闭环，而不是停在报告。",
        ],
        "why_not_a": [
            "只讲业绩容易被归因成命好、流量好或周期好。",
            "没有未来剧本，组织很难给你更大资源和更高权限。",
        ],
        "reverse": [
            "当下还没有真实业绩，先讲剧本会变成空包装。",
            "老板明确只考核确定指标，不看中长期叙事。",
        ],
    },
    {
        "ep": "108",
        "node": "让AI替代关系还是把真人还给人间",
        "option_a": "让 AI 替代关系",
        "option_b": "把真人还给人间",
        "speaker": "陶博",
        "decision_type": "路径选择",
        "object": "AI / 关系 / 产品",
        "evidence": "陶博强调分身不是替代关系，而是连接器、缓冲器和降噪器，让真人有机会回到更深的关系里。",
        "why_b": [
            "AI 时代的危机不只是失业，还有意义赤字。",
            "分身适合处理浅层连接和信息同步，把真人注意力还给深度关系。",
            "真正重要的是保留人的独特性、记忆和精神内核，而不是铺平所有差异。",
        ],
        "why_not_a": [
            "把 AI 做成替代关系的产品，可能放大成瘾和虚假连接。",
            "无真人根基的陪伴很容易成为新的奶头乐，而不是关系解法。",
        ],
        "reverse": [
            "用户明确只需要任务执行型 AI，不期待关系连接。",
            "真人关系会造成现实风险，需要先用自动化隔离骚扰或噪音。",
        ],
    },
]


def build_judgment_file(path: Path, data: dict[str, object], source_89: Path) -> None:
    node = str(data["node"])
    option_a = str(data["option_a"])
    option_b = str(data["option_b"])
    source_link = obs_link(source_89, str(data["ep"]))
    why_b = "\n".join(f"- {item} [归纳]" for item in data["why_b"])
    why_not_a = "\n".join(f"- {item} [归纳]" for item in data["why_not_a"])
    reverse = "\n".join(f"- {item}" for item in data["reverse"])
    content = f"""---
tags: [判断哲学, 播客提炼, 给女孩的商业第一课, 094-108补齐]
created: {TODAY}
layer: extract
status: stub
provenance: mixed
viewpoint_owner: ai_synthesis
decision_type: {data["decision_type"]}
decision_node: "{node}"
options: ["{option_a}", "{option_b}"]
source_count: 1
confidence: 0.6
aliases: ["{node}"]
sources:
  - show: "{SHOW}"
    episode: "{data["ep"]}"
    speaker: "{data["speaker"]}"
---
# [判断] {path.stem.replace("[判断] ", "")}

## 一句话判断
在「{source_89.stem}」相似场景下，优先选择「{option_b}」，而不是默认走「{option_a}」。

## 决策节点
- 面临的问题：什么时候该从「{option_a}」切换到「{option_b}」？
- 决策时刻：当你要把本集观点迁移到自己的项目、关系、组织或人生选择时。
- 决策对象：{data["object"]}

## 候选路径
| 路径 | 做法 | 代价 | 适用信号 |
|---|---|---|---|
| A：{option_a} | 沿用直觉、旧规则或表层指标 | 可能错过本集强调的关键约束 | 当前场景仍是标准化、低风险、低不确定性 |
| B：{option_b} | 按本集证据重算路径 | 需要重新收集事实，并承担调整成本 | 场景已经进入非标准化、长期主义或高价值决策 |

## 选择依据
| 判断维度 | 本次证据 | 权重 | 指向 |
|---|---|---:|---|
| 来源表述 | {data["evidence"]} | 高 | B |
| 场景匹配 | 本判断来自单集摘要、金句和核心要点的归纳，适合先作为决策提醒使用 | 中 | B |
| 风险 | 当前仍是 stub，需要回到来源笔记复核语境 | 中 | 复核 |

## 为什么选 B
{why_b}

## 为什么不选 A
{why_not_a}
- A 不是永远错误，而是它在本集语境下会遮蔽更关键的约束。 [AI推理]

## 反转条件
如果出现以下变化，需要重新判断：
{reverse}

## 可迁移用法
- 下次遇到类似节点，先问：我是在复制旧惯性，还是在按当前约束重算？
- 可复用判断句：先确认场景，再选择路径；不要把单集结论写成永久真理。

## 关联
- 来源单集：{source_link}
- 相关人物：待与本集 `01人物原萃` 互链
- 相关方法：待与本集 `02方法流程` 互链
- 相关概念：待与本集 `03概念链接` 互链

## 来源
- {source_link} — 从摘要、金句和核心要点中识别取舍表达 [归纳 + AI推理]
"""
    write_text(path, content)


def upsert_note_link(note_path: Path, judgment_path: Path) -> bool:
    text = read_text(note_path)
    label = judgment_path.stem
    line = f"- **04 判断哲学**：{obs_link(judgment_path, label)}"
    if line in text:
        return False
    if "## 拆解记录" not in text:
        text = text.rstrip() + "\n\n## 拆解记录\n\n" + line + "\n"
        write_text(note_path, text)
        return True

    pattern = re.compile(r"(^## 拆解记录\s*\n)(.*?)(?=^##\s+|\Z)", re.S | re.M)
    match = pattern.search(text)
    if not match:
        text = text.rstrip() + "\n\n## 拆解记录\n\n" + line + "\n"
        write_text(note_path, text)
        return True
    block = match.group(2)
    if "04 判断哲学" in block:
        return False
    new_block = block.rstrip() + "\n" + line + "\n"
    text = text[: match.start(2)] + new_block + text[match.end(2) :]
    write_text(note_path, text)
    return True


def count_judgments(start: str = "001", end: str = "108") -> int:
    total = 0
    for path in TARGET_04.iterdir():
        if not path.is_file() or not path.name.startswith("[判断] "):
            continue
        m = re.match(r"^\[判断\]\s+(\d{3})-", path.stem)
        if m and start <= m.group(1) <= end:
            total += 1
    return total


def upsert_after_heading(text: str, heading: str, section: str) -> str:
    if section.splitlines()[0] in text:
        return text
    marker = f"\n## {heading}\n"
    idx = text.find(marker)
    if idx == -1:
        return text.rstrip() + "\n\n" + section.rstrip() + "\n"
    next_idx = text.find("\n## ", idx + len(marker))
    if next_idx == -1:
        return text.rstrip() + "\n\n" + section.rstrip() + "\n"
    return text[:next_idx].rstrip() + "\n\n" + section.rstrip() + "\n" + text[next_idx:]


def update_progress(batch_count: int, total_04: int, skipped: int) -> None:
    text = read_text(PROGRESS)
    text = text.replace("> 最后更新：2026-07-19", "> 最后更新：2026-07-19")
    text = text.replace("> 最后更新：2026-07-17", "> 最后更新：2026-07-19")
    section = f"""## 2026-07-19｜给女孩的商业第一课 094-108 04 判断哲学补齐记录

- 094-108 已补齐 {batch_count} 个节目内 `[判断]` stub，并回填到对应单集 `## 拆解记录`。
- 当前整档 `04判断哲学` 覆盖：{total_04}/108；未强建集数：{skipped}。
- 口径：本轮补的是 `04` 数量闭环与回链，不等于质量精修成品。
"""
    text = upsert_after_heading(text, "2026-07-17｜给女孩的商业第一课 001-093 补齐记录", section)
    text = text.replace(
        "001-108 已形成 89 单集笔记；001-093 本轮批量补齐 010203，并按规则识别 04；094-108 已确认 123，04 待后续精修",
        f"001-108 已形成 89 单集笔记；001-093 已批量补齐 010203，并按规则识别 04；094-108 本轮补齐 {batch_count} 个 04 判断哲学 stub",
    )
    text = text.replace(
        "当前新骨架已补齐 001-108 的 89；001-093 已批量跑 010203，并识别可建 04；094-108 已补齐 010203",
        f"当前新骨架已补齐 001-108 的 89；001-093 已批量跑 010203，并识别可建 04；094-108 已补齐 010203，并补入 {batch_count} 个 04 判断哲学 stub",
    )
    write_text(PROGRESS, text)


def update_index(batch_count: int, total_04: int, skipped: int) -> None:
    text = read_text(INDEX)
    section = f"""## 2026-07-19 04 判断哲学补齐记录

- 094-108 已补齐 {batch_count} 个节目内 `[判断]` stub，并回填到对应单集 `## 拆解记录`。
- 当前整档 `04判断哲学` 覆盖：{total_04}/108；未强建集数：{skipped}。
- 本轮仍以 stub/growing 为主，完成可追溯闭环，不冒充精修成品。
"""
    if "## 2026-07-19 04 判断哲学补齐记录" not in text:
        text = text.rstrip() + "\n\n" + section
    write_text(INDEX, text)


def write_log(created: list[Path], updated_notes: list[Path], total_04: int, skipped: int) -> None:
    rows = "\n".join(f"- {obs_link(path, path.stem)}" for path in created)
    log = f"""---
tags: [播客知识库, 批次日志, 给女孩的商业第一课, 04判断哲学]
created: {TODAY}
layer: extract
status: done
provenance: system
viewpoint_owner: ai_synthesis
raw_material: false
---
# 给女孩的商业第一课 094-108 补齐 04 判断哲学｜{TODAY}

## 本次动作

- 对 094-108 单集补齐节目内 `04判断哲学` stub。
- 将新增判断节点回填到对应 `89单集笔记` 的 `## 拆解记录`。
- 不改动 `99原始资料`，不重写既有 `01/02/03`。

## 产出统计

| 类型 | 数量 |
|---|---:|
| 04 判断哲学 stub 新建/确认 | {len(created)} |
| 89 单集回填 04 链接 | {len(updated_notes)} |
| 整档 04 覆盖 | {total_04}/108 |
| 未强建集数 | {skipped} |

## 新增节点

{rows}

## 诚实边界

- 本轮补的是数量闭环与回链追溯，所有新增 04 仍为 `stub`。
- 04 节点来自单集摘要、金句和核心要点的归纳，后续可按高价值主题再精修。
"""
    name = f"给女孩的商业第一课094-108补齐04判断哲学-{TODAY}.md"
    write_text(LOG_ROOT / name, log)
    write_text(C_LOG_ROOT / name, log)


def main() -> None:
    TARGET_04.mkdir(parents=True, exist_ok=True)
    created: list[Path] = []
    updated_notes: list[Path] = []

    for data in JUDGMENTS:
        ep = str(data["ep"])
        note_path = file_by_episode(ep)
        filename = f"[判断] {safe_name(ep + '-' + str(data['node']), 48)}.md"
        judgment_path = TARGET_04 / filename
        if not judgment_path.exists():
            build_judgment_file(judgment_path, data, note_path)
            created.append(judgment_path)
        else:
            created.append(judgment_path)
        if upsert_note_link(note_path, judgment_path):
            updated_notes.append(note_path)

    total_04 = count_judgments("001", "108")
    skipped = 108 - total_04
    update_progress(len(JUDGMENTS), total_04, skipped)
    update_index(len(JUDGMENTS), total_04, skipped)
    write_log(created, updated_notes, total_04, skipped)

    print(f"judgments={len(JUDGMENTS)}")
    print(f"updated_notes={len(updated_notes)}")
    print(f"total_04={total_04}")
    print(f"skipped={skipped}")


if __name__ == "__main__":
    main()
