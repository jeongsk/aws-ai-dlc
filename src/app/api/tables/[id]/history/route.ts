import { NextRequest } from "next/server";
import { getTableHistory } from "@/lib/services/table-service";
import { successResponse, errorResponse } from "@/lib/api-utils";
import { authenticateAdmin, isErrorResponse } from "@/lib/auth/middleware";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = authenticateAdmin(request);
    if (isErrorResponse(auth)) return auth;

    const { id } = await params;
    const tableId = parseInt(id, 10);
    if (isNaN(tableId)) return errorResponse("유효하지 않은 테이블 ID입니다", 400);

    const history = await getTableHistory(tableId);
    return successResponse(history);
  } catch (error) {
    const message = error instanceof Error ? error.message : "주문 내역 조회에 실패했습니다";
    return errorResponse(message, 500);
  }
}
