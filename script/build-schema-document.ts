import * as z from "zod"
import { SynapticCodeConfigSchema } from "../src/config/schema"

export function createSynapticCodeJsonSchema(): Record<string, unknown> {
  const jsonSchema = z.toJSONSchema(SynapticCodeConfigSchema, {
    target: "draft-7",
    unrepresentable: "any",
  })

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://raw.githubusercontent.com//synaptic-code/dev/assets/synaptic-code.schema.json",
    title: "Oh My OpenCode Configuration",
    description: "Configuration schema for synaptic-code plugin",
    ...jsonSchema,
  }
}
