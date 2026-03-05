import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = async () => {
        try {
          const tables = await prisma.table.findMany({
            include: {
              orders: {
                include: { items: true },
                orderBy: { createdAt: "desc" },
              },
            },
          });

          const filtered = tables.map((table) => ({
            ...table,
            orders: table.sessionId
              ? table.orders.filter((o) => o.sessionId === table.sessionId)
              : [],
          }));

          const data = JSON.stringify(filtered);
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch (error) {
          console.error("SSE error:", error);
          controller.enqueue(encoder.encode(`data: []\n\n`));
        }
      };

      await sendUpdate();
      const interval = setInterval(sendUpdate, 2000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
