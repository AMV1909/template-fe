import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { User } from "@/features/users/usersSchemas";

interface AppStoreSlice {
    user: User | null;
    setUser: (user: User | null) => void;
    hasHydrated: boolean;
    setHasHydrated: (hasHydrated: boolean) => void;
}

const createAppStoreSlice: StateCreator<AppStoreSlice> = (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    hasHydrated: false,
    setHasHydrated: (hasHydrated) => set({ hasHydrated }),
});

export const useAppStore = create<AppStoreSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createAppStoreSlice(...a),
            }),
            {
                name: "appStore",
                storage: createJSONStorage(() => localStorage),
                version: 1,
                onRehydrateStorage: () => (state) =>
                    state?.setHasHydrated(true),
            },
        ),
    ),
);

export const resetAppStore = () => {
    const store = useAppStore.getState();

    store.setUser(null);
};
