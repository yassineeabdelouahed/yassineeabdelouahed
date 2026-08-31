import { test, expect } from "@playwright/test";

test.describe("Public job board", () => {
  test("homepage renders the hero and a link to sign in", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Trouvez le poste qui vous correspond vraiment." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Connexion" })).toBeVisible();
  });

  test("results page renders without a server error", async ({ page }) => {
    const response = await page.goto("/results");
    expect(response?.status()).toBe(200);
  });

  test("legal pages are reachable", async ({ page }) => {
    // Generous timeout: in dev mode, Turbopack compiles each route on its first
    // request, which can take well past Playwright's 30s default test timeout.
    test.setTimeout(90_000);
    for (const path of ["/mentions-legales", "/confidentialite", "/cgu", "/cgv"]) {
      const response = await page.goto(path, { timeout: 60_000 });
      expect(response?.status(), `${path} should return 200`).toBe(200);
    }
  });
});
