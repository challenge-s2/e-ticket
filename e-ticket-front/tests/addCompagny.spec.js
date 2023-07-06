import { test, expect } from '@playwright/test';

test('CreateCompany', async ({ page }) => {
    // Access website
    await page.goto('http://localhost:3010/');
    // Connexion
    await page.getByRole('button', { name: 'Connexion' }).click();
    await page.getByPlaceholder('john.doe@gmail.com').click();
    await page.getByPlaceholder('john.doe@gmail.com').fill('odessa.chesneau@gmail.com');
    await page.getByPlaceholder('john.doe@gmail.com').press('Tab');
    await page.getByLabel('Mot de passe').fill('Odessa0.');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Connexion' }).click();
    // Access backoffice
    await page.getByRole('button', { name: 'Backoffice' }).click();
    await page.getByRole('button', { name: 'menu' }).click();
    // Create company
    await page.getByRole('button', { name: 'Ajouter une entreprise' }).click();
    await page.locator('.MuiBackdrop-root').click();
    await page.getByLabel('Nom de l\'entreprise').click();
    await page.getByLabel('Nom de l\'entreprise').fill('EntrepriseTest');
    await page.getByLabel('Nom de l\'entreprise').press('Tab');
    await page.getByLabel('Description de l\'entreprise').fill('EntrepriseTestDesc');
    await page.getByLabel('Description de l\'entreprise').press('Tab');
    await page.getByRole('button', { name: 'Type d\'entreprise ​' }).click();
    await page.getByRole('option', { name: 'Vente d\'eCigarette' }).click();
    await page.getByLabel('Ville de l\'entreprise').click();
    await page.getByLabel('Ville de l\'entreprise').fill('Paris');
    await page.getByLabel('Ville de l\'entreprise').press('Tab');
    await page.getByLabel('Mail de l\'entreprise').fill('entreprisetest@gmail.com');
    await page.getByLabel('Mail de l\'entreprise').press('Tab');
    await page.getByLabel('Mot de passe du compte').fill('TestEntreprise0.');
    await page.waitForTimeout(1000);
    // Check if the company is created
    await page.getByRole('button', { name: 'Ajouter' }).click();
    await page.getByRole('button', { name: 'menu' }).click();
    await page.getByRole('button', { name: 'Liste des entreprises' }).click();
    await page.locator('.MuiBackdrop-root').click();
    await page.getByRole('cell', { name: 'EntrepriseTest', exact: true }).click();
    await page.waitForTimeout(1000);

});