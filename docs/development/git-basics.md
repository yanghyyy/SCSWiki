---
title: Git 入门
description: Git 的最小可用工作流
category: development
audience:
  - 本科生
content_type: experience
status: active
maintainers:
  - SCSWiki 维护组
sources: []
---

<ContentMeta />

# Git 入门

Git 用于记录代码和文档的变更历史。初学阶段先掌握少量命令即可。

## 最小工作流

```bash
git status
git add .
git commit -m "docs: update note"
git log --oneline
```

## 建议

- 每次提交只描述一个清晰变更。
- 提交前先运行项目检查命令。
- 不提交密钥、账号、个人隐私或临时文件。
