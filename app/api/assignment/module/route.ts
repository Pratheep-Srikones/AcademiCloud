import { getAssignmentsByModuleAndUserModel } from "@/models/assignment.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const module_id = searchParams.get("module_id");
  const user_id = searchParams.get("user_id");
  try {
    const assignments = await getAssignmentsByModuleAndUserModel(
      module_id!,
      user_id!
    );
    return NextResponse.json({ assignments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
