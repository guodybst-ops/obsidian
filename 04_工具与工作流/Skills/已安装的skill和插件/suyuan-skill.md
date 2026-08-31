# suyuan-skill

**GitHub：** [suyuan2022/suyuan-skill](https://github.com/suyuan2022/suyuan-skill)

这是一组面向 Claude Code / Codex 的独立 Skill。已安装到本机 Codex 技能目录：

`C:\Users\89836\.codex\skills`

## 已安装

| Skill | 作用 | 什么时候用／直接这样说 |
|---|---|---|
| `break-ai-slop` | 执行前先提取行家经验、失败模式和关键约束，减少空泛的 AI 输出 | “先用行家模式检查这个任务”“别给我水货” |
| `codex-review` | 通过两个 Codex 模型独立审查，再仲裁分歧；支持 review、fix、audit、autopilot | “review 一下这段代码”“做一次 OWASP 安全审查” |
| `task-triage` | 用 5+1 个维度判断任务价值、优先级，以及是否应该由自己亲自做 | “帮我判断这件事值不值得做” |
| `whatis` | 把主题解释成图先行的 HTML 页面，适合流程、架构、时序和时间线 | `/whatis 主题` 或“把这个东西讲明白，最好用图” |
| `claude-cleanup` | 在 macOS 上审计、备份、清理或重置 Claude Code / Desktop 本机状态 | 仅在 macOS 上处理 Claude 本机清理 |
| `claude-cleanup-audit` | 在 macOS 上审计 Claude 本机数据、隐私设置和清理选项 | “先审计 Claude 本机状态，不要修改” |

## 使用提醒

- `break-ai-slop` 适合复杂任务开始前调用；它会先做认知校准，再执行任务。
- `codex-review` 依赖已安装并登录的 Codex CLI；不同模式的写入权限不同。
- `whatis` 会生成自包含 HTML；需要查看生成页面时再调用。
- `claude-cleanup` 和 `claude-cleanup-audit` 明确面向 macOS。当前这台 Windows 电脑上只做目录登记，不应直接执行其中的 macOS 清理脚本。
- 原始 `SKILL.md` 以 `C:\Users\89836\.codex\skills\<skill名>\SKILL.md` 为准；本页负责来源、用途和调用提示，不复制一份容易过期的副本。

## 相关目录

- [[本机技能目录_2026-08-05/00_总览|本机 Skills 总览]]
- [[本机技能目录_2026-08-05/01_完整技能目录|完整技能目录]]
- [[本机技能目录_2026-08-05/03_可直接调用技能速查|可直接调用技能速查]]
- [[更新本机技能目录.ps1|更新本机技能目录脚本]]

> 记录更新时间：2026-08-26
