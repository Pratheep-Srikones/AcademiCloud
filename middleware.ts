import { NextRequest, NextResponse } from "next/server";
import { getUserModel } from "./models/user.model";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("Intercepted Cookie:", token);

  if (!token) {
    return NextResponse.json({ message: "No Token" }, { status: 401 });
  }
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET as string)
  );
  if (!payload || !payload.username) {
    return NextResponse.json(
      { message: "Unauthorized - Invalid Token" },
      { status: 401 }
    );
  }

  const users = await getUserModel(payload.username as string);
  if (!users || users.length === 0) {
    return NextResponse.json(
      { message: "Unauthorized - User not found" },
      { status: 401 }
    );
  }
  console.log("User found:", users[0]);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/assignment:path*",
    "/dashboard/:path*",
    "/assignment:path*",
    "/api/module:path*",
  ],
};
