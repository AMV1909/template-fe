import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("SignUpPage");

    return {
        title: t("title"),
    };
}

export default function SignUpLayout({ children }: { children: ReactNode }) {
    return children;
}
