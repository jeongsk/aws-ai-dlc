import { NextRequest } from "next/server";
import { tableLogin } from "@/lib/services/auth-service";
import { successResponse, errorResponse } from "@/lib/api-utils";

const MIN_PASSWORD_LENGTH = 6;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableNumber, password } = body;

    if (!tableNumber || !password) {
      return errorResponse("테이블 번호와 비밀번호를 입력해주세요", 400);
    }

    if (typeof tableNumber !== "number" || tableNumber < 1) {
      return errorResponse("유효한 테이블 번호를 입력해주세요", 400);
    }

    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return errorResponse(`비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다`, 400);
    }

    const result = await tableLogin(tableNumber, password);
    const response = successResponse(result);
    response.cookies.set("table_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8시간 (TABLE_TOKEN_EXPIRY와 동일)
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "로그인에 실패했습니다";
    return errorResponse(message, 401);
  }
}
