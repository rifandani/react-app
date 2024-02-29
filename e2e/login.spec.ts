import { expect, test } from '@playwright/test';

const validUsername = 'kminchelle';
const validPassword = '0lelplR';
const invalidUsername = 'km';
const invalidPassword = '0lelp';
const errorUsername = '1kminchelle';
const errorPassword = '10lelplR';

test.describe('authorized', () => {
  test('should redirect back to home page', async ({ page }) => {
    const usernameInput = page.getByRole('textbox', { name: /username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const submitBtn = page.getByRole('button', { name: /login/i });

    await expect(usernameInput).not.toBeVisible();
    await expect(passwordInput).not.toBeVisible();
    await expect(submitBtn).not.toBeVisible();
  });
});

test.describe('unauthorized', () => {
  // reset storage state in a test file to avoid authentication that was set up for the whole project
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should have title, register here link, react logo', async ({
    page,
  }) => {
    const title = page.getByRole('heading', { level: 1 });
    const link = page.getByRole('link', { name: /register/i });
    const logo = page.getByRole('img', { name: /react/i });

    await expect(title).toBeVisible();
    await expect(link).toBeVisible();
    await expect(logo).toBeVisible();
  });

  test('should success to login', async ({ page }) => {
    const usernameInput = page.getByRole('textbox', { name: /username/i });
    const usernameAlert = page.getByRole('alert', { name: /username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const passwordAlert = page.getByRole('alert', { name: /password/i });
    const submitBtn = page.getByRole('button', { name: /login/i });

    // default form state
    await expect(usernameInput).toBeVisible();
    await expect(usernameAlert).not.toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(passwordAlert).not.toBeVisible();
    await expect(submitBtn).toBeVisible();

    // fill with valid values
    await usernameInput.fill(validUsername);
    await passwordInput.fill(validPassword);
    await expect(usernameAlert).not.toBeVisible();
    await expect(passwordAlert).not.toBeVisible();
    await expect(submitBtn).toBeEnabled();

    // after submit, should be redirected to home
    await submitBtn.click();
    await page.waitForURL('');
    await expect(usernameInput).not.toBeVisible();
    await expect(passwordInput).not.toBeVisible();
    await expect(submitBtn).not.toBeVisible();
  });

  test('should failed to login', async ({ page }) => {
    const usernameInput = page.getByRole('textbox', { name: /username/i });
    const usernameAlert = page.getByRole('alert', { name: /username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const passwordAlert = page.getByRole('alert', { name: /password/i });
    const errorAlert = page.getByRole('alert', { name: /fetcher/i });
    const submitBtn = page.getByRole('button', { name: /login/i });

    // default form state
    await expect(usernameInput).toBeVisible();
    await expect(usernameAlert).not.toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(passwordAlert).not.toBeVisible();
    await expect(errorAlert).not.toBeVisible();
    await expect(submitBtn).toBeVisible();

    // fill with invalid form values
    await usernameInput.fill(invalidUsername);
    await passwordInput.fill(invalidPassword);
    await expect(usernameAlert).toBeVisible();
    await expect(passwordAlert).toBeVisible();
    await expect(submitBtn).toBeDisabled();

    // fill with valid form values, but not valid as request payload
    await usernameInput.fill(errorUsername);
    await passwordInput.fill(errorPassword);
    await expect(usernameAlert).not.toBeVisible();
    await expect(passwordAlert).not.toBeVisible();
    await expect(submitBtn).toBeEnabled();

    // assert that user value in localstorage is null and error alert is visible
    await submitBtn.click();
    const appUser = await page.evaluate(
      () => localStorage.getItem('app-user') as string,
    );
    expect(JSON.parse(appUser)).toEqual({
      version: 0,
      state: { user: null },
    });
    await expect(errorAlert).toBeVisible();
  });
});
