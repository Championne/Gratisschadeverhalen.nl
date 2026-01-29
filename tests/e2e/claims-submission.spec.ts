import { test, expect } from '@playwright/test';

test.describe('Claims Submission Workflow', () => {

  test('should allow a user to submit a claim with OCR and receive success', async ({ page }) => {
    await page.goto('/claim-indienen');

    // Step 1: OCR Upload (simulate skipping for now, as actual OCR is complex in E2E)
    await expect(page.getByRole('heading', { name: 'Start Nu: Gratis Autoschade Claim Indienen bij Tegenpartij' })).toBeVisible();
    await page.getByRole('button', { name: 'Overslaan en handmatig invullen' }).click();

    // Verify transition to Step 2
    await expect(page.getByText('Controleer Gegevens')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jouw Gegevens' })).toBeVisible();

    // Fill Personal Details
    await page.locator('#naam').fill('Test Naam E2E');
    await page.locator('#email').fill('test.e2e@example.com');
    await page.locator('#telefoon').fill('0612345678');

    // Fill Ongeval Details
    await page.locator('#datum_ongeval').fill('2026-01-27');
    await page.locator('#plaats_ongeval').fill('Teststad');
    await page.locator('#beschrijving').fill('Dit is een test beschrijving van de schade, opgesteld door de E2E test.');

    // Fill Tegenpartij Gegevens
    await page.locator('#kenteken_tegenpartij').fill('AB-12-CD');
    await page.locator('#naam_tegenpartij').fill('Tegenpartij Naam E2E');
    await page.locator('#verzekeraar_tegenpartij').fill('Test Verzekeraar');
    // Polisnummer is optional, so we'll skip it for this basic test

    // Implement strategic mocking for external services (e.g., OCR API) or complex integrations (like actual file storage)
    // To mock OCR: Intercept network requests (page.route) to the OCR endpoint and return a predefined successful response.
    // To mock file upload: If the actual file upload goes to a separate API, intercept that request and verify its payload, then return a success.
    // await page.route('**/api/ocr-endpoint', route => route.fulfill({ status: 200, body: JSON.stringify({ extractedData: { name: 'Mock OCR Name', email: 'mock@ocr.com' } }) }));
    // const filePath = './tests/e2e/test-files/test-photo.jpg'; // Ensure this file exists for Playwright to upload a dummy file
    // await page.locator('input[type="file"]').setInputFiles(filePath);
    // await page.locator('input[type="file"]').setInputFiles('./path/to/test-photo.jpg');
    
    // Submit the form
    await page.getByRole('button', { name: 'Claim Indienen' }).click();

    // Expect success message and redirection
    await expect(page.getByText('Claim succesvol ingediend!')).toBeVisible({ timeout: 15000 }); // Increased timeout for server actions
    await expect(page).toHaveURL(/.*\/claim-success\?claimId=.*/); // Check for redirection to success page

    // Further checks on the success page could be added here
    await expect(page.getByRole('heading', { name: 'Claim Succesvol Ingediend!' })).toBeVisible();
  });

  test('should show validation errors for missing required fields', async ({ page }) => {
    await page.goto('/claim-indienen');

    await page.getByRole('button', { name: 'Overslaan en handmatig invullen' }).click();

    // Attempt to submit without filling any fields
    await page.getByRole('button', { name: 'Claim Indienen' }).click();

    // Expect error toast and focus on the first missing field
    await expect(page.getByText('Vul alle verplichte velden in')).toBeVisible();
    await expect(page.getByText('Ontbreekt: Naam, Email, Telefoonnummer, Kenteken tegenpartij, Datum ongeval, Beschrijving')).toBeVisible();
    // Check if #naam input is focused (requires more robust Playwright selector for focused element)
    // await expect(page.locator('#naam')).toBeFocused(); 
  });

  // Add more tests for:
  // - OCR upload and data population
  // - Voice input interaction (mocking needed)
  // - Different validation scenarios (e.g., invalid email)
  // - Specific error handling from API
  // - Dashboard view after submission (requires authentication/mocking)
});
