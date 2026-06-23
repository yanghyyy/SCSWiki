# AGENTS.md

本仓库是 SCSWiki：面向西华师范大学计算机学院学生的非官方学生知识库。后续自动化代理和维护者应优先保护内容可信度、隐私和可维护性。

## 目录结构

- `docs/`：VitePress 站点内容。
- `docs/.vitepress/`：站点配置、导航、侧边栏和主题扩展。
- `docs/.vitepress/theme/components/`：Vue 组件。
- `docs/public/`：静态资源。
- `scripts/`：内容验证、内部链接检查和测试代码。
- `.github/`：Issue Forms、PR 模板、CODEOWNERS 和 GitHub Actions。

## 常用命令

- `pnpm install`：安装依赖。
- `pnpm dev`：启动本地开发服务器。
- `pnpm build`：生产构建。
- `pnpm preview`：预览生产构建结果。
- `pnpm check`：运行类型、格式、Markdown、内容、链接、测试和构建检查。

## 编码和工程规范

- 使用 UTF-8、TypeScript、Vue 3、VitePress 和 pnpm。
- 不引入 React、Nuxt、数据库、SSR 服务或大型 UI 框架。
- 不关闭 TypeScript 严格检查来规避错误。
- 不通过删除测试、关闭规则或忽略错误来让检查通过。
- CI 中使用 `format:check`，不要自动修改文件。

## 内容规范

- 使用简体中文，语气直接、准确、面向学生。
- 学校特定政策、人员、联系方式、课程规则、办事流程等内容必须有可靠公开来源。
- 缺少可靠来源时，只创建 `status: needs-review` 的待核验模板。
- 不写真实个人联系方式、学号、手机号、群号、内部系统链接或隐私信息。
- 不使用未经授权的校徽、学院标志或受版权保护的课程材料。
- 页面 URL 使用稳定的英文小写短横线命名。

## Front Matter

普通内容页应包含：

- `title`
- `description`
- `category`
- `audience`
- `content_type`
- `status`
- `last_verified`
- `review_after`
- `maintainers`
- `sources`

`content_type` 仅允许：`official-source`、`verified`、`experience`、`archived`。

`status` 仅允许：`draft`、`active`、`needs-review`、`archived`。

## 完成定义

一次变更只有在以下条件满足后才算完成：

- 相关页面可构建且内部链接有效。
- 高风险内容没有无来源冒充正式信息。
- `pnpm check` 通过。
- `pnpm build` 通过。
- 文档说明与实际脚本一致。
