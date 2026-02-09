"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { loginFormSchema } from "@/features/login/loginSchemas";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { useAuth } from "@/features/login/useLogin";
import { useAppStore } from "@/shared/store";

export default function Login() {
    const t = useTranslations("LoginPage");
    const tForm = useTranslations("LoginPage.form");

    const { user } = useAppStore();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginFormSchema(tForm)),
    });

    const { login } = useAuth();
    const onSubmit = handleSubmit(async (data) => await login(data));

    useEffect(() => {
        if (user) router.push("/");
    }, [router, user]);

    return (
        <main className="flex h-screen items-center justify-center">
            <section className="mx-4 flex w-[400px] max-w-full flex-col gap-4 rounded-lg p-4 shadow-md sm:p-8">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-sm text-gray-500">{t("description")}</p>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Input
                        data-testid="email-input"
                        type="email"
                        label={t("form.email.label")}
                        placeholder={t("form.email.placeholder")}
                        {...register("email")}
                        autoComplete="email"
                        error={errors.email?.message}
                        required
                    />

                    <Input
                        data-testid="password-input"
                        type="password"
                        label={t("form.password.label")}
                        placeholder={t("form.password.placeholder")}
                        {...register("password")}
                        autoComplete="current-password"
                        error={errors.password?.message}
                        showForgotPassword
                        required
                    />

                    <Button
                        data-testid="login-button"
                        type="submit"
                        loading={isSubmitting}
                    >
                        {t("form.submit")}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    {t("no-account")}{" "}
                    <Link href="/sign-up" className="font-bold hover:underline">
                        {t("signUp")}
                    </Link>
                </p>
            </section>
        </main>
    );
}
