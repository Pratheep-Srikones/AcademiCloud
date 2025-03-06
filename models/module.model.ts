import { supabase } from "@/lib/supabase";
export interface Module {
  module_id: string;
  name: string;
  semester: number;
}

export const addModuleModel = async (name: string, semester: number) => {
  const { data, error } = await supabase
    .from("module")
    .insert([{ name, semester }]);
  if (error) {
    throw error;
  }
  return data;
};

export const getModulesModel = async () => {
  const { data, error } = await supabase.from("module").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getModuleModel = async (id: string) => {
  const { data, error } = await supabase
    .from("module")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};
