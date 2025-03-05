import { getUserModel } from "@/models/user.model";
import { generateJwtToken } from "@/utils/jwt";
import { User } from "@/models/user.model";
import { comparePassword } from "@/utils/password";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  try {
    const users: User[] = await getUserModel(username);
    const user = users[0];
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const isValid = comparePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateJwtToken({
      user_id: user.user_id,
      username: user.username,
    }) as string;

    const response = NextResponse.json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,
      status: 200,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting user:", error.message);
    } else {
      console.error("Error getting user:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
