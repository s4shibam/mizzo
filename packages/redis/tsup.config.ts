import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/**/*.ts'],
  format: ['cjs'],
  outDir: '.dist',
  dts: true,
  clean: true,
  minify: true,
  splitting: false,
  external: ['@mizzo/utils'],
  ...options
}))
