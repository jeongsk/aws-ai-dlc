"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

export function useAdminAuth() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const getToken = useCallback(() => {
    return localStorage.getItem("admin_token");
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("admin_token");
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "admin" }),
    }).catch(() => {});
    routerRef.current.push("/admin/login");
  }, []);

  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      };
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
      const res = await fetch(url, { ...options, headers });

      if (res.status === 401) {
        await logout();
        throw new Error("인증이 만료되었습니다");
      }
      return res;
    },
    [logout],
  );

  return { getToken, logout, fetchWithAuth };
}

export function useTableAuth() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const getToken = useCallback(() => {
    return localStorage.getItem("table_token");
  }, []);

  const getTableId = useCallback(() => {
    return localStorage.getItem("table_id");
  }, []);

  const getTableNumber = useCallback(() => {
    return localStorage.getItem("table_number");
  }, []);

  const logout = useCallback(async () => {
    const tableId = localStorage.getItem("table_id") || "0";
    localStorage.removeItem("table_token");
    localStorage.removeItem("table_id");
    localStorage.removeItem("table_number");
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "table" }),
    }).catch(() => {});
    routerRef.current.push(`/table/${tableId}/login`);
  }, []);

  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = localStorage.getItem("table_token");
      const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      };
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
      const res = await fetch(url, { ...options, headers });

      if (res.status === 401) {
        await logout();
        throw new Error("인증이 만료되었습니다");
      }
      return res;
    },
    [logout],
  );

  return { getToken, getTableId, getTableNumber, logout, fetchWithAuth };
}
