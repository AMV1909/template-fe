import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("ResetPasswordPage");

    return {
        title: t("title"),
    };
}

export default function ResetPasswordLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}
