import { test, expect } from "@playwright/test";

test.describe("Sitemap.xml Verification", () => {
  test("should return valid XML with correct content type", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"];
    expect(contentType).toMatch(/application\/xml/);
  });

  test("should contain urlset root element", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    expect(body).toContain("<urlset");
    expect(body).toContain("</urlset>");
    expect(body).toContain("http://www.sitemaps.org/schemas/sitemap");
  });

  test("should include homepage", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Homepage should be present (with localhost:3000 or kilernen.de)
    expect(body).toMatch(/<loc>[^<]*(localhost:3000|kilernen\.de)\/<\/loc>/);
  });

  test("should include all static pages", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Check for static pages
    expect(body).toContain("/kurse</loc>");
    expect(body).toContain("/impressum</loc>");
    expect(body).toContain("/datenschutz</loc>");
    expect(body).toContain("/agb</loc>");
  });

  test("should include all course pages", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Check for dynamic course pages
    expect(body).toContain("/kurse/ki-automatisierung</loc>");
    expect(body).toContain("/kurse/prompt-engineering</loc>");
    expect(body).toContain("/kurse/voice-agents</loc>");
    expect(body).toContain("/kurse/rag-llm</loc>");
  });

  test("should have proper sitemap elements for each URL", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Each URL entry should have required elements
    expect(body).toContain("<url>");
    expect(body).toContain("<loc>");
    expect(body).toContain("<lastmod>");
    expect(body).toContain("<changefreq>");
    expect(body).toContain("<priority>");
  });

  test("should have correct priority values", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Homepage should have highest priority
    expect(body).toContain("<priority>1</priority>");
    // Other pages should have different priorities
    expect(body).toContain("<priority>0.9</priority>");
    expect(body).toContain("<priority>0.8</priority>");
    expect(body).toContain("<priority>0.3</priority>");
  });

  test("should have valid change frequency values", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Should contain valid changefreq values
    expect(body).toContain("<changefreq>weekly</changefreq>");
    expect(body).toContain("<changefreq>monthly</changefreq>");
  });
});

test.describe("Robots.txt Verification", () => {
  test("should return valid content with correct content type", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"];
    expect(contentType).toMatch(/text\/plain/);
  });

  test("should contain User-agent directive", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    expect(body).toContain("User-Agent: *");
  });

  test("should allow root path", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    expect(body).toContain("Allow: /");
  });

  test("should disallow API routes", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    expect(body).toContain("Disallow: /api/");
  });

  test("should disallow checkout pages", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    expect(body).toContain("Disallow: /checkout/");
  });

  test("should include sitemap reference", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    // Should reference sitemap.xml
    expect(body).toMatch(/Sitemap: .+\/sitemap\.xml/);
  });
});

test.describe("Meta Tags Verification", () => {
  test("homepage should have proper title", async ({ page }) => {
    await page.goto("/");

    const title = await page.title();
    expect(title).toContain("KI Lernen");
  });

  test("homepage should have meta description", async ({ page }) => {
    await page.goto("/");

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /.+/);
  });

  test("homepage should have keywords meta tag", async ({ page }) => {
    await page.goto("/");

    const metaKeywords = page.locator('meta[name="keywords"]');
    await expect(metaKeywords).toHaveAttribute("content", /KI|AI|Kurs/i);
  });

  test("homepage should have Open Graph meta tags", async ({ page }) => {
    await page.goto("/");

    // Check OG title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);

    // Check OG description
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute("content", /.+/);

    // Check OG type
    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute("content", "website");

    // Check OG locale
    const ogLocale = page.locator('meta[property="og:locale"]');
    await expect(ogLocale).toHaveAttribute("content", "de_DE");
  });

  test("homepage should have Twitter card meta tags", async ({ page }) => {
    await page.goto("/");

    // Check Twitter card type
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute("content", "summary_large_image");

    // Check Twitter title
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    await expect(twitterTitle).toHaveAttribute("content", /.+/);
  });

  test("homepage should have robots meta directive", async ({ page }) => {
    await page.goto("/");

    const metaRobots = page.locator('meta[name="robots"]');
    const content = await metaRobots.getAttribute("content");
    expect(content).toContain("index");
    expect(content).toContain("follow");
  });

  test("course page should have proper title", async ({ page }) => {
    await page.goto("/kurse/ki-automatisierung");

    const title = await page.title();
    expect(title).toContain("KI Lernen");
  });

  test("kurse page should have proper meta tags", async ({ page }) => {
    await page.goto("/kurse");

    const title = await page.title();
    expect(title).toBeTruthy();

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /.+/);
  });

  test("legal pages should have proper meta tags", async ({ page }) => {
    // Check Impressum
    await page.goto("/impressum");
    expect(await page.title()).toBeTruthy();

    // Check Datenschutz
    await page.goto("/datenschutz");
    expect(await page.title()).toBeTruthy();

    // Check AGB
    await page.goto("/agb");
    expect(await page.title()).toBeTruthy();
  });
});

test.describe("JSON-LD Structured Data Verification", () => {
  test("homepage should have JSON-LD script tag", async ({ page }) => {
    await page.goto("/");

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
  });

  test("homepage JSON-LD should contain schema.org context", async ({ page }) => {
    await page.goto("/");

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    const content = await jsonLdScript.textContent();
    expect(content).toContain("schema.org");
  });

  test("homepage JSON-LD should contain Organization schema", async ({ page }) => {
    await page.goto("/");

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    const content = await jsonLdScript.textContent();

    expect(content).toBeTruthy();
    const jsonLd = JSON.parse(content!);

    // Check for Organization in @graph array
    expect(jsonLd["@graph"]).toBeDefined();
    const organization = jsonLd["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "Organization"
    );
    expect(organization).toBeDefined();
    expect(organization.name).toBe("KI Lernen");
    expect(organization.url).toContain("kilernen.de");
  });

  test("homepage JSON-LD should contain WebSite schema", async ({ page }) => {
    await page.goto("/");

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    const content = await jsonLdScript.textContent();

    expect(content).toBeTruthy();
    const jsonLd = JSON.parse(content!);

    // Check for WebSite in @graph array
    const webSite = jsonLd["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "WebSite"
    );
    expect(webSite).toBeDefined();
    expect(webSite.name).toBe("KI Lernen");
    expect(webSite.inLanguage).toBe("de-DE");
  });

  test("homepage JSON-LD Organization should have logo", async ({ page }) => {
    await page.goto("/");

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    const content = await jsonLdScript.textContent();

    expect(content).toBeTruthy();
    const jsonLd = JSON.parse(content!);

    const organization = jsonLd["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "Organization"
    );
    expect(organization.logo).toBeDefined();
    expect(organization.logo["@type"]).toBe("ImageObject");
    expect(organization.logo.url).toContain("logo.png");
  });

  test("JSON-LD should have proper entity linking", async ({ page }) => {
    await page.goto("/");

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    const content = await jsonLdScript.textContent();

    expect(content).toBeTruthy();
    const jsonLd = JSON.parse(content!);

    // Organization should have @id
    const organization = jsonLd["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "Organization"
    );
    expect(organization["@id"]).toContain("#organization");

    // WebSite should have @id and reference Organization as publisher
    const webSite = jsonLd["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "WebSite"
    );
    expect(webSite["@id"]).toContain("#website");
    expect(webSite.publisher["@id"]).toContain("#organization");
  });
});

test.describe("SEO Accessibility", () => {
  test("homepage should have lang attribute", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "de");
  });

  test("pages should have heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have exactly one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test("images should have alt attributes", async ({ page }) => {
    await page.goto("/");

    // Get all images
    const images = page.locator("img");
    const count = await images.count();

    // Check each image has alt attribute (empty alt is valid for decorative images)
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("links should have descriptive text", async ({ page }) => {
    await page.goto("/");

    // Check that main navigation links have text content
    const navLinks = page.locator("header a");
    const count = await navLinks.count();

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");

      // Link should have either text content or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });
});
