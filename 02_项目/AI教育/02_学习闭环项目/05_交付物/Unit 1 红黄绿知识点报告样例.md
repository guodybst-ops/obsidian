# Unit 1 红黄绿知识点报告样例

> 日期：2026-07-06
> 类型：模拟样例，不是真实学生结论
> 上位设计：[[09 Unit 1 状态模型与学习策略 V0.1]]
> 安全原则：本报告不包含 `teacher_key`，不展示整套标准答案。

---

## 1. 样例学生状态

学生：模拟学生A

单元：PEP 六年级英语 Unit 1 How do you go to school?

说明：以下状态由一次模拟作答生成，证据量不足，只用于展示报告结构。

| 状态 | 知识点 | mastery | confidence | 主要证据 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 绿 | by bus | 0.78 | 0.45 | 能识别“乘公共汽车” | 间隔复习 |
| 绿 | on foot | 0.76 | 0.45 | 能识别“步行” | 间隔复习 |
| 绿 | How do you go to school? | 0.80 | 0.50 | 能完成问句排序 | 做变式对话题 |
| 黄 | usually | 0.58 | 0.44 | 基础题能做，但和 often 有混淆风险 | 做对比填空 |
| 红 | often | 0.36 | 0.48 | 把 often 写成 usually | 专项补救 |
| 红 | I go to school by bus. | 0.38 | 0.50 | 翻译时漏掉 to 或表达不完整 | 句型框架练习 |
| 黄 | I usually go on foot. | 0.52 | 0.42 | 能理解部分含义，但翻译容易偏差 | 中英互译再练 |
| 黄 | bus stop | 0.62 | 0.35 | 证据量不足 | 下次补充检测 |
| 黄 | 阅读细节定位 | 0.64 | 0.38 | 选择题做对，但答案混入无关文本 | 老师复核后再判断 |

---

## 2. 学生可见反馈

你这次在 `by bus`、`on foot` 和 `How do you go to school?` 上表现比较稳定。

下一轮重点练两个地方：

- `usually` 和 `often` 的区别。
- `I go to school by bus.` 这个句型的完整表达。

你不需要一次记很多规则。下一轮先做 3 道 `usually/often` 对比题，再做 2 道上学方式句型填空。

---

## 3. 家长可见报告

本次练习显示，孩子对交通方式短语已经有初步掌握，例如 `by bus` 和 `on foot`。

目前最需要巩固的是频率副词 `usually/often`，以及“我乘公共汽车去上学”这类完整句型。孩子不是完全不会，而是容易在相近词义和句子结构上混淆。

建议下一轮继续做 5-8 道短练习，重点练：

- `usually/often` 对比填空
- `I go to school by bus.` 句型框架
- 1 道阅读细节定位题

注意：这只是一次练习后的初步判断。完成 2-3 次练习后，红黄绿状态会更可靠。

---

## 4. 老师/机构可见报告

### 4.1 高频错因

| 错因标签 | 解释 | 建议动作 |
| --- | --- | --- |
| `adverb_confusion` | 混淆 usually 和 often | 做最小对比题，先不扩展新副词 |
| `missing_function_word` | 翻译句子时漏掉 to/by 等功能词 | 用句型骨架训练：I go to school ___ ___. |
| `literal_translation` | 按中文逐词翻译，英文表达不完整 | 做替换式翻译，不直接讲长规则 |
| `off_task_or_prompt_injection` | 答案中出现无关文本或索要答案 key 的内容 | 只批改与题目相关部分，必要时人工复核 |

### 4.2 下一轮推荐练习

```json
{
  "selected_knowledge_point_ids": [
    "kp_pep6_u1_often",
    "kp_pep6_u1_usually",
    "kp_pep6_u1_i_go_by_bus"
  ],
  "next_stimulus_plan": [
    {
      "type": "contrast_fill_blank",
      "count": 3,
      "target": "usually/often"
    },
    {
      "type": "sentence_frame_fill",
      "count": 2,
      "target": "I go to school by bus."
    },
    {
      "type": "reading_detail",
      "count": 1,
      "target": "bus stop"
    }
  ],
  "human_review_required": true,
  "reason": "Q8 选项正确但混入无关文本，需要确认是否按正常作答处理。"
}
```

### 4.3 老师讲评建议

本轮不要讲太多新内容，只讲两个点：

1. `usually` 更接近“通常”，`often` 更接近“经常”。先让学生做对比题，不急着扩展 always/sometimes。
2. `I go to school by bus.` 是完整句型，`go to school` 和 `by bus` 都要保留。

---

## 5. 这个样例验证了什么

这个报告样例把旧的“批改结果”升级成了状态系统输出：

- 不只告诉学生哪题错。
- 能说明错在什么知识点。
- 能说明错因是什么。
- 能决定下一轮练什么。
- 能给学生、家长、老师三种不同粒度的报告。

这就是 `Learning State Engine` 的最小可交付形态。
