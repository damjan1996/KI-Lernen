import { test, expect } from "@playwright/test";

test.describe("Beratung Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/beratung");
  });

  test("should display hero section", async ({ page }) => {
    await expect(page.getByText("Individuelle KI-Beratung")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Transformiere dein Unternehmen/i })
    ).toBeVisible();
    await expect(page.getByText(/Voice Agents.*Prozessautomatisierung/i)).toBeVisible();
  });

  test("should display hero CTA buttons", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Kostenloses Erstgespräch/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Alle Angebote/i })).toBeVisible();
  });

  test("should display Voice Agent section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /KI-Beratung Voice Agent/i })
    ).toBeVisible();
  });

  test("should display Voice Agent product cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Voice Agent Starter" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Voice Agent Pro", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Voice Agent Master" })).toBeVisible();
    await expect(page.getByText("Beliebteste Wahl")).toBeVisible();
  });

  test("should display Agency section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /KI-Agentur Programme/i })
    ).toBeVisible();
  });

  test("should display Agency product cards", async ({ page }) => {
    await expect(page.getByText("KI-Agentur Starter")).toBeVisible();
    await expect(page.getByText("KI-Agentur Kickstart Pro")).toBeVisible();
    await expect(page.getByText("KI-Agentur Master")).toBeVisible();
    await expect(page.getByText("ScaleUp Mastery")).toBeVisible();
  });

  test("should display Enterprise section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /KI-Beratung für Unternehmen/i })
    ).toBeVisible();
  });

  test("should display Enterprise product cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "KI-Audit", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "KI-Pionier Beratung" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /KI-Champion/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /KI-Exzellenz/ })).toBeVisible();
  });

  test("should display implementation modules", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Implementierungsmodule/i })
    ).toBeVisible();
    await expect(page.getByText(/Setup.*Datenmanagement/i)).toBeVisible();
    await expect(page.getByText(/Setup.*Private GPT/i)).toBeVisible();
  });

  test("should display audit CTA section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /KI-Audit/i }).first()
    ).toBeVisible();
  });

  test("should display final CTA section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Bereit für den nächsten Schritt/i })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Über uns erfahren/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Kurse ansehen/i })).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Beratung");
  });
});

test.describe("Beratung Page - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should display hero on mobile", async ({ page }) => {
    await page.goto("/beratung");
    await expect(
      page.getByRole("heading", { name: /Transformiere dein Unternehmen/i })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Kostenloses Erstgespräch/i })).toBeVisible();
  });

  test("should display product cards on mobile", async ({ page }) => {
    await page.goto("/beratung");
    await expect(page.getByRole("heading", { name: "Voice Agent Pro", exact: true })).toBeVisible();
  });
});
