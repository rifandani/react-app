import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('authorized', () => {
  test('should have title', async ({ page }) => {
    const title = page.getByRole('heading', { level: 1 });

    await expect(title).toBeVisible();
  });

  test('should be able to sort, toggle clock, and navigate to /todos', async ({
    page,
  }) => {
    const clockTimer = page.getByRole('img', { name: /clock timer/i });
    const sortBtn = page.getByRole('button', { name: /sort/i });
    const toggleClockBtn = page.getByRole('button', { name: /clock/i });
    const getStartedBtn = page.getByRole('button', { name: /start/i });

    await expect(clockTimer).toBeVisible();
    await expect(sortBtn).toBeVisible();
    await expect(toggleClockBtn).toBeVisible();
    await expect(getStartedBtn).toBeVisible();

    // we don't assert sort button, because there's a possibility the position would be the same as before
    await toggleClockBtn.click();
    await expect(clockTimer).not.toBeVisible();
    await getStartedBtn.click();

    await page.waitForURL('/todos');
    await expect(sortBtn).not.toBeVisible();
    await expect(toggleClockBtn).not.toBeVisible();
    await expect(getStartedBtn).not.toBeVisible();
  });
});

test.describe('unauthorized', () => {
  // reset storage state in a test file to avoid authentication that was set up for the whole project
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should redirect back to /login', async ({ page }) => {
    const usernameInput = page.getByRole('textbox', { name: /username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const submitBtn = page.getByRole('button', { name: /login/i });

    await page.waitForURL('/login');
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });
});
