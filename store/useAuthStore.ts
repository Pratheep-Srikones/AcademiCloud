import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/notify";
import { User } from "@/models/user.model";

interface AuthState {
  authUser: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authUser: null,
      login: async (username, password) => {
        try {
          const { data } = await axios.post<User>("/api/auth/login", {
            username,
            password,
          });
          set({ authUser: data });
          toastSuccess("Logged in successfully");
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toastError(error.response.data.message);
          } else {
            toastError("An unexpected error occurred");
          }
        }
      },
      logout: () => {
        set({ authUser: null });
        axios.post("/api/auth/logout");
        toastSuccess("Logged out successfully");
      },
      signup: async (username, email, password) => {
        try {
          await axios.post<User>("/api/auth/signup", {
            username,
            email,
            password,
          });
          toastSuccess("Signed up successfully");
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toastError(error.response.data.message);
          } else {
            toastError("An unexpected error occurred");
          }
        }
      },
    }),
    {
      name: "auth-storage", // Storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage to persist state
    }
  )
);
