import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { Assignment } from "@/models/assignment.model";

export interface AssignmentState {
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  markAsDone: (assignment_id: string) => void;
  deleteAssignment: (assignment_id: string) => void;
  getAssignments: (user_id: string) => Promise<void>;
}

export const useAssignmentStore = create<AssignmentState>()(
  persist(
    (set) => ({
      assignments: [],
      setAssignments: (assignments) => set({ assignments }),
      markAsDone: (assignment_id) => {
        set((state) => ({
          assignments: state.assignments.map((a) =>
            a.assignment_id === assignment_id ? { ...a, status: "done" } : a
          ),
        }));
      },
      deleteAssignment: (assignment_id) => {
        set((state) => ({
          assignments: state.assignments.filter(
            (a) => a.assignment_id !== assignment_id
          ),
        }));
      },
      getAssignments: async (user_id) => {
        try {
          const { data } = await axios.get<Assignment[]>(`/api/assignment`, {
            params: { user_id },
          });
          set({ assignments: data });
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
