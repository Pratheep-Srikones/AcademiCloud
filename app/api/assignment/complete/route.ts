import { completeAssignmentModel } from "@/models/assignment.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { assignment_id } = await req.json();
  if (!assignment_id) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }
  try {
    const data = await completeAssignmentModel(assignment_id as string);
    return NextResponse.json({
      message: "Assignment completed successfully",
      data,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error completing assignment:", error.message);
    } else {
      console.error("Error completing assignment:", error);
    }
    return NextResponse.json(
      { error: "Error completing assignment" },
      { status: 500 }
    );
  }
}
