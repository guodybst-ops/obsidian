---
type: clipper-template
status: ready
created: 2026-07-07
---

# Web Clipper 剪藏模板

网页、公众号、视频字幕和社媒内容先保存到 `01_收件箱/内容/手动剪藏`，再用入库规则处理。

## 推荐正文模板

```markdown
---
type: web-clip
status: inbox
source: {{url}}
title: {{title}}
author: {{author}}
published: {{published}}
captured: {{date}}
tags: [clip, inbox]
---

# {{title}}

## 来源

- 链接：{{url}}
- 作者：{{author}}
- 发布时间：{{published}}
- 剪藏时间：{{date}}

## 原文摘录

{{content}}

## 为什么值得存


## 初步判定

- 相关性：
- 新鲜度：
- 价值度：
- 可输出性：
- 关联性：
- 结果：S / A / B / C / D
```

## 保存位置

`01_收件箱/内容/手动剪藏/{{date}} {{title}}.md`

