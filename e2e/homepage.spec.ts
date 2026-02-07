import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display hero section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Lernplattform/i })
    ).toBeVisible();
    await expect(page.getByText(/KI-Skills der Zukunft/)).toBeVisible();
  });

  test("should display hero CTA buttons", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Kurse entdecken/i }).first()
    ).toBeVisible();
  });

  test("should display features section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Umfassende Kursinhalte" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Praxisnahes Wissen" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Zertifizierte Abschlüsse" })).toBeVisible();
  });

  test("should display course preview section", async ({ page }) => {
    await expect(page.getByText("KI-Automatisierung Masterclass").first()).toBeVisible();
  });

  test("should return 200 status code", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("should have proper title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("KI Lernen");
  });

  test("should display header", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Homepage - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should display hero on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Lernplattform/i })
    ).toBeVisible();
  });

  test("should display header on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    const menuButton = page.locator("header button[aria-label]");
    await expect(menuButton).toBeVisible();
  });
});
