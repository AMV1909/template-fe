"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import LogRocket from "logrocket";

import { useAppStore } from "@/shared/store";
import { Button } from "@/shared/components/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    const { user } = useAppStore();
    const t = useTranslations("ErrorPage");

    useEffect(() => {
        if (user) LogRocket.identify(user.id);
        LogRocket.captureException(error);
    }, [error, user]);

    return (
        <section className="flex h-screen items-center justify-center px-4 py-10">
            <div className="bg-background w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
                <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                    <AlertTriangle className="size-6" />
                </div>

                <h1 className="text-2xl font-semibold tracking-tight">
                    {t("title")}
                </h1>

                <p className="text-muted-foreground mt-2 text-sm">
                    {t("description")}
                </p>

                <Button className="mt-6 w-full" onClick={reset}>
                    {t("retry")}
                </Button>
            </div>
        </section>
    );
}
