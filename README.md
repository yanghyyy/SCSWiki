# SCSWiki

SCSWiki 是西华师范大学计算机学院学生知识库（非官方）。项目面向学生，尤其是新生，整理通用学习经验、开发工具入门、内容模板和贡献规范。

本站不代表学校或学院立场。涉及培养方案、学籍、考试、奖助、竞赛认定、办事流程等内容时，请以学校或学院最新正式通知为准。

## 当前状态

首轮 MVP：VitePress 静态站点、内容可信度元数据、内容验证、内部链接检查、CI 和 GitHub Pages workflow 已配置。

## 技术栈

- VitePress
- Vue 3
- TypeScript
- pnpm
- Vitest

## 环境要求

- Node.js `>=20.11.0`
- pnpm 9 或更高版本

## 本地命令

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

## 目录结构

- `docs/`：站点页面。
- `docs/.vitepress/`：站点配置、导航、侧边栏和主题组件。
- `scripts/`：内容验证、内部链接检查和单元测试。
- `.github/`：Issue Forms、PR 模板、CI 和 Pages workflow。
- `CONTENT_GUIDE.md`：内容可信度和写作规范。
- `CONTRIBUTING.md`：贡献说明。

## 部署说明

GitHub Pages workflow 会运行 `pnpm check` 并上传 `docs/.vitepress/dist`。默认 `base` 为 `/`。

不同部署场景可这样处理：

- 用户或组织站点：保持 `VITEPRESS_BASE=/`。
- 自定义域名：保持 `VITEPRESS_BASE=/`，并在 GitHub Pages 设置中配置域名。
- 仓库子路径：在 Pages workflow 中设置 `VITEPRESS_BASE=/<repo>/`，例如 `/SCSWiki/`。

不要把未知 GitHub 用户名或组织名写死到配置里。

## 贡献入口

- 没有 Git 经验：使用 Issue Forms 反馈错误、过期内容或新内容建议。
- 熟悉 Git：Fork 仓库，创建分支，提交 Pull Request。

更多规则见 [CONTRIBUTING.md](./CONTRIBUTING.md) 和 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。

## 许可证

- 代码：MIT License，见 [LICENSE](./LICENSE)。
- 文档内容：CC BY-SA 4.0，见 [LICENSE-CONTENT](./LICENSE-CONTENT)。

学校名称、校徽、学院标志或第三方商标不因本仓库许可证而获得再许可。
