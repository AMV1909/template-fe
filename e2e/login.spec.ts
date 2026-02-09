import { test, expect } from "@playwright/test";
import { login } from "./auth";

test("should login successfully", async ({ page }) => {
    await login(page);
    await expect(page.getByText("Logged in successfully")).toBeVisible();
    await expect(page).toHaveURL(new RegExp("/"));
});

test("should show error message if credentials are invalid", async ({ page }) => {
    await login(page, "wrong@email.com", "wrong-password");
    await expect(page.getByText("Unauthorized, please check your credentials")).toBeVisible();
    await expect(page).toHaveURL(new RegExp("/login"));
});
