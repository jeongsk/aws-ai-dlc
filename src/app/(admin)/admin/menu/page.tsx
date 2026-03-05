"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAdminAuth } from "@/hooks/use-auth";
import styles from "./menu.module.css";

interface Category {
  id: number;
  name: string;
  sortOrder: number;
  menuItems: MenuItem[];
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string | null;
  categoryId: number;
  sortOrder: number;
}

interface MenuFormData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
}

const emptyForm: MenuFormData = { name: "", price: "", description: "", categoryId: "" };

export default function MenuManagementPage() {
  const { fetchWithAuth } = useAdminAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<MenuFormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth("/api/menu/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data);
      else setError(data.error);
    } catch {
      setError("데이터를 불러오는데 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const openCreate = () => {
    setEditingItem(null);
    setForm({ ...emptyForm, categoryId: categories[0]?.id?.toString() || "" });
    setShowModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      price: String(item.price),
      description: item.description || "",
      categoryId: String(item.categoryId),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: form.name,
        price: parseInt(form.price, 10),
        description: form.description || undefined,
        categoryId: parseInt(form.categoryId, 10),
      };

      const url = editingItem ? `/api/menu/${editingItem.id}` : "/api/menu";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        await loadData();
      } else {
        setError(data.error);
      }
    } catch {
      setError("저장에 실패했습니다");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" 메뉴를 삭제하시겠습니까?`)) return;

    try {
      const res = await fetchWithAuth(`/api/menu/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) await loadData();
      else setError(data.error);
    } catch {
      setError("삭제에 실패했습니다");
    }
  };

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>메뉴 관리</h1>
        <button className={styles.addBtn} onClick={openCreate} data-testid="menu-add-button">
          + 메뉴 추가
        </button>
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      {categories.length === 0 ? (
        <p className={styles.empty}>등록된 카테고리가 없습니다</p>
      ) : (
        categories.map((cat) => (
          <section key={cat.id} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{cat.name}</h2>
            {cat.menuItems.length === 0 ? (
              <p className={styles.empty}>등록된 메뉴가 없습니다</p>
            ) : (
              <div className={styles.menuGrid}>
                {cat.menuItems.map((item) => (
                  <div key={item.id} className={styles.menuCard} data-testid={`menu-card-${item.id}`}>
                    <span className={styles.menuName}>{item.name}</span>
                    <span className={styles.menuPrice}>{item.price.toLocaleString()}원</span>
                    {item.description && <span className={styles.menuDesc}>{item.description}</span>}
                    <div className={styles.menuActions}>
                      <button className={styles.editBtn} onClick={() => openEdit(item)}>수정</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item.id, item.name)}>삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))
      )}

      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{editingItem ? "메뉴 수정" : "메뉴 추가"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="menuName" className={styles.label}>메뉴명</label>
                <input
                  id="menuName"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="메뉴명 입력"
                  data-testid="menu-form-name"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="menuPrice" className={styles.label}>가격 (원)</label>
                <input
                  id="menuPrice"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  min={0}
                  placeholder="가격 입력"
                  data-testid="menu-form-price"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="menuDesc" className={styles.label}>설명 (선택)</label>
                <input
                  id="menuDesc"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="메뉴 설명 입력"
                  data-testid="menu-form-description"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="menuCategory" className={styles.label}>카테고리</label>
                <select
                  id="menuCategory"
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  required
                  style={{ padding: "12px 16px", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", fontSize: "1rem", minHeight: "44px" }}
                  data-testid="menu-form-category"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>취소</button>
                <button type="submit" className={styles.submitBtn} disabled={submitting} data-testid="menu-form-submit">
                  {submitting ? "저장 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
