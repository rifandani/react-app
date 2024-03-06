import { expect, test } from '@playwright/test';

test('auth setup', async ({ page }) => {
  // when we're not authenticated, the app redirects to the login page
  await page.goto('');

  const usernameInput = page.getByRole('textbox', { name: /username/i });
  const passwordInput = page.getByRole('textbox', { name: /password/i });
  const submitBtn = page.getByRole('button', { name: /login/i });

  await usernameInput.fill('kminchelle');
  await passwordInput.fill('0lelplR');
  await submitBtn.click();

  await page.waitForURL('');
  await expect(usernameInput).not.toBeVisible();
  await expect(passwordInput).not.toBeVisible();
  await expect(submitBtn).not.toBeVisible();

  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
