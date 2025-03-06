import { getModulesModel } from "@/models/module.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getModulesModel();
    return NextResponse.json(
      {
        message: "Modules fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching modules:", error.message);
    } else {
      console.error("Error fetching modules:", error);
    }
    return NextResponse.json(
      { error: "Error fetching modules" },
      { status: 500 }
    );
  }
}
