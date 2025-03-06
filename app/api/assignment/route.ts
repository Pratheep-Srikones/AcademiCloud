import { getAssignmentByUserModel } from "@/models/assignment.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log("searchParams", searchParams);
  const user_id = searchParams.get("user_id");
  console.log("user_id", user_id);

  if (!user_id) {
    return NextResponse.json({ error: "missing user id" }, { status: 400 });
  }

  try {
    const data = await getAssignmentByUserModel(user_id as string);
    return NextResponse.json(
      { message: "Assignments fetched successfully", data },
      { status: 200 }
    );
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
