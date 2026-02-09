import { generateRandomString } from "@/shared/helpers/generateRandomString";
import { test, expect } from "@playwright/test";

test("should sign up successfully", async ({ page }) => {
    await page.goto("/sign-up");

    await page.getByTestId("first-name-input").fill("John");
    await page.getByTestId("last-name-input").fill("Doe");
    await page.getByTestId("email-input").fill(`${generateRandomString(20)}@test.com`);
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("confirm-password-input").fill("password");
    await page.getByTestId("sign-up-button").click();

    await expect(page.getByText("Signed up successfully")).toBeVisible();
    await expect(page).toHaveURL(new RegExp("/login"));
});

test("should redirect to login if clicked on back to login link", async ({ page }) => {
    await page.goto("/sign-up");
    await page.getByTestId("back-to-login-link").click();
    await expect(page).toHaveURL(new RegExp("/login"));
});