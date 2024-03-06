# Testing

## Playwright

We use Playwright for our End-to-End tests in this project. You'll find those in
the `e2e` directory. As you make changes, add to an existing file or create a
new file in the `e2e` directory to test your changes.

To run these tests in development, run `pnpm run test` which will start
the dev server for the app and run Playwright on it.

We have a setup test to automate authentication/login flow in `auth.setup.ts` file by default. If you want to opt out of it, you can specify it in the test file, like so:

```ts
test.describe('unauthorized', () => {
  // reset storage state in a test file to avoid authentication that was set up for the whole project
  test.use({ storageState: { cookies: [], origins: [] } });
});
```