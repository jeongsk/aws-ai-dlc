import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { errorResponse } from "@/lib/api-utils";
import type { TokenPayload, TableTokenPayload, AdminTokenPayload } from "@/types";

function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

export function authenticateTable(request: NextRequest): TableTokenPayload | ReturnType<typeof errorResponse> {
  const token = extractToken(request);
  if (!token) return errorResponse("인증이 필요합니다", 401);

  const payload = verifyToken(token);
  if (!payload) return errorResponse("유효하지 않은 토큰입니다", 401);
  if (payload.type !== "table") return errorResponse("접근 권한이 없습니다", 403);

  return payload as TableTokenPayload;
}

export function authenticateAdmin(request: NextRequest): AdminTokenPayload | ReturnType<typeof errorResponse> {
  const token = extractToken(request);
  if (!token) return errorResponse("인증이 필요합니다", 401);

  const payload = verifyToken(token);
  if (!payload) return errorResponse("유효하지 않은 토큰입니다", 401);
  if (payload.type !== "admin") return errorResponse("접근 권한이 없습니다", 403);

  return payload as AdminTokenPayload;
}

export function isErrorResponse(result: TokenPayload | ReturnType<typeof errorResponse>): result is ReturnType<typeof errorResponse> {
  return result !== null && typeof result === "object" && "status" in result && "headers" in result;
}
