import { prisma } from "@/lib/db";
import type { CreateOrderInput } from "@/types";

export async function createOrder(data: CreateOrderInput) {
  const table = await prisma.table.findUnique({ where: { id: data.tableId } });
  if (!table) throw new Error("테이블을 찾을 수 없습니다");

  // 첫 주문 시 세션 시작
  if (!table.sessionId) {
    await prisma.table.update({
      where: { id: data.tableId },
      data: { sessionId: data.sessionId },
    });
  }

  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: data.items.map((i) => i.menuItemId) } },
  });

  const menuMap = new Map(menuItems.map((m) => [m.id, m]));

  const orderItems = data.items.map((item) => {
    const menu = menuMap.get(item.menuItemId);
    if (!menu) throw new Error(`메뉴를 찾을 수 없습니다: ${item.menuItemId}`);
    return { menuItemName: menu.name, quantity: item.quantity, unitPrice: menu.price };
  });

  const totalAmount = orderItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return prisma.order.create({
    data: {
      tableId: data.tableId,
      sessionId: table.sessionId || data.sessionId,
      totalAmount,
      items: { create: orderItems },
    },
    include: { items: true },
  });
}

export async function getOrdersByTable(tableId: number) {
  const table = await prisma.table.findUnique({ where: { id: tableId } });
  if (!table || !table.sessionId) return [];

  return prisma.order.findMany({
    where: { tableId, sessionId: table.sessionId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}
