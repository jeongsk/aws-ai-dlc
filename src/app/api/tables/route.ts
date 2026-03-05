import { NextRequest } from "next/server";
import { getTables, createTable } from "@/lib/services/table-service";
import { successResponse, errorResponse } from "@/lib/api-utils";
import { authenticateAdmin, isErrorResponse } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const auth = authenticateAdmin(request);
    if (isErrorResponse(auth)) return auth;

    const tables = await getTables();
    return successResponse(tables);
  } catch (error) {
    const message = error instanceof Error ? error.message : "테이블 조회에 실패했습니다";
    return errorResponse(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = authenticateAdmin(request);
    if (isErrorResponse(auth)) return auth;

    const body = await request.json();
    const { tableNumber, password } = body;

    if (typeof tableNumber !== "number" || tableNumber < 1) {
      return errorResponse("유효한 테이블 번호를 입력해주세요", 400);
    }
    if (typeof password !== "string" || password.length < 5) {
      return errorResponse("비밀번호는 최소 6자 이상이어야 합니다", 400);
    }

    const table = await createTable(tableNumber, password);
    return successResponse(table, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "테이블 등록에 실패했습니다";
    return errorResponse(message, 500);
  }
}
