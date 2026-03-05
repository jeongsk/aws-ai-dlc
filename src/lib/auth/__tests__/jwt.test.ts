import { createTableToken, createAdminToken, verifyToken } from '../jwt';

describe('JWT Utils', () => {
  const originalEnv = process.env.JWT_SECRET;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalEnv;
  });

  describe('createTableToken', () => {
    it('테이블 토큰을 생성해야 함', () => {
      const token = createTableToken(1, 5);
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('생성된 토큰에 올바른 페이로드가 포함되어야 함', () => {
      const token = createTableToken(1, 5);
      const payload = verifyToken(token);
      
      expect(payload).toBeTruthy();
      expect(payload?.type).toBe('table');
      expect(payload?.tableId).toBe(1);
      expect(payload?.tableNumber).toBe(5);
    });
  });

  describe('createAdminToken', () => {
    it('관리자 토큰을 생성해야 함', () => {
      const token = createAdminToken(1, 'admin');
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('생성된 토큰에 올바른 페이로드가 포함되어야 함', () => {
      const token = createAdminToken(1, 'admin');
      const payload = verifyToken(token);
      
      expect(payload).toBeTruthy();
      expect(payload?.type).toBe('admin');
      expect(payload?.adminId).toBe(1);
      expect(payload?.username).toBe('admin');
    });
  });

  describe('verifyToken', () => {
    it('유효한 토큰을 검증해야 함', () => {
      const token = createTableToken(1, 5);
      const payload = verifyToken(token);
      
      expect(payload).toBeTruthy();
      expect(payload?.tableId).toBe(1);
    });

    it('잘못된 토큰은 null을 반환해야 함', () => {
      const payload = verifyToken('invalid-token');
      expect(payload).toBeNull();
    });

    it('만료된 형식의 토큰은 null을 반환해야 함', () => {
      const payload = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid');
      expect(payload).toBeNull();
    });
  });
});
