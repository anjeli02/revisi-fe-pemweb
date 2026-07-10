import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginRespone } from "../types/Auth";


interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (payload: LoginRespone) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            token: null,
            login: ({user, token}) => 
                set({ isAuthenticated: true, user, token }),
            logout: () => set({ isAuthenticated: false, user: null, token: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);  