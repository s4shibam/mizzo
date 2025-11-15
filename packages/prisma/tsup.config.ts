import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  outDir: '.dist',
  dts: true,
  clean: true,
  minify: false,
  splitting: false
})
