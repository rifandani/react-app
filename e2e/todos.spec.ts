import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/todos');
});

test.describe('authorized', () => {
  test('should have title', async ({ page }) => {
    const title = page.getByRole('heading', { level: 1, name: 'Todo List' });

    await expect(title).toBeVisible();
  });

  test.describe('todo list', () => {
    // test.fixme('should be able to see loading spinner when query is fetching', () => {})
    // test.fixme('should be able to see error when query is error', () => {})

    test('should be able to see todo list and filter it', async ({ page }) => {
      const forms = page.getByLabel(/form todo item with id:/i);
      const combobox = page.getByLabel('todos filter');

      await forms.nth(9).waitFor({ state: 'visible' });

      await expect(combobox).toHaveValue('10');
      await expect(forms).toHaveCount(10);
      // on assert when the items equal to 10 once, instead of all 25, 50, 100, to speed up test
      for await (const form of await forms.all()) {
        await expect(form).toBeVisible();
      }

      await combobox.selectOption('25');
      await forms.nth(24).waitFor({ state: 'visible' });
      await expect(forms).toHaveCount(25);
      await combobox.selectOption('50');
      await forms.nth(49).waitFor({ state: 'visible' });
      await expect(forms).toHaveCount(50);
      await combobox.selectOption('100');
      await forms.nth(99).waitFor({ state: 'visible' });
      await expect(forms).toHaveCount(100);
    });
  });

  test.describe('create todo', () => {
    // test.fixme('should have triggered unsaved changes modal on unfinished filling create form', async ({ page }) => {});

    test('should be able to add new todo', async ({ page }) => {
      const textInput = page.getByPlaceholder('What should you do next...');
      const submitBtn = page.getByRole('button', { name: /add/i });

      await textInput.fill('new todo');
      await submitBtn.click();

      // wait for the first item link text changed to 'new todo'
      await expect(
        page
          .getByRole('form')
          .and(page.getByLabel(/form todo item with id:/i))
          .first()
          .getByRole('link'),
      ).toHaveText('new todo');
      await expect(page.getByText(/Todo successfully created/i)).toBeVisible();
    });
  });

  test.describe('todo update', () => {
    // test.fixme(`should not be able to update todo completion from the newly created todo`, async ({page}) => {})

    test('should be able to update todo completion', async ({ page }) => {
      const checkboxes = page.getByLabel(
        /toggle completed todo item with id:/i,
      );

      // wait query to success
      await checkboxes.nth(9).waitFor({ state: 'visible' });

      const prevIsChecked = await checkboxes.first().isChecked();
      await checkboxes.first().setChecked(!prevIsChecked);
      const newIsChecked = await checkboxes.first().isChecked();

      expect(prevIsChecked).not.toBe(newIsChecked);
      await expect(page.getByText(/Todo successfully updated/i)).toBeVisible();
    });
  });

  test.describe('todo delete', () => {
    // test.fixme(`should not be able to delete todo from the newly created todo`, async ({page}) => {})

    test(`should be able to delete user's todo`, async ({ page }) => {
      await page.goto('/todos?limit=50');

      const forms = page.getByLabel(/form todo item with id:/i);
      const removeBtn = page.getByRole('button', {
        name: /remove todo item with id:/i,
      });

      // wait query to success
      await forms.nth(49).waitFor({ state: 'visible' });
      await expect(forms).toHaveCount(50);

      await removeBtn.first().click();
      await expect(forms).toHaveCount(49);
      await expect(page.getByText(/Todo successfully deleted/i)).toBeVisible();
    });
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
