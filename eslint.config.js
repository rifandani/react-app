import antfu from '@antfu/eslint-config'
import { configs as tanstackQueryConfigs, rules as tanstackQueryRules } from '@tanstack/eslint-plugin-query'

export default antfu(
  {
    ignores: [
      'dev-dist',
      'dist',
      'html',
      '__mocks__',
      'public/mockServiceWorker.js',
      'index.d.ts',
      '.eslintrc.cjs',
      'babel.config.js',
      'metro.config.js',
      'jest.config.js',
      'tailwind.config.js',
      'tailwind.config.cjs',
      'postcss.config.js',
      'postcss.config.cjs',
      'commitlint.config.js',
      'commitlint.config.cjs',
      'coverage',
      '.vscode',
      '.yarn',
      '.husky',
    ],
    vue: false,
    svelte: false,
    react: {
      overrides: {
        // weird, everytime i save in my editor, it changed the indent
        'style/indent': 0,
        'style/jsx-indent': 0,
      },
    },
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      css: true,
      /**
       * Format HTML files
       * By default uses Prettier
       */
      html: true,
      /**
       * Format Markdown files
       * Supports Prettier and dprint
       * By default uses Prettier
       */
      markdown: 'prettier',
    },
  },
  {
    name: '@tanstack/eslint-plugin-query:recommended',
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@tanstack/eslint-plugin-query': {
        rules: tanstackQueryRules,
        configs: tanstackQueryConfigs,
      },
    },
    rules: {
      '@tanstack/eslint-plugin-query/exhaustive-deps': 'error',
      '@tanstack/eslint-plugin-query/no-rest-destructuring': 'error',
      '@tanstack/eslint-plugin-query/stable-query-client': 'error',
    },
  },
  // jestDom.configs.recommended,
  // jsxA11y.configs.recommended,
  // tailwind.configs.recommended,
  // testingLibrary.configs.recommended,
)
