export type OrderStatus = "PENDING" | "PREPARING" | "COMPLETED";

export interface TableTokenPayload {
  tableId: number;
  tableNumber: number;
  type: "table";
  iat?: number;
  exp?: number;
}

export interface AdminTokenPayload {
  adminId: number;
  username: string;
  type: "admin";
  iat?: number;
  exp?: number;
}

export type TokenPayload = TableTokenPayload | AdminTokenPayload;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CreateOrderInput {
  tableId: number;
  sessionId: string;
  items: { menuItemId: number; quantity: number }[];
}

export interface CreateMenuItemInput {
  name: string;
  price: number;
  description?: string;
  categoryId: number;
  sortOrder?: number;
}

export interface UpdateMenuItemInput {
  name?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  sortOrder?: number;
}

export interface OrderEvent {
  type: "ORDER_CREATED" | "ORDER_STATUS_CHANGED" | "ORDER_DELETED";
  data: Record<string, unknown>;
}

export interface TableEvent {
  type: "TABLE_SESSION_COMPLETED";
  data: { tableId: number };
}
