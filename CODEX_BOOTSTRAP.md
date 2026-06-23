# SCSWiki Codex 首轮构建任务书

你是一名负责从零构建文档型开源项目的高级前端与工程化开发者。请在当前 Git 仓库中完成 SCSWiki 的第一版 MVP。

## 0. 项目背景

项目名称：SCSWiki

中文定位：西华师范大学计算机学院学生知识库。

英文释义暂定：School of Computer Science Wiki。

项目面向西华师范大学计算机学院学生，重点服务新生，形式参考 OI Wiki、AlgoWiki 等社区维护型知识库。

本项目是学生维护的非官方知识库，不代表学校或学院立场。涉及培养方案、学籍、考试、奖助、竞赛认定和办事流程等内容，必须提示读者以学校或学院最新正式通知为准。

## 1. 本轮目标

在当前仓库中建立一个可以直接运行、构建和部署的静态 Wiki MVP，完成：

1. 基于 VitePress、TypeScript、Vue 和 pnpm 的项目骨架。
2. 中文响应式主页、导航栏、侧边栏、全文搜索和 404 页面。
3. 清晰的信息架构与一组不虚构学校事实的示例页面或待核验模板。
4. 文档可信度元数据、页面状态提示和过期提示。
5. Markdown、格式、类型、内容元数据、内部链接和生产构建检查。
6. GitHub Actions CI，以及可直接启用的 GitHub Pages 部署工作流。
7. GitHub Issue Forms、PR 模板、贡献指南、内容规范和许可证说明。
8. 面向后续 Codex 会话的 `AGENTS.md` 和可追踪的 `PLANS.md`。

本轮不实现：

- 用户注册、登录和权限系统；
- 数据库或后端服务；
- 评论、点赞、积分或用户等级；
- 教务系统登录、爬虫或学校内部 API；
- QQ 机器人、小程序或 App；
- 未经授权的校徽、学院标志或教师、学生个人信息；
- 任何被描述为“官方”但没有来源的学校信息。

## 2. 工作方式

1. 先检查当前仓库内容，不覆盖或删除已有有效文件。
2. 如果仓库基本为空，先创建 `PLANS.md`，把本任务拆成阶段和复选框。
3. 创建简洁、可执行的 `AGENTS.md`，写明目录结构、运行命令、编码规范、内容规范、禁止事项和完成定义。
4. 按阶段实施，每完成一个阶段就更新 `PLANS.md`。
5. 安装依赖后生成并保留锁文件。
6. 每次修改工程配置后运行相关检查。
7. 所有检查失败时先定位并修复，不要通过关闭规则、删除测试或忽略错误来“通过”。
8. 除非被环境或凭据完全阻塞，否则不要停在计划阶段；继续完成可在本地完成的内容。
9. 不创建远程仓库，不推送，不发布，不修改用户全局 Git 配置，不读取仓库外的私密文件。
10. 最终给出：修改摘要、关键目录、运行命令、检查结果、尚需人工配置的事项。

## 3. 技术约束

### 3.1 核心技术

- VitePress
- Vue 3
- TypeScript
- pnpm
- Node.js 当前活跃 LTS 范围，使用 `package.json` 的 `engines` 明确最低版本
- UTF-8

不要引入 React、Nuxt、数据库、SSR 服务或重型 UI 框架。

### 3.2 建议依赖

在确有用途时使用以下工具；不要安装重复功能的包：

- `vitepress`
- `vue`
- `typescript`
- `tsx`
- `gray-matter`
- `zod`
- `fast-glob`
- `prettier`
- `markdownlint-cli2`
- `vitest`

优先使用 VitePress 自带能力。不要为了简单功能引入庞大依赖。

### 3.3 目录目标

可以根据 VitePress 实际规范微调，但最终应至少包含：

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── config.yml
│   │   ├── content-error.yml
│   │   ├── outdated-content.yml
│   │   └── new-content.yml
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy-pages.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts
│   │   ├── nav.ts
│   │   ├── sidebar.ts
│   │   └── theme/
│   │       ├── components/
│   │       ├── index.ts
│   │       └── custom.css
│   ├── public/
│   ├── index.md
│   ├── start/
│   ├── study/
│   ├── development/
│   ├── competitions/
│   ├── research/
│   ├── campus/
│   ├── services/
│   ├── career/
│   ├── faq/
│   ├── about/
│   └── 404.md 或 VitePress 等效实现
├── scripts/
│   ├── content-schema.ts
│   ├── validate-content.ts
│   ├── check-internal-links.ts
│   └── tests/
├── AGENTS.md
├── PLANS.md
├── README.md
├── CONTRIBUTING.md
├── CONTENT_GUIDE.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
├── LICENSE-CONTENT
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc.json
└── .markdownlint-cli2.yaml
```

## 4. 网站功能要求

### 4.1 主页

制作简洁、现代、中文友好的主页。不能照搬 OI Wiki 的品牌或视觉资源。

主页至少包括：

- SCSWiki 标题和一句清晰定位；
- “新生从这里开始”和“参与贡献”两个主要入口；
- 分类卡片：新生入门、专业学习、开发环境、竞赛实践、科研实验室、校园生活、办事指南、升学就业、常见问题；
- 显眼但不过度打扰的“非官方网站”说明；
- 内容可信度说明入口；
- 最近核验含义说明，不伪造“最近更新”动态数据。

视觉要求：

- 支持浅色和深色模式；
- 移动端可用；
- 不依赖外部字体、外部统计脚本或第三方 CDN；
- 颜色对比度合理；
- 不使用未经授权的校徽；
- 使用 CSS 创建简单文字标识或抽象图形占位标志；
- 避免大面积动画和花哨渐变；
- 不虚构访问量、贡献者数量、文档数量。

### 4.2 导航和侧边栏

顶部导航至少包含：

- 首页
- 新生入门
- 专业学习
- 竞赛与实践
- 校园生活
- 办事指南
- 关于与贡献

侧边栏按目录组织，并允许后续通过 TypeScript 文件方便维护。

### 4.3 搜索

启用 VitePress 本地搜索，中文界面文案应本地化。不得要求外部搜索服务或密钥。

### 4.4 页面元数据展示

实现一个 Vue 组件，例如 `ContentMeta.vue`，在普通内容页顶部展示：

- 内容类型；
- 页面状态；
- 最后核验日期；
- 建议复核日期；
- 维护者；
- 来源数量或来源列表入口。

实现以下内容类型：

- `official-source`：依据公开正式来源整理，不代表本站官方；
- `verified`：已由维护者核验；
- `experience`：学生经验；
- `archived`：历史内容。

实现以下状态：

- `draft`
- `active`
- `needs-review`
- `archived`

当构建日期晚于 `review_after` 时，在页面显示“内容可能已经过期”的警告。该警告不能依赖后端。

对于 `experience` 类型，显示“学生经验，不应视为学校正式规定”。

对于 `draft` 或 `needs-review`，显示明确状态提示。

### 4.5 文档 Front Matter

普通内容页使用统一 Front Matter。示例：

```yaml
---
title: 校园网络连接指南
description: 宿舍和教学区域网络使用说明的待核验页面
category: campus
audience:
  - 本科新生
content_type: verified
status: needs-review
last_verified: 2026-06-23
review_after: 2026-09-01
maintainers:
  - SCSWiki 维护组
sources: []
---
```

注意：不要把示例中的“校园网络说明”写成未经核验的事实。可以创建模板并明确标注待核验。

定义 Zod 或等价 TypeScript Schema，对普通内容页执行验证：

必填字段：

- `title`
- `description`
- `category`
- `content_type`
- `status`
- `last_verified`
- `review_after`
- `maintainers`
- `sources`

规则：

- 日期使用 `YYYY-MM-DD`；
- `review_after` 不早于 `last_verified`；
- 枚举值必须合法；
- `maintainers` 必须为非空数组；
- `sources` 为对象数组或空数组；
- `active` 且属于政策、办事流程、培养方案、奖助、考试等高风险分类的页面，原则上至少有一个来源；
- 示例、首页、索引页可通过明确白名单或专用字段豁免，但不能静默跳过所有验证。

## 5. 内容要求

### 5.1 首批页面

至少建立以下页面或栏目索引：

1. 项目介绍
2. 使用说明
3. 内容可信度说明
4. 如何贡献
5. 新生入门总览
6. 新生常见问题
7. 专业学习总览
8. 开发环境总览
9. 算法竞赛入门
10. 科研与实验室信息模板
11. 校园生活总览
12. 办事指南总览
13. 升学与就业总览
14. 内容纠错说明
15. 隐私与内容边界

可以增加 C/C++、Git、Linux 等通用技术入门页面，但不要大规模生成低质量文章。

### 5.2 事实边界

不得自行断言以下学校特定事实：

- 报到日期、地点和流程；
- 宿舍配置和分配规则；
- 培养方案、课程学分和毕业要求；
- 奖助、评优、保研、转专业、补考、重修政策；
- 实验室招生规则；
- 教师评价和联系方式；
- 学院组织的当前负责人；
- 任何账号、群号、电话或内部链接。

对尚无可靠资料的页面：

- 使用“待核验模板”；
- 明确列出需要补充的信息字段；
- 标记 `status: needs-review`；
- 不使用貌似真实的占位数据。

### 5.3 写作风格

- 简体中文；
- 直接、准确、面向学生；
- 区分“正式来源”“维护者核验”“个人经验”；
- 不使用宣传式空话；
- 不写教师或学生排名；
- 不公开个人隐私；
- 所有外部引用应有来源名称和 URL 字段；
- 页面 URL 使用稳定的英文小写短横线命名。

## 6. 工程化要求

### 6.1 package scripts

至少提供：

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "preview": "...",
    "typecheck": "...",
    "lint:md": "...",
    "format": "...",
    "format:check": "...",
    "validate:content": "...",
    "check:links": "...",
    "test": "...",
    "check": "..."
  }
}
```

`pnpm check` 必须串联至少：

- TypeScript 类型检查；
- Markdown lint；
- Prettier 检查；
- Front Matter 验证；
- 内部链接检查；
- 单元测试；
- VitePress 生产构建。

不要让 `format` 在 CI 中自动修改文件；CI 使用 `format:check`。

### 6.2 测试

使用 Vitest 或等价轻量工具为以下逻辑编写测试：

- 合法 Front Matter 通过；
- 缺少必填字段失败；
- 非法枚举失败；
- 日期格式错误失败；
- `review_after < last_verified` 失败；
- 高风险 active 页面无来源时失败；
- 过期状态判断正确；
- 内部相对链接解析至少覆盖正常链接、锚点、图片和不存在目标。

### 6.3 内部链接检查

实现只检查仓库内 Markdown、图片和静态资源路径的脚本。需要：

- 忽略 `http://`、`https://`、`mailto:` 等外部地址；
- 支持相对路径；
- 支持目录索引；
- 处理 URL 编码和锚点；
- 报错时给出源文件、链接和预期目标；
- 不通过简单关闭 VitePress dead link 检查规避问题。

外部链接只在文档中说明可由后续定时任务检查，本轮 CI 不因学校网站偶发不可用而阻塞。

## 7. GitHub 配置

### 7.1 CI

创建 `.github/workflows/ci.yml`：

- 在 Pull Request 和推送到主分支时运行；
- 使用官方 Node setup action；
- 启用 pnpm 缓存；
- 使用锁文件冻结安装；
- 执行 `pnpm check`；
- 使用最小权限；
- 避免无必要的写权限。

### 7.2 GitHub Pages

创建 `.github/workflows/deploy-pages.yml`：

- 仅主分支和手动触发；
- 构建前执行必要检查；
- 使用 GitHub Pages 官方 Actions；
- 上传 VitePress 构建产物；
- 配置正确的 `base` 策略，并在 README 中说明用户站点、自定义域名和仓库子路径三种情况如何调整；
- 不写死未知 GitHub 用户名或组织名。

### 7.3 Issue Forms

至少实现：

- 内容错误反馈；
- 内容过期反馈；
- 新内容建议。

表单包含页面 URL、问题描述、建议修改、来源材料、隐私确认。禁止要求公开填写手机号或学号。

### 7.4 PR 模板

包含：

- 修改类型；
- 修改页面；
- 事实来源；
- 是否涉及时间敏感信息；
- 是否包含个人信息；
- 已执行检查；
- 截图（仅 UI 变更需要）。

### 7.5 CODEOWNERS

由于不知道实际 GitHub 用户名，不得写入虚构账号。创建带注释的模板，说明建立组织后如何填写栏目负责人。

## 8. 文档和治理文件

### README.md

至少说明：

- 项目定位和非官方声明；
- 当前状态；
- 技术栈；
- 本地环境要求；
- 安装、开发、检查、构建、预览命令；
- 目录结构；
- 贡献入口；
- 部署说明入口；
- 内容和代码许可证。

### CONTRIBUTING.md

至少说明：

- 无 Git 经验用户如何通过 Issue 投稿；
- 熟悉 Git 用户如何 Fork、建分支和提交 PR；
- 分支和提交建议；
- 文档 Front Matter；
- 如何引用来源；
- 如何运行检查；
- 禁止提交的隐私和版权内容。

### CONTENT_GUIDE.md

至少说明：

- 四种内容类型；
- 四种状态；
- 来源等级；
- 时间敏感内容如何维护；
- `last_verified` 与 Git 修改时间的区别；
- 何时归档；
- 不确定信息如何表达；
- 页面模板。

### 许可证

- 代码使用 MIT License，放在 `LICENSE`；
- 文档内容使用 CC BY-SA 4.0，使用 `LICENSE-CONTENT` 说明并链接正式许可证文本，不要凭空改写法律条款；
- README 明确区分代码与内容许可证；
- 不把学校名称、校徽或商标声明为本站可再许可资产。

## 9. 安全、隐私与质量约束

- 不收集个人数据；
- 不添加分析统计；
- 不使用 Cookie；
- 不引入远程执行脚本；
- 不提交 `.env`、Token、API Key 或部署凭据；
- 不在测试中访问真实学校系统；
- 不使用 `dangerouslySetInnerHTML`，除非确有必要且输入完全静态可信；
- 不关闭 TypeScript 严格检查；
- 不使用大量 `any`；
- 不为了通过 lint 添加全局忽略；
- 不在页面中写入真实个人联系方式；
- 不复制受版权保护的课程材料；
- 依赖版本由包管理器解析并生成锁文件，不手写不存在的版本号。

## 10. 分阶段实施与验收

### 阶段 A：仓库基础

完成：

- 初始化 pnpm、TypeScript、VitePress；
- 建立目录；
- 创建 `AGENTS.md` 和 `PLANS.md`；
- 配置基础脚本；
- 默认站点能够启动。

验收：

- `pnpm install` 成功；
- `pnpm dev` 可启动；
- `pnpm build` 成功。

### 阶段 B：网站和信息架构

完成：

- 首页、导航、侧边栏；
- 搜索；
- 深浅主题；
- 404；
- 分类索引和首批页面。

验收：

- 所有导航无死链；
- 手机宽度下无明显横向溢出；
- 首页不包含虚构数据和未经授权标志。

### 阶段 C：可信度系统

完成：

- Schema；
- 内容验证脚本；
- 元数据组件；
- 过期、经验、草稿、归档提示；
- 测试。

验收：

- 正常页面通过；
- 故意构造的非法样例被测试捕获；
- 当前有效内容不出现错误警告。

### 阶段 D：质量检查和 CI

完成：

- Prettier；
- Markdown lint；
- 类型检查；
- 内部链接检查；
- 单元测试；
- `pnpm check`；
- GitHub Actions CI。

验收：

- `pnpm check` 在干净工作区一次通过；
- CI YAML 语法合理；
- 不通过跳过检查获得成功。

### 阶段 E：协作和部署

完成：

- Issue Forms；
- PR 模板；
- CODEOWNERS 模板；
- README、贡献指南、内容指南、安全说明；
- GitHub Pages workflow；
- 部署配置说明。

验收：

- 不需要任何密钥即可完成本地构建；
- 部署工作流不写死未知账号；
- 文档明确列出需要仓库管理员在 GitHub UI 中手动开启的设置。

### 阶段 F：最终自审

执行：

1. 查看 `git diff`；
2. 检查是否有虚构学校信息；
3. 检查是否有秘密、个人信息或绝对路径；
4. 执行 `pnpm check`；
5. 执行一次生产预览所需构建；
6. 检查 README 命令与实际脚本一致；
7. 更新 `PLANS.md`；
8. 输出最终总结。

## 11. 完成定义

只有同时满足以下条件才视为完成：

- 仓库包含可维护的 VitePress Wiki；
- 首页、导航、搜索、侧边栏和内容页可用；
- 文档可信度元数据可验证且可视化；
- 无未经核验却冒充正式事实的学校特定内容；
- `pnpm check` 全部通过；
- `pnpm build` 通过；
- GitHub CI 与 Pages workflow 已创建；
- 贡献与内容治理文件完整；
- 最终回复明确列出人工后续操作。

## 12. 最终回复格式

请按以下结构汇报：

1. 已完成内容
2. 关键文件和目录
3. 本地运行命令
4. 验证命令及其结果
5. 未完成或受环境限制的项目
6. GitHub 管理员需要手动完成的配置
7. 建议的下一轮 Codex 任务，不超过 5 项
