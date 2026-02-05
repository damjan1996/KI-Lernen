import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test.describe("Sitemap", () => {
    test("sitemap.xml is accessible", async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      expect(response?.status()).toBe(200);
    });

    test("sitemap contains valid XML structure", async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      const content = await response?.text();

      // Should be valid XML with urlset
      expect(content).toContain('<?xml');
      expect(content).toContain('<urlset');
      expect(content).toContain('</urlset>');
    });

    test("sitemap includes homepage", async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      const content = await response?.text();

      expect(content).toContain('<loc>');
      // Should include the base URL (homepage)
      expect(content).toMatch(/kilernen\.de\/?<\/loc>/);
    });

    test("sitemap includes course pages", async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      const content = await response?.text();

      // Should include course URLs
      expect(content).toContain("/kurse/ki-automatisierung");
      expect(content).toContain("/kurse/prompt-engineering");
      expect(content).toContain("/kurse/voice-agents");
      expect(content).toContain("/kurse/rag-llm");
    });

    test("sitemap includes legal pages", async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      const content = await response?.text();

      expect(content).toContain("/impressum");
      expect(content).toContain("/datenschutz");
      expect(content).toContain("/agb");
    });

    test("sitemap includes kurse listing page", async ({ page }) => {
      const response = await page.goto("/sitemap.xml");
      const content = await response?.text();

      // Should have /kurse as a page
      expect(content).toMatch(/\/kurse<\/loc>/);
    });
  });

  test.describe("Robots.txt", () => {
    test("robots.txt is accessible", async ({ page }) => {
      const response = await page.goto("/robots.txt");
      expect(response?.status()).toBe(200);
    });

    test("robots.txt allows crawling", async ({ page }) => {
      const response = await page.goto("/robots.txt");
      const content = await response?.text();

      expect(content).toContain("User-agent: *");
      expect(content).toContain("Allow: /");
    });

    test("robots.txt disallows API routes", async ({ page }) => {
      const response = await page.goto("/robots.txt");
      const content = await response?.text();

      expect(content).toContain("Disallow: /api/");
    });

    test("robots.txt disallows checkout routes", async ({ page }) => {
      const response = await page.goto("/robots.txt");
      const content = await response?.text();

      expect(content).toContain("Disallow: /checkout/");
    });

    test("robots.txt references sitemap", async ({ page }) => {
      const response = await page.goto("/robots.txt");
      const content = await response?.text();

      expect(content).toContain("Sitemap:");
      expect(content).toContain("/sitemap.xml");
    });
  });

  test.describe("Meta Tags - Homepage", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("has title tag", async ({ page }) => {
      const title = await page.title();
      expect(title).toContain("KI Lernen");
    });

    test("has meta description", async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);
    });

    test("has meta keywords", async ({ page }) => {
      const keywords = await page.locator('meta[name="keywords"]').getAttribute("content");
      expect(keywords).toBeTruthy();
      expect(keywords).toContain("KI");
    });

    test("has Open Graph tags", async ({ page }) => {
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute("content");
      const ogType = await page.locator('meta[property="og:type"]').getAttribute("content");
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogType).toBe("website");
      expect(ogUrl).toContain("kilernen.de");
    });

    test("has Twitter Card tags", async ({ page }) => {
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute("content");
      const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute("content");

      expect(twitterCard).toBe("summary_large_image");
      expect(twitterTitle).toBeTruthy();
    });

    test("has proper lang attribute", async ({ page }) => {
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe("de");
    });
  });

  test.describe("JSON-LD Structured Data", () => {
    test("homepage has JSON-LD script", async ({ page }) => {
      await page.goto("/");

      const jsonLdScript = page.locator('script[type="application/ld+json"]');
      await expect(jsonLdScript).toBeAttached();
    });

    test("JSON-LD contains Organization schema", async ({ page }) => {
      await page.goto("/");

      const jsonLdContent = await page.locator('script[type="application/ld+json"]').textContent();
      const jsonLd = JSON.parse(jsonLdContent || "{}");

      // Should have @graph array with Organization
      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@graph"]).toBeDefined();

      const organization = jsonLd["@graph"].find((item: { "@type": string }) => item["@type"] === "Organization");
      expect(organization).toBeDefined();
      expect(organization.name).toBe("KI Lernen");
    });

    test("JSON-LD contains WebSite schema", async ({ page }) => {
      await page.goto("/");

      const jsonLdContent = await page.locator('script[type="application/ld+json"]').textContent();
      const jsonLd = JSON.parse(jsonLdContent || "{}");

      const website = jsonLd["@graph"].find((item: { "@type": string }) => item["@type"] === "WebSite");
      expect(website).toBeDefined();
      expect(website.name).toBe("KI Lernen");
    });
  });

  test.describe("Page-specific Meta", () => {
    test("courses page has appropriate title", async ({ page }) => {
      await page.goto("/kurse");

      const title = await page.title();
      expect(title).toContain("Kurs");
    });

    test("course detail page has course-specific title", async ({ page }) => {
      await page.goto("/kurse/ki-automatisierung");

      const title = await page.title();
      expect(title).toContain("KI-Automatisierung");
    });

    test("legal pages have appropriate titles", async ({ page }) => {
      await page.goto("/impressum");
      let title = await page.title();
      expect(title).toContain("Impressum");

      await page.goto("/datenschutz");
      title = await page.title();
      expect(title).toContain("Datenschutz");

      await page.goto("/agb");
      title = await page.title();
      expect(title).toContain("AGB");
    });
  });

  test.describe("Technical SEO", () => {
    test("pages return 200 status code", async ({ page }) => {
      const pages = ["/", "/kurse", "/kurse/ki-automatisierung", "/impressum", "/datenschutz", "/agb"];

      for (const url of pages) {
        const response = await page.goto(url);
        expect(response?.status(), `Page ${url} should return 200`).toBe(200);
      }
    });

    test("no horizontal overflow on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");

      // Check if body width matches viewport (no horizontal scroll)
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = 375;

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // Allow 1px tolerance
    });

    test("images have alt attributes", async ({ page }) => {
      await page.goto("/");

      const imagesWithoutAlt = await page.locator("img:not([alt])").count();
      expect(imagesWithoutAlt).toBe(0);
    });
  });
});
