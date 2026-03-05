import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const type = body.type as string | undefined;

  if (type && type !== "admin" && type !== "table") {
    return errorResponse("유효하지 않은 로그아웃 타입입니다", 400);
  }

  const response = successResponse({ message: "로그아웃 되었습니다" });

  if (type === "admin") {
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  if (type === "table") {
    response.cookies.set("table_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  // type이 없으면 둘 다 삭제하지 않음 (명시적 지정 필요)
  return response;
}
