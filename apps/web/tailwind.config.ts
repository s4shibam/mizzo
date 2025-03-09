import type { Config } from 'tailwindcss'

import baseConfig from '@mizzo/tailwind-config'

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  presets: [baseConfig]
}

export default config
