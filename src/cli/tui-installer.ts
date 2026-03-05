import * as p from "@clack/prompts"
import color from "picocolors"
import type { InstallArgs } from "./types"
import {
  addAuthPlugins,
  addPluginToOpenCodeConfig,
  addProviderConfig,
  detectCurrentConfig,
  getOpenCodeVersion,
  isOpenCodeInstalled,
  writeOmoConfig,
} from "./config-manager"
import { detectedToInitialValues, formatConfigSummary, SYMBOLS } from "./install-validators"
import { promptInstallConfig } from "./tui-install-prompts"

export async function runTuiInstaller(args: InstallArgs, version: string): Promise<number> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error("错误：交互式安装程序需要TTY终端。请使用--non-interactive或直接设置环境变量。")
    return 1
  }

  const detected = detectCurrentConfig()
  const isUpdate = detected.isInstalled

  p.intro(color.bgMagenta(color.white(isUpdate ? " Synaptic-Code 更新向导 " : " Synaptic-Code 安装向导 ")))

  if (isUpdate) {
    const initial = detectedToInitialValues(detected)
    p.log.info(`检测到已有配置，正在更新...`)
  }

  const spinner = p.spinner()
  spinner.start("检查运行环境")

  const installed = await isOpenCodeInstalled()
  const openCodeVersion = await getOpenCodeVersion()
  if (!installed) {
    spinner.stop(`OpenCode未安装 ${color.yellow("[!]")}`)
    p.log.warn("未检测到OpenCode。配置将继续，但需先安装OpenCode才能运行。")
    p.note("请访问 https://opencode.ai/docs 获取安装指南", "环境准备")
  } else {
    spinner.stop(`OpenCode ${openCodeVersion ?? ""} ${color.green("✓")}`)
  }

  const config = await promptInstallConfig(detected)
  if (!config) return 1

  spinner.start("注册插件到OpenCode")
  const pluginResult = await addPluginToOpenCodeConfig(version)
  if (!pluginResult.success) {
    spinner.stop(`插件注册失败：${pluginResult.error}`)
    p.outro(color.red("安装失败。"))
    return 1
  }
  spinner.stop(`插件已注册 ${color.green("✓")}`)

  if (config.hasGemini) {
    spinner.start("配置OAuth认证插件")
    const authResult = await addAuthPlugins(config)
    if (!authResult.success) {
      spinner.stop(`认证插件配置失败：${authResult.error}`)
      p.outro(color.red("安装失败。"))
      return 1
    }
    spinner.stop(`认证配置完成 ${color.green("✓")}`)

    spinner.start("配置模型服务商")
    const providerResult = addProviderConfig(config)
    if (!providerResult.success) {
      spinner.stop(`服务商配置失败：${providerResult.error}`)
      p.outro(color.red("安装失败。"))
      return 1
    }
    spinner.stop(`服务商配置完成 ${color.green("✓")}`)
  }

  spinner.start("生成配置文件")
  const omoResult = writeOmoConfig(config)
  if (!omoResult.success) {
    spinner.stop(`配置文件生成失败：${omoResult.error}`)
    p.outro(color.red("安装失败。"))
    return 1
  }
  spinner.stop(`配置已保存 ${color.green("✓")}`)

  if (!config.hasClaude) {
    console.log()
    console.log(color.bgYellow(color.black(color.bold(" 性能提示 "))))
    console.log()
    console.log(color.yellow("统策模式建议使用Claude模型获得最佳协调效果。"))
    console.log(color.dim("如果没有Claude，可能遇到："))
    console.log(color.dim(" • 任务协调质量下降"))
    console.log(color.dim(" • 代理间协作效率降低"))
    console.log(color.dim(" • 复杂任务完成度不足"))
    console.log()
    console.log(color.cyan("建议：订阅Claude Pro以获得完整功能体验。"))
    console.log()
  }

  if (!config.hasClaude && !config.hasOpenAI && !config.hasGemini && !config.hasCopilot && !config.hasOpencodeZen) {
    p.log.warn("未配置任何模型服务。将使用opencode/big-pickle作为兜底方案。")
  }

  p.note(formatConfigSummary(config), isUpdate ? "更新完成" : "安装完成")

  p.log.success(color.bold(isUpdate ? "配置已更新！" : "安装成功！"))
  p.log.message(`执行 ${color.cyan("opencode")} 启动系统`)

  p.note(
    `在对话中包含 ${color.cyan("ultrawork")} 或 ${color.cyan("ulw")} 关键词\n` +
    `即可激活所有高级功能：\n` +
    `并行代理、后台任务、深度分析、持续执行`,
    "快速入门",
  )

  p.log.message(`${color.yellow("★")} 觉得有帮助？请给项目点个星！`)
  p.log.message(
    ` ${color.dim("gh api --silent --method PUT /user/starred//synaptic-code >/dev/null 2>&1 || true")}`,
  )

  p.outro(color.green("安装完成，祝您使用愉快！"))

  if ((config.hasClaude || config.hasGemini || config.hasCopilot) && !args.skipAuth) {
    const providers: string[] = []
    if (config.hasClaude) providers.push(`Anthropic ${color.gray("(Claude Pro/Max)")}`)
    if (config.hasGemini) providers.push(`Google ${color.gray("(Gemini OAuth)")}`)
    if (config.hasCopilot) providers.push(`GitHub ${color.gray("(Copilot)")}`)

    console.log()
    console.log(color.bold("完成身份认证"))
    console.log()
    console.log(` 执行 ${color.cyan("opencode auth login")} 并选择需要认证的服务：`)
    for (const provider of providers) {
      console.log(` ${SYMBOLS.bullet} ${provider}`)
    }
    console.log()
  }

  return 0
}
