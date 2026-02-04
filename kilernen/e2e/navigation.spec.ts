import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.describe("Header", () => {
    test("displays logo and navigates to home when clicked", async ({ page }) => {
      await page.goto("/kurse");

      // Logo should be visible
      const logo = page.locator("header a").first();
      await expect(logo).toContainText("KILernen");

      // Click logo should navigate to home
      await logo.click();
      await expect(page).toHaveURL("/");
    });

    test("shows desktop navigation links", async ({ page }) => {
      await page.goto("/");

      // Desktop nav should have Kurse link
      const kurseLink = page.locator("header").getByRole("link", { name: "Kurse" }).first();
      await expect(kurseLink).toBeVisible();

      // Click should navigate to courses page
      await kurseLink.click();
      await expect(page).toHaveURL("/kurse");
    });

    test("shows CTA buttons on desktop", async ({ page }) => {
      await page.goto("/");

      // Login button
      const loginButton = page.locator("header").getByRole("link", { name: "Login" });
      await expect(loginButton).toBeVisible();

      // Kurse entdecken button
      const ctaButton = page.locator("header").getByRole("link", { name: "Kurse entdecken" });
      await expect(ctaButton).toBeVisible();
    });
  });

  test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("opens and closes mobile menu", async ({ page }) => {
      await page.goto("/");

      // Mobile menu button should be visible
      const menuButton = page.locator("header button");
      await expect(menuButton).toBeVisible();

      // Click to open menu
      await menuButton.click();

      // Mobile menu links should be visible
      const mobileKurseLink = page.locator("header nav").getByRole("link", { name: "Kurse" }).first();
      await expect(mobileKurseLink).toBeVisible();

      // Click to close menu
      await menuButton.click();
    });

    test("mobile menu links navigate correctly", async ({ page }) => {
      await page.goto("/");

      // Open mobile menu
      const menuButton = page.locator("header button");
      await menuButton.click();

      // Click Kurse link
      const kurseLink = page.locator("header nav").getByRole("link", { name: "Kurse" }).first();
      await kurseLink.click();

      // Should navigate to courses page
      await expect(page).toHaveURL("/kurse");
    });
  });

  test.describe("Footer", () => {
    test("displays footer sections", async ({ page }) => {
      await page.goto("/");

      // Footer should exist
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();

      // Should have section headings
      await expect(footer.getByText("Kurse")).toBeVisible();
      await expect(footer.getByText("Ressourcen")).toBeVisible();
      await expect(footer.getByText("Rechtliches")).toBeVisible();
    });

    test("legal links navigate correctly", async ({ page }) => {
      await page.goto("/");

      // Click Impressum link in footer
      const impressumLink = page.locator("footer").getByRole("link", { name: "Impressum" }).first();
      await impressumLink.click();
      await expect(page).toHaveURL("/impressum");

      // Navigate back and click Datenschutz
      await page.goto("/");
      const datenschutzLink = page.locator("footer").getByRole("link", { name: "Datenschutz" }).first();
      await datenschutzLink.click();
      await expect(page).toHaveURL("/datenschutz");

      // Navigate back and click AGB
      await page.goto("/");
      const agbLink = page.locator("footer").getByRole("link", { name: "AGB" });
      await agbLink.click();
      await expect(page).toHaveURL("/agb");
    });

    test("displays copyright notice", async ({ page }) => {
      await page.goto("/");

      const currentYear = new Date().getFullYear();
      await expect(page.locator("footer")).toContainText(`© ${currentYear} KI Lernen`);
    });
  });

  test.describe("Page Navigation", () => {
    test("homepage loads without errors", async ({ page }) => {
      const response = await page.goto("/");
      expect(response?.status()).toBe(200);

      // Hero section should be visible
      await expect(page.locator("h1")).toBeVisible();
    });

    test("courses page loads without errors", async ({ page }) => {
      const response = await page.goto("/kurse");
      expect(response?.status()).toBe(200);

      // Page title should indicate courses
      await expect(page.locator("h1")).toContainText(/Kurs/i);
    });

    test("legal pages load without errors", async ({ page }) => {
      // Impressum
      let response = await page.goto("/impressum");
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();

      // Datenschutz
      response = await page.goto("/datenschutz");
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();

      // AGB
      response = await page.goto("/agb");
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    });

    test("login page loads without errors", async ({ page }) => {
      const response = await page.goto("/login");
      expect(response?.status()).toBe(200);
    });
  });
});
