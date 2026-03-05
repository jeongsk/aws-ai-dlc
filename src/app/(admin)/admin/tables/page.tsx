"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAdminAuth } from "@/hooks/use-auth";
import styles from "./tables.module.css";

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

interface HistoryItem {
  id: number;
  orderNumber: number;
  items: string;
  totalAmount: number;
  orderedAt: string;
  completedAt: string;
}

export default function TableManagementPage() {
  const { fetchWithAuth } = useAdminAuth();
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyTableNum, setHistoryTableNum] = useState(0);
  const [form, setForm] = useState({ tableNumber: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const loadTables = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth("/api/tables");
      const data = await res.json();
      if (data.success) setTables(data.data);
      else setError(data.error);
    } catch {
      setError("데이터를 불러오는데 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadTables(); }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetchWithAuth("/api/tables", {
        method: "POST",
        body: JSON.stringify({
          tableNumber: parseInt(form.tableNumber, 10),
          password: form.password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setForm({ tableNumber: "", password: "" });
        await loadTables();
      } else {
        setError(data.error);
      }
    } catch {
      setError("테이블 등록에 실패했습니다");
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (tableId: number, tableNumber: number) => {
    if (!confirm(`테이블 ${tableNumber}의 이용을 완료하시겠습니까?\n현재 주문이 모두 이력으로 이동됩니다.`)) return;

    try {
      const res = await fetchWithAuth(`/api/tables/${tableId}/complete`, { method: "POST" });
      const data = await res.json();
      if (data.success) await loadTables();
      else setError(data.error);
    } catch {
      setError("이용 완료 처리에 실패했습니다");
    }
  };

  const handleShowHistory = async (tableId: number, tableNumber: number) => {
    try {
      const res = await fetchWithAuth(`/api/tables/${tableId}/history`);
      const data = await res.json();
      if (data.success) {
        setHistory(data.data);
        setHistoryTableNum(tableNumber);
        setShowHistoryModal(true);
      } else {
        setError(data.error);
      }
    } catch {
      setError("주문 내역 조회에 실패했습니다");
    }
  };

  const getTableTotal = (table: Table) =>
    table.orders.reduce((sum, o) => sum + o.totalAmount, 0);

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>테이블 관리</h1>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)} data-testid="table-add-button">
          + 테이블 추가
        </button>
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      {tables.length === 0 ? (
        <p className={styles.empty}>등록된 테이블이 없습니다</p>
      ) : (
        <div className={styles.tableGrid}>
          {tables.map((table) => {
            const isActive = !!table.sessionId;
            const total = getTableTotal(table);
            return (
              <div
                key={table.id}
                className={`${styles.tableCard} ${isActive ? styles.active : ""}`}
                data-testid={`table-card-${table.tableNumber}`}
              >
                <div className={styles.tableHeader}>
                  <span className={styles.tableNumber}>테이블 {table.tableNumber}</span>
                  <span className={`${styles.badge} ${isActive ? styles.badgeActive : styles.badgeIdle}`}>
                    {isActive ? "이용중" : "대기"}
                  </span>
                </div>
                <div className={styles.orderSummary}>
                  주문 {table.orders.length}건 · <span className={styles.totalAmount}>{total.toLocaleString()}원</span>
                </div>
                <div className={styles.tableActions}>
                  <button
                    className={styles.completeBtn}
                    onClick={() => handleComplete(table.id, table.tableNumber)}
                    disabled={!isActive}
                    data-testid={`table-complete-${table.tableNumber}`}
                  >
                    이용 완료
                  </button>
                  <button
                    className={styles.historyBtn}
                    onClick={() => handleShowHistory(table.id, table.tableNumber)}
                  >
                    내역
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 테이블 추가 모달 */}
      {showAddModal && (
        <div className={styles.overlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>테이블 추가</h2>
            <form onSubmit={handleAdd} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="tableNum" className={styles.label}>테이블 번호</label>
                <input
                  id="tableNum"
                  type="number"
                  value={form.tableNumber}
                  onChange={(e) => setForm({ ...form, tableNumber: e.target.value })}
                  required
                  min={1}
                  placeholder="테이블 번호 입력"
                  data-testid="table-form-number"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="tablePw" className={styles.label}>비밀번호 (최소 8자)</label>
                <input
                  id="tablePw"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={8}
                  placeholder="비밀번호 입력"
                  data-testid="table-form-password"
                />
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowAddModal(false)}>취소</button>
                <button type="submit" className={styles.submitBtn} disabled={submitting} data-testid="table-form-submit">
                  {submitting ? "등록 중..." : "등록"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 주문 내역 모달 */}
      {showHistoryModal && (
        <div className={styles.overlay} onClick={() => setShowHistoryModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>테이블 {historyTableNum} - 과거 주문 내역</h2>
            {history.length === 0 ? (
              <p className={styles.empty}>과거 주문 내역이 없습니다</p>
            ) : (
              history.map((h) => (
                <div key={h.id} className={styles.historyItem}>
                  <div className={styles.historyDate}>
                    {new Date(h.orderedAt).toLocaleString("ko-KR")} → {new Date(h.completedAt).toLocaleString("ko-KR")}
                  </div>
                  <div className={styles.historyAmount}>{h.totalAmount.toLocaleString()}원</div>
                </div>
              ))
            )}
            <button className={styles.closeBtn} onClick={() => setShowHistoryModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
