import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";

import { postData } from "@/shared/helpers/requests";
import { authRoutes } from "@/shared/utils/routes";
import { userSchema } from "../users/usersSchemas";
import { resetAppStore, useAppStore } from "@/shared/store";
import { auth } from "@/config/firebase";
import type { LoginFormSchema } from "./loginSchemas";

interface LoginVariables {
    email: string;
    firebaseIdToken: string;
}

export function useLogin() {
    const t = useTranslations("LoginPage.form");

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: LoginVariables) =>
            postData({
                endpoint: authRoutes.login,
                schema: userSchema,
                responseSchemaKey: "user",
                data,
            }),
        onSuccess: () => toast.success(t("success")),
        onError: (error: AxiosError) => {
            if (error.code === "ERR_NETWORK")
                return toast.error(t("errors.network"));

            return toast.error(t("errors.unknown"));
        },
    });

    return { login: mutateAsync, isLoggingIn: isPending, ...rest };
}

export const useAuth = () => {
    const t = useTranslations("LoginPage.form");
    const queryClient = useQueryClient();
    const router = useRouter();

    const { login: queryLogin } = useLogin();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { setUser } = useAppStore();

    const login = useCallback(
        async ({ email, password }: LoginFormSchema) => {
            try {
                setIsLoggingIn(true);
                toast.loading(t("loading"), { id: "loading" });

                const signIn = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );

                const firebaseIdToken = await signIn.user.getIdToken();
                const user = await queryLogin({ email, firebaseIdToken });

                setUser(user);
            } catch (error) {
                console.error(error);

                if (error instanceof FirebaseError) {
                    toast.error(t("errors.unauthorized"));
                }
            } finally {
                setIsLoggingIn(false);
                toast.dismiss("loading");
            }
        },
        [queryLogin, setUser, t],
    );

    const logout = useCallback(async () => {
        queryClient.clear();

        await signOut(auth)
            .then(() => {
                resetAppStore();
                router.push("/login");
            })
            .catch(console.error);
    }, [queryClient, router]);

    return { isLoggingIn, login, logout };
};
