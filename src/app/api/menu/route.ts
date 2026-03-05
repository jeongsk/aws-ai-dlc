import { NextRequest } from "next/server";
import { getMenuItems, createMenuItem } from "@/lib/services/menu-service";
import { getCategories } from "@/lib/services/menu-service";
import { successResponse, errorResponse } from "@/lib/api-utils";
import { authenticateAdmin, isErrorResponse } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const categoryId = request.nextUrl.searchParams.get("categoryId");
    const items = await getMenuItems(categoryId ? parseInt(categoryId, 10) : undefined);
    return successResponse(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : "메뉴 조회에 실패했습니다";
    return errorResponse(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = authenticateAdmin(request);
    if (isErrorResponse(auth)) return auth;

    const body = await request.json();
    const { name, price, description, categoryId, sortOrder } = body;

    if (!name || typeof name !== "string") {
      return errorResponse("메뉴명을 입력해주세요", 400);
    }
    if (typeof price !== "number" || price < 0) {
      return errorResponse("유효한 가격을 입력해주세요", 400);
    }
    if (typeof categoryId !== "number") {
      return errorResponse("카테고리를 선택해주세요", 400);
    }

    const item = await createMenuItem({ name, price, description, categoryId, sortOrder });
    return successResponse(item, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "메뉴 등록에 실패했습니다";
    return errorResponse(message, 500);
  }
}
