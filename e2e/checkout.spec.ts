import { test, expect } from "@playwright/test";

test.describe("Checkout", () => {
  test.describe("Checkout Page for Available Course", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/checkout/ki-automatisierung");
    });

    test("displays order summary with course details", async ({ page }) => {
      // Should show page title
      await expect(page.getByText("Bestellung abschließen")).toBeVisible();

      // Should show course title
      await expect(page.getByText("KI-Automatisierung Masterclass")).toBeVisible();

      // Should show price
      await expect(page.getByText("€997").first()).toBeVisible();
    });

    test("displays course features in summary", async ({ page }) => {
      // Should show features
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
      await expect(page.getByRole("link", { name: "AGB" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Datenschutzbestimmungen" })).toBeVisible();
    });

    test("displays Stripe payment information", async ({ page }) => {
      await expect(page.getByText(/Stripe/i)).toBeVisible();
      await expect(page.getByText(/Zahlung sicher abzuschließen/i)).toBeVisible();
    });
  });

  test.describe("Checkout Page for Coming Soon Course", () => {
    test("shows not available message for prompt-engineering", async ({ page }) => {
      await page.goto("/checkout/prompt-engineering");

      await expect(page.getByText("Kurs nicht verfügbar")).toBeVisible();
      await expect(page.getByText(/noch nicht zum Kauf verfügbar/i)).toBeVisible();
    });

    test("shows not available message for voice-agents", async ({ page }) => {
      await page.goto("/checkout/voice-agents");

      await expect(page.getByText("Kurs nicht verfügbar")).toBeVisible();
    });

    test("provides link back to courses", async ({ page }) => {
      await page.goto("/checkout/prompt-engineering");

      const backLink = page.getByRole("link", { name: /Zurück zu den Kursen/i });
      await expect(backLink).toBeVisible();

      await backLink.click();
      await expect(page).toHaveURL("/kurse");
    });
  });

  test.describe("Checkout Page for Non-existent Course", () => {
    test("shows course not found message", async ({ page }) => {
      await page.goto("/checkout/non-existent-course");

      await expect(page.getByText("Kurs nicht gefunden")).toBeVisible();
    });

    test("provides link back to courses", async ({ page }) => {
      await page.goto("/checkout/non-existent-course");

      const backLink = page.getByRole("link", { name: /Zurück zu den Kursen/i });
      await expect(backLink).toBeVisible();
    });
  });

  test.describe("Checkout Initiation from Course Page", () => {
    test("CTA on course page navigates to checkout", async ({ page }) => {
      await page.goto("/kurse/ki-automatisierung");

      // Find and click the primary CTA button
      const ctaButton = page.getByRole("link", { name: /starten|kaufen|buchen/i }).first();
      await ctaButton.click();

      // Should be on checkout page
      await expect(page).toHaveURL("/checkout/ki-automatisierung");
    });
  });

  test.describe("Checkout API", () => {
    test("API returns error without course slug", async ({ page }) => {
      const response = await page.request.post("/api/checkout", {
        data: {},
      });

      expect(response.status()).toBe(400);
      const json = await response.json();
      expect(json.error).toBeDefined();
    });

    test("API returns error for non-existent course", async ({ page }) => {
      const response = await page.request.post("/api/checkout", {
        data: { courseSlug: "non-existent" },
      });

      expect(response.status()).toBe(404);
      const json = await response.json();
      expect(json.error).toBeDefined();
    });

    test("API returns error for coming soon course", async ({ page }) => {
      const response = await page.request.post("/api/checkout", {
        data: { courseSlug: "prompt-engineering" },
      });

      expect(response.status()).toBe(400);
      const json = await response.json();
      expect(json.error).toBeDefined();
    });
  });
});
