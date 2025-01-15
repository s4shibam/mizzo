import type { Config } from 'tailwindcss'
import tailwindcssAnimated from 'tailwindcss-animated'
import tailwindcssMixins from 'tailwindcss-mixins'

import { colors } from './src/theme'

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      animation: {
        'mz-shine': 'mz-shine 1s'
      },

      colors: colors,

      fontFamily: {
        outfit: ['Outfit', 'sans-serif']
      },

      gridTemplateColumns: {
        'menu-content': '20rem 1fr',
        'md-track-card':
          // poster | title | heart | duration | menu
          '3rem     1fr     1.5rem    3rem    1.5rem',
        'xl-track-card':
          // poster | title | listens | status | heart | duration | menu
          '3rem   1fr       auto     1.5rem  1.75rem    3rem    1.5rem'
      },

      gridTemplateRows: {
        'active-track': '1fr 68px'
      },

      keyframes: {
        'mz-shine': {
          '100%': { left: '150%' }
        }
      }
    }
  },

  plugins: [tailwindcssAnimated, tailwindcssMixins]

  // corePlugins: {
  //   preflight: false
  // }
}
export default config
