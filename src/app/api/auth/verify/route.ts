import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value ||
    request.cookies.get("table_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return errorResponse("인증이 필요합니다", 401);

  const payload = verifyToken(token);
  if (!payload) return errorResponse("유효하지 않은 토큰입니다", 401);

  return successResponse({ valid: true, type: payload.type });
}
