# Application Overview

- `date-picker` -> use `@internationalized/date` instead of `date-fns` to format date
- `checkbox` -> `labelVariants` function should be called inside of `cn` -> `labelVariants()`
- `radio-group` -> `labelVariants` function should be called inside of `cn` -> `labelVariants()`
- `searchfield` -> All className should be `(values) => typeof className === 'function' ? className(values) : className`
- `switch` -> `<div className="pointer-events-none block h-5 w-5"` there's no need for `cn` helper.
- `breadcrumbs` -> in `BreadcrumbLink` and `BreadcrumbPage`, className should be `(values) => typeof className === 'function' ? className(values) : className`.
- `Link` we don't need `LinkRenderProps` assertions in className values, it's already inferred
- `tabs` -> `Selected items not found. Exiting.` error. All className should be `(values) => typeof className === 'function' ? className(values) : className`
- `dialog` -> in `DialogContent`, `Modal` className should be `(values) => typeof className === 'function' ? className(values) : className`
- `TextArea` className should be `(values) => typeof className === 'function' ? className(values) : className`

The application built with:

- `vite` + `typescript` -> development productivity
- `biome` -> fast linter, formatter
- `@playwright/test` -> e2e test
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `daisyui` -> easy styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/react-query` -> server state management + data fetching
- `zod` -> runtime schema validation
- `@iconify/react` -> SVG icon on demand
- `react-aria` + `react-aria-components` + `react-stately` -> adaptive, accessible and robust unstyled UI components
- `react-hook-form` -> form management
- `zustand` -> performant global state management
- `react-toastify` -> toast outside of react components
- `type-fest` -> type helpers
- `@rifandani/nxact-yutiriti` -> object/array/string utils
- `@internationalized/date` -> date utils
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

```bash
# run test headless
$ pnpm test

# run test in UI mode
$ pnpm test:ui

# open the test report
$ pnpm test:report
```

## Build

```bash
# build app in "staging" mode
$ pnpm build:staging

# build app in "production" mode
$ pnpm build
```

## Start

PWA relies on [https-localhost](https://github.com/daquinoaldo/https-localhost) to serve the dist files on https://localhost/. Please refer to it's docs for the steps to setup your local environment.

```bash
# build app in "production" mode & start a server
$ pnpm start
```

Open up https://localhost/, then restart the server, you will see a notification ask you to restart reload the offline content.

## Deployment

For now only supports deployment to Vercel.
Check out `vercel.json` file for further details.
