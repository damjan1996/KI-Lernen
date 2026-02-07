import { test, expect } from "@playwright/test";

test.describe("Checkout", () => {
  test.describe("Checkout Page for Available Course", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/checkout/ki-automatisierung");
      // Handle potential redirect to login (dev server flakiness) - retry once
      if (page.url().includes("/login")) {
        await page.goto("/checkout/ki-automatisierung");
      }
      // Wait for async params resolution
      await expect(page.getByText("Bestellung abschließen")).toBeVisible({ timeout: 15000 });
    });

    test("displays order summary with course details", async ({ page }) => {
      await expect(page.getByText("KI-Automatisierung Masterclass")).toBeVisible();
      await expect(page.getByText("€997").first()).toBeVisible();
    });

    test("displays course features in summary", async ({ page }) => {
      await expect(page.getByText(/Video-Lektionen/i)).toBeVisible();
    });

    test("displays trust badges", async ({ page }) => {
      await expect(page.getByText("SSL-verschlüsselt")).toBeVisible();
      await expect(page.getByText("14-Tage Garantie")).toBeVisible();
    });

    test("displays payment methods", async ({ page }) => {
      await expect(page.getByText("Visa")).toBeVisible();
      await expect(page.getByText("Mastercard")).toBeVisible();
      await expect(page.getByText("SEPA")).toBeVisible();
    });

    test("displays checkout button with price", async ({ page }) => {
      const checkoutButton = page.getByRole("button", { name: /Jetzt für €997 kaufen/i });
      await expect(checkoutButton).toBeVisible();
      await expect(checkoutButton).toBeEnabled();
    });

    test("has back link to course page", async ({ page }) => {
      const backLink = page.getByRole("link", { name: /Zurück zum Kurs/i });
      await expect(backLink).toBeVisible();

      await backLink.click();
      await expect(page).toHaveURL("/kurse/ki-automatisierung");
    });

    test("displays legal links (AGB, Datenschutz)", async ({ page }) => {
      await expect(page.getByRole("link", { name: "AGB" }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: "Datenschutzbestimmungen" }).first()).toBeVisible();
    });

    test("displays Stripe payment information", async ({ page }) => {
      await expect(page.getByText("Sichere Zahlung mit Stripe")).toBeVisible();
      await expect(page.getByText(/Zahlung sicher abzuschließen/i)).toBeVisible();
    });
  });

  test.describe("Checkout Page for Coming Soon Course", () => {
    test("shows not available message for prompt-engineering", async ({ page }) => {
      await page.goto("/checkout/prompt-engineering");

      await expect(page.getByText("Kurs nicht verfügbar")).toBeVisible({ timeout: 15000 });
      await expect(page.getByText(/noch nicht zum Kauf verfügbar/i)).toBeVisible();
    });

    test("shows not available message for voice-agents", async ({ page }) => {
      await page.goto("/checkout/voice-agents");

      await expect(page.getByText("Kurs nicht verfügbar")).toBeVisible({ timeout: 15000 });
    });

    test("provides link back to courses", async ({ page }) => {
      await page.goto("/checkout/prompt-engineering");

      await expect(page.getByText("Kurs nicht verfügbar")).toBeVisible({ timeout: 15000 });

      const backLink = page.getByRole("link", { name: /Zurück zu den Kursen/i });
      await expect(backLink).toBeVisible();

      await backLink.click();
      await expect(page).toHaveURL("/kurse");
    });
  });

  test.describe("Checkout Page for Non-existent Course", () => {
    test("shows course not found message", async ({ page }) => {
      await page.goto("/checkout/non-existent-course");

      await expect(page.getByText("Kurs nicht gefunden")).toBeVisible({ timeout: 15000 });
    });

    test("provides link back to courses", async ({ page }) => {
      await page.goto("/checkout/non-existent-course");

      await expect(page.getByText("Kurs nicht gefunden")).toBeVisible({ timeout: 15000 });

      const backLink = page.getByRole("link", { name: /Zurück zu den Kursen/i });
      await expect(backLink).toBeVisible();
    });
  });

  test.describe("Checkout Initiation from Course Page", () => {
    test("CTA on course page navigates to checkout", async ({ page }) => {
      await page.goto("/kurse/ki-automatisierung");

      const ctaButton = page.getByRole("link", { name: /starten|kaufen|buchen/i }).first();
      await ctaButton.click();

      await expect(page).toHaveURL("/checkout/ki-automatisierung");
    });
  });

  test.describe("Checkout API Validation", () => {
    test("API endpoint exists and responds to POST", async ({ page }) => {
      const response = await page.request.post("/api/checkout", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ courseSlug: "ki-automatisierung" }),
      });

      // API should respond - may return 500 (Stripe auth), 401, or other errors in dev
      const status = response.status();
      expect(status).not.toBe(405); // Should accept POST method
    });

    test("API rejects empty request body", async ({ page }) => {
      const response = await page.request.post("/api/checkout", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({}),
      });

      const status = response.status();
      expect(status).toBeGreaterThanOrEqual(400);
    });
  });
});
