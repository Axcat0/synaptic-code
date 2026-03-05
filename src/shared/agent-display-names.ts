/**
 * Agent config keys to display names mapping.
 * Config keys are lowercase (e.g., "sisyphus", "atlas").
 * Display names use Chinese for better localization (e.g., "统策模式（主协调者）").
 * 
 * Agent配置键到显示名称的映射。
 * 配置键为小写（如"sisyphus"、"atlas"）。
 * 显示名称使用中文以便更好地本地化（如"统策模式（主协调者）"）。
 */
export const AGENT_DISPLAY_NAMES: Record<string, string> = {
  sisyphus: "统策模式（主协调者）",
  hephaestus: "匠造模式（工匠执行）",
  prometheus: "规划模式（战略规划）",
  atlas: "执行模式（计划执行）",
  "sisyphus-junior": "协策助手（执行者）",
  metis: "策划顾问（预规划）",
  momus: "审查顾问（计划评审）",
  oracle: "咨询模式（架构顾问）",
  librarian: "研究模式（文档搜索）",
  explore: "探索模式（代码检索）",
  "multimodal-looker": "视觉分析（多模态）",
}

/**
 * Get display name for an agent config key.
 * Uses case-insensitive lookup for backward compatibility.
 * Returns original key if not found.
 * 
 * 获取Agent配置键对应的显示名称。
 * 使用不区分大小写的查找以保证向后兼容性。
 * 如果未找到则返回原始键。
 */
export function getAgentDisplayName(configKey: string): string {
  // Try exact match first
  const exactMatch = AGENT_DISPLAY_NAMES[configKey]
  if (exactMatch !== undefined) return exactMatch
  
  // Fall back to case-insensitive search
  const lowerKey = configKey.toLowerCase()
  for (const [k, v] of Object.entries(AGENT_DISPLAY_NAMES)) {
    if (k.toLowerCase() === lowerKey) return v
  }
  
  // Unknown agent: return original key
  return configKey
}

const REVERSE_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(AGENT_DISPLAY_NAMES).map(([key, displayName]) => [displayName.toLowerCase(), key]),
)

/**
 * Resolve an agent name (display name or config key) to its lowercase config key.
 * "执行模式（计划执行）" → "atlas", "atlas" → "atlas", "unknown" → "unknown"
 * 
 * 将Agent名称（显示名称或配置键）解析为其小写配置键。
 * "执行模式（计划执行）" → "atlas", "atlas" → "atlas", "unknown" → "unknown"
 */
export function getAgentConfigKey(agentName: string): string {
  const lower = agentName.toLowerCase()
  const reversed = REVERSE_DISPLAY_NAMES[lower]
  if (reversed !== undefined) return reversed
  if (AGENT_DISPLAY_NAMES[lower] !== undefined) return lower
  return lower
}