import { prisma } from '@/lib/db';
import * as authService from '../auth-service';
import bcrypt from 'bcryptjs';

jest.mock('@/lib/db', () => ({
  prisma: {
    table: {
      findUnique: jest.fn(),
    },
    admin: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('@/lib/auth/jwt', () => ({
  createTableToken: jest.fn(() => 'table-token'),
  createAdminToken: jest.fn(() => 'admin-token'),
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('tableLogin', () => {
    it('올바른 자격증명으로 로그인해야 함', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      (prisma.table.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        tableNumber: 5,
        password: hashedPassword,
      });

      const result = await authService.tableLogin(5, 'password123');

      expect(result).toEqual({
        token: 'table-token',
        tableId: 1,
        tableNumber: 5,
      });
    });

    it('존재하지 않는 테이블은 에러를 발생시켜야 함', async () => {
      (prisma.table.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(authService.tableLogin(999, 'password')).rejects.toThrow(
        '인증 정보가 올바르지 않습니다'
      );
    });

    it('잘못된 비밀번호는 에러를 발생시켜야 함', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      (prisma.table.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        tableNumber: 5,
        password: hashedPassword,
      });

      await expect(authService.tableLogin(5, 'wrongpassword')).rejects.toThrow(
        '인증 정보가 올바르지 않습니다'
      );
    });
  });

  describe('adminLogin', () => {
    it('올바른 자격증명으로 관리자 로그인해야 함', async () => {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        username: 'admin',
        password: hashedPassword,
      });

      const result = await authService.adminLogin('admin', 'admin123');

      expect(result).toEqual({
        token: 'admin-token',
      });
    });

    it('존재하지 않는 관리자는 에러를 발생시켜야 함', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(authService.adminLogin('unknown', 'password')).rejects.toThrow(
        '인증 정보가 올바르지 않습니다'
      );
    });

    it('잘못된 비밀번호는 에러를 발생시켜야 함', async () => {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        username: 'admin',
        password: hashedPassword,
      });

      await expect(authService.adminLogin('admin', 'wrongpassword')).rejects.toThrow(
        '인증 정보가 올바르지 않습니다'
      );
    });
  });

  describe('hashPassword', () => {
    it('비밀번호를 해시해야 함', async () => {
      const password = 'mypassword';
      const hashed = await authService.hashPassword(password);

      expect(hashed).toBeTruthy();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(20);
    });

    it('같은 비밀번호도 다른 해시를 생성해야 함', async () => {
      const password = 'mypassword';
      const hash1 = await authService.hashPassword(password);
      const hash2 = await authService.hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });

    it('해시된 비밀번호는 검증 가능해야 함', async () => {
      const password = 'mypassword';
      const hashed = await authService.hashPassword(password);
      const isValid = await bcrypt.compare(password, hashed);

      expect(isValid).toBe(true);
    });
  });
});
