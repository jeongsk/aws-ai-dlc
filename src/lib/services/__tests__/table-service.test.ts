import { prisma } from '@/lib/db';
import * as tableService from '../table-service';

jest.mock('@/lib/db', () => ({
  prisma: {
    table: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    order: {
      deleteMany: jest.fn(),
    },
    orderHistory: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock('../auth-service', () => ({
  hashPassword: jest.fn((password) => Promise.resolve(`hashed_${password}`)),
}));

describe('Table Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTables', () => {
    it('모든 테이블을 반환해야 함', async () => {
      const mockTables = [
        { id: 1, tableNumber: 1, orders: [] },
        { id: 2, tableNumber: 2, orders: [] },
      ];
      (prisma.table.findMany as jest.Mock).mockResolvedValue(mockTables);

      const result = await tableService.getTables();

      expect(result).toEqual(mockTables);
      expect(prisma.table.findMany).toHaveBeenCalledWith({
        orderBy: { tableNumber: 'asc' },
        include: {
          orders: {
            where: { status: { not: 'COMPLETED' } },
            include: { items: true },
          },
        },
      });
    });
  });

  describe('getTable', () => {
    it('특정 테이블을 반환해야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 1,
        orders: [],
      };
      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);

      const result = await tableService.getTable(1);

      expect(result).toEqual(mockTable);
      expect(prisma.table.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          orders: {
            include: { items: true },
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    });
  });

  describe('createTable', () => {
    it('새 테이블을 생성해야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        password: 'hashed_password123',
      };
      (prisma.table.create as jest.Mock).mockResolvedValue(mockTable);

      const result = await tableService.createTable(5, 'password123');

      expect(result).toEqual(mockTable);
      expect(prisma.table.create).toHaveBeenCalledWith({
        data: {
          tableNumber: 5,
          password: 'hashed_password123',
        },
      });
    });
  });

  describe('completeTableSession', () => {
    it('테이블 세션을 완료해야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        sessionId: 'session-123',
        orders: [
          {
            id: 1,
            totalAmount: 15000,
            createdAt: new Date(),
            items: [{ id: 1, menuItemName: '피자', quantity: 1, unitPrice: 15000 }],
          },
        ],
      };

      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);
      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        return callback({
          orderHistory: { create: jest.fn() },
          order: { deleteMany: jest.fn() },
          table: { update: jest.fn() },
        });
      });

      await tableService.completeTableSession(1);

      expect(prisma.table.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          orders: { include: { items: true } },
        },
      });
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('테이블이 없으면 에러를 발생시켜야 함', async () => {
      (prisma.table.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(tableService.completeTableSession(999)).rejects.toThrow(
        '테이블을 찾을 수 없습니다'
      );
    });

    it('활성 세션이 없으면 에러를 발생시켜야 함', async () => {
      const mockTable = {
        id: 1,
        tableNumber: 5,
        sessionId: null,
        orders: [],
      };
      (prisma.table.findUnique as jest.Mock).mockResolvedValue(mockTable);

      await expect(tableService.completeTableSession(1)).rejects.toThrow(
        '활성 세션이 없습니다'
      );
    });
  });

  describe('getTableHistory', () => {
    it('테이블 히스토리를 반환해야 함', async () => {
      const mockHistory = [
        {
          id: 1,
          tableId: 1,
          sessionId: 'session-123',
          totalAmount: 15000,
        },
      ];
      (prisma.orderHistory.findMany as jest.Mock).mockResolvedValue(mockHistory);

      const result = await tableService.getTableHistory(1);

      expect(result).toEqual(mockHistory);
      expect(prisma.orderHistory.findMany).toHaveBeenCalledWith({
        where: { tableId: 1 },
        orderBy: { completedAt: 'desc' },
      });
    });
  });
});
