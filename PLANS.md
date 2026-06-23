# SCSWiki 首轮构建计划

本文件用于追踪 `CODEX_BOOTSTRAP.md` 中定义的首轮 MVP 构建任务。每完成一个阶段后更新对应复选框。

## 前置要求

- [x] 检查当前仓库内容，不删除已有有效文件
- [x] 创建 `PLANS.md`
- [x] 创建 `AGENTS.md`

## 阶段 A：仓库基础

- [x] 初始化 pnpm、TypeScript、VitePress
- [x] 建立基础目录结构
- [x] 配置基础脚本
- [x] 安装依赖并生成锁文件
- [x] 确认可执行生产构建

## 阶段 B：网站和信息架构

- [x] 实现首页、导航、侧边栏
- [x] 启用 VitePress 本地搜索并本地化文案
- [x] 支持浅色和深色主题
- [x] 创建 404 页面
- [x] 创建分类索引和首批内容页面

## 阶段 C：可信度系统

- [x] 定义 Front Matter Schema
- [x] 实现内容验证脚本
- [x] 实现内容元数据展示组件
- [x] 实现过期、经验、草稿、待核验、归档提示
- [x] 添加对应单元测试

## 阶段 D：质量检查和 CI

- [x] 配置 Prettier
- [x] 配置 Markdown lint
- [x] 配置 TypeScript 类型检查
- [x] 实现内部链接检查
- [x] 串联 `pnpm check`
- [x] 创建 GitHub Actions CI

## 阶段 E：协作和部署

- [x] 创建 Issue Forms
- [x] 创建 PR 模板
- [x] 创建 CODEOWNERS 模板
- [x] 完成 README、CONTRIBUTING、CONTENT_GUIDE、SECURITY 等治理文档
- [x] 创建 GitHub Pages 部署 workflow
- [x] 写明需要管理员手动配置的 GitHub 设置

## 阶段 F：最终自查

- [x] 查看 `git diff`
- [x] 检查是否有虚构学校特定信息
- [x] 检查是否有秘密、个人信息或不应提交的绝对路径
- [x] 运行 `pnpm check`
- [x] 运行 `pnpm build`
- [x] 核对 README 命令和实际脚本
- [x] 更新本计划
- [x] 输出最终总结
