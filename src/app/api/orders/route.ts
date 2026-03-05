import { NextRequest } from "next/server";
import { createOrder, getOrdersByTable } from "@/lib/services/order-service";
import { successResponse, errorResponse } from "@/lib/api-utils";
import { authenticateTable, isErrorResponse } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const auth = authenticateTable(request);
    if (isErrorResponse(auth)) return auth;

    const orders = await getOrdersByTable(auth.tableId);
    return successResponse(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "주문 조회에 실패했습니다";
    return errorResponse(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = authenticateTable(request);
    if (isErrorResponse(auth)) return auth;

    const body = await request.json();
    const { items, sessionId } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse("주문할 메뉴를 선택해주세요", 400);
    }

    const order = await createOrder({
      tableId: auth.tableId,
      sessionId: sessionId || crypto.randomUUID(),
      items,
    });

    return successResponse(order, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "주문에 실패했습니다";
    return errorResponse(message, 500);
  }
}
