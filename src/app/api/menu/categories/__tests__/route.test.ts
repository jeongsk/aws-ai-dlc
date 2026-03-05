import { GET } from '../route';
import * as menuService from '@/lib/services/menu-service';
import { NextRequest } from 'next/server';

jest.mock('@/lib/services/menu-service');

describe('GET /api/menu/categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('카테고리 목록을 반환해야 함', async () => {
    const mockCategories = [
      { id: 1, name: '메인', sortOrder: 0, menuItems: [] },
      { id: 2, name: '사이드', sortOrder: 1, menuItems: [] },
    ];
    (menuService.getCategories as jest.Mock).mockResolvedValue(mockCategories);

    const request = new NextRequest('http://localhost/api/menu/categories');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toEqual(mockCategories);
  });

  it('에러 발생 시 에러 응답을 반환해야 함', async () => {
    (menuService.getCategories as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const request = new NextRequest('http://localhost/api/menu/categories');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
  });
});
