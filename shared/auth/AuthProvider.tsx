"use client";

// TP
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, type ReactNode } from "react";

// BL
import { auth } from "@/config/firebase";
import { useAppStore } from "@/shared/store";
import { useAuth } from "@/features/login/useLogin";

// UI
import { Loader } from "@/shared/components/Loader";

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [authUser, isAuthLoading] = useAuthState(auth);
    const { user } = useAppStore();
    const { logout } = useAuth();

    useEffect(() => {
        if (isAuthLoading) return;
        if (!authUser || !user) logout();
    }, [authUser, isAuthLoading, logout, user]);

    if (isAuthLoading) {
        return (
            <main className="flex h-screen items-center justify-center">
                <Loader />
            </main>
        );
    }

    return authUser && user ? children : null;
};
