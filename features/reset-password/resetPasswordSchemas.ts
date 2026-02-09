import { email, object, z } from "zod";
import type { TFunction } from "@/shared/types/types";

export const resetPasswordFormSchema = (t: TFunction) =>
    object({
        email: email({ error: t("email.invalid") }).min(1, t("email.required")),
    });

export type ResetPasswordFormSchema = z.infer<
    ReturnType<typeof resetPasswordFormSchema>
>;
