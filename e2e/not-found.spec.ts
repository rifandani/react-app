import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // not exists route
  await page.goto('/hahahahaha');
});

test.describe('authorized', () => {
  test('should have heading, text description, and back to home link', async ({
    page,
  }) => {
    const title = page.getByRole('heading', { level: 1 });
    const subtitle = page.getByRole('heading', { level: 2 });
    const description = page.getByRole('paragraph');
    const link = page.getByRole('link');

    await expect(title).toBeVisible();
    await expect(subtitle).toBeVisible();
    await expect(description).toBeVisible();
    await expect(link).toBeVisible();
    await expect(link).toHaveText(/home/);
  });
});

test.describe('unauthorized', () => {
  // reset storage state in a test file to avoid authentication that was set up for the whole project
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should have heading, text description, and back to login link', async ({
    page,
  }) => {
    const title = page.getByRole('heading', { level: 1 });
    const subtitle = page.getByRole('heading', { level: 2 });
    const description = page.getByRole('paragraph');
    const link = page.getByRole('link');

    await expect(title).toBeVisible();
    await expect(subtitle).toBeVisible();
    await expect(description).toBeVisible();
    await expect(link).toBeVisible();
    await expect(link).toHaveText(/login/);
  });
});
