import {
  Assignment,
  deleteAssignmentModel,
  getAssignmentModel,
} from "@/models/assignment.model";
import { deleteDocument, getFilenameFromUrl } from "@/utils/file";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { assignment_id } = await req.json();
  if (!assignment_id) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }
  try {
    const assignments: Assignment[] = await getAssignmentModel(
      assignment_id as string
    );
    const assignment = assignments[0];
    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }
    const file_url = assignment.file_url;

    const file_name = getFilenameFromUrl(file_url);
    const data = await deleteDocument(file_name);
    console.log("File deleted successfully", data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting file:", error.message);
    } else {
      console.error("Error deleting file:", error);
    }
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
  try {
    const data = await deleteAssignmentModel(assignment_id as string);
    return NextResponse.json({
      message: "Assignment deleted successfully",
      data,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting assignment:", error.message);
    } else {
      console.error("Error deleting assignment:", error);
    }
    return NextResponse.json(
      { error: "Error deleting assignment" },
      { status: 500 }
    );
  }
}
