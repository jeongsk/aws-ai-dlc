import { successResponse, errorResponse } from '../api-utils';

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status || 200,
      data,
    })),
  },
}));

describe('API Utils', () => {
  describe('successResponse', () => {
    it('성공 응답을 생성해야 함', () => {
      const data = { id: 1, name: 'Test' };
      const response = successResponse(data);
      
      expect(response.status).toBe(200);
    });

    it('커스텀 상태 코드로 성공 응답을 생성해야 함', () => {
      const data = { id: 1 };
      const response = successResponse(data, 201);
      
      expect(response.status).toBe(201);
    });

    it('null 데이터로 성공 응답을 생성해야 함', () => {
      const response = successResponse(null);
      expect(response.status).toBe(200);
    });

    it('배열 데이터로 성공 응답을 생성해야 함', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const response = successResponse(data);
      expect(response.status).toBe(200);
    });
  });

  describe('errorResponse', () => {
    it('에러 응답을 생성해야 함', () => {
      const error = 'Something went wrong';
      const response = errorResponse(error);
      
      expect(response.status).toBe(400);
    });

    it('커스텀 상태 코드로 에러 응답을 생성해야 함', () => {
      const error = 'Not found';
      const response = errorResponse(error, 404);
      
      expect(response.status).toBe(404);
    });

    it('500 에러 응답을 생성해야 함', () => {
      const error = 'Internal server error';
      const response = errorResponse(error, 500);
      
      expect(response.status).toBe(500);
    });

    it('401 인증 에러 응답을 생성해야 함', () => {
      const error = 'Unauthorized';
      const response = errorResponse(error, 401);
      
      expect(response.status).toBe(401);
    });
  });
});
