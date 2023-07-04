import { test, expect } from '@playwright/test';

test('Auth', async ({ page }) => {
  await page.goto('http://localhost:3010/');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('john.doe@gmail.com').click();
  await page.getByPlaceholder('john.doe@gmail.com').fill('odessa.chesneau@gmail.com');
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('john.doe@gmail.com').press('Tab');
  await page.getByLabel('Mot de passe').fill('Odessa0.');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Connexion' }).click();
});