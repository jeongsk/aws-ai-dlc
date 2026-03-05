/**
 * @jest-environment node
 */
import { authenticateTable, authenticateAdmin, isErrorResponse } from '../middleware';
import { verifyToken } from '../jwt';
import { NextRequest } from 'next/server';

jest.mock('../jwt');

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticateTable', () => {
    it('유효한 테이블 토큰을 인증해야 함', () => {
      const mockPayload = {
        tableId: 1,
        tableNumber: 5,
        type: 'table' as const,
        iat: 123,
        exp: 456,
      };
      (verifyToken as jest.Mock).mockReturnValue(mockPayload);

      const request = new NextRequest('http://localhost/api/test', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const result = authenticateTable(request);

      expect(result).toEqual(mockPayload);
      expect(isErrorResponse(result)).toBe(false);
    });

    it('토큰이 없으면 401 에러를 반환해야 함', () => {
      const request = new NextRequest('http://localhost/api/test');

      const result = authenticateTable(request);

      expect(isErrorResponse(result)).toBe(true);
      if (isErrorResponse(result)) {
        expect(result.status).toBe(401);
      }
    });

    it('잘못된 토큰은 401 에러를 반환해야 함', () => {
      (verifyToken as jest.Mock).mockReturnValue(null);

      const request = new NextRequest('http://localhost/api/test', {
        headers: { authorization: 'Bearer invalid-token' },
      });

      const result = authenticateTable(request);

      expect(isErrorResponse(result)).toBe(true);
      if (isErrorResponse(result)) {
        expect(result.status).toBe(401);
      }
    });

    it('관리자 토큰은 403 에러를 반환해야 함', () => {
      const mockPayload = {
        adminId: 1,
        username: 'admin',
        type: 'admin' as const,
        iat: 123,
        exp: 456,
      };
      (verifyToken as jest.Mock).mockReturnValue(mockPayload);

      const request = new NextRequest('http://localhost/api/test', {
        headers: { authorization: 'Bearer admin-token' },
      });

      const result = authenticateTable(request);

      expect(isErrorResponse(result)).toBe(true);
      if (isErrorResponse(result)) {
        expect(result.status).toBe(403);
      }
    });
  });

  describe('authenticateAdmin', () => {
    it('유효한 관리자 토큰을 인증해야 함', () => {
      const mockPayload = {
        adminId: 1,
        username: 'admin',
        type: 'admin' as const,
        iat: 123,
        exp: 456,
      };
      (verifyToken as jest.Mock).mockReturnValue(mockPayload);

      const request = new NextRequest('http://localhost/api/test', {
        headers: { authorization: 'Bearer valid-token' },
      });

      const result = authenticateAdmin(request);

      expect(result).toEqual(mockPayload);
      expect(isErrorResponse(result)).toBe(false);
    });

    it('토큰이 없으면 401 에러를 반환해야 함', () => {
      const request = new NextRequest('http://localhost/api/test');

      const result = authenticateAdmin(request);

      expect(isErrorResponse(result)).toBe(true);
      if (isErrorResponse(result)) {
        expect(result.status).toBe(401);
      }
    });

    it('테이블 토큰은 403 에러를 반환해야 함', () => {
      const mockPayload = {
        tableId: 1,
        tableNumber: 5,
        type: 'table' as const,
        iat: 123,
        exp: 456,
      };
      (verifyToken as jest.Mock).mockReturnValue(mockPayload);

      const request = new NextRequest('http://localhost/api/test', {
        headers: { authorization: 'Bearer table-token' },
      });

      const result = authenticateAdmin(request);

      expect(isErrorResponse(result)).toBe(true);
      if (isErrorResponse(result)) {
        expect(result.status).toBe(403);
      }
    });
  });

  describe('isErrorResponse', () => {
    it('에러 응답을 식별해야 함', () => {
      const errorResp = { status: 401, headers: new Headers() };
      expect(isErrorResponse(errorResp)).toBe(true);
    });

    it('정상 페이로드는 에러가 아님을 식별해야 함', () => {
      const payload = {
        tableId: 1,
        tableNumber: 5,
        type: 'table' as const,
        iat: 123,
        exp: 456,
      };
      expect(isErrorResponse(payload)).toBe(false);
    });

    it('null은 에러가 아님을 식별해야 함', () => {
      expect(isErrorResponse(null as any)).toBe(false);
    });

    it('status만 있는 객체는 에러가 아님을 식별해야 함', () => {
      const obj = { status: 200 };
      expect(isErrorResponse(obj as any)).toBe(false);
    });
  });
});
