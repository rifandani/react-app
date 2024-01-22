import antfu from '@antfu/eslint-config'
import * as tanstackQuery from '@tanstack/eslint-plugin-query'
import * as jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'

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
    name: '@tanstack/eslint-plugin-query',
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@tanstack/eslint-plugin-query': {
        rules: tanstackQuery.rules,
        configs: tanstackQuery.configs,
      },
    },
    rules: {
      '@tanstack/eslint-plugin-query/exhaustive-deps': 'error',
      '@tanstack/eslint-plugin-query/no-rest-destructuring': 'error',
      '@tanstack/eslint-plugin-query/stable-query-client': 'error',
    },
  },
  {
    name: 'jest-dom',
    files: ['src/**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      'jest-dom': {
        rules: jestDom.rules,
        configs: jestDom.configs,
      },
    },
    rules: Object.entries(jestDom.rules).reduce((acc, [key]) => ({ ...acc, [`jest-dom/${key}`]: 'error' }), {}),
  },
  {
    name: 'testing-library',
    files: ['src/**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      'testing-library': {
        rules: testingLibrary.rules,
        configs: testingLibrary.configs,
      },
    },
    rules: Object.entries(testingLibrary.rules).reduce((acc, [key]) =>
      // Error: Key "rules": Key "testing-library/consistent-data-testid": Value {"testIdAttribute":"data-testid"} should have required property 'testIdPattern'.
      ({ ...acc, ...(!['consistent-data-testid'].includes(key) && { [`testing-library/${key}`]: 'error' }) }), {}),
  },
  // jsxA11y.configs.recommended,
  // tailwind.configs.recommended,
)
