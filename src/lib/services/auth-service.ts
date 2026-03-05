import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createTableToken, createAdminToken } from "@/lib/auth/jwt";

const SALT_ROUNDS = 10;

export async function tableLogin(tableNumber: number, password: string) {
  const table = await prisma.table.findUnique({ where: { tableNumber } });
  if (!table) {
    throw new Error("인증 정보가 올바르지 않습니다");
  }

  const valid = await bcrypt.compare(password, table.password);
  if (!valid) {
    throw new Error("인증 정보가 올바르지 않습니다");
  }

  const token = createTableToken(table.id, table.tableNumber);
  return { token, tableId: table.id, tableNumber: table.tableNumber };
}

export async function adminLogin(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    throw new Error("인증 정보가 올바르지 않습니다");
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    throw new Error("인증 정보가 올바르지 않습니다");
  }

  const token = createAdminToken(admin.id, admin.username);
  return { token };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}
