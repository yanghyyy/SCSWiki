# 内容规范

本文件说明 SCSWiki 的内容可信度、页面状态和写作边界。

## 内容类型

- `official-source`：依据公开正式来源整理，不代表本站官方。
- `verified`：已由维护者核验，适合站点规则或通用说明。
- `experience`：学生经验，不应视为学校正式规定。
- `archived`：历史内容，只作参考。

## 页面状态

- `draft`：草稿，结构或内容尚未完成。
- `active`：当前可读，但仍需结合来源判断适用性。
- `needs-review`：缺少可靠来源或等待复核。
- `archived`：归档内容，不应作为当前依据。

## 来源等级

- 公开正式来源：学校、学院或相关机构公开发布的信息。
- 维护者核验：维护者对通用内容、站点规则或公开来源整理后的检查。
- 学生经验：个人或群体经验，必须明确不是正式规定。
- 待核验材料：没有足够来源时，只能作为模板或问题清单。

## 时间敏感内容

涉及政策、流程、时间、地点、人员、奖助、考试、培养方案和竞赛认定的页面，需要填写 `last_verified` 和 `review_after`。`last_verified` 是维护者核验日期，不等同于 Git 提交时间。

## 何时归档

当页面只适用于过去时间段，或来源不再适用且无法更新时，应改为 `archived`，并说明不可作为当前依据。

## 不确定信息如何表达

- 写“待核验”“需要补充来源”，不要写成确定事实。
- 列出需要补充的字段。
- 不使用看似真实的占位数据。

## 页面模板

```markdown
---
title: 页面标题
description: 简短说明
category: campus
audience:
  - 本科新生
content_type: official-source
status: needs-review
last_verified: 2026-06-23
review_after: 2026-09-01
maintainers:
  - SCSWiki 维护组
sources: []
---

<ContentMeta />

# 页面标题

本页为待核验模板。补充学校特定事实前必须提供公开正式来源。
```
