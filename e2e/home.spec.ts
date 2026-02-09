import { test, expect } from "@playwright/test";
import { login } from "./auth";
import type { Todo } from "@/features/todos/todosSchemas";

test("should redirect to login if not logged in", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(new RegExp("/login"));
});

test("should show todos list if logged in", async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(new RegExp("/"));
    await expect(page.getByTestId("todo-list")).toBeVisible();
});

test("should create, search, update and delete a todo", async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(new RegExp("/"));
    await page.getByTestId("add-todo-button").click();

    const titleInput = page.getByTestId("title-input");
    const descriptionTextarea = page.getByTestId("description-textarea");
    const createUpdateTodoButton = page.getByTestId(
        "create-update-todo-button",
    );

    const createTodoRequest = page.waitForResponse(
        (response) =>
            response.url().includes("/todos") &&
            response.request().method() === "POST" &&
            response.status() === 201,
    );

    await titleInput.fill("Test Todo");
    await descriptionTextarea.fill("Test Description");
    await createUpdateTodoButton.click();

    const createTodoResponse: { todo: Todo } = await (
        await createTodoRequest
    ).json();
    const todoId = createTodoResponse.todo.id;

    await expect(page.getByText("Todo created successfully")).toBeVisible();

    const todoCard = page.getByTestId(`todo-card-${todoId}`);
    await expect(todoCard).toBeVisible();
    await expect(todoCard.getByText("Test Todo")).toBeVisible();
    await expect(todoCard.getByText("Test Description")).toBeVisible();
    await expect(
        todoCard.getByTestId(`todo-badge-status-${todoId}`),
    ).toHaveText("TODO");

    await todoCard.click();

    const todoForm = page.getByTestId("todo-form");

    await todoForm.getByLabel("Status").click();
    await page.getByRole("option", { name: "In Progress" }).click();

    await titleInput.fill("Test Todo Updated");
    await descriptionTextarea.fill("Test Description Updated");
    await createUpdateTodoButton.click();

    await expect(page.getByText("Todo updated successfully")).toBeVisible();

    await expect(todoCard.getByText("Test Todo Updated")).toBeVisible();
    await expect(todoCard.getByText("Test Description Updated")).toBeVisible();
    await expect(
        todoCard.getByTestId(`todo-badge-status-${todoId}`),
    ).toHaveText("IN PROGRESS");

    page.on("dialog", (dialog) => dialog.accept());
    await page.getByTestId(`delete-todo-button-${todoId}`).click();

    await expect(page.getByText("Todo deleted successfully")).toBeVisible();
    await expect(page.getByTestId(`todo-card-${todoId}`)).not.toBeVisible();
});
