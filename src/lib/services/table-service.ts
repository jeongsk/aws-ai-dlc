import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/services/auth-service";

export async function getTables() {
  return prisma.table.findMany({
    orderBy: { tableNumber: "asc" },
    include: {
      orders: {
        where: { status: { not: "COMPLETED" } },
        include: { items: true },
      },
    },
  });
}

export async function getTable(id: number) {
  return prisma.table.findUnique({
    where: { id },
    include: {
      orders: {
        include: { items: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function createTable(tableNumber: number, password: string) {
  const hashed = await hashPassword(password);
  return prisma.table.create({
    data: { tableNumber, password: hashed },
  });
}

export async function completeTableSession(tableId: number) {
  const table = await prisma.table.findUnique({
    where: { id: tableId },
    include: {
      orders: { include: { items: true } },
    },
  });

  if (!table) throw new Error("테이블을 찾을 수 없습니다");
  if (!table.sessionId) throw new Error("활성 세션이 없습니다");

  await prisma.$transaction(async (tx) => {
    // 주문을 히스토리로 이동
    for (const order of table.orders) {
      await tx.orderHistory.create({
        data: {
          tableId: table.id,
          tableNumber: table.tableNumber,
          sessionId: table.sessionId!,
          orderNumber: order.id,
          items: JSON.stringify(order.items),
          totalAmount: order.totalAmount,
          orderedAt: order.createdAt,
        },
      });
    }

    // 현재 주문 삭제
    await tx.order.deleteMany({ where: { tableId } });

    // 세션 리셋
    await tx.table.update({
      where: { id: tableId },
      data: { sessionId: null },
    });
  });
}

export async function getTableHistory(tableId: number) {
  return prisma.orderHistory.findMany({
    where: { tableId },
    orderBy: { completedAt: "desc" },
  });
}
