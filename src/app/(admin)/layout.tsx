"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./admin-layout.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 로그인 페이지에서는 레이아웃 네비게이션 숨김
  if (pathname.includes("/login")) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.title}>테이블오더 관리</span>
        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
          data-testid="admin-logout-button"
        >
          로그아웃
        </button>
      </header>
      <nav className={styles.topNav} aria-label="관리자 메뉴 네비게이션">
        <Link
          href="/admin"
          className={`${styles.navItem} ${pathname === "/admin" ? styles.active : ""}`}
          data-testid="admin-nav-dashboard"
        >
          📊 대시보드
        </Link>
        <Link
          href="/admin/menu"
          className={`${styles.navItem} ${pathname === "/admin/menu" ? styles.active : ""}`}
          data-testid="admin-nav-menu"
        >
          🍽️ 메뉴 관리
        </Link>
        <Link
          href="/admin/tables"
          className={`${styles.navItem} ${pathname === "/admin/tables" ? styles.active : ""}`}
          data-testid="admin-nav-tables"
        >
          🪑 테이블 관리
        </Link>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
