import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Willkommen zurück" })
    ).toBeVisible();
    await expect(page.getByText("Melde dich an, um auf deine Kurse zuzugreifen")).toBeVisible();
  });

  test("should display KI Lernen logo linking to homepage", async ({ page }) => {
    const logo = page.locator("a").filter({ hasText: "KILernen" }).first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("should display email input field", async ({ page }) => {
    const emailInput = page.getByPlaceholder("deine@email.de");
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(emailInput).toHaveAttribute("required", "");
  });

  test("should display password input field", async ({ page }) => {
    const passwordInput = page.getByPlaceholder("••••••••");
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(passwordInput).toHaveAttribute("required", "");
  });

  test("should toggle password visibility", async ({ page }) => {
    const passwordInput = page.getByPlaceholder("••••••••");
    // The toggle button is a type="button" sibling of the password input within its relative container
    const toggleButton = page.locator("button[type='button']").filter({ hasNot: page.locator("text=Anmelden") }).first();

    // Initially password type
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Click toggle
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Click again
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should display remember me checkbox", async ({ page }) => {
    await expect(page.getByText("Angemeldet bleiben")).toBeVisible();
    const checkbox = page.locator("input[type='checkbox']");
    await expect(checkbox).toBeVisible();
  });

  test("should display forgot password link", async ({ page }) => {
    const forgotLink = page.getByRole("link", { name: "Passwort vergessen?" });
    await expect(forgotLink).toBeVisible();
    await expect(forgotLink).toHaveAttribute("href", "/passwort-vergessen");
  });

  test("should display submit button", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /Anmelden/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test("should display register link", async ({ page }) => {
    await expect(page.getByText("Noch kein Konto?")).toBeVisible();
    const registerLink = page.getByRole("link", { name: "Kurs kaufen" });
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveAttribute("href", "/kurse");
  });

  test("should display legal links", async ({ page }) => {
    await expect(page.getByText(/Anmeldung akzeptierst du/)).toBeVisible();
    await expect(page.getByRole("link", { name: "AGB" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Datenschutzbestimmungen" }).first()).toBeVisible();
  });

  test("should allow filling in form fields", async ({ page }) => {
    await page.getByPlaceholder("deine@email.de").fill("test@example.com");
    await page.getByPlaceholder("••••••••").fill("password123");

    await expect(page.getByPlaceholder("deine@email.de")).toHaveValue("test@example.com");
    await expect(page.getByPlaceholder("••••••••")).toHaveValue("password123");
  });
});

test.describe("Login Page - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should display login form on mobile", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "Willkommen zurück" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("deine@email.de")).toBeVisible();
    await expect(page.getByRole("button", { name: /Anmelden/i })).toBeVisible();
  });
});
