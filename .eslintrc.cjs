module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react-refresh',
    'jsx-a11y',
    '@tanstack/query',
    'testing-library',
    'jest-dom',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:jest-dom/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:testing-library/react',
  ],
  rules: {
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-void': 'off',
    'no-nested-ternary': 'off',
    'testing-library/no-node-access': [
      'error',
      { allowContainerFirstChild: true },
    ],
    '@tanstack/query/exhaustive-deps': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
  },
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx', 'ctl', 'tw', 'twMerge', 'twJoin'],
      config: 'tailwind.config.cjs',
      // classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
    },
    'testing-library/custom-renders': ['renderWithProviders'],
  },
};
