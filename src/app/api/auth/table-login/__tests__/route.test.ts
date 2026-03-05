import { POST } from '../route';
import * as authService from '@/lib/services/auth-service';
import { NextRequest } from 'next/server';

jest.mock('@/lib/services/auth-service');

describe('POST /api/auth/table-login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('올바른 자격증명으로 로그인 성공', async () => {
    const mockResult = {
      token: 'test-token',
      tableId: 1,
      tableNumber: 5,
    };
    (authService.tableLogin as jest.Mock).mockResolvedValue(mockResult);

    const request = new NextRequest('http://localhost/api/auth/table-login', {
      method: 'POST',
      body: JSON.stringify({ tableNumber: 5, password: 'password123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toEqual(mockResult);
  });

  it('잘못된 자격증명으로 로그인 실패', async () => {
    (authService.tableLogin as jest.Mock).mockRejectedValue(
      new Error('인증 정보가 올바르지 않습니다')
    );

    const request = new NextRequest('http://localhost/api/auth/table-login', {
      method: 'POST',
      body: JSON.stringify({ tableNumber: 999, password: 'wrong' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
  });

  it('잘못된 요청 형식', async () => {
    const request = new NextRequest('http://localhost/api/auth/table-login', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });
});
