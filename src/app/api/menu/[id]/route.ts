import { NextRequest } from "next/server";
import { updateMenuItem, deleteMenuItem, getMenuItem } from "@/lib/services/menu-service";
import { successResponse, errorResponse } from "@/lib/api-utils";
import { authenticateAdmin, isErrorResponse } from "@/lib/auth/middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = authenticateAdmin(request);
    if (isErrorResponse(auth)) return auth;

    const { id } = await params;
    const menuId = parseInt(id, 10);
    if (isNaN(menuId)) return errorResponse("유효하지 않은 메뉴 ID입니다", 400);

    const body = await request.json();
    const item = await updateMenuItem(menuId, body);
    return successResponse(item);
  } catch (error) {
    const message = error instanceof Error ? error.message : "메뉴 수정에 실패했습니다";
    return errorResponse(message, 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = authenticateAdmin(request);
    if (isErrorResponse(auth)) return auth;

    const { id } = await params;
    const menuId = parseInt(id, 10);
    if (isNaN(menuId)) return errorResponse("유효하지 않은 메뉴 ID입니다", 400);

    await deleteMenuItem(menuId);
    return successResponse({ message: "메뉴가 삭제되었습니다" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "메뉴 삭제에 실패했습니다";
    return errorResponse(message, 500);
  }
}
