import { email, object, string, z } from "zod";
import type { TFunction } from "@/shared/types/types";

export const loginFormSchema = (t: TFunction) =>
    object({
        email: email({ error: t("email.invalid") }).min(1, t("email.required")),
        password: string().min(1, t("password.required")),
    });

export type LoginFormSchema = z.infer<ReturnType<typeof loginFormSchema>>;
