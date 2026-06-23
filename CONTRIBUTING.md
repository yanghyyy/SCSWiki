# 贡献指南

感谢参与 SCSWiki。请先确认你的贡献不会公开个人隐私、内部系统信息或未经授权的版权材料。

## 不熟悉 Git 的贡献方式

你可以通过 GitHub Issue Forms 提交：

- 内容错误反馈。
- 内容过期反馈。
- 新内容建议。

请提供页面 URL、问题描述、建议修改和可公开访问的来源材料。不要填写手机号、学号、身份证号、群号、内部系统链接或个人联系方式。

## 熟悉 Git 的贡献方式

1. Fork 仓库。
2. 创建描述清晰的分支，例如 `docs/update-trust-guide`。
3. 修改内容并运行 `pnpm check`。
4. 提交 Pull Request，并填写 PR 模板。

## 提交建议

- 文档：`docs: update content guide`
- 工程：`build: add link checker`
- 修复：`fix: correct broken link`

## Front Matter

普通内容页必须填写统一 Front Matter：

```yaml
---
title: 页面标题
description: 页面说明
category: study
audience:
  - 本科生
content_type: experience
status: needs-review
last_verified: 2026-06-23
review_after: 2026-09-01
maintainers:
  - SCSWiki 维护组
sources: []
---
```

## 引用来源

外部来源应写入 `sources`：

```yaml
sources:
  - name: 来源名称
    url: https://example.com/source
```

政策、流程、培养方案、奖助、考试等高风险内容应优先引用公开正式来源。没有来源时，只能提交待核验模板。

## 本地检查

```bash
pnpm install
pnpm check
pnpm build
```

不要通过关闭规则、删除测试或忽略错误来让检查通过。
