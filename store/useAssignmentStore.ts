import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { Assignment } from "@/models/assignment.model";

export interface AssignmentState {
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  markAsDone: (assignment_id: string) => Promise<void>;
  deleteAssignment: (assignment_id: string) => Promise<void>;
  getAssignments: (user_id: string) => Promise<void>;
  addAssignment: (formData: FormData) => Promise<void>;
}

export const useAssignmentStore = create<AssignmentState>()(
  persist(
    (set) => ({
      assignments: [],
      setAssignments: (assignments) => set({ assignments }),
      markAsDone: async (assignment_id: string) => {
        try {
          await axios.put(`/api/assignment/complete`, { assignment_id });
        } catch (error) {
          console.error(error);
        }
      },
      deleteAssignment: async (assignment_id: string) => {
        try {
          axios.delete("/api/assignment/delete", { data: { assignment_id } });
        } catch (error) {
          console.error(error);
        }
      },
      addAssignment: async (formData: FormData) => {
        try {
          const { data } = await axios.post<Assignment>(
            "/api/assignment/add",
            formData
          );
          set((state) => ({ assignments: [...state.assignments, data] }));
          window.location.href = "/dashboard";
        } catch (error) {
          console.error(error);
        }
      },
      getAssignments: async (user_id) => {
        try {
          const { data } = await axios.get(`/api/assignment`, {
            params: { user_id },
          });
          set({ assignments: data.data });
          console.log("Assignments fetched successfully", data);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "assignment-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
