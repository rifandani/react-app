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
      const gridItems = page.getByRole('row');
      const filter = page.getByRole('button', {
        name: 'todo list limit selection',
      });

      await gridItems.nth(9).waitFor({ state: 'visible' });
      await expect(filter.filter({ hasText: '10' })).toHaveText('10');
      await expect(gridItems).toHaveCount(10);

      await filter.click();
      await page.getByRole('option', { name: '25', exact: true }).click();
      await gridItems.nth(24).waitFor({ state: 'visible' });
      await expect(gridItems).toHaveCount(25);

      await filter.click();
      await page.getByRole('option', { name: '50', exact: true }).click();
      await gridItems.nth(49).waitFor({ state: 'visible' });
      await expect(gridItems).toHaveCount(50);

      await filter.click();
      await page.getByRole('option', { name: '100', exact: true }).click();
      await gridItems.nth(99).waitFor({ state: 'visible' });
      await expect(gridItems).toHaveCount(100);
    });

    test('should be able to navigate to todo detail by clicking on the link', async ({
      page,
    }) => {
      const gridItems = page.getByRole('row');

      // wait query to success
      await gridItems.nth(9).waitFor({ state: 'visible' });
      await expect(gridItems).toHaveCount(10);

      // navigate to todo detail
      await gridItems.first().click();
      await page.waitForURL('/todos/**');
      await expect(gridItems.first()).not.toBeVisible();
    });
  });

  test.describe('create todo', () => {
    test('should have triggered unsaved changes modal on unfinished filling create form', async ({
      page,
    }) => {
      const textInput = page.getByPlaceholder('What should you do next...');
      const navbarLink = page.getByText('React Template');

      await textInput.fill('new todo');
      // to trigger `useBlocker`, navigation should be coming from RRD API, not from browser event
      await navbarLink.click();

      const attention = page.getByText('Attention');
      await expect(attention).toBeVisible();
      await expect(
        page.getByText('Discard unsaved changes - are you sure?'),
      ).toBeVisible();

      // canceling path
      await page.getByRole('button', { name: 'Cancel' }).click();
      await expect(attention).not.toBeVisible();
      await expect(textInput).toBeVisible();

      // continue path
      await navbarLink.click();
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL('/');
      await expect(attention).not.toBeVisible();
      await expect(textInput).not.toBeVisible();
    });

    test('should be able to add new todo', async ({ page }) => {
      const textInput = page.getByPlaceholder('What should you do next...');
      const submitBtn = page.getByRole('button', { name: /add/i });

      await textInput.fill('new todo');
      await submitBtn.click();

      // wait for the first item link text changed to 'new todo'
      await expect(page.getByRole('row').first().getByRole('link')).toHaveText(
        'new todo',
      );
      await expect(page.getByText(/Todo successfully created/i)).toBeVisible();
    });
  });

  test.describe('todo update', () => {
    // test.fixme(`should not be able to update todo completion from the newly created todo`, async ({page}) => {})

    test('should be able to update todo completion', async ({ page }) => {
      const gridItem = page.getByRole('row').first();

      // wait query to success
      await gridItem.waitFor({ state: 'visible' });

      const prevIsChecked = await gridItem
        .locator('label')
        .getAttribute('data-selected');
      await gridItem.locator('label').click();
      const newIsChecked = await gridItem
        .locator('label')
        .getAttribute('data-selected');

      expect(prevIsChecked).not.toBe(newIsChecked);
      await expect(page.getByText(/Todo successfully updated/i)).toBeVisible();
    });
  });

  test.describe('todo delete', () => {
    // test.fixme(`should not be able to delete todo from the newly created todo`, async ({page}) => {})

    test(`should be able to delete user's todo`, async ({ page }) => {
      await page.goto('/todos?limit=50');

      const gridItems = page.getByRole('row');
      const removeBtns = page.getByTestId('todo-delete');

      // wait query to success
      await gridItems.nth(49).waitFor({ state: 'visible' });
      await expect(gridItems).toHaveCount(50);
      await removeBtns.first().click();
      await expect(gridItems).toHaveCount(49);
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

    await page.waitForURL(/\/login/);
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });
});
