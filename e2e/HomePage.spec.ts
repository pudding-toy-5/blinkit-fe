import { expect, test } from '@playwright/test';

test.describe('HomePage', () => {
  test(`renders text 'HomePage'.`, async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page.getByText('HomePage')).toBeVisible();
  });

  test(`renders 'to AboutPage' button.`, async ({ page }) => {
    await page.goto('http://localhost:3000');
  });
});
