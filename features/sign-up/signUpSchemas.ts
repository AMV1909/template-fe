import { email, object, string, z } from "zod";
import type { TFunction } from "@/shared/types/types";

export const signUpFormSchema = (t: TFunction) =>
    object({
        firstName: string()
            .min(1, t("firstName.required"))
            .max(255, t("firstName.maxLength")),
        lastName: string()
            .min(1, t("lastName.required"))
            .max(255, t("lastName.maxLength")),
        email: email({ error: t("email.invalid") })
            .min(1, t("email.required"))
            .max(255, t("email.maxLength")),
        password: string()
            .min(8, t("password.required"))
            .max(255, t("password.maxLength")),
        confirmPassword: string().min(8, t("password.confirm.required")),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: t("password.confirm.match"),
    });

export type SignUpFormSchema = z.infer<ReturnType<typeof signUpFormSchema>>;
