import { addApplicationModel } from "@/models/assignment.model";
import { uploadDocumentandgetURL } from "@/utils/file";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const due_date = formData.get("due_date") as string;
  const module_id = formData.get("module_id") as string;
  const user_id = formData.get("user_id") as string;

  if (!user_id || !title || !description || !due_date || !module_id) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }
  let file_url = "";
  try {
    file_url = (await uploadDocumentandgetURL(file)) as string;
    console.log("File uploaded successfully");
    console.log("File URL:", file_url);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading file:", error.message);
      return NextResponse.json(
        { error: "Error uploading file" },
        { status: 500 }
      );
    } else {
      console.error("Error uploading file:", error);
      return NextResponse.json(
        { error: "Error uploading file" },
        { status: 500 }
      );
    }
  }
  try {
    const data = await addApplicationModel(
      user_id,
      title,
      description,
      due_date,
      file_url,
      module_id
    );
    return NextResponse.json({
      message: "Assignment added successfully",
      data,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding assignment:", error.message);
    } else {
      console.error("Error adding assignment:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
