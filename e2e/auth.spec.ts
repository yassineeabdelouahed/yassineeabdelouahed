import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.SEED_CABINET_ADMIN_EMAIL ?? "admin@talentisconsult.com";
const ADMIN_PASSWORD = process.env.SEED_CABINET_ADMIN_PASSWORD ?? "TalentisAdmin2026!";

test.describe("Authentication", () => {
  test("cabinet admin can log in and lands on the cabinet dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#email", ADMIN_EMAIL);
    await page.fill("#password", ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/cabinet\/dashboard/, { timeout: 15000 });
    await expect(page.getByRole("heading", { name: /^Bonjour, /, level: 1 })).toBeVisible();
  });

  test("wrong password shows an inline error and does not navigate away from /login", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#email", ADMIN_EMAIL);
    await page.fill("#password", "wrong-password-obviously");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Email ou mot de passe incorrect")).toBeVisible();
    expect(page.url()).toContain("/login");
  });

  test("a brand-new candidate can register and lands on the candidate dashboard", async ({ page }) => {
    const uniqueEmail = `e2e-candidate-${Date.now()}@example.com`;
    await page.goto("/register");
    await page.fill("#name", "Candidat E2E");
    await page.fill("#email", uniqueEmail);
    await page.fill("#password", "MotDePasse123!");
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/candidate\/dashboard/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/candidate\/dashboard/);
  });
});
