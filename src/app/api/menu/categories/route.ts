import { NextRequest } from "next/server";
import { getCategories } from "@/lib/services/menu-service";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function GET() {
  try {
    const categories = await getCategories();
    return successResponse(categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : "카테고리 조회에 실패했습니다";
    return errorResponse(message, 500);
  }
}
