import { defineConfig, devices } from "@playwright/test";
import path from "path";

const PORT = process.env["PORT"] || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    timeout: 60 * 1000,
    testDir: path.join(__dirname, "e2e"),

    webServer: {
        command: "bun dev",
        url: baseURL,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env["CI"],
    },

    use: {
        baseURL,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },

    projects: [
        {
            name: "Desktop Chrome",
            use: devices["Desktop Chrome"],
        },
        {
            name: "Mobile Chrome",
            use: devices["Pixel 5"],
        },
    ],
});
