import { NextRequest } from "next/server";
import { adminLogin } from "@/lib/services/auth-service";
import { successResponse, errorResponse } from "@/lib/api-utils";

const MAX_USERNAME_LENGTH = 50;
const MIN_PASSWORD_LENGTH = 6;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return errorResponse("사용자명과 비밀번호를 입력해주세요", 400);
    }

    if (typeof username !== "string" || username.length > MAX_USERNAME_LENGTH) {
      return errorResponse("유효한 사용자명을 입력해주세요", 400);
    }

    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return errorResponse(`비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다`, 400);
    }

    const result = await adminLogin(username, password);
    const response = successResponse(result);
    response.cookies.set("admin_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 16, // 16시간 (ADMIN_TOKEN_EXPIRY와 동일)
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "로그인에 실패했습니다";
    return errorResponse(message, 401);
  }
}
