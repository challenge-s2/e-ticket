import { test, expect } from '@playwright/test';

test('form', async ({ page }) => {
  await page.goto('http://localhost:3010/');
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('link', { name: 'image of a bakery' }).click();
  await page.getByRole('button', { name: 'Activité ​' }).click();
  await page.getByRole('option', { name: 'Institut de beauté' }).click();
  await page.getByPlaceholder('Microsoft Corporation, une multinationale informatique...').click();
  await page.getByPlaceholder('Microsoft Corporation, une multinationale informatique...').fill('Information');
  await page.getByPlaceholder('Microsoft Corporation, une multinationale informatique...').press('Tab');
  await page.getByLabel('Le contenu de votre demande').fill('Contenu de ma commande');
  await page.getByRole('button', { name: 'Envoyer' }).click();
});