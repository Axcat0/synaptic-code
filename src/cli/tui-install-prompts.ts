import * as p from "@clack/prompts"
import type { Option } from "@clack/prompts"
import type {
  ClaudeSubscription,
  DetectedConfig,
  InstallConfig,
} from "./types"
import { detectedToInitialValues } from "./install-validators"

async function selectOrCancel<TValue extends Readonly<string | boolean | number>>(params: {
  message: string
  options: Option<TValue>[]
  initialValue: TValue
}): Promise<TValue | null> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return null

  const value = await p.select<TValue>({
    message: params.message,
    options: params.options,
    initialValue: params.initialValue,
  })
  if (p.isCancel(value)) {
    p.cancel("安装已取消。")
    return null
  }
  return value as TValue
}

export async function promptInstallConfig(detected: DetectedConfig): Promise<InstallConfig | null> {
  const initial = detectedToInitialValues(detected)

  const nvidia = await selectOrCancel({
    message: "您是否使用Nvidia GPU进行AI推理？",
    options: [
      { value: "no", label: "否，使用云端模型", hint: "将自动配置云端模型后备方案" },
      { value: "yes", label: "是，本地GPU加速", hint: "启用本地GPU推理，降低延迟和成本" },
    ],
    initialValue: initial.claude === "yes" || initial.claude === "max20" ? "yes" : "no",
  })
  if (!nvidia) return null

  const openai = await selectOrCancel({
    message: "是否配置OpenAI模型服务？",
    options: [
      { value: "no", label: "不需要", hint: "咨询顾问将使用其他模型" },
      { value: "yes", label: "需要", hint: "启用GPT-5.2，用于架构咨询和复杂调试" },
    ],
    initialValue: initial.openai,
  })
  if (!openai) return null

  const gemini = await selectOrCancel({
    message: "是否启用Google Gemini服务？",
    options: [
      { value: "no", label: "不启用", hint: "前端开发将使用其他模型" },
      { value: "yes", label: "启用", hint: "用于UI/UX开发和视觉设计任务" },
    ],
    initialValue: initial.gemini,
  })
  if (!gemini) return null

  const copilot = await selectOrCancel({
    message: "是否配置GitHub Copilot作为备用？",
    options: [
      { value: "no", label: "不配置", hint: "仅使用主要模型服务" },
      { value: "yes", label: "配置", hint: "作为备用方案，提高服务可用性" },
    ],
    initialValue: initial.copilot,
  })
  if (!copilot) return null

  const opencodeZen = await selectOrCancel({
    message: "是否接入OpenCode Zen模型池？",
    options: [
      { value: "no", label: "不接入", hint: "使用其他已配置的服务" },
      { value: "yes", label: "接入", hint: "访问opencode系列优化模型" },
    ],
    initialValue: initial.opencodeZen,
  })
  if (!opencodeZen) return null

  const zaiCodingPlan = await selectOrCancel({
    message: "是否启用Z.ai文档检索服务？",
    options: [
      { value: "no", label: "不启用", hint: "文档搜索将使用其他服务" },
      { value: "yes", label: "启用", hint: "用于文档研究和多模态分析" },
    ],
    initialValue: initial.zaiCodingPlan,
  })
  if (!zaiCodingPlan) return null

  const kimiForCoding = await selectOrCancel({
    message: "是否配置Kimi长文本模型？",
    options: [
      { value: "no", label: "不配置", hint: "长文本任务使用其他服务" },
      { value: "yes", label: "配置", hint: "用于协调和规划任务，支持超长上下文" },
    ],
    initialValue: initial.kimiForCoding,
  })
  if (!kimiForCoding) return null

  return {
    hasClaude: nvidia === "yes",
    isMax20: false,
    hasOpenAI: openai === "yes",
    hasGemini: gemini === "yes",
    hasCopilot: copilot === "yes",
    hasOpencodeZen: opencodeZen === "yes",
    hasZaiCodingPlan: zaiCodingPlan === "yes",
    hasKimiForCoding: kimiForCoding === "yes",
    hasNvidia: nvidia === "yes",
  }
}
