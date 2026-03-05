"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/use-auth";
import styles from "./dashboard.module.css";

interface OrderItem {
  id: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

interface Table {
  id: number;
  tableNumber: number;
  sessionId: string | null;
  orders: Order[];
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "대기중",
  PREPARING: "준비중",
  COMPLETED: "완료",
};

export default function DashboardPage() {
  const { fetchWithAuth } = useAdminAuth();
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newOrderIds, setNewOrderIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let retryTimeout: NodeJS.Timeout;

    const connect = () => {
      eventSource = new EventSource("/api/admin/orders/stream");

      eventSource.onmessage = (event) => {
        const data: Table[] = JSON.parse(event.data);
        
        setTables((prev) => {
          const prevOrderIds = new Set(
            prev.flatMap((t) => t.orders.map((o) => o.id))
          );
          const newIds = new Set<number>();
          
          data.forEach((table) => {
            table.orders.forEach((order) => {
              if (!prevOrderIds.has(order.id)) {
                newIds.add(order.id);
              }
            });
          });

          if (newIds.size > 0) {
            setNewOrderIds(newIds);
            setTimeout(() => setNewOrderIds(new Set()), 3000);
          }

          return data;
        });

        setIsLoading(false);
        setError(null);
      };

      eventSource.onerror = () => {
        setError("실시간 연결 오류 - 재연결 중...");
        setIsLoading(false);
        eventSource?.close();
        retryTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      eventSource?.close();
      clearTimeout(retryTimeout);
    };
  }, []);

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await fetchWithAuth(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      setError("주문 상태 변경 실패");
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()}원`;
  };

  const getTableTotal = (orders: Order[]) => {
    return orders.reduce((sum, order) => sum + order.totalAmount, 0);
  };

  const getPreviewItems = (items: OrderItem[]) => {
    const preview = items.slice(0, 2);
    const remaining = items.length - 2;
    const text = preview.map((item) => `${item.menuItemName} x${item.quantity}`).join(", ");
    return remaining > 0 ? `${text} 외 ${remaining}개` : text;
  };

  if (isLoading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>실시간 주문 모니터링</h1>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <div className={styles.grid}>
        {tables.map((table) => {
          const hasNewOrder = table.orders.some((o) => newOrderIds.has(o.id));
          const totalAmount = getTableTotal(table.orders);

          return (
            <div
              key={table.id}
              className={`${styles.tableCard} ${hasNewOrder ? styles.hasNewOrder : ""}`}
            >
              <div className={styles.tableHeader}>
                <div className={styles.tableNumber}>테이블 {table.tableNumber}</div>
                <div className={styles.totalAmount}>{formatCurrency(totalAmount)}</div>
              </div>

              <div className={styles.ordersList}>
                {table.orders.length === 0 ? (
                  <div className={styles.emptyState}>주문 없음</div>
                ) : (
                  table.orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className={`${styles.orderItem} ${newOrderIds.has(order.id) ? styles.new : ""}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className={styles.orderHeader}>
                        <span className={styles.orderNumber}>주문 #{order.id}</span>
                        <span className={styles.orderTime}>{formatTime(order.createdAt)}</span>
                      </div>
                      <div className={styles.orderItems}>
                        {getPreviewItems(order.items)}
                      </div>
                      <div className={styles.orderFooter}>
                        <span className={styles.orderAmount}>
                          {formatCurrency(order.totalAmount)}
                        </span>
                        <select
                          className={styles.statusSelect}
                          value={order.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="PENDING">대기중</option>
                          <option value="PREPARING">준비중</option>
                          <option value="COMPLETED">완료</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedOrder && (
        <div className={styles.modal} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>주문 상세 #{selectedOrder.id}</h2>
              <button className={styles.closeButton} onClick={() => setSelectedOrder(null)}>
                ×
              </button>
            </div>
            <div>
              <p><strong>주문 시각:</strong> {new Date(selectedOrder.createdAt).toLocaleString("ko-KR")}</p>
              <p><strong>상태:</strong> {STATUS_LABELS[selectedOrder.status]}</p>
              <p><strong>총 금액:</strong> {formatCurrency(selectedOrder.totalAmount)}</p>
              <h3 style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>주문 메뉴</h3>
              {selectedOrder.items.map((item) => (
                <div key={item.id} className={styles.detailItem}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{item.menuItemName} x{item.quantity}</span>
                    <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
