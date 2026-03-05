#!/usr/bin/env bun
import { createSynapticCodeJsonSchema } from "./build-schema-document"

const SCHEMA_OUTPUT_PATH = "assets/synaptic-code.schema.json"
const DIST_SCHEMA_OUTPUT_PATH = "dist/synaptic-code.schema.json"

async function main() {
  console.log("Generating JSON Schema...")

  const finalSchema = createSynapticCodeJsonSchema()

  await Bun.write(SCHEMA_OUTPUT_PATH, JSON.stringify(finalSchema, null, 2))
  await Bun.write(DIST_SCHEMA_OUTPUT_PATH, JSON.stringify(finalSchema, null, 2))

  console.log(`✓ JSON Schema generated: ${SCHEMA_OUTPUT_PATH}`)
}

main()
