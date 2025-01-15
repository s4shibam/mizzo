import pluginNext from '@next/eslint-plugin-next'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginTailwindCss from 'eslint-plugin-tailwindcss'
import globals from 'globals'

import baseConfig from './base.js'

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
const nextConfig = [
  ...baseConfig,

  {
    plugins: {
      react: pluginReact
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },

      globals: {
        ...globals.browser,
        ...globals.serviceworker
      }
    },

    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/no-typos': 'error',
      'react/no-array-index-key': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true
        }
      ]
    }
  },
  {
    plugins: {
      '@next/next': pluginNext
    },

    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules
    }
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks
    },

    settings: { react: { version: 'detect' } },

    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    }
  },
  {
    plugins: {
      tailwindcss: pluginTailwindCss
    },

    rules: {
      ...pluginTailwindCss.configs['flat/recommended'].rules,
      'tailwindcss/no-custom-classname': [
        'error',
        {
          whitelist: ['mxn.*', 'mz-.*']
        }
      ]
    }
  }
]

export default nextConfig
