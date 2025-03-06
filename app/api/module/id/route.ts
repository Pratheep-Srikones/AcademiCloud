import { getModuleModel } from "@/models/module.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const module_id = searchParams.get("module_id");

  if (!module_id) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  try {
    const data = await getModuleModel(module_id as string);
    return NextResponse.json(
      {
        message: "Module fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching module:", error.message);
    } else {
      console.error("Error fetching module:", error);
    }
    return NextResponse.json(
      { error: "Error fetching modules" },
      { status: 500 }
    );
  }
}
