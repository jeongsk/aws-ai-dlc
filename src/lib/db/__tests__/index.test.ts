import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('Prisma DB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete (global as any).prisma;
  });

  it('Prisma 클라이언트를 생성해야 함', () => {
    jest.isolateModules(() => {
      const { prisma } = require('../index');
      expect(prisma).toBeDefined();
      expect(PrismaClient).toHaveBeenCalled();
    });
  });

  it('개발 환경에서 전역 Prisma 인스턴스를 재사용해야 함', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    jest.isolateModules(() => {
      const { prisma: prisma1 } = require('../index');
      const { prisma: prisma2 } = require('../index');
      expect(prisma1).toBe(prisma2);
    });

    process.env.NODE_ENV = originalEnv;
  });

  it('프로덕션 환경에서 새 인스턴스를 생성해야 함', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    jest.isolateModules(() => {
      const { prisma } = require('../index');
      expect(prisma).toBeDefined();
    });

    process.env.NODE_ENV = originalEnv;
  });
});
