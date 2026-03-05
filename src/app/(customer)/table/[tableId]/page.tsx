"use client";

import { useState, useEffect, useCallback } from "react";
import { useTableAuth } from "@/hooks/use-auth";
import styles from "./menu.module.css";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string | null;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  menuItems: MenuItem[];
}

const CART_KEY = "table_cart";

function getCart(): Record<number, { item: MenuItem; quantity: number }> {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCart(cart: Record<number, { item: MenuItem; quantity: number }>) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export default function MenuPage() {
  const { fetchWithAuth } = useTableAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetchWithAuth("/api/menu/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
          if (data.data.length > 0) setActiveCategory(data.data[0].id);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchWithAuth]);

  const addToCart = useCallback((item: MenuItem) => {
    const cart = getCart();
    if (cart[item.id]) {
      cart[item.id].quantity += 1;
    } else {
      cart[item.id] = { item, quantity: 1 };
    }
    saveCart(cart);
    setToast(`${item.name} 추가됨`);
    setTimeout(() => setToast(null), 1500);
  }, []);

  if (loading) return <div className={styles.loading}>메뉴를 불러오는 중...</div>;

  const current = categories.find((c) => c.id === activeCategory);

  return (
    <div>
      <nav className={styles.categories} aria-label="카테고리 목록">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${cat.id === activeCategory ? styles.active : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      {current && current.menuItems.length > 0 ? (
        <div className={styles.menuGrid}>
          {current.menuItems.map((item) => (
            <div key={item.id} className={styles.menuCard}>
              <span className={styles.menuName}>{item.name}</span>
              {item.description && <span className={styles.menuDesc}>{item.description}</span>}
              <div className={styles.menuBottom}>
                <span className={styles.menuPrice}>{item.price.toLocaleString()}원</span>
                <button className={styles.addBtn} onClick={() => addToCart(item)} aria-label={`${item.name} 장바구니에 추가`}>
                  담기
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>메뉴가 없습니다</div>
      )}

      {toast && <div className={styles.toast} role="status">{toast}</div>}
    </div>
  );
}
