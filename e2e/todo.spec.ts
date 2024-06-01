import { expect, test } from '@playwright/test';

test.describe('authorized', () => {
  test('should have title, and link that navigate back to /todos', async ({
    page,
  }) => {
    await page.goto('/todos/47');

    const title = page.getByRole('heading', { name: 'Todo Detail' });
    const homeLink = page.getByRole('link', { name: 'Home' });
    const todosLink = page.getByRole('link', { name: 'Todos' });
    const todoDetailLink = page.getByRole('link', { name: '47' });

    await expect(title).toBeVisible();
    await expect(homeLink).toBeVisible();
    await expect(todosLink).toBeVisible();
    await expect(todoDetailLink).toBeVisible();
    await todosLink.click();

    await page.waitForURL('/todos');
    await expect(title).not.toBeVisible();

    await page.goto('/todos/47');
    await homeLink.click();
    await page.waitForURL('/');
  });

  test.describe('update todo', () => {
    // test.fixme(`should show error UI on invalid todo id in URL`, async ({page}) => {})

    test(`should be able to update user's own todo`, async ({ page }) => {
      await page.goto('/todos/47');

      const input = page.getByRole('textbox', { name: 'todo detail input' });
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

      const input = page.getByRole('textbox', { name: 'todo detail input' });
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
    await page.goto('/todos/47');

    const usernameInput = page.getByRole('textbox', { name: /username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const submitBtn = page.getByRole('button', { name: /login/i });

    await page.waitForURL('/login');
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });
});
