import { supabase } from "@/lib/supabase";
export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
}

export const addUserModel = async (
  username: string,
  email: string,
  password: string
) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const { data, error } = await supabase
    .from("user")
    .insert({ username, email, password });
  if (error) {
    throw error;
  }
  return data;
};

export const getUserModel = async (username: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("username", username);
  if (error) {
    throw error;
  }
  return data;
};
