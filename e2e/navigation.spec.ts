import { test, expect } from "@playwright/test";

test.describe("Header Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display logo linking to homepage", async ({ page }) => {
    const logo = page.locator("header a").filter({ hasText: "KILernen" });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("should display desktop navigation links", async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await expect(page.locator("header").getByRole("link", { name: "Kurse" }).first()).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Beratung" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Über uns" })).toBeVisible();
  });

  test("should navigate to Kurse page from header", async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Kurse" }).first().click();
    await expect(page).toHaveURL("/kurse");
  });

  test("should navigate to Beratung page from header", async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Beratung" }).click();
    await expect(page).toHaveURL("/beratung");
  });

  test("should navigate to Über uns page from header", async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Über uns" }).click();
    await expect(page).toHaveURL("/ueber-uns");
  });

  test("should display Login and CTA buttons on desktop", async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await expect(page.locator("header").getByRole("link", { name: "Login" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Kurse entdecken" })).toBeVisible();
  });

  test("should navigate to Login page", async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Login" }).click();
    await expect(page).toHaveURL("/login");
  });

  test("should change header background on scroll", async ({ page }) => {
    const viewport = await page.viewportSize();
    if ((viewport?.width ?? 1024) < 768) {
      test.skip();
      return;
    }

    const header = page.locator("header");

    // Initially transparent
    await expect(header).toHaveClass(/bg-transparent/);

    // Scroll down using mouse wheel for reliable scroll event
    await page.mouse.wheel(0, 500);

    // Wait for scroll position to update and React state to respond
    await page.waitForFunction(() => window.scrollY > 10, null, { timeout: 10000 });

    // Wait for the React state to update
    await expect(header).not.toHaveClass(/bg-transparent/, { timeout: 10000 });
  });
});

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display mobile menu button", async ({ page }) => {
    const menuButton = page.locator('header button[aria-label]');
    await expect(menuButton).toBeVisible();
  });

  test("should open and close mobile menu", async ({ page }) => {
    const menuButton = page.locator('header button[aria-label]');

    // Open menu
    await menuButton.click();
    await expect(page.locator("header").getByRole("link", { name: "Kurse" }).first()).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Beratung" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Über uns" })).toBeVisible();

    // Close menu
    await menuButton.click();
    await page.waitForTimeout(400); // Wait for animation
  });

  test("should navigate from mobile menu", async ({ page }) => {
    const menuButton = page.locator('header button[aria-label]');

    // Open menu
    await menuButton.click();

    // Click Kurse link
    await page.locator("header").getByRole("link", { name: "Kurse" }).first().click();
    await expect(page).toHaveURL("/kurse");
  });

  test("should show Login button in mobile menu", async ({ page }) => {
    const menuButton = page.locator('header button[aria-label]');
    await menuButton.click();

    await expect(page.locator("header").getByRole("link", { name: "Login" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Kurse entdecken" })).toBeVisible();
  });
});

test.describe("Footer Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
  });

  test("should display footer logo linking to homepage", async ({ page }) => {
    const footerLogo = page.locator("footer a").filter({ hasText: "KILernen" });
    await expect(footerLogo).toBeVisible();
    await expect(footerLogo).toHaveAttribute("href", "/");
  });

  test("should display Kurse section with links", async ({ page }) => {
    await expect(page.locator("footer").getByText("Kurse", { exact: true }).first()).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "KI-Automatisierung" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Prompt Engineering" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Voice Agents" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "RAG & LLM" })).toBeVisible();
  });

  test("should display Unternehmen section with links", async ({ page }) => {
    await expect(page.locator("footer").getByText("Unternehmen")).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Über uns" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Beratung" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "YouTube" })).toBeVisible();
  });

  test("should display Rechtliches section with links", async ({ page }) => {
    await expect(page.locator("footer").getByText("Rechtliches")).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Impressum" }).first()).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Datenschutz" }).first()).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "AGB" })).toBeVisible();
  });

  test("should navigate to Impressum page", async ({ page }) => {
    await page.locator("footer").getByRole("link", { name: "Impressum" }).first().click();
    await expect(page).toHaveURL("/impressum");
  });

  test("should navigate to Datenschutz page", async ({ page }) => {
    await page.locator("footer").getByRole("link", { name: "Datenschutz" }).first().click();
    await expect(page).toHaveURL("/datenschutz");
  });

  test("should navigate to AGB page", async ({ page }) => {
    await page.locator("footer").getByRole("link", { name: "AGB" }).click();
    await expect(page).toHaveURL("/agb");
  });

  test("should have WhatsApp contact button", async ({ page }) => {
    const whatsappButton = page.locator("a").filter({ hasText: /WhatsApp/ });
    await expect(whatsappButton).toBeVisible();
    await expect(whatsappButton).toHaveAttribute("href", /wa\.me/);
    await expect(whatsappButton).toHaveAttribute("target", "_blank");
  });

  test("should display copyright notice", async ({ page }) => {
    const currentYear = new Date().getFullYear().toString();
    await expect(page.locator("footer").getByText(new RegExp(`© ${currentYear} KI Lernen`))).toBeVisible();
  });
});

test.describe("Page Navigation Flow", () => {
  test("should navigate from homepage to kurse and back", async ({ page }) => {
    await page.goto("/");

    const viewport = await page.viewportSize();
    const isMobile = (viewport?.width ?? 1024) < 768;

    if (isMobile) {
      const mobileMenuButton = page.locator('header button[aria-label]');
      await mobileMenuButton.click();
      await page.locator("header").getByRole("link", { name: "Kurse" }).first().click();
    } else {
      await page.locator("header").getByRole("link", { name: "Kurse entdecken" }).click();
    }
    await expect(page).toHaveURL("/kurse");

    // Navigate back to homepage via logo
    await page.locator("header a").filter({ hasText: "KILernen" }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("should navigate to legal pages from footer", async ({ page }) => {
    await page.goto("/");

    // Scroll footer into view and wait for it
    const footerImpressum = page.locator("footer").getByRole("link", { name: "Impressum" }).first();
    await footerImpressum.scrollIntoViewIfNeeded();
    await footerImpressum.click({ force: true });
    await expect(page).toHaveURL("/impressum");

    // Scroll to footer on Impressum page
    const footerDatenschutz = page.locator("footer").getByRole("link", { name: "Datenschutz" }).first();
    await footerDatenschutz.scrollIntoViewIfNeeded();
    await footerDatenschutz.click({ force: true });
    await expect(page).toHaveURL("/datenschutz");
  });

  test("should navigate to course detail page", async ({ page }) => {
    await page.goto("/kurse");

    const courseLink = page.getByRole("link", { name: /Zum Kurs/i }).first();
    await expect(courseLink).toBeVisible({ timeout: 10000 });
    await courseLink.click();
    await expect(page).toHaveURL(/\/kurse\/.+/);
  });

  test("should navigate to Über uns page", async ({ page }) => {
    await page.goto("/");

    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Über uns" }).click();
    await expect(page).toHaveURL("/ueber-uns");
  });

  test("should navigate to Beratung page", async ({ page }) => {
    await page.goto("/");

    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Beratung" }).click();
    await expect(page).toHaveURL("/beratung");
  });
});

test.describe("External Links", () => {
  test("should have YouTube link open in new tab", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const youtubeLink = page.locator("footer").getByRole("link", { name: "YouTube" });
    await expect(youtubeLink).toHaveAttribute("target", "_blank");
    await expect(youtubeLink).toHaveAttribute("rel", /noopener/);
    await expect(youtubeLink).toHaveAttribute("href", /youtube\.com/);
  });
});
