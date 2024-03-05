import { expect, test } from '@playwright/test';

test.describe('authorized', () => {
  test('should have title, and link that navigate back to /todos', async ({
    page,
  }) => {
    await page.goto('/todos/28');

    const title = page.getByRole('heading', { level: 1, name: 'Todo Detail' });
    const link = page.getByRole('link', { name: /back to todos/i });

    await expect(title).toBeVisible();
    await expect(link).toBeVisible();
    await link.click();

    await page.waitForURL('/todos');
    await expect(title).not.toBeVisible();
    await expect(link).not.toBeVisible();
  });

  test.describe('update todo', () => {
    // test.fixme(`should show error UI on invalid todo id in URL`, async ({page}) => {})

    test(`should be able to update user's own todo`, async ({ page }) => {
      await page.goto('/todos/28');

      const input = page.getByRole('textbox', { name: /input todo text/i });
      const updateBtn = page.getByRole('button', { name: /update/i });

      await expect(input).toBeVisible();
      await expect(updateBtn).toBeVisible();

      // we can update by clicking submit btn / press Enter in the input text
      await input.fill('updated todo');
      await updateBtn.click();
      await page.waitForURL('/todos');
      await expect(input).not.toBeVisible();
      await expect(updateBtn).not.toBeVisible();
    });

    test(`should NOT be able to update other user's todo`, async ({ page }) => {
      await page.goto('/todos/1');

      const input = page.getByRole('textbox', { name: /input todo text/i });
      const updateBtn = page.getByRole('button', { name: /update/i });

      await expect(input).toBeVisible();
      await expect(updateBtn).not.toBeVisible();

      // clicking Enter won't update the todo
      await input.fill('updated todo');
      await input.press('Enter');
      await expect(input).toBeVisible({ timeout: 3_000 });
    });
  });
});

test.describe('unauthorized', () => {
  // reset storage state in a test file to avoid authentication that was set up for the whole project
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should redirect back to /login', async ({ page }) => {
    await page.goto('/todos/28');

    const usernameInput = page.getByRole('textbox', { name: /username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const submitBtn = page.getByRole('button', { name: /login/i });

    await page.waitForURL('/login');
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });
});
