/**
 * Prettier configuration
 * @type {import('prettier').Config}
 */
const config = {
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  endOfLine: 'auto',
  trailingComma: 'none',
  arrowParens: 'always',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ],
  importOrder: [
    '<BUILTIN_MODULES>',
    '^react$',
    '^next$',
    '^express(.*)$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@mizzo/(.*)$',
    '',
    '^@/(.*)$',
    '',
    '^../(.*)$',
    '^./(.*)$'
  ]
}

module.exports = config
