import { prisma } from '@/lib/db';
import * as menuService from '../menu-service';

jest.mock('@/lib/db', () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
    },
    menuItem: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

describe('Menu Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('모든 카테고리를 반환해야 함', async () => {
      const mockCategories = [
        { id: 1, name: '메인', sortOrder: 0, menuItems: [] },
        { id: 2, name: '사이드', sortOrder: 1, menuItems: [] },
      ];
      (prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

      const result = await menuService.getCategories();

      expect(result).toEqual(mockCategories);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        orderBy: { sortOrder: 'asc' },
        include: { menuItems: { orderBy: { sortOrder: 'asc' } } },
      });
    });
  });

  describe('getMenuItems', () => {
    it('모든 메뉴 아이템을 반환해야 함', async () => {
      const mockItems = [
        { id: 1, name: '피자', price: 15000, categoryId: 1 },
      ];
      (prisma.menuItem.findMany as jest.Mock).mockResolvedValue(mockItems);

      const result = await menuService.getMenuItems();

      expect(result).toEqual(mockItems);
      expect(prisma.menuItem.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { sortOrder: 'asc' },
        include: { category: true },
      });
    });

    it('특정 카테고리의 메뉴 아이템을 반환해야 함', async () => {
      const mockItems = [
        { id: 1, name: '피자', price: 15000, categoryId: 1 },
      ];
      (prisma.menuItem.findMany as jest.Mock).mockResolvedValue(mockItems);

      const result = await menuService.getMenuItems(1);

      expect(result).toEqual(mockItems);
      expect(prisma.menuItem.findMany).toHaveBeenCalledWith({
        where: { categoryId: 1 },
        orderBy: { sortOrder: 'asc' },
        include: { category: true },
      });
    });
  });

  describe('getMenuItem', () => {
    it('특정 메뉴 아이템을 반환해야 함', async () => {
      const mockItem = { id: 1, name: '피자', price: 15000 };
      (prisma.menuItem.findUnique as jest.Mock).mockResolvedValue(mockItem);

      const result = await menuService.getMenuItem(1);

      expect(result).toEqual(mockItem);
      expect(prisma.menuItem.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { category: true },
      });
    });
  });

  describe('createMenuItem', () => {
    it('새 메뉴 아이템을 생성해야 함', async () => {
      const input = {
        name: '피자',
        price: 15000,
        description: '맛있는 피자',
        categoryId: 1,
      };
      const mockCreated = { id: 1, ...input, sortOrder: 0 };
      (prisma.menuItem.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await menuService.createMenuItem(input);

      expect(result).toEqual(mockCreated);
      expect(prisma.menuItem.create).toHaveBeenCalledWith({
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          categoryId: input.categoryId,
          sortOrder: 0,
        },
        include: { category: true },
      });
    });

    it('sortOrder가 지정된 메뉴 아이템을 생성해야 함', async () => {
      const input = {
        name: '피자',
        price: 15000,
        categoryId: 1,
        sortOrder: 5,
      };
      const mockCreated = { id: 1, ...input };
      (prisma.menuItem.create as jest.Mock).mockResolvedValue(mockCreated);

      await menuService.createMenuItem(input);

      expect(prisma.menuItem.create).toHaveBeenCalledWith({
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          categoryId: input.categoryId,
          sortOrder: 5,
        },
        include: { category: true },
      });
    });
  });

  describe('updateMenuItem', () => {
    it('메뉴 아이템을 업데이트해야 함', async () => {
      const updateData = { name: '새 피자', price: 18000 };
      const mockUpdated = { id: 1, ...updateData };
      (prisma.menuItem.update as jest.Mock).mockResolvedValue(mockUpdated);

      const result = await menuService.updateMenuItem(1, updateData);

      expect(result).toEqual(mockUpdated);
      expect(prisma.menuItem.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        include: { category: true },
      });
    });
  });

  describe('deleteMenuItem', () => {
    it('메뉴 아이템을 삭제해야 함', async () => {
      const mockDeleted = { id: 1, name: '피자' };
      (prisma.menuItem.delete as jest.Mock).mockResolvedValue(mockDeleted);

      const result = await menuService.deleteMenuItem(1);

      expect(result).toEqual(mockDeleted);
      expect(prisma.menuItem.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('reorderMenuItems', () => {
    it('메뉴 아이템 순서를 변경해야 함', async () => {
      const items = [
        { id: 1, sortOrder: 2 },
        { id: 2, sortOrder: 1 },
      ];
      
      const mockUpdate = jest.fn().mockResolvedValue({});
      (prisma.$transaction as jest.Mock).mockImplementation((operations) => {
        return Promise.all(operations);
      });
      (prisma.menuItem.update as jest.Mock).mockImplementation(mockUpdate);

      await menuService.reorderMenuItems(items);

      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });
});
