import { supabase } from "@/lib/supabase";
export interface Assignment {
  assignment_id: string;
  user_id: string;
  title: string;
  description: string;
  due_date: Date;
  status: string;
  file_url: string;
  module_id: string;
}

export const addApplicationModel = async (
  user_id: string,
  title: string,
  description: string,
  due_date: string,
  file_url: string,
  module_id: string
) => {
  if (
    !user_id ||
    !title ||
    !description ||
    !due_date ||
    !file_url ||
    !module_id
  ) {
    throw new Error("All fields are required");
  }

  const { data, error } = await supabase.from("assignment").insert({
    user_id,
    title,
    description,
    due_date,
    status: "pending",
    file_url,
    module_id,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getAssignmentModel = async (assignment_id: string) => {
  const { data, error } = await supabase
    .from("assignment")
    .select("*")
    .eq("assignment_id", assignment_id);
  if (error) {
    throw error;
  }
  return data;
};

export const getAssignmentByUserModel = async (user_id: string) => {
  const { data, error } = await supabase
    .from("assignment")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};

export const getPendingAssignmenByUsertModel = async (user_id: string) => {
  const { data, error } = await supabase
    .from("assignment")
    .select("*")
    .eq("user_id", user_id)
    .eq("status", "pending");
  if (error) {
    throw error;
  }
  return data;
};

export const getPendingAssignmentCountModel = async (user_id: string) => {
  const { data, error } = await supabase
    .from("assignment")
    .select("assignment_id")
    .eq("user_id", user_id)
    .eq("status", "pending");
  if (error) {
    throw error;
  }
  return data.length;
};

export const getAssignmentsByModuleAndUserModel = async (
  module_id: string,
  user_id: string
) => {
  const { data, error } = await supabase
    .from("assignment")
    .select("*")
    .eq("module_id", module_id)
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};
export const completeAssignmentModel = async (assignment_id: string) => {
  const { data, error } = await supabase
    .from("assignment")
    .update({ status: "completed" })
    .eq("assignment_id", assignment_id);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteAssignmentModel = async (assignment_id: string) => {
  const { data, error } = await supabase
    .from("assignment")
    .delete()
    .eq("assignment_id", assignment_id);
  if (error) {
    throw error;
  }
  return data;
};
