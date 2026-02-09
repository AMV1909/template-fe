import { url, string, z, ZodError, prettifyError } from "zod";

const envSchema = z.object({
    // API
    NEXT_PUBLIC_API_URL: url().default("http://localhost:5000"),

    // Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY: string().min(1),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string().min(1),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string().min(1),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string().min(1),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string().min(1),
    NEXT_PUBLIC_FIREBASE_APP_ID: string().min(1),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
    try {
        return envSchema.parse({
            NEXT_PUBLIC_API_URL: process.env["NEXT_PUBLIC_API_URL"],
            NEXT_PUBLIC_FIREBASE_API_KEY:
                process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
            NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
                process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
            NEXT_PUBLIC_FIREBASE_PROJECT_ID:
                process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
            NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
                process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
            NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
                process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
            NEXT_PUBLIC_FIREBASE_APP_ID:
                process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
        });
    } catch (error) {
        if (error instanceof ZodError) throw new Error(prettifyError(error));

        throw error;
    }
}

export const env = validateEnv();
