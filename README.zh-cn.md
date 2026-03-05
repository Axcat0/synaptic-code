# Synaptic Code

<div align="center">

**多模型AI代理编排插件 - 为OpenCode打造的专业级多代理协作系统**

[![GitHub Release](https://img.shields.io/github/v/release/your-org/synaptic-code?color=369eff&labelColor=black&logo=github&style=flat-square)](https://github.com/your-org/synaptic-code/releases)
[![npm downloads](https://img.shields.io/npm/dt/synaptic-code?color=ff6b35&labelColor=black&style=flat-square)](https://www.npmjs.com/package/synaptic-code)
[![License](https://img.shields.io/badge/license-MIT-white?labelColor=black&style=flat-square)](https://github.com/your-org/synaptic-code/blob/main/LICENSE)

[English](README.md) | [简体中文](README.zh-cn.md)

</div>

---

## 📖 概述

Synaptic Code 是一款强大的 OpenCode 插件，提供：

- 🤖 **多代理编排**：统策模式智能协调匠造模式、咨询模式、研究模式等专业代理
- ⚡ **并行执行**：同时启动多个专家代理，高效完成任务
- 🛠️ **专业工具**：IDE级精度的LSP和AST工具
- 📚 **内置MCP**：网页搜索、官方文档、GitHub代码搜索
- ✏️ **哈希锚定编辑**：零过期行错误，精准代码修改
- 🖥️ **Tmux集成**：完整的交互式终端支持

---

## 🚀 核心特性

### 纪律性代理系统

<table>
<tr>
<td align="center"><strong>统策模式</strong></td>
<td align="center"><strong>匠造模式</strong></td>
</tr>
<tr>
<td>
主协调者，智能分配任务、协调子代理<br/>
<strong>系统的"大脑"</strong>
</td>
<td>
工匠型执行者，专注代码实现<br/>
<strong>自主深度工作者</strong>
</td>
</tr>
</table>

**代理协作流程**：
```
用户请求 → 统策模式分析 → 分配给专业代理 → 并行执行 → 汇总结果
```

### 高效执行

- **一键启动**：所有代理同时激活
- **不达目的不停止**：任务必须100%完成
- **智能分配**：根据任务类型自动选择最合适的代理

### 专业工具

- **LSP工具**：工作区重命名、预构建诊断、引用查找
- **AST-Grep**：25种语言的AST感知代码搜索和重写
- **会话工具**：历史记录管理、搜索和分析

### 内置MCP服务器

- **WebSearch**：Exa/Tavily网页搜索
- **Context7**：官方文档查询
- **Grep.app**：GitHub代码搜索

---

## 📦 安装

### 快速安装

```bash
# 安装插件
npm install synaptic-code

# 配置OpenCode
echo '{"plugin": ["synaptic-code"]}' > ~/.config/opencode/opencode.json
```

### 系统要求

- **操作系统**：Windows 10/11 x64
- **Node.js**：v18.0.0或更高版本
- **OpenCode**：最新版本

---

## 🤖 代理系统

### 核心代理

| 代理名称 | 角色定位 | 核心能力 | 推荐模型 |
|---------|---------|---------|---------|
| **统策模式** | 主协调者 | 智能分配任务、协调子代理 | Claude Opus 4 / Kimi K2.5 / GLM 5 |
| **匠造模式** | 工匠执行者 | 专注代码实现、编写测试 | GPT-5.3 Codex |
| **规划模式** | 战略规划师 | 生成详细工作计划、访谈需求 | Claude Opus 4 / Kimi K2.5 |
| **执行模式** | 计划执行者 | 执行生成的计划 | Kimi K2.5 |

### 辅助代理

| 代理名称 | 角色定位 | 核心能力 |
|---------|---------|---------|
| **咨询模式** | 架构顾问 | 架构咨询、复杂调试 |
| **研究模式** | 文档搜索 | 外部文档和代码搜索 |
| **探索模式** | 代码检索 | 代码库快速检索 |
| **策划顾问** | 预规划咨询 | 需求分析和风险评估 |
| **审查顾问** | 计划评审 | 质量保证和计划评审 |
| **视觉分析** | 多模态分析 | PDF和图像分析 |

### 任务类别

| 类别 | 用途 | 推荐模型 |
|-----|-----|---------|
| `visual-engineering` | 前端、UI/UX、设计 | Gemini 3.1 Pro |
| `deep` | 自主研究+执行 | GPT-5.2 |
| `quick` | 单文件修改、小修改 | Grok Code Fast |
| `ultrabrain` | 复杂逻辑、架构决策 | Claude Opus 4 |
| `writing` | 文档撰写 | Claude Sonnet 4.6 |

---

## 📋 配置

### 基础配置

配置文件位置：
- 项目配置：`.opencode/synaptic-code.jsonc`
- 用户配置：`~/.config/opencode/synaptic-code.jsonc`

### 配置示例

```jsonc
{
  "agents": {
    "sisyphus": {
      "model": "claude-opus-4-6",
      "temperature": 0.1
    },
    "hephaestus": {
      "model": "gpt-5.3-codex",
      "temperature": 0.1
    }
  },
  "categories": {
    "visual-engineering": {
      "description": "前端和UI/UX相关工作"
    }
  }
}
```

---

## 🎯 快速开始

### 1. 基础使用

```bash
# 启动OpenCode并使用synaptic-code
opencode

# 在OpenCode中输入：
# "分析这个项目的架构并提供优化建议"
```

### 2. 使用特定代理

```bash
# 使用规划模式制定计划
/start-work

# 使用执行模式执行计划
# 执行模式会自动被调用
```

### 3. 并行执行

```bash
# 启动多个后台代理
# 在对话中说明需要并行执行的任务
"同时分析前端性能和后端API设计"
```

---

## 🛠️ 开发

### 构建

```bash
# 安装依赖
bun install

# 构建插件
bun run build

# 运行测试
bun test

# 类型检查
bun run typecheck
```

### 发布

```bash
# 构建Windows平台二进制
bun run build:all

# 发布到npm
npm publish
```

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m '添加某个很棒的特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 💬 社区与支持

- **问题反馈**：[GitHub Issues](https://github.com/your-org/synaptic-code/issues)
- **功能建议**：[GitHub Discussions](https://github.com/your-org/synaptic-code/discussions)

---

<div align="center">

**用 ❤️ 打造的专业级多代理协作系统**

</div>
