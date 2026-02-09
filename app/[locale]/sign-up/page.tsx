"use client";

import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { signUpFormSchema } from "@/features/sign-up/signUpSchemas";
import { useSignUp } from "@/features/sign-up/useSignUp";

export default function SignUp() {
    const t = useTranslations("SignUpPage");
    const tForm = useTranslations("SignUpPage.form");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signUpFormSchema(tForm)),
    });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const { signUp } = useSignUp();

    const onChangeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !file.type.includes("image"))
            return toast.error(tForm("profilePicture.invalid"));

        if (file.size > 1024 * 1024 * 5)
            return toast.error(tForm("profilePicture.maxSize", { maxSize: 5 }));

        setProfilePicture(file);
    };

    const onSubmit = handleSubmit(
        async (data) => await signUp({ ...data, profilePicture }),
    );

    return (
        <main className="flex h-screen items-center justify-center overflow-y-auto">
            <section className="mx-4 flex w-[800px] max-w-full flex-col gap-4 rounded-lg p-4 shadow-md sm:p-8">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-2xl font-bold">{t("title")}</h1>
                    <p className="text-sm text-gray-500">{t("description")}</p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))] gap-4"
                >
                    <Input
                        data-testid="first-name-input"
                        label={t("form.firstName.label")}
                        placeholder={t("form.firstName.placeholder")}
                        {...register("firstName")}
                        autoComplete="given-name"
                        error={errors.firstName?.message}
                        required
                    />

                    <Input
                        data-testid="last-name-input"
                        label={t("form.lastName.label")}
                        placeholder={t("form.lastName.placeholder")}
                        {...register("lastName")}
                        autoComplete="family-name"
                        error={errors.lastName?.message}
                        required
                    />

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
                        autoComplete="new-password"
                        error={errors.password?.message}
                        required
                    />

                    <Input
                        data-testid="confirm-password-input"
                        type="password"
                        label={t("form.password.confirm.label")}
                        placeholder={t("form.password.confirm.placeholder")}
                        {...register("confirmPassword")}
                        autoComplete="new-password"
                        error={errors.confirmPassword?.message}
                        required
                    />

                    <Input
                        data-testid="profile-picture-input"
                        type="file"
                        label={t("form.profilePicture.label")}
                        placeholder={t("form.profilePicture.placeholder")}
                        onChange={onChangeProfilePicture}
                    />

                    <Button
                        data-testid="sign-up-button"
                        type="submit"
                        className="col-span-full mx-auto w-full max-w-[150px]"
                        loading={isSubmitting}
                    >
                        {t("form.submit")}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    {t("already-have-account")}{" "}
                    <Link
                        data-testid="back-to-login-link"
                        href="/login"
                        className="font-bold hover:underline"
                    >
                        {t("login")}
                    </Link>
                </p>
            </section>
        </main>
    );
}
