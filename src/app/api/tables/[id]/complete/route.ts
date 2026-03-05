import { NextRequest } from "next/server";
import { completeTableSession } from "@/lib/services/table-service";
import { successResponse, errorResponse } from "@/lib/api-utils";
import { authenticateAdmin, isErrorResponse } from "@/lib/auth/middleware";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = authenticateAdmin(request);
    if (isErrorResponse(auth)) return auth;

    const { id } = await params;
    const tableId = parseInt(id, 10);
    if (isNaN(tableId)) return errorResponse("유효하지 않은 테이블 ID입니다", 400);

    await completeTableSession(tableId);
    return successResponse({ message: "테이블 이용이 완료되었습니다" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "이용 완료 처리에 실패했습니다";
    return errorResponse(message, 500);
  }
}
