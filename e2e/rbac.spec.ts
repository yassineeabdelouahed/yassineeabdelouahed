import { test, expect } from "@playwright/test";

test.describe("Role-based route protection", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  for (const path of ["/cabinet/dashboard", "/client/dashboard", "/candidate/dashboard", "/cabinet/admin/retention"]) {
    test(`unauthenticated visitor to ${path} is redirected to /login`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login/);
    });
  }
});
