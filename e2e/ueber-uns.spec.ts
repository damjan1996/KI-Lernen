import { test, expect } from "@playwright/test";

test.describe("Über uns Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ueber-uns");
  });

  test("should display hero section", async ({ page }) => {
    await expect(page.getByText("Everlast Consulting GmbH")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Speerspitze.*KI-Bewegung/i })
    ).toBeVisible();
    await expect(page.getByText(/Mittelstand.*zugänglich/i)).toBeVisible();
  });

  test("should display hero CTA buttons", async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }
    await expect(page.getByRole("link", { name: /Beratung anfragen/i }).first()).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: /Kurse entdecken/i })).toBeVisible();
  });

  test("should display statistics", async ({ page }) => {
    await expect(page.getByText("2020").first()).toBeVisible();
    await expect(page.getByText("30+").first()).toBeVisible();
    await expect(page.getByText("500+").first()).toBeVisible();
    await expect(page.getByText("#1").first()).toBeVisible();
    await expect(page.getByText("Gegründet").first()).toBeVisible();
    await expect(page.getByText("Mitarbeiter").first()).toBeVisible();
    await expect(page.getByText("Kursteilnehmer", { exact: true })).toBeVisible();
  });

  test("should display mission section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Unsere Mission/i })
    ).toBeVisible();
    await expect(page.getByText(/Mittelstand.*wettbewerbsfähig/i)).toBeVisible();
  });

  test("should display vision section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Unsere Vision/i })
    ).toBeVisible();
    await expect(page.getByText(/europäische.*Unternehmensberatung/i)).toBeVisible();
  });

  test("should display founders section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Gründer/i })
    ).toBeVisible();
    await expect(page.getByText("Leonard Schmedding")).toBeVisible();
    await expect(page.getByText("Marvin Schienbein")).toBeVisible();
  });

  test("should display values section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Unsere Werte/i })
    ).toBeVisible();
    await expect(page.getByText("Transparenz")).toBeVisible();
    await expect(page.getByText("Praxisorientierung")).toBeVisible();
    await expect(page.getByText("Leadership")).toBeVisible();
    await expect(page.getByText("Qualität vor Quantität")).toBeVisible();
    await expect(page.getByText("Datenschutz & Sicherheit")).toBeVisible();
    await expect(page.getByText("Nachhaltigkeit")).toBeVisible();
  });

  test("should display unique selling points", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Warum Everlast/i })
    ).toBeVisible();
    await expect(page.getByText(/YouTube-Kanal/).first()).toBeVisible();
    await expect(page.getByText(/Marktführer/).first()).toBeVisible();
    await expect(page.getByText(/KI-Netzwerk/).first()).toBeVisible();
  });

  test("should display YouTube section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /YouTube/i })
    ).toBeVisible();
    const youtubeLink = page.getByRole("link", { name: /Kanal abonnieren/i });
    await expect(youtubeLink).toBeVisible();
    await expect(youtubeLink).toHaveAttribute("href", /youtube\.com/);
    await expect(youtubeLink).toHaveAttribute("target", "_blank");
  });

  test("should display final CTA section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /KI-Transformation/i })
    ).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Über uns");
  });

  test("should display company information", async ({ page }) => {
    await expect(page.getByText("Gesellschaft mit beschränkter Haftung")).toBeVisible();
    await expect(page.getByText("Ulm, Deutschland")).toBeVisible();
  });
});

test.describe("Über uns Page - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should display hero on mobile", async ({ page }) => {
    await page.goto("/ueber-uns");
    await expect(
      page.getByRole("heading", { name: /Speerspitze.*KI-Bewegung/i })
    ).toBeVisible();
  });

  test("should display founders on mobile", async ({ page }) => {
    await page.goto("/ueber-uns");
    await expect(page.getByText("Leonard Schmedding")).toBeVisible();
    await expect(page.getByText("Marvin Schienbein")).toBeVisible();
  });

  test("should display statistics on mobile", async ({ page }) => {
    await page.goto("/ueber-uns");
    await expect(page.getByText("2020").first()).toBeVisible();
    await expect(page.getByText("30+").first()).toBeVisible();
  });
});
