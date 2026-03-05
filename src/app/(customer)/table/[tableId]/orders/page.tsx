"use client";

import { useState, useEffect } from "react";
import { useTableAuth } from "@/hooks/use-auth";
import styles from "./orders.module.css";

interface OrderItem {
  id: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  status: "PENDING" | "PREPARING" | "COMPLETED";
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "대기중",
  PREPARING: "준비중",
  COMPLETED: "완료",
};

const STATUS_CLASS: Record<string, string> = {
  PENDING: styles.badgePending,
  PREPARING: styles.badgePreparing,
  COMPLETED: styles.badgeCompleted,
};

export default function OrdersPage() {
  const { fetchWithAuth } = useTableAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchWithAuth]);

  if (loading) return <div className={styles.loading}>주문내역을 불러오는 중...</div>;
  if (orders.length === 0) return <div className={styles.empty}>주문내역이 없습니다</div>;

  return (
    <div className={styles.list}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <span className={styles.orderNumber}>주문 #{order.id}</span>
            <span className={`${styles.badge} ${STATUS_CLASS[order.status]}`}>
              {STATUS_LABEL[order.status]}
            </span>
          </div>
          <div className={styles.orderItems}>
            {order.items.map((item) => (
              <div key={item.id}>
                {item.menuItemName} × {item.quantity} ({(item.unitPrice * item.quantity).toLocaleString()}원)
              </div>
            ))}
          </div>
          <div className={styles.orderFooter}>
            <span className={styles.orderTotal}>{order.totalAmount.toLocaleString()}원</span>
            <span className={styles.orderTime}>{new Date(order.createdAt).toLocaleTimeString("ko-KR")}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
