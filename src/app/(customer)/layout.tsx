"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./customer-layout.module.css";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 로그인 페이지에서는 레이아웃 네비게이션 숨김
  if (pathname.includes("/login")) {
    return <>{children}</>;
  }

  // pathname에서 tableId 추출: /table/{tableId}/...
  const match = pathname.match(/\/table\/(\d+)/);
  const tableId = match ? match[1] : "";
  const basePath = `/table/${tableId}`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.tableBadge}>테이블 {tableId}</span>
      </header>
      <main className={styles.main}>{children}</main>
      <nav className={styles.bottomNav} aria-label="고객 메뉴 네비게이션">
        <Link
          href={basePath}
          className={`${styles.navItem} ${pathname === basePath ? styles.active : ""}`}
          data-testid="customer-nav-menu"
        >
          🍽️ 메뉴
        </Link>
        <Link
          href={`${basePath}/cart`}
          className={`${styles.navItem} ${pathname.includes("/cart") ? styles.active : ""}`}
          data-testid="customer-nav-cart"
        >
          🛒 장바구니
        </Link>
        <Link
          href={`${basePath}/orders`}
          className={`${styles.navItem} ${pathname.includes("/orders") ? styles.active : ""}`}
          data-testid="customer-nav-orders"
        >
          📋 주문내역
        </Link>
      </nav>
    </div>
  );
}
