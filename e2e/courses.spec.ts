import { test, expect } from "@playwright/test";

test.describe("Courses Listing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kurse");
  });

  test("should display page title and description", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Wähle deinen/i })).toBeVisible();
    await expect(page.getByText("Zertifizierte Online-Kurse")).toBeVisible();
    await expect(page.getByText(/praxisnahen Kurse/i)).toBeVisible();
  });

  test("should display available courses section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Jetzt verfügbar" })).toBeVisible();
  });

  test("should display available course cards with details", async ({ page }) => {
    // Check KI-Automatisierung course (available course)
    await expect(page.getByText("KI-Automatisierung Masterclass").first()).toBeVisible();

    // Course should display price
    await expect(page.getByText("€997").first()).toBeVisible();

    // Course should have link to detail page
    const courseLink = page.locator("a[href='/kurse/ki-automatisierung']");
    await expect(courseLink.first()).toBeVisible();
  });

  test("should display course features", async ({ page }) => {
    // Features shown in available course card (first 5 features)
    await expect(page.getByText("Offizielles Zertifikat").first()).toBeVisible();
  });

  test("should display coming soon courses section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Bald verfügbar" })).toBeVisible();
  });

  test("should display coming soon course cards", async ({ page }) => {
    await expect(page.getByText("Prompt Engineering Pro")).toBeVisible();
    await expect(page.getByText("Voice Agent Development")).toBeVisible();
    await expect(page.getByText("RAG & LLM Implementierung")).toBeVisible();
  });

  test("should display disabled button for coming soon courses", async ({ page }) => {
    const comingSoonButtons = page.getByRole("button", { name: "Bald verfügbar" });
    const buttonCount = await comingSoonButtons.count();
    expect(buttonCount).toBeGreaterThan(0);

    await expect(comingSoonButtons.first()).toBeDisabled();
  });

  test("should navigate to course detail page when clicking course link", async ({ page }) => {
    const courseLink = page.getByRole("link", { name: /Zum Kurs/i }).first();
    await courseLink.click();
    await expect(page).toHaveURL(/\/kurse\/.+/);
  });

  test("should display newsletter section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Kein Kurs verpassen" })).toBeVisible();
    await expect(page.getByPlaceholder("Deine E-Mail-Adresse")).toBeVisible();
    await expect(page.getByRole("button", { name: "Anmelden" })).toBeVisible();
  });
});

test.describe("Course Detail Page - Available Course", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kurse/ki-automatisierung");
  });

  test("should display course title and badge", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "KI-Automatisierung Masterclass" })).toBeVisible();
    await expect(page.getByText("JETZT VERFÜGBAR")).toBeVisible();
  });

  test("should display course subtitle and description", async ({ page }) => {
    await expect(page.getByText("Transformiere Unternehmen mit intelligenter Automatisierung")).toBeVisible();
    await expect(page.getByText(/n8n, Make und Claude AI/)).toBeVisible();
  });

  test("should display course metadata", async ({ page }) => {
    await expect(page.getByText(/12\+ Stunden/)).toBeVisible();
    await expect(page.getByText(/30 Lektionen/)).toBeVisible();
  });

  test("should display price and CTA button", async ({ page }) => {
    await expect(page.getByText("€997").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Jetzt für €997 kaufen/i }).first()).toBeVisible();
    await expect(page.getByText("14-Tage Geld-zurück-Garantie").first()).toBeVisible();
  });

  test("should display course features list", async ({ page }) => {
    await expect(page.getByText("30+ Video-Lektionen")).toBeVisible();
    await expect(page.getByText("Praxis-Projekte zum Mitmachen")).toBeVisible();
    await expect(page.getByText("Vorlagen & Templates").first()).toBeVisible();
    await expect(page.getByText("Community-Zugang").first()).toBeVisible();
    await expect(page.getByText("Offizielles Zertifikat", { exact: true }).first()).toBeVisible();
  });

  test("should display course description section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Über diesen Kurs" })).toBeVisible();
    await expect(page.getByText(/umfassenden Masterclass/)).toBeVisible();
  });

  test("should display course modules/content", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Kursinhalt" })).toBeVisible();
    await expect(page.getByText("Grundlagen der Automatisierung")).toBeVisible();
    await expect(page.getByText("n8n Masterclass")).toBeVisible();
    await expect(page.getByText(/Make.*Deep Dive/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "KI-Integration" })).toBeVisible();
    await expect(page.getByText(/Kundengewinnung/)).toBeVisible();
  });

  test("should display module lessons", async ({ page }) => {
    await expect(page.getByText("Einführung in die KI-Automatisierung")).toBeVisible();
    await expect(page.getByText("n8n Installation und Setup")).toBeVisible();
  });

  test("should display benefits section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Das bekommst du" })).toBeVisible();
    await expect(page.getByText("Lebenslanger Zugang").first()).toBeVisible();
    await expect(page.getByText("Kostenlose Updates").first()).toBeVisible();
  });

  test("should display testimonials section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Das sagen unsere Teilnehmer" })).toBeVisible();
    await expect(page.getByText("Michael S.")).toBeVisible();
    await expect(page.getByText("Sarah K.")).toBeVisible();
    await expect(page.getByText("Thomas B.")).toBeVisible();
  });

  test("should display FAQ section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Häufig gestellte Fragen" })).toBeVisible();
    await expect(page.getByText("Brauche ich Programmierkenntnisse?")).toBeVisible();
    await expect(page.getByText("Wie lange habe ich Zugang zum Kurs?")).toBeVisible();
    await expect(page.getByText("Gibt es eine Geld-zurück-Garantie?")).toBeVisible();
    await expect(page.getByText("Erhalte ich ein Zertifikat?")).toBeVisible();
    await expect(page.getByText("Kann ich Fragen stellen?")).toBeVisible();
  });

  test("should display final CTA section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Bereit durchzustarten?" })).toBeVisible();
    await expect(page.getByText(/Sichere dir jetzt deinen Zugang/)).toBeVisible();
  });

  test("should have checkout link", async ({ page }) => {
    const checkoutLink = page.locator("a[href='/checkout/ki-automatisierung']").first();
    await expect(checkoutLink).toBeVisible();
  });
});

test.describe("Course Detail Page - Coming Soon Course", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kurse/prompt-engineering");
  });

  test("should display course title and coming soon badge", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Prompt Engineering Pro" })).toBeVisible();
    await expect(page.getByText("BALD VERFÜGBAR").first()).toBeVisible();
  });

  test("should display course description", async ({ page }) => {
    await expect(page.getByText("Meistere die Kunst der KI-Kommunikation")).toBeVisible();
  });

  test("should display disabled CTA button", async ({ page }) => {
    const comingSoonButton = page.getByRole("button", { name: "Bald verfügbar" });
    await expect(comingSoonButton).toBeVisible();
    await expect(comingSoonButton).toBeDisabled();
  });

  test("should not display price or checkout link", async ({ page }) => {
    const checkoutLink = page.locator("a[href='/checkout/prompt-engineering']");
    await expect(checkoutLink).toHaveCount(0);
  });

  test("should display course features", async ({ page }) => {
    await expect(page.getByText("Fortgeschrittene Techniken")).toBeVisible();
    await expect(page.getByText("System Prompts meistern")).toBeVisible();
    await expect(page.getByText("Chain-of-Thought Prompting")).toBeVisible();
  });
});

test.describe("Course Page - 404 Handling", () => {
  test("should show 404 for non-existent course", async ({ page }) => {
    const response = await page.goto("/kurse/non-existent-course");

    expect(response?.status()).toBe(404);
  });
});

test.describe("Course Navigation Flow", () => {
  test("should navigate from listing to detail and back", async ({ page }) => {
    await page.goto("/kurse");

    await page.getByRole("link", { name: /Zum Kurs/i }).first().click();
    await expect(page).toHaveURL("/kurse/ki-automatisierung");

    await page.locator("header").getByRole("link", { name: "Kurse" }).first().click();
    await expect(page).toHaveURL("/kurse");
  });

  test("should navigate between different course pages", async ({ page }) => {
    await page.goto("/kurse/ki-automatisierung");
    await expect(page.getByRole("heading", { name: "KI-Automatisierung Masterclass" })).toBeVisible();

    await page.goto("/kurse");

    await page.goto("/kurse/prompt-engineering");
    await expect(page.getByRole("heading", { name: "Prompt Engineering Pro" })).toBeVisible();
  });
});

test.describe("Responsive Course Display", () => {
  test.describe("Mobile View", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("should display courses in single column on mobile", async ({ page }) => {
      await page.goto("/kurse");

      await expect(page.getByRole("heading", { name: /Wähle deinen/i })).toBeVisible();
      await expect(page.getByText("KI-Automatisierung Masterclass")).toBeVisible();
    });

    test("should display course detail page on mobile", async ({ page }) => {
      await page.goto("/kurse/ki-automatisierung");

      await expect(page.getByRole("heading", { name: "KI-Automatisierung Masterclass" })).toBeVisible();
      await expect(page.getByText("€997").first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Jetzt für €997 kaufen/i }).first()).toBeVisible();
    });
  });

  test.describe("Tablet View", () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test("should display courses listing on tablet", async ({ page }) => {
      await page.goto("/kurse");

      await expect(page.getByRole("heading", { name: /Wähle deinen/i })).toBeVisible();
      await expect(page.getByText("KI-Automatisierung Masterclass")).toBeVisible();
    });
  });
});
