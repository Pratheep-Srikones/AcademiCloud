import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/notify";
import { Module } from "@/models/module.model";

interface ModuleState {
  modules: Module[];
  fetchModules: () => Promise<void>;
  fetchModule: (module_id: string) => Promise<void>;
  addModule: (name: string, semester: number) => Promise<void>;
}

export const useModuleStore = create<ModuleState>()(
  persist(
    (set, get) => ({
      modules: [],
      fetchModules: async () => {
        try {
          const { data } = await axios.get("/api/module");
          console.log("MODULE DATAAAAA:", data);
          set({ modules: data.data });
          console.log("Modules fetched successfully", get().modules);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toastError(error.response.data.error);
          } else {
            toastError("An unexpected error occurred");
          }
        }
      },
      fetchModule: async (module_id) => {
        try {
          const { data } = await axios.get(`/api/module`, {
            params: { module_id },
          });
          set({ modules: [data] });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toastError(error.response.data.error);
          } else {
            toastError("An unexpected error occurred");
          }
        }
      },
      addModule: async (name: string, semester: number) => {
        try {
          const { data } = await axios.post("/api/module/add", {
            name,
            semester,
          });
          set((state) => ({ modules: [...state.modules, data] }));
          toastSuccess("Module added successfully");
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toastError(error.response.data.error);
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
