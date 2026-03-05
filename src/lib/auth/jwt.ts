import jwt from "jsonwebtoken";
import type { TokenPayload, TableTokenPayload, AdminTokenPayload } from "@/types";

const ADMIN_TOKEN_EXPIRY = "16h";
const TABLE_TOKEN_EXPIRY = "8h";

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET 환경변수가 설정되지 않았습니다");
  }
  return secret;
}

export function createTableToken(tableId: number, tableNumber: number): string {
  const payload: Omit<TableTokenPayload, "iat" | "exp"> = {
    tableId,
    tableNumber,
    type: "table",
  };
  return jwt.sign(payload, getSecret(), { expiresIn: TABLE_TOKEN_EXPIRY });
}

export function createAdminToken(adminId: number, username: string): string {
  const payload: Omit<AdminTokenPayload, "iat" | "exp"> = {
    adminId,
    username,
    type: "admin",
  };
  return jwt.sign(payload, getSecret(), { expiresIn: ADMIN_TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, getSecret()) as TokenPayload;
  } catch {
    return null;
  }
}
