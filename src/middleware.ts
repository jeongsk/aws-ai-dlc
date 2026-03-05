import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenEdge } from "@/lib/auth/jwt-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 관리자 페이지 보호
  if (pathname.startsWith("/admin") && !pathname.includes("/login")) {
    const token = request.cookies.get("admin_token")?.value || 
                  request.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = await verifyTokenEdge(token);
    if (!payload || payload.type !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 테이블 페이지 보호
  if (pathname.match(/^\/table\/\d+$/) || pathname.match(/^\/table\/\d+\/(cart|orders)/)) {
    const token = request.cookies.get("table_token")?.value || 
                  request.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      const tableId = pathname.match(/\/table\/(\d+)/)?.[1] || "0";
      return NextResponse.redirect(new URL(`/table/${tableId}/login`, request.url));
    }

    const payload = await verifyTokenEdge(token);
    if (!payload || payload.type !== "table") {
      const tableId = pathname.match(/\/table\/(\d+)/)?.[1] || "0";
      return NextResponse.redirect(new URL(`/table/${tableId}/login`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/table/:path*"],
};
