import { test, expect } from "@playwright/test";

test.describe("Courses", () => {
  test.describe("Course Listing Page", () => {
    test("displays all courses", async ({ page }) => {
      await page.goto("/kurse");

      // Page should load
      await expect(page.locator("h1")).toBeVisible();

      // Should show the 4 courses
      const courseCards = page.locator('[href^="/kurse/"]').filter({ hasText: /.+/ });
      await expect(courseCards.first()).toBeVisible();
    });

    test("displays available course badge", async ({ page }) => {
      await page.goto("/kurse");

      // KI-Automatisierung should have available badge
      await expect(page.getByText("JETZT VERFÜGBAR")).toBeVisible();
    });

    test("displays coming soon badges", async ({ page }) => {
      await page.goto("/kurse");

      // Multiple courses should have coming soon badges
      const comingSoonBadges = page.getByText("BALD VERFÜGBAR");
      await expect(comingSoonBadges.first()).toBeVisible();
    });

    test("course card navigates to detail page", async ({ page }) => {
      await page.goto("/kurse");

      // Click on KI-Automatisierung course
      const courseLink = page.getByRole("link", { name: /KI-Automatisierung/i }).first();
      await courseLink.click();

      // Should navigate to course detail page
      await expect(page).toHaveURL("/kurse/ki-automatisierung");
    });
  });

  test.describe("Course Detail Page - Available Course", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/kurse/ki-automatisierung");
    });

    test("displays course title and subtitle", async ({ page }) => {
      await expect(page.locator("h1")).toContainText("KI-Automatisierung");
    });

    test("displays course modules", async ({ page }) => {
      // Should show module sections
      await expect(page.getByText("Grundlagen der Automatisierung")).toBeVisible();
      await expect(page.getByText("n8n Masterclass")).toBeVisible();
    });

    test("displays course features", async ({ page }) => {
      // Should show features like lessons count, certificate, etc.
      await expect(page.getByText(/Video-Lektionen/i)).toBeVisible();
      await expect(page.getByText(/Zertifikat/i)).toBeVisible();
    });

    test("displays CTA button", async ({ page }) => {
      // Should have a CTA to start the course
      const ctaButton = page.getByRole("link", { name: /starten|kaufen|buchen/i }).first();
      await expect(ctaButton).toBeVisible();
    });

    test("displays price", async ({ page }) => {
      // Should show the price
      await expect(page.getByText(/997/)).toBeVisible();
    });

    test("displays instructor information", async ({ page }) => {
      await expect(page.getByText("KI Lernen Team")).toBeVisible();
    });

    test("displays testimonials", async ({ page }) => {
      // Should show testimonial names
      await expect(page.getByText("Michael S.")).toBeVisible();
    });

    test("displays FAQ section", async ({ page }) => {
      await expect(page.getByText("Brauche ich Programmierkenntnisse?")).toBeVisible();
    });
  });

  test.describe("Course Detail Page - Coming Soon Course", () => {
    test("displays coming soon status for prompt engineering", async ({ page }) => {
      await page.goto("/kurse/prompt-engineering");

      await expect(page.locator("h1")).toContainText("Prompt Engineering");
      await expect(page.getByText("BALD VERFÜGBAR")).toBeVisible();
    });

    test("displays coming soon status for voice agents", async ({ page }) => {
      await page.goto("/kurse/voice-agents");

      await expect(page.locator("h1")).toContainText("Voice Agent");
      await expect(page.getByText("BALD VERFÜGBAR")).toBeVisible();
    });

    test("displays coming soon status for RAG/LLM", async ({ page }) => {
      await page.goto("/kurse/rag-llm");

      await expect(page.locator("h1")).toContainText("RAG");
      await expect(page.getByText("BALD VERFÜGBAR")).toBeVisible();
    });
  });

  test.describe("Course Discovery from Homepage", () => {
    test("homepage shows course section", async ({ page }) => {
      await page.goto("/");

      // Should have courses section or course cards on homepage
      const courseSection = page.locator("section").filter({ hasText: /Kurs/i });
      await expect(courseSection.first()).toBeVisible();
    });

    test("can navigate from homepage to courses", async ({ page }) => {
      await page.goto("/");

      // Click a link to courses
      const coursesLink = page.getByRole("link", { name: /Kurse/i }).first();
      await coursesLink.click();

      // Should be on courses page
      await expect(page).toHaveURL(/\/kurse/);
    });
  });

  test.describe("404 Handling", () => {
    test("non-existent course shows 404", async ({ page }) => {
      const response = await page.goto("/kurse/non-existent-course");

      // Should return 404 or show not found content
      expect(response?.status()).toBe(404);
    });
  });
});
