import { test, expect } from '@playwright/test';

test('Delete Company', async ({ page }) => {
  await page.goto('http://localhost:3010/');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.getByPlaceholder('john.doe@gmail.com').click();
  await page.getByPlaceholder('john.doe@gmail.com').fill('odessa.chesneau@gmail.com');
  await page.getByPlaceholder('john.doe@gmail.com').press('Tab');
  await page.getByLabel('Mot de passe').fill('Odessa0.');
  await page.locator('div').filter({ hasText: /^Connexion$/ }).click();
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.getByRole('button', { name: 'Backoffice' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'Liste des utilisateurs' }).click();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByRole('row', { name: '64a6cd0a0fdb0c71ad57961e odessaentreprise@gmail.com COMPANY' }).getByRole('button').nth(1).click();
});