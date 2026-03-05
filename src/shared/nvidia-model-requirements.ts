import type { FallbackEntry, ModelRequirement } from "./model-requirements"

/**
 * NVIDIA Provider Model Requirements
 * 
 * 套餐配置，使用 NVIDIA 提供的模型。
 * 可用模型列表基于用户提供的 107 个模型。
 */

// NVIDIA 可用模型常量
export const NVIDIA_MODELS = {
  // GLM 系列 - 用于编排和通用任务
  GLM5: "gim5",
  GLM4_7: "glm4.7",
  
  // Qwen 系列 - 用于深度思考和编码
  QWEN3_THINKING: "qwen3-next-80b-a3b-thinking",
  QWEN3_INSTRUCT: "qwen3-next-80b-a3b-instruct",
  QWEN3_CODER: "qwen3-coder-480b-a35b-instruct",
  QWEN3_235B: "qwen3-235b-a22b",
  QWEN2_5_CODER_32B: "qwen2.5-coder-32b-instruct",
  QWEN2_5_CODER_7B: "qwen2.5-coder-7b-instruct",
  
  // DeepSeek 系列 - 用于推理
  DEEPSEEK_V3_2: "deepseek-v3.2",
  DEEPSEEK_V3_1: "deepseek-v3.1",
  DEEPSEEK_R1_QWEN_32B: "deepseek-r1-distil-qwen-32b",
  
  // Kimi 系列 - 用于规划
  KIMI_K2_5: "kimi-k2.5",
  KIMI_K2_THINKING: "kimi-k2-thinking",
  
  // Mistral 系列 - 用于快速任务
  MISTRAL_SMALL: "mistral-small-3.1-24b-instruct-2503",
  MISTRAL_MEDIUM: "mistral-medium-3-instruct",
  MISTRAL_LARGE: "mistral-large-3-675b-instruct-2512",
  DEVSTRAL: "devstral-2-123b-instruct-2512",
  
  // Llama 系列 - 用于搜索
  LLAMA_3_3_70B: "Ilama-3.3-70b-instruct",
  LLAMA_3_1_70B: "Ilama-3.1-70b-instruct",
  LLAMA_3_1_405B: "Ilama-3.1-405b-instruct",
  LLAMA_4_MAVERICK: "Ilama-4-maverick-17b-128e-instruct",
  
  // Nemotron 系列 - NVIDIA 自研
  NEMOTRON_ULTRA: "Ilama-3.1-nemotron-ultra-253b-v1",
  NEMOTRON_SUPER: "Ilama-3.3-nemotron-super-49b-v1.5",
  NEMOTRON_NANO: "nvidia-nemotron-nano-9b-v2",
  
  // Phi 系列 - 用于轻量任务
  PHI_4_MINI: "phi-4-mini-instruct",
  PHI_4_MULTIMODAL: "phi-4-multimodal-instruct",
  PHI_3_5_MINI: "phi-3.5-mini-instruct",
  
  // Gemma 系列
  GEMMA_3_27B: "gemma-3-27b-it",
  GEMMA_2_27B: "gemma-2-27b-it",
  
  // Minimax 系列
  MINIMAX_M2_5: "minimax-m2.5",
  MINIMAX_M2_1: "minimax-m2.1",
  
  // 其他
  MIXTRAL_8X22B: "mixtral-8x22b-instruct-v0.1",
  QWQ_32B: "qwq-32b",
} as const

/**
 * NVIDIA 套餐的 Agent 模型需求配置
 */
export const NVIDIA_AGENT_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  sisyphus: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5, variant: "max" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.KIMI_K2_5 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.DEEPSEEK_V3_2 },
    ],
    requiresAnyModel: true,
  },
  hephaestus: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN3_THINKING, variant: "medium" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.DEEPSEEK_V3_1 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN3_INSTRUCT },
    ],
    requiresProvider: ["nvidia"],
  },
  oracle: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5, variant: "high" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.DEEPSEEK_R1_QWEN_32B },
      { providers: ["nvidia"], model: NVIDIA_MODELS.NEMOTRON_ULTRA },
    ],
  },
  librarian: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM4_7 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.MINIMAX_M2_5 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.GEMMA_3_27B },
    ],
  },
  explore: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.LLAMA_3_3_70B },
      { providers: ["nvidia"], model: NVIDIA_MODELS.LLAMA_3_1_70B },
      { providers: ["nvidia"], model: NVIDIA_MODELS.MIXTRAL_8X22B },
    ],
  },
  "multimodal-looker": {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.PHI_4_MULTIMODAL },
      { providers: ["nvidia"], model: NVIDIA_MODELS.NEMOTRON_NANO },
      { providers: ["nvidia"], model: NVIDIA_MODELS.GEMMA_2_27B },
    ],
  },
  prometheus: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.KIMI_K2_5, variant: "max" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.DEEPSEEK_V3_2 },
    ],
  },
  metis: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5, variant: "high" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.KIMI_K2_THINKING },
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN3_THINKING },
    ],
  },
  momus: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5, variant: "medium" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.MINIMAX_M2_1 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN2_5_CODER_32B },
    ],
  },
  atlas: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM4_7 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.PHI_4_MINI },
      { providers: ["nvidia"], model: NVIDIA_MODELS.MISTRAL_SMALL },
    ],
  },
  "sisyphus-junior": {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.MISTRAL_SMALL },
      { providers: ["nvidia"], model: NVIDIA_MODELS.PHI_4_MINI },
      { providers: ["nvidia"], model: NVIDIA_MODELS.GEMMA_2_27B },
    ],
  },
}

/**
 * NVIDIA 套餐的 Category 模型需求配置
 */
export const NVIDIA_CATEGORY_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  "visual-engineering": {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5, variant: "high" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.NEMOTRON_SUPER },
      { providers: ["nvidia"], model: NVIDIA_MODELS.KIMI_K2_5 },
    ],
  },
  ultrabrain: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN3_THINKING, variant: "xhigh" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.DEEPSEEK_R1_QWEN_32B },
      { providers: ["nvidia"], model: NVIDIA_MODELS.NEMOTRON_ULTRA },
    ],
  },
  deep: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN3_CODER, variant: "medium" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.DEEPSEEK_V3_1 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.LLAMA_3_1_405B },
    ],
    requiresModel: NVIDIA_MODELS.QWEN3_CODER,
  },
  artistry: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.KIMI_K2_THINKING, variant: "high" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN3_235B },
    ],
    requiresModel: NVIDIA_MODELS.KIMI_K2_THINKING,
  },
  quick: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.MISTRAL_SMALL },
      { providers: ["nvidia"], model: NVIDIA_MODELS.PHI_4_MINI },
      { providers: ["nvidia"], model: NVIDIA_MODELS.GEMMA_2_27B },
    ],
  },
  "unspecified-low": {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.LLAMA_3_3_70B },
      { providers: ["nvidia"], model: NVIDIA_MODELS.QWEN2_5_CODER_32B },
      { providers: ["nvidia"], model: NVIDIA_MODELS.GEMMA_3_27B },
    ],
  },
  "unspecified-high": {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM5, variant: "max" },
      { providers: ["nvidia"], model: NVIDIA_MODELS.DEEPSEEK_V3_2 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.LLAMA_3_1_405B },
    ],
  },
  writing: {
    fallbackChain: [
      { providers: ["nvidia"], model: NVIDIA_MODELS.GLM4_7 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.MINIMAX_M2_5 },
      { providers: ["nvidia"], model: NVIDIA_MODELS.LLAMA_3_1_70B },
    ],
  },
}
