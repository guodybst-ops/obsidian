"""将指定文件中的 extraction_status: partial 改为 complete"""
import re
from pathlib import Path

NOTES_DIR = Path(r"E:\KnowledgeBase\C-外脑-播客知识库\89单集笔记\42章经")
TARGETS = [
    "001 - 投 AI 最猛的人 对谈绿洲资本合伙人张津剑.md",
    "031 - 这可能才是 AI 陪伴真正该有的样子 对谈刷屏产品 EVE 创始人 Tristan.md",
    "032 - 我在 Character.ai 做 Post Training 对谈前 C.AI 模型应用算法专家 Ted.md",
    "033 - 用绝对理性应对世界的波动 对谈德扑世界冠军 Ricky Mao.md",
    "034 - 为什么我们对 25 年 AI 极度乐观 AI 年终复盘.md",
    "035 - 我是这样用 RL + LLM 做 Agent 的 对谈 Pokee AI 创始人朱哲清 Bill.md",
    "036 - 第一个出 ICU 的 AI 创业者 对谈心影随形 CEO Binson.md",
    "037 - 信念感与硅谷顶尖孵化器的奇遇 赴美三月 实现千万刀 ARR 对谈 ACE Studio 创始人 Joe.md",
    "039 - 一堂强化学习大师课 对谈清华叉院助理教授吴翼.md",
    "040 - Agent 开发的上半场 环境 Tools 和 Context 如何决定 Agent 对谈 Sheet0 创始人王文锋.md",
    "041 - AI 下半场 聊透 Benchmark 与 Evaluation 对谈前 Kimi 产品经理丁丁.md",
]

for fname in TARGETS:
    f = NOTES_DIR / fname
    if f.exists():
        content = f.read_text(encoding="utf-8")
        content = content.replace("extraction_status: partial", "extraction_status: complete")
        f.write_text(content, encoding="utf-8")
        print(f"  {fname[:3]} partial → complete")
    else:
        print(f"  {fname[:3]} 文件不存在")

print("完成")