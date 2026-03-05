/**
 * @jest-environment node
 */
import { verifyTokenEdge } from '../jwt-edge';
import jwt from 'jsonwebtoken';

describe('JWT Edge', () => {
  const originalEnv = process.env.JWT_SECRET;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalEnv;
  });

  describe('verifyTokenEdge', () => {
    it('유효한 토큰을 검증해야 함', async () => {
      const payload = {
        tableId: 1,
        tableNumber: 5,
        type: 'table' as const,
      };
      const token = jwt.sign(payload, 'test-secret-key', { expiresIn: '1h' });

      const result = await verifyTokenEdge(token);

      expect(result).toBeTruthy();
      expect(result?.tableId).toBe(1);
      expect(result?.type).toBe('table');
    });

    it('잘못된 토큰은 null을 반환해야 함', async () => {
      const result = await verifyTokenEdge('invalid-token');
      expect(result).toBeNull();
    });

    it('만료된 토큰은 null을 반환해야 함', async () => {
      const payload = {
        tableId: 1,
        tableNumber: 5,
        type: 'table' as const,
      };
      const token = jwt.sign(payload, 'test-secret-key', { expiresIn: '-1h' });

      const result = await verifyTokenEdge(token);
      expect(result).toBeNull();
    });

    it('잘못된 서명은 null을 반환해야 함', async () => {
      const payload = {
        tableId: 1,
        tableNumber: 5,
        type: 'table' as const,
      };
      const token = jwt.sign(payload, 'wrong-secret', { expiresIn: '1h' });

      const result = await verifyTokenEdge(token);
      expect(result).toBeNull();
    });

    it('JWT_SECRET이 없으면 null을 반환해야 함', async () => {
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      const result = await verifyTokenEdge('any-token');
      expect(result).toBeNull();

      process.env.JWT_SECRET = originalSecret;
    });

    it('잘못된 형식의 토큰은 null을 반환해야 함', async () => {
      const result = await verifyTokenEdge('not.a.valid.jwt.format');
      expect(result).toBeNull();
    });

    it('관리자 토큰도 검증해야 함', async () => {
      const payload = {
        adminId: 1,
        username: 'admin',
        type: 'admin' as const,
      };
      const token = jwt.sign(payload, 'test-secret-key', { expiresIn: '1h' });

      const result = await verifyTokenEdge(token);

      expect(result).toBeTruthy();
      expect(result?.adminId).toBe(1);
      expect(result?.type).toBe('admin');
    });
  });
});
