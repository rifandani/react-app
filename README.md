# Intro

<!-- [![DeepScan grade](https://deepscan.io/api/teams/13942/projects/24678/branches/761600/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13942&pid=24678&bid=761600) -->

React template built with:

- `vite` + `typescript` + `eslint` + `prettier` -> development productivity
- `vitest` + `@testing-library/react` -> unit test, integration test, coverage
- `msw` -> browser and server API response mocking
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `daisyui` -> easy styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/react-query` -> server state management + data fetching
- `zod` -> runtime schema validation
- `@iconify-icon/react` -> SVG icon on demand
- `type-fest` -> collection of useful type helpers
- `react-aria-components` -> adaptive, accessible and robust unstyled UI components like radix-ui
- `react-hook-form` -> form management
- `ahooks` -> collection of useful react custom hooks
- `zustand` -> performant global state
- `react-toastify` -> toast outside of react components

## Development

```bash
# install deps
$ pnpm install

# init msw for browser mocking
$ pnpm msw:init

# Runs the app
$ pnpm start
```

```bash
# run test
$ pnpm test

# coverage with instanbul
$ pnpm test:coverage
```

## Build

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

```bash
# build app
$ pnpm build
```

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Notes

- [ ] add `million.js`. it solves better reconciliation (diffing vnode), while React Forget solves auto memoization (ex: `useMemo`, `useCallback`, `memo`). When I try to use automatic mode in `v2.6.0-beta.16`, my tests breaks because it renders `<slots />` replacing some of optimized components.
- [ ] fix all tests
- [ ] add `/docs` folder, including all my decisions why or technical considerations.
