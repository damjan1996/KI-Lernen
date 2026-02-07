import { test, expect } from "@playwright/test";

test.describe("Datenschutz Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/datenschutz");
  });

  test("should display page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Datenschutzerklärung" })
    ).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Datenschutz");
  });

  test("should display all main sections", async ({ page }) => {
    await expect(page.getByText("1. Datenschutz auf einen Blick")).toBeVisible();
    await expect(page.getByText("2. Hosting")).toBeVisible();
    await expect(page.getByText("3. Allgemeine Hinweise und Pflichtinformationen")).toBeVisible();
    await expect(page.getByText("4. Datenerfassung auf dieser Website")).toBeVisible();
    await expect(page.getByText("5. Zahlungsdienstleister")).toBeVisible();
    await expect(page.getByText("6. Ihre Rechte")).toBeVisible();
    await expect(page.getByText("7. SSL-Verschlüsselung")).toBeVisible();
  });

  test("should display hosting information", async ({ page }) => {
    await expect(page.getByText(/Vercel Inc/)).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    await expect(page.getByText(/kontakt@kilernen\.de/)).toBeVisible();
  });

  test("should display Stripe privacy info", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Stripe" })).toBeVisible();
  });

  test("should display user rights", async ({ page }) => {
    await expect(page.getByText(/Auskunft über/).first()).toBeVisible();
    await expect(page.getByText(/Löschung/).first()).toBeVisible();
  });

  test("should display date reference", async ({ page }) => {
    await expect(page.getByText(/Stand:.*2026/)).toBeVisible();
  });
});

test.describe("AGB Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/agb");
  });

  test("should display page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Allgemeine Geschäftsbedingungen" })
    ).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toMatch(/AGB|Geschäftsbedingungen/);
  });

  test("should display all sections", async ({ page }) => {
    await expect(page.getByText("§ 1 Geltungsbereich")).toBeVisible();
    await expect(page.getByText("§ 2 Vertragsgegenstand")).toBeVisible();
    await expect(page.getByText("§ 3 Vertragsschluss")).toBeVisible();
    await expect(page.getByText("§ 4 Preise und Zahlung")).toBeVisible();
    await expect(page.getByText("§ 5 Zugang und Nutzung")).toBeVisible();
    await expect(page.getByText("§ 6 Widerrufsrecht")).toBeVisible();
    await expect(page.getByText("§ 7 Urheberrecht")).toBeVisible();
    await expect(page.getByText("§ 8 Haftung")).toBeVisible();
    await expect(page.getByText("§ 9 Schlussbestimmungen")).toBeVisible();
  });

  test("should mention withdrawal period", async ({ page }) => {
    await expect(page.getByText(/14 Tage/).first()).toBeVisible();
  });

  test("should mention lifetime access", async ({ page }) => {
    await expect(page.getByText(/lebenslanger Zugang/i)).toBeVisible();
  });

  test("should mention Stripe as payment provider", async ({ page }) => {
    await expect(page.getByText(/Stripe/)).toBeVisible();
  });

  test("should mention German law", async ({ page }) => {
    await expect(page.getByText(/Bundesrepublik Deutschland/)).toBeVisible();
  });

  test("should display date reference", async ({ page }) => {
    await expect(page.getByText(/Stand:.*2026/)).toBeVisible();
  });
});

test.describe("Impressum Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/impressum");
  });

  test("should display page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Impressum" })
    ).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Impressum");
  });

  test("should return 200 status code", async ({ page }) => {
    const response = await page.goto("/impressum");
    expect(response?.status()).toBe(200);
  });
});
