import { type Page } from "@playwright/test";

export const login = async (page: Page, email = "test@test.com", password = "test1234") => {
    await page.goto("/login");

    const emailInput = page.getByTestId("email-input");
    const passwordInput = page.getByTestId("password-input");
    const loginButton = page.getByTestId("login-button");

    await emailInput.fill(email);
    await passwordInput.fill(password);
    await loginButton.click();
}