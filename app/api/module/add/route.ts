import { addModuleModel } from "@/models/module.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, semester } = await req.json();

  if (!name || !semester) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  try {
    const data = await addModuleModel(name, semester);
    return NextResponse.json(
      {
        message: "Module added successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding module:", error.message);
    } else {
      console.error("Error adding module:", error);
    }
    return NextResponse.json(
      { error: "Error fetching modules" },
      { status: 500 }
    );
  }
}
