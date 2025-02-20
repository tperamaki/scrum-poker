import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://scrum-poker.tperamaki.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Scrum Poker/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://scrum-poker.tperamaki.com');

  // Click the new room button
  await page.getByRole('link', { name: 'Create new' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('textbox')).toBeVisible();

  // Input text into the textbox
  await page.getByRole('textbox').fill('Test name');

  // Click the Join button
  await page.getByRole('button', { name: 'Join' }).click();

  // Click the X button
  await page.getByRole('button', { name: 'X' }).click();
});
