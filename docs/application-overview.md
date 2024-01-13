# Application Overview

The application built with:

- `vite` + `typescript` + `eslint` + `prettier` -> development productivity
- `vitest` + `@testing-library/react` -> unit test, integration test, coverage
- `msw` -> API response mocking for tests
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `daisyui` -> easy styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/react-query` -> server state management + data fetching
- `zod` -> runtime schema validation
- `@iconify-icon/react` -> SVG icon on demand
- `react-aria` + `react-aria-components` + `react-stately` -> adaptive, accessible and robust unstyled UI components like radix-ui
- `react-hook-form` -> form management
- `zustand` -> performant global state
- `react-toastify` -> toast outside of react components
- `type-fest` -> collection of useful type helpers
- `@rifandani/nxact-yutiriti` -> collection of useful utils
- `@internationalized/date` -> collection of useful date utils
- `vite-plugin-pwa` + `@vite-pwa/assets-generator` + `@rollup/plugin-replace` + `https-localhost` + `workbox-core` + `workbox-precaching` + `workbox-routing` + `workbox-window` -> Progressive Web App (PWA)

[Demo App](https://react-app-rifandani.vercel.app)

## Get Started

Prerequisites:

- Node 18+
- PNPM 8.10.5+

To set up the app execute the following commands:

```bash
# clone the template OR you can click "Use this template" in https://github.com/rifandani/react-app.com
$ git clone https://github.com/rifandani/react-app.git

$ cd react-app

# rename the example env files
$ cp .env.development.example .env.development
$ cp .env.staging.example .env.staging
$ cp .env.production.example .env.production

# install deps
$ pnpm install
```

## Development

```bash
# Runs the app + PWA
$ pnpm dev
```

## Testing

We are using MSW v2 which utilize Node v18+. Make sure you install Node v18+, because it has a built-in fetch.

```bash
# run test
$ pnpm test

# coverage with instanbul
$ pnpm test:coverage
```

## Build

```bash
# build app in "staging" mode
$ pnpm build:staging

# build app in "production" mode
$ pnpm build
```

## Start

PWA relies on [https-localhost](https://github.com/daquinoaldo/https-localhost) to serve the dist files on https://localhost/.
Please refer to it's docs for the steps to setup your local environment.

```bash
pnpm start
```

Open up https://localhost/, then restart the server, you will see a notification ask you to restart reload the offline content.

## Deployment

For now only supports deployment to Vercel.
Check out `vercel.json` file fo further details.
