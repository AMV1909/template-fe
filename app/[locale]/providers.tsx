"use client";

import { useState, type ReactNode } from "react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import {
    keepPreviousData,
    MutationCache,
    QueryClient,
    QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
    children: ReactNode;
    locale: string;
    messages: Record<string, string>;
}

export function ContextProviders({ children, locale, messages }: Props) {
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="UTC"
        >
            <QueryClientProvider>{children}</QueryClientProvider>
        </NextIntlClientProvider>
    );
}

export function QueryClientProvider({ children }: { children: ReactNode }) {
    const t = useTranslations("errors");

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: (_, error) => {
                            if (error instanceof AxiosError)
                                return error.response?.status !== 404;

                            return true;
                        },
                        staleTime: 60000, // 1 minute
                        placeholderData: keepPreviousData,
                    },
                },
                mutationCache: new MutationCache({
                    onError: (error) => {
                        console.log("Something went wrong:", error);

                        if (
                            error instanceof AxiosError &&
                            error.code === "ERR_NETWORK"
                        )
                            return toast.error(t("network"));

                        return toast.error(t("unknown"));
                    },
                }),
            }),
    );

    return (
        <TanstackQueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-right" />
            <ReactQueryDevtools />
        </TanstackQueryClientProvider>
    );
}
