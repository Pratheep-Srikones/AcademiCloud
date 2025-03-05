import { supabase } from "@/lib/supabase";

export const uploadDocumentandgetURL = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("documents")
    .upload(file.name, file);
  if (error) {
    throw error;
  }
  console.log(data);

  const file_url = await supabase.storage
    .from("documents")
    .getPublicUrl(file.name);
  console.log(file_url);
  console.log(file_url.data?.publicUrl);

  return file_url.data?.publicUrl;
};
export const deleteDocument = async (file_name: string) => {
  console.log("Deleting file:", file_name);
  const { data, error } = await supabase.storage
    .from("documents")
    .remove([file_name]);
  if (error) {
    throw error;
  }
  console.log(data);
  return data;
};
export function getFilenameFromUrl(url: string): string {
  return url.split("/").pop() || "";
}
