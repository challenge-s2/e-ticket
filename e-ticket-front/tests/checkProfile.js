import { test, expect } from '@playwright/test';

test('My Profile', async ({ page }) => {
  await page.goto('http://localhost:3010/');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.getByPlaceholder('john.doe@gmail.com').click();
  await page.getByPlaceholder('john.doe@gmail.com').fill('');
  await page.getByText('Vous n\'avez pas de compte? Créez-en un !').click();
  await page.getByPlaceholder('john.doe@gmail.com').click();
  await page.getByPlaceholder('john.doe@gmail.com').fill('odessauser@gmail.com');
  await page.getByPlaceholder('john.doe@gmail.com').press('Tab');
  await page.getByLabel('Mot de passe', { exact: true }).fill('Odessa0.');
  await page.getByLabel('Mot de passe', { exact: true }).press('Tab');
  await page.getByLabel('Confirmer le mot de passe').fill('Odessa0.');
  await page.getByRole('button', { name: 'S\'inscrire' }).click();
  await page.getByRole('button', { name: 'Tickets' }).click();
  await page.getByRole('button', { name: 'Profil' }).click();
});