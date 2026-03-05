"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTableAuth } from "@/hooks/use-auth";
import styles from "./cart.module.css";

interface CartMenuItem {
  id: number;
  name: string;
  price: number;
}

interface CartEntry {
  item: CartMenuItem;
  quantity: number;
}

const CART_KEY = "table_cart";

function getCart(): Record<string, CartEntry> {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCart(cart: Record<string, CartEntry>) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export default function CartPage() {
  const params = useParams();
  const router = useRouter();
  const tableId = params.tableId as string;
  const { fetchWithAuth } = useTableAuth();

  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [ordering, setOrdering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<number | null>(null);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const entries = Object.values(cart);
  const total = entries.reduce((sum, e) => sum + e.item.price * e.quantity, 0);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id] = { ...next[id], quantity: next[id].quantity + delta };
      if (next[id].quantity <= 0) delete next[id];
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    saveCart({});
    setCart({});
  }, []);

  const placeOrder = async () => {
    setOrdering(true);
    setError(null);
    try {
      const items = entries.map((e) => ({
        menuItemId: e.item.id,
        quantity: e.quantity,
      }));

      const sessionId = localStorage.getItem("table_session_id") || crypto.randomUUID();
      localStorage.setItem("table_session_id", sessionId);

      const res = await fetchWithAuth("/api/orders", {
        method: "POST",
        body: JSON.stringify({ items, sessionId }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "주문에 실패했습니다");
        return;
      }

      saveCart({});
      setCart({});
      setSuccess(data.data.id);

      setTimeout(() => {
        router.push(`/table/${tableId}`);
      }, 5000);
    } catch {
      setError("서버 연결에 실패했습니다");
    } finally {
      setOrdering(false);
    }
  };

  if (success !== null) {
    return (
      <div className={styles.successOverlay}>
        <div className={styles.successCard} role="alert">
          <div className={styles.successIcon}>✅</div>
          <div className={styles.successTitle}>주문이 완료되었습니다!</div>
          <div className={styles.successSub}>주문번호: {success}<br />5초 후 메뉴 화면으로 이동합니다</div>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>장바구니가 비어있습니다</p>
        <Link href={`/table/${tableId}`} className={styles.emptyLink}>메뉴 보러가기</Link>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.list}>
        {entries.map((entry) => (
          <div key={entry.item.id} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{entry.item.name}</span>
              <span className={styles.itemPrice}>{(entry.item.price * entry.quantity).toLocaleString()}원</span>
            </div>
            <div className={styles.itemActions}>
              <button className={styles.qtyBtn} onClick={() => updateQty(String(entry.item.id), -1)} aria-label="수량 감소">−</button>
              <span className={styles.qty}>{entry.quantity}</span>
              <button className={styles.qtyBtn} onClick={() => updateQty(String(entry.item.id), 1)} aria-label="수량 증가">+</button>
              <button className={styles.removeBtn} onClick={() => removeItem(String(entry.item.id))} aria-label={`${entry.item.name} 삭제`}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          <span>총 금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.orderBtn} onClick={placeOrder} disabled={ordering}>
          {ordering ? "주문 중..." : `${total.toLocaleString()}원 주문하기`}
        </button>
        <button className={styles.clearBtn} onClick={clearCart}>장바구니 비우기</button>
      </div>
    </div>
  );
}
