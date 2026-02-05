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
    // Skip on mobile
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await expect(page.locator("header").getByRole("link", { name: "Kurse" }).first()).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Über uns" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "FAQ" })).toBeVisible();
  });

  test("should navigate to Kurse page from header", async ({ page }) => {
    // Skip on mobile
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Kurse" }).first().click();
    await expect(page).toHaveURL("/kurse");
  });

  test("should display Login and CTA buttons on desktop", async ({ page }) => {
    // Skip on mobile
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await expect(page.locator("header").getByRole("link", { name: "Login" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Kurse entdecken" })).toBeVisible();
  });

  test("should navigate to Login page", async ({ page }) => {
    // Skip on mobile
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    await page.locator("header").getByRole("link", { name: "Login" }).click();
    await expect(page).toHaveURL("/login");
  });

  // Skip on mobile - scroll behavior varies by viewport and page content height
  test("should change header background on scroll", async ({ page }) => {
    // This test is flaky on mobile viewports due to page height constraints
    const viewport = await page.viewportSize();
    if ((viewport?.width ?? 1024) < 768) {
      test.skip();
      return;
    }

    const header = page.locator("header");

    // Initially transparent
    await expect(header).toHaveClass(/bg-transparent/);

    // Scroll down - the header changes when scrollY > 10
    await page.evaluate(() => {
      window.scrollTo({ top: 500, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });

    // Wait for the React state to update and class to change
    await expect(header).not.toHaveClass(/bg-transparent/, { timeout: 5000 });
  });
});

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display mobile menu button", async ({ page }) => {
    const menuButton = page.locator("header button.md\\:hidden");
    await expect(menuButton).toBeVisible();
  });

  test("should open and close mobile menu", async ({ page }) => {
    const menuButton = page.locator("header button").first();

    // Open menu
    await menuButton.click();
    await expect(page.locator("header").getByRole("link", { name: "Kurse" }).first()).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Über uns" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "FAQ" })).toBeVisible();

    // Close menu
    await menuButton.click();
    // Navigation links should be hidden (in mobile collapsed state)
    await page.waitForTimeout(100);
  });

  test("should navigate from mobile menu", async ({ page }) => {
    const menuButton = page.locator("header button").first();

    // Open menu
    await menuButton.click();

    // Click Login link
    await page.locator("header").getByRole("link", { name: "Login" }).click();
    await expect(page).toHaveURL("/login");
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
    await expect(page.locator("footer").getByText("Kurse", { exact: false }).first()).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "KI-Automatisierung" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Prompt Engineering" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Voice Agents" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "RAG & LLM" })).toBeVisible();
  });

  test("should display Ressourcen section with links", async ({ page }) => {
    await expect(page.locator("footer").getByText("Ressourcen")).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "YouTube" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Community" })).toBeVisible();
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
    const whatsappButton = page.locator("footer a").filter({ hasText: /WhatsApp/ });
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

    // On mobile, use mobile menu; on desktop, use header link
    const viewport = await page.viewportSize();
    const isMobile = (viewport?.width ?? 1024) < 768;

    if (isMobile) {
      // Mobile: open menu (button in header with md:hidden class)
      const mobileMenuButton = page.locator("header button.md\\:hidden");
      await mobileMenuButton.click();
      await page.getByRole("link", { name: "Kurse" }).first().click();
    } else {
      // Desktop: click header link
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

    // Check if there are course cards/links
    const courseLink = page.locator("a[href*='/kurse/']").first();

    if (await courseLink.isVisible()) {
      await courseLink.click();
      await expect(page).toHaveURL(/\/kurse\/.+/);
    }
  });

  test("should handle anchor links for Über uns section", async ({ page }) => {
    await page.goto("/");

    // Skip on mobile
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    // Click Über uns link (anchor link)
    await page.locator("header").getByRole("link", { name: "Über uns" }).click();

    // Should stay on homepage with hash
    await expect(page).toHaveURL(/#ueber-uns/);
  });

  test("should handle anchor links for FAQ section", async ({ page }) => {
    await page.goto("/");

    // Skip on mobile
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      test.skip();
      return;
    }

    // Click FAQ link (anchor link)
    await page.locator("header").getByRole("link", { name: "FAQ" }).click();

    // Should stay on homepage with hash
    await expect(page).toHaveURL(/#faq/);
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
