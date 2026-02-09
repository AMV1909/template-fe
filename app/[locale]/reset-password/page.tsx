"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { toast } from "react-hot-toast";

import { resetPasswordFormSchema } from "@/features/reset-password/resetPasswordSchemas";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function ResetPasswordPage() {
    const t = useTranslations("ResetPasswordPage");
    const tForm = useTranslations("ResetPasswordPage.form");
    const router = useRouter();

    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(resetPasswordFormSchema(tForm)),
    });

    const onSubmit = handleSubmit(
        async (data) =>
            await sendPasswordResetEmail(auth, data.email)
                .then(() => {
                    setSuccessMessage(tForm("success"));

                    setTimeout(() => {
                        router.push("/login");
                    }, 5000);
                })
                .catch(() => toast.error(tForm("error"))),
    );

    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">{t("title")}</h1>

            <form
                onSubmit={onSubmit}
                className="mt-4 flex w-[500px] max-w-full flex-col gap-4 p-4"
            >
                <Input
                    data-testid="email-input"
                    type="email"
                    label={tForm("email.label")}
                    placeholder={tForm("email.placeholder")}
                    {...register("email")}
                    error={errors.email?.message}
                    success={successMessage}
                    required
                />

                <Button
                    data-testid="reset-password-button"
                    type="submit"
                    loading={isSubmitting}
                    className="mx-auto w-fit"
                >
                    {tForm("submit")}
                </Button>

                <Link
                    data-testid="back-to-login-link"
                    href="/login"
                    className="text-center text-sm text-gray-500 hover:underline"
                >
                    {t("backToLogin")}
                </Link>
            </form>
        </main>
    );
}
