import color from "picocolors"
import type {
  BooleanArg,
  ClaudeSubscription,
  DetectedConfig,
  InstallArgs,
  InstallConfig,
} from "./types"

export const SYMBOLS = {
  check: color.green("[OK]"),
  cross: color.red("[X]"),
  arrow: color.cyan("->"),
  bullet: color.dim("*"),
  info: color.blue("[i]"),
  warn: color.yellow("[!]"),
  star: color.yellow("*"),
}

function formatProvider(name: string, enabled: boolean, detail?: string): string {
  const status = enabled ? SYMBOLS.check : color.dim("○")
  const label = enabled ? color.white(name) : color.dim(name)
  const suffix = detail ? color.dim(` (${detail})`) : ""
  return `  ${status} ${label}${suffix}`
}

export function formatConfigSummary(config: InstallConfig): string {
  const lines: string[] = []

  lines.push(color.bold(color.white("配置摘要")))
  lines.push("")

  const nvidiaDetail = config.hasNvidia ? "Nvidia GPU优化" : undefined
  lines.push(formatProvider("Nvidia", config.hasNvidia, nvidiaDetail))
  lines.push(formatProvider("OpenAI/ChatGPT", config.hasOpenAI, "GPT-5.2用于咨询模式"))
  lines.push(formatProvider("Gemini", config.hasGemini))
  lines.push(formatProvider("GitHub Copilot", config.hasCopilot, "后备方案"))
  lines.push(formatProvider("OpenCode Zen", config.hasOpencodeZen, "opencode/模型"))
  lines.push(formatProvider("Z.ai编程计划", config.hasZaiCodingPlan, "研究模式/视觉分析"))
  lines.push(formatProvider("Kimi编程", config.hasKimiForCoding, "统策模式/规划模式后备"))

  lines.push("")
  lines.push(color.dim("─".repeat(40)))
  lines.push("")

  lines.push(color.bold(color.white("模型分配")))
  lines.push("")
  lines.push(` ${SYMBOLS.info} 模型根据提供商优先级自动配置`)
  lines.push(` ${SYMBOLS.bullet} 优先级：原生 > Copilot > OpenCode Zen > Z.ai`)

  return lines.join("\n")
}

export function printHeader(isUpdate: boolean): void {
  const mode = isUpdate ? "更新" : "安装"
  console.log()
  console.log(color.bgMagenta(color.white(` 统策代理... ${mode} `)))
  console.log()
}

export function printStep(step: number, total: number, message: string): void {
  const progress = color.dim(`[${step}/${total}]`)
  console.log(`${progress} ${message}`)
}

export function printSuccess(message: string): void {
  console.log(`${SYMBOLS.check} ${message}`)
}

export function printError(message: string): void {
  console.log(`${SYMBOLS.cross} ${color.red(message)}`)
}

export function printInfo(message: string): void {
  console.log(`${SYMBOLS.info} ${message}`)
}

export function printWarning(message: string): void {
  console.log(`${SYMBOLS.warn} ${color.yellow(message)}`)
}

export function printBox(content: string, title?: string): void {
  const lines = content.split("\n")
  const maxWidth =
    Math.max(
      ...lines.map((line) => line.replace(/\x1b\[[0-9;]*m/g, "").length),
      title?.length ?? 0,
    ) + 4
  const border = color.dim("─".repeat(maxWidth))

  console.log()
  if (title) {
    console.log(
      color.dim("┌─") +
        color.bold(` ${title} `) +
        color.dim("─".repeat(maxWidth - title.length - 4)) +
        color.dim("┐"),
    )
  } else {
    console.log(color.dim("┌") + border + color.dim("┐"))
  }

  for (const line of lines) {
    const stripped = line.replace(/\x1b\[[0-9;]*m/g, "")
    const padding = maxWidth - stripped.length
    console.log(color.dim("│") + ` ${line}${" ".repeat(padding - 1)}` + color.dim("│"))
  }

  console.log(color.dim("└") + border + color.dim("┘"))
  console.log()
}

export function validateNonTuiArgs(args: InstallArgs): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (args.nvidia === undefined) {
    errors.push("--nvidia 是必需的（值：no, yes）")
  } else if (!["no", "yes"].includes(args.nvidia)) {
    errors.push(`无效的 --nvidia 值：${args.nvidia}（预期：no, yes）`)
  }

  if (args.gemini === undefined) {
    errors.push("--gemini 是必需的（值：no, yes）")
  } else if (!["no", "yes"].includes(args.gemini)) {
    errors.push(`无效的 --gemini 值：${args.gemini}（预期：no, yes）`)
  }

  if (args.copilot === undefined) {
    errors.push("--copilot 是必需的（值：no, yes）")
  } else if (!["no", "yes"].includes(args.copilot)) {
    errors.push(`无效的 --copilot 值：${args.copilot}（预期：no, yes）`)
  }

  if (args.openai !== undefined && !["no", "yes"].includes(args.openai)) {
    errors.push(`无效的 --openai 值：${args.openai}（预期：no, yes）`)
  }

  if (args.opencodeZen !== undefined && !["no", "yes"].includes(args.opencodeZen)) {
    errors.push(`无效的 --opencode-zen 值：${args.opencodeZen}（预期：no, yes）`)
  }

  if (args.zaiCodingPlan !== undefined && !["no", "yes"].includes(args.zaiCodingPlan)) {
    errors.push(`无效的 --zai-coding-plan 值：${args.zaiCodingPlan}（预期：no, yes）`)
  }

  if (args.kimiForCoding !== undefined && !["no", "yes"].includes(args.kimiForCoding)) {
    errors.push(`无效的 --kimi-for-coding 值：${args.kimiForCoding}（预期：no, yes）`)
  }

  return { valid: errors.length === 0, errors }
}

export function argsToConfig(args: InstallArgs): InstallConfig {
  return {
    hasClaude: args.nvidia === "yes",
    isMax20: false,
    hasOpenAI: args.openai === "yes",
    hasGemini: args.gemini === "yes",
    hasCopilot: args.copilot === "yes",
    hasOpencodeZen: args.opencodeZen === "yes",
    hasZaiCodingPlan: args.zaiCodingPlan === "yes",
    hasKimiForCoding: args.kimiForCoding === "yes",
    hasNvidia: args.nvidia === "yes",
  }
}

export function detectedToInitialValues(detected: DetectedConfig): {
  claude: ClaudeSubscription
  openai: BooleanArg
  gemini: BooleanArg
  copilot: BooleanArg
  opencodeZen: BooleanArg
  zaiCodingPlan: BooleanArg
  kimiForCoding: BooleanArg
  nvidia: BooleanArg
} {
  let claude: ClaudeSubscription = "no"
  if (detected.hasClaude) {
    claude = detected.isMax20 ? "max20" : "yes"
  }

  return {
    claude,
    openai: detected.hasOpenAI ? "yes" : "no",
    gemini: detected.hasGemini ? "yes" : "no",
    copilot: detected.hasCopilot ? "yes" : "no",
    opencodeZen: detected.hasOpencodeZen ? "yes" : "no",
    zaiCodingPlan: detected.hasZaiCodingPlan ? "yes" : "no",
    kimiForCoding: detected.hasKimiForCoding ? "yes" : "no",
    nvidia: detected.hasNvidia ? "yes" : "no",
  }
}
