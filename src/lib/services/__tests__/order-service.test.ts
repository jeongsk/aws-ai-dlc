import { prisma } from '@/lib/db';
import * as orderService from '../order-service';

jest.mock('@/lib/db', () => ({
  prisma: {
    table: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    menuItem: {
      findMany: jest.fn(),
    },
    order: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('Order Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('새 주문을 생성해야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        sessionId: 'session-123',
      };
      const mockMenuItems = [
        { id: 1, name: '피자', price: 15000 },
        { id: 2, name: '콜라', price: 2000 },
      ];
      const mockOrder = {
        id: 1,
        tableId: 1,
        sessionId: 'session-123',
        totalAmount: 19000,
        items: [
          { menuItemName: '피자', quantity: 1, unitPrice: 15000 },
          { menuItemName: '콜라', quantity: 2, unitPrice: 2000 },
        ],
      };

      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);
      (prisma.menuItem.findMany as jest.Mock).mockResolvedValue(mockMenuItems);
      (prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);

      const input = {
        tableId: 1,
        sessionId: 'session-123',
        items: [
          { menuItemId: 1, quantity: 1 },
          { menuItemId: 2, quantity: 2 },
        ],
      };

      const result = await orderService.createOrder(input);

      expect(result).toEqual(mockOrder);
      expect(prisma.order.create).toHaveBeenCalledWith({
        data: {
          tableId: 1,
          sessionId: 'session-123',
          totalAmount: 19000,
          items: {
            create: [
              { menuItemName: '피자', quantity: 1, unitPrice: 15000 },
              { menuItemName: '콜라', quantity: 2, unitPrice: 2000 },
            ],
          },
        },
        include: { items: true },
      });
    });

    it('첫 주문 시 세션을 시작해야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        sessionId: null,
      };
      const mockMenuItems = [{ id: 1, name: '피자', price: 15000 }];
      const mockOrder = {
        id: 1,
        tableId: 1,
        sessionId: 'new-session',
        totalAmount: 15000,
        items: [],
      };

      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);
      (prisma.table.update as jest.Mock).mockResolvedValue({
        ...mockTable,
        sessionId: 'new-session',
      });
      (prisma.menuItem.findMany as jest.Mock).mockResolvedValue(mockMenuItems);
      (prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);

      const input = {
        tableId: 1,
        sessionId: 'new-session',
        items: [{ menuItemId: 1, quantity: 1 }],
      };

      await orderService.createOrder(input);

      expect(prisma.table.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { sessionId: 'new-session' },
      });
    });

    it('테이블이 없으면 에러를 발생시켜야 함', async () => {
      (prisma.table.findUnique as jest.Mock).mockResolvedValue(null);

      const input = {
        tableId: 999,
        sessionId: 'session-123',
        items: [{ menuItemId: 1, quantity: 1 }],
      };

      await expect(orderService.createOrder(input)).rejects.toThrow(
        '테이블을 찾을 수 없습니다'
      );
    });

    it('메뉴 아이템이 없으면 에러를 발생시켜야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        sessionId: 'session-123',
      };

      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);
      (prisma.menuItem.findMany as jest.Mock).mockResolvedValue([]);

      const input = {
        tableId: 1,
        sessionId: 'session-123',
        items: [{ menuItemId: 999, quantity: 1 }],
      };

      await expect(orderService.createOrder(input)).rejects.toThrow(
        '메뉴를 찾을 수 없습니다: 999'
      );
    });
  });

  describe('getOrdersByTable', () => {
    it('테이블의 주문 목록을 반환해야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        sessionId: 'session-123',
      };
      const mockOrders = [
        {
          id: 1,
          tableId: 1,
          sessionId: 'session-123',
          totalAmount: 15000,
          items: [],
        },
      ];

      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);
      (prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders);

      const result = await orderService.getOrdersByTable(1);

      expect(result).toEqual(mockOrders);
      expect(prisma.order.findMany).toHaveBeenCalledWith({
        where: { tableId: 1, sessionId: 'session-123' },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('세션이 없으면 빈 배열을 반환해야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        sessionId: null,
      };

      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);

      const result = await orderService.getOrdersByTable(1);

      expect(result).toEqual([]);
      expect(prisma.order.findMany).not.toHaveBeenCalled();
    });

    it('테이블이 없으면 빈 배열을 반환해야 함', async () => {
      (prisma.table.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await orderService.getOrdersByTable(999);

      expect(result).toEqual([]);
    });
  });
});
