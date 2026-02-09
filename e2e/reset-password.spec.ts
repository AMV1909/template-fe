import { test, expect } from "@playwright/test";

test("should send reset password email request successfully", async ({ page }) => {
    await page.goto("/reset-password");

    await page.getByTestId("email-input").fill("test@test.com");
    await page.getByTestId("reset-password-button").click();

    await expect(page.getByText("Password reset email sent to your email address")).toBeVisible();

    await page.waitForTimeout(5000);
    await expect(page).toHaveURL(new RegExp("/login"));
});

test("should redirect to login if clicked on back to login link", async ({ page }) => {
    await page.goto("/reset-password");
    await page.getByTestId("back-to-login-link").click();
    await expect(page).toHaveURL(new RegExp("/login"));
});