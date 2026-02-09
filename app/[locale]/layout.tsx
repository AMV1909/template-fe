import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { ClickToComponent } from "click-to-react-component";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { ReactScan } from "@/config/ReactScan";
import { ContextProviders } from "./providers";

import "@/config/env";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Todos",
    description: "Your todos list",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    const messages = await getMessages();

    if (!hasLocale(routing.locales, locale)) notFound();

    return (
        <html lang={locale}>
            <ReactScan />
            {/* <ClickToComponent editor="cursor" /> */}

            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ContextProviders locale={locale} messages={messages}>
                    {children}
                </ContextProviders>
            </body>
        </html>
    );
}
