#!/usr/bin/env node
// @splinetool/runtime@2.0.5 ships broken references to ../libs/draco/* and
// boolean_wasm_bg.wasm. Stub them so Turbopack can resolve them at build time.
// The stubs are never loaded by a non-DRACO Spline scene, so they're inert.
// ponytail: replace when @splinetool/runtime ships its draco libs upstream.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const runtime = resolve(root, 'node_modules/@splinetool/runtime')

const stubs = [
  'libs/draco/draco_decoder.js',
  'libs/draco/draco_wasm_wrapper.js',
  'libs/draco/draco_decoder.wasm',
  'libs/draco/gltf/draco_wasm_wrapper.js',
  'libs/draco/gltf/draco_decoder.wasm',
  'build/boolean_wasm_bg.wasm',
]

for (const rel of stubs) {
  const target = resolve(runtime, rel)
  if (existsSync(target)) continue
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, rel.endsWith('.wasm') ? Buffer.from([0]) : '')
}