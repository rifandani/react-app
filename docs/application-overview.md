# Application Overview

Bugs/issues in JollyUI:

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
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `class-variance-authority` -> easy styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `ky` + `@tanstack/react-query` -> server state management + data fetching
- `zod` -> runtime schema validation
- `@iconify/react` -> SVG icon on demand
- `react-aria` + `react-aria-components` + `react-stately` + `sonner` -> adaptive, accessible and robust unstyled UI components
- `react-hook-form` -> form management
- `zustand` -> performant global state management
- `type-fest` -> type helpers
- `@rifandani/nxact-yutiriti` -> object/array/string utils
- `@internationalized/date` -> date utils
- `vite-plugin-pwa` + `@vite-pwa/assets-generator` + `@rollup/plugin-replace` + `https-localhost` + `workbox-core` + `workbox-precaching` + `workbox-routing` + `workbox-window` -> Progressive Web App (PWA)

[Demo App](https://react-app-rifandani.vercel.app)

## Get Started

Prerequisites:

- Node LTS (v20+)
- PNPM 8.15+

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

We use Playwright for our E2E tests in this project. Check out [testing docs](https://github.com/rifandani/react-app/blob/main/docs/testing.md) for more info.

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

## Start "production"

PWA relies on [https-localhost](https://github.com/daquinoaldo/https-localhost) to serve the dist files on https://localhost/. Please refer to it's docs for the steps to setup your local environment.

```bash
# build app in "production" mode & start a server
$ pnpm start
```

Open up https://localhost/, then restart the server, you will see a notification ask you to restart reload the offline content.

## Maintaining

- Update dependencies weekly using dependencies updater. I recommend using Vscode extensions: [Vscode Ecosystem](https://marketplace.visualstudio.com/items?itemName=rifandani.vscode-ecosystem) (also maintained by myself)
- When you update `@playwright/test`, don't forget to also download new browser binaries and their dependencies by running `pnpm test:install`

## Deployment

For now only supports deployment to Vercel.
Check out `vercel.json` file for further details.
