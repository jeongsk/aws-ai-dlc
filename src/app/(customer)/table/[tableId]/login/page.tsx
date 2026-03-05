"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./login.module.css";

export default function TableLoginPage() {
  const router = useRouter();
  const params = useParams();
  const tableId = params.tableId as string;

  const [tableNumber, setTableNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("table_token");
    if (token) {
      fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res.ok) window.location.href = `/table/${tableId}`;
        else {
          localStorage.removeItem("table_token");
          localStorage.removeItem("table_id");
          localStorage.removeItem("table_number");
        }
      }).catch(() => {
        localStorage.removeItem("table_token");
        localStorage.removeItem("table_id");
        localStorage.removeItem("table_number");
      });
    }
  }, [router, tableId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/table-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: parseInt(tableNumber, 10),
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "로그인에 실패했습니다");
        return;
      }

      localStorage.setItem("table_token", data.data.token);
      localStorage.setItem("table_id", String(data.data.tableId));
      localStorage.setItem("table_number", String(data.data.tableNumber));
      window.location.href = `/table/${data.data.tableId}`;
    } catch {
      setError("서버 연결에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>테이블 로그인</h1>
        <p className={styles.subtitle}>테이블 번호와 비밀번호를 입력해주세요</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="tableNumber" className={styles.label}>
              테이블 번호
            </label>
            <input
              id="tableNumber"
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="테이블 번호 입력"
              required
              min={1}
              disabled={isLoading}
              data-testid="table-login-number-input"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력 (최소 6자)"
              required
              minLength={6}
              disabled={isLoading}
              data-testid="table-login-password-input"
            />
          </div>

          {error && (
            <p className={styles.error} role="alert" data-testid="table-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
            data-testid="table-login-submit-button"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
