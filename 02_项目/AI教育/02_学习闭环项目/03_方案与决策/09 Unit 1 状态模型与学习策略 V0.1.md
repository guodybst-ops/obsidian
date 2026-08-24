# Unit 1 状态模型与学习策略 V0.1

> 日期：2026-07-06
> 上位架构：[[08 Learning State Engine 系统架构说明书]]
> 目的：把 PEP 六年级英语 Unit 1 从“题目集合”升级为“可更新学生学习状态的最小系统”。

---

## 1. 本轮决策

Unit 1 暂定采用：

> 中粒度知识点 + 细粒度错因标签。

理由：

- 粗粒度只说“交通方式不会”，无法指导下一题练什么。
- 细粒度把每个语法点都拆开，早期维护成本太高。
- 中粒度知识点可以直接服务出题、批改、状态更新和家长报告。
- 细粒度错因标签可以解释为什么错，弥补中粒度不够细的问题。

---

## 2. Unit 1 知识点表

结构化表见：[[v0.2_knowledge_points_unit1.csv]]。

当前 Unit 1 先锁定 9 个知识点：

| 知识点 ID | 展示名 | 类型 | 优先级 | 报告标签 |
| --- | --- | --- | --- | --- |
| `kp_pep6_u1_by_bus` | by bus | 短语 | 核心 | 乘公共汽车 |
| `kp_pep6_u1_on_foot` | on foot | 短语 | 核心 | 步行 |
| `kp_pep6_u1_usually` | usually | 频率副词 | 核心 | 频率副词 usually |
| `kp_pep6_u1_often` | often | 频率副词 | 核心 | 频率副词 often |
| `kp_pep6_u1_how_go_to_school` | How do you go to school? | 句型 | 核心 | 询问上学方式句型 |
| `kp_pep6_u1_i_go_by_bus` | I go to school by bus. | 句型 | 核心 | 表达上学方式句型 |
| `kp_pep6_u1_i_usually_go_on_foot` | I usually go on foot. | 句型 | 核心 | 通常步行表达 |
| `kp_pep6_u1_bus_stop` | bus stop | 短语 | 支撑 | 公共汽车站 |
| `kp_pep6_u1_reading_detail_bus_stop` | reading detail: bus stop | 阅读能力 | 核心 | 阅读细节定位 |

---

## 3. 错因标签表

结构化表见：[[v0.2_error_tags_unit1.csv]]。

当前错因分为五类：

- `knowledge`：词义、概念、短语含义不清。
- `syntax`：语序、功能词、介词搭配错误。
- `expression`：中式直译或表达不自然。
- `reading`：阅读定位和信息提取错误。
- `safety/audit`：提示词攻击、无关文本、AI 可能误判。

关键原则：

> 错因标签服务于下一题选择，不只是报告里好看。

例如：

- `adverb_confusion` 出现 2 次，下一轮优先生成 usually/often 对比题。
- `word_order_error` 出现 2 次，下一轮优先生成连词成句和句型框架题。
- `reading_location_error` 出现 2 次，下一轮优先训练找关键词和划证据。

---

## 4. 学生状态表

模板见：[[v0.2_student_state_template.csv]]。

### 4.1 初始状态

如果没有前测数据，Unit 1 的每个知识点先给中性初值：

```text
mastery = 0.60
confidence = 0.20
evidence_count = 0
status_color = yellow
next_action = collect_evidence
```

解释：

- `0.60` 不表示学生已经会了，只表示系统暂时不做强判断。
- `confidence = 0.20` 表示证据不足，不能用于家长报告中的确定结论。
- 第一套作业的作用不是“评价学生”，而是收集状态证据。

### 4.2 红黄绿规则

```text
mastery < 0.40 -> red
0.40 <= mastery < 0.75 -> yellow
mastery >= 0.75 -> green
```

补充：

- `confidence < 0.40` 时，即使 mastery 高，也只能写“初步表现较好”。
- `evidence_count < 3` 时，不给长期掌握结论。
- 连续两次同错因，比单次错题更值得进入再练。

---

## 5. 状态更新事件表

模板见：[[v0.2_state_events_template.csv]]。

每道题批改后，都应生成一条或多条 state event。

### 5.1 为什么要有 event 表

不要直接覆盖学生状态，否则以后无法解释状态为什么变化。

正确做法：

```text
student_action -> feedback -> state_event -> aggregate student_state
```

这样以后可以回答：

- 这个知识点为什么从黄变红？
- 学生最常见错因是什么？
- 哪些题影响了报告结论？
- AI 是否可能误判？

### 5.2 更新规则 V0.1

| 题目难度 | 答对 mastery | 答错 mastery | confidence | 说明 |
| --- | --- | --- | --- | --- |
| basic | +0.08 | -0.12 | +0.10 | 基础题主要验证底层识别 |
| variant | +0.12 | -0.10 | +0.12 | 变式题更能证明掌握 |
| transfer | +0.16 | -0.06 | +0.15 | 迁移题错了不应重罚 |

特殊规则：

- 同一知识点连续 2 次答对：额外 `mastery + 0.05`。
- 同一知识点连续 2 次同错因答错：`next_action = targeted_remediation`。
- 学生答案混入提示词攻击：该题 `needs_human_review = true`，且学生端反馈不得泄露答案 key。
- AI 判定不确定：只生成老师端建议，不生成确定性学生反馈。

---

## 6. Learning Policy V0.1

### 6.1 选择知识点

优先级从高到低：

1. 红色知识点。
2. 连续同错因知识点。
3. 低 confidence 但属于核心知识点。
4. 长时间未练的黄色知识点。
5. 已绿色但需要迁移验证的知识点。

### 6.2 选择题型

| 情况 | 下一题策略 |
| --- | --- |
| 词义混淆 | 选择题 -> 对比填空 -> 翻译 |
| 频率副词混淆 | usually/often 最小对比题 |
| 语序错误 | 连词成句 -> 句型框架填空 |
| 功能词遗漏 | 句型骨架题，突出 do/to/by |
| 阅读定位错误 | 找关键词 -> 选择题 -> 简答题 |
| 中式直译 | 中文到英文替换式翻译 |

### 6.3 选择难度

```text
red -> basic
yellow -> variant
green -> transfer 或 spaced_review
```

如果学生连续错 3 题：

- 降低难度。
- 减少一次练习中的知识点数量。
- 给老师端提示“可能需要人工讲解”。

如果学生连续对 3 题：

- 提高难度。
- 换一种题型验证迁移。
- 或把该知识点放入间隔复习队列。

---

## 7. Unit 1 报告样例结构

完整样例见：[[Unit 1 红黄绿知识点报告样例]]。

### 7.1 学生视角

```text
你这次在 by bus、on foot 这类交通方式表达上表现较稳定。
usually / often 还需要再练，尤其要分清“通常”和“经常”。
下一轮先做 3 道 usually/often 对比题，再做 2 道句子填空。
```

### 7.2 家长视角

```text
本次练习显示，孩子对交通方式短语有初步掌握；频率副词 usually/often 容易混淆。
系统建议下一轮重点练习频率副词对比和上学方式句型。
目前样本量还少，本报告是初步判断，建议完成 2-3 次练习后再看稳定掌握情况。
```

### 7.3 老师视角

```text
高频错因：adverb_confusion。
建议讲评：usually/often 的含义差异，以及它们在句子中的位置。
可布置再练：3 道最小对比填空 + 2 道句型替换题。
需要复核：如学生答案中出现无关文本或提示词攻击，先检查与题目相关部分，再决定是否给分。
```

---

## 8. 下一步接入 Dify 的方式

现有 Dify 不需要推倒。

下一步要让 Dify 输出多两个结构：

```json
{
  "state_events": [
    {
      "question_id": "Q4",
      "knowledge_point_ids": ["kp_pep6_u1_often"],
      "is_correct": false,
      "error_tags": ["adverb_confusion"],
      "mastery_delta": -0.12,
      "confidence_delta": 0.12,
      "needs_human_review": false
    }
  ],
  "next_policy_decision": {
    "selected_knowledge_point_ids": ["kp_pep6_u1_often", "kp_pep6_u1_usually"],
    "next_stimulus_types": ["contrast_fill_blank", "sentence_completion"],
    "difficulty_band": "basic"
  }
}
```

这样 Dify 就不只是批改和写报告，而是开始为 Learning State Engine 提供状态更新证据。

---

## 9. 当前仍未决定的问题

- `mastery` 初始值是否统一给 0.60，还是根据学生年级/前测动态初始化？
- Unit 1 是否需要加入听力/口语知识点，还是 V0.2 只做书面作业？
- 家长报告要不要显示具体 mastery 分数，还是只显示红黄绿？
- 机构版是否需要班级维度的 `class_state`？

当前建议：V0.2 暂时不引入听力/口语，不显示 mastery 小数，只显示红黄绿和证据不足提示。
