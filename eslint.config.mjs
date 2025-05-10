import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    root: true,
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^next', '^[a-z]', '^@'],
            ['^~'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
            ['^\\u0000'],
          ],
        },
      ],
    },
    ignorePatterns: ['node_modules', '.next'],
    overrides: [
      {
        files: ['tailwind.config.ts'],
        rules: {
          '@typescript-eslint/no-require-imports': 'off',
        },
      },
    ],
  }),
]

export default eslintConfig
