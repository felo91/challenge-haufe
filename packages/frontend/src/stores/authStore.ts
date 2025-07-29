import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthResponse } from "@rick-morty-app/libs";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (authResponse: AuthResponse) =>
        set({
          user: authResponse.user,
          token: authResponse.token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
