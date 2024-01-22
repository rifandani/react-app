import antfu from '@antfu/eslint-config'
import * as tanstackQuery from '@tanstack/eslint-plugin-query'
import * as jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'
import jsxA11y from 'eslint-plugin-jsx-a11y'

/**
 * for plugin rules that doesn't have prefix.
 * map the rules object, overrides the key with provided prefix, and override value with 'error'.
 *
 * @param {string} prefix unique eslint plugin name
 * @param {any} rules eslint plugin rules without prefix (e.g 'no-rest-destructuring')
 * @returns {object} rules with prefix (e.g '@tanstack/eslint-plugin-query/no-rest-destructuring')
 */
// eslint-disable-next-line unused-imports/no-unused-vars
function mapRulesWithPrefix(prefix, rules) {
  return Object.entries(rules).reduce((acc, [key]) => ({ ...acc, [`${prefix}/${key}`]: 'error' }), {})
}

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
    name: '@tanstack/query',
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@tanstack/query': {
        rules: tanstackQuery.rules,
        configs: tanstackQuery.configs.recommended,
      },
    },
    rules: tanstackQuery.configs.recommended.rules,
  },
  {
    name: 'jest-dom',
    files: ['src/**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      'jest-dom': {
        rules: jestDom.rules,
        configs: jestDom.configs.recommended,
      },
    },
    rules: jestDom.configs.recommended.rules,
  },
  {
    name: 'testing-library',
    files: ['src/**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      'testing-library': {
        rules: testingLibrary.rules,
        configs: testingLibrary.configs.react,
      },
    },
    rules: testingLibrary.configs.react.rules,
  },
  {
    name: 'jsx-a11y',
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'jsx-a11y': {
        rules: jsxA11y.rules,
        configs: jsxA11y.configs.recommended,
      },
    },
    rules: jsxA11y.configs.recommended.rules,
  },
  // tailwind.configs.recommended,
)
