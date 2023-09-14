# Intro

<!-- [![DeepScan grade](https://deepscan.io/api/teams/13942/projects/24678/branches/761600/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13942&pid=24678&bid=761600) -->

React template built with:

- `vite` + `typescript` + `eslint` + `prettier` -> built-in dev productivity
- `vitest` + `@reactj/testing-library` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `daisyui` -> styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/react-query` -> data fetching
- `zod` -> schema validation
- `@iconify-icon/react` -> icon on demand (based on web-component)
- `type-fest` -> useful type helpers

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

Todos:

- [ ] use `react-aria-components`, which will be the recommended way to use react-aria in the future
- [ ] add `million.js`. it solves better reconciliation (diffing vnode), while React Forget solves auto memoization (think `useMemo`, `useCallback`, `memo`)
- [ ] fix all tests
- [ ] add `/docs` folder, including all my decisions why or technical considerations.
