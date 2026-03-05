# 테스트 가이드

## 테스트 실행

### 모든 테스트 실행
```bash
npm test
```

### 커버리지 포함 테스트 실행
```bash
npm run test:coverage
```

### Watch 모드로 테스트 실행
```bash
npm run test:watch
```

## 테스트 커버리지

현재 프로젝트의 테스트 커버리지는 **80% 이상**을 달성했습니다.

### 커버리지 상세

- **Statements**: 98.82%
- **Branches**: 97.01%
- **Functions**: 100%
- **Lines**: 99.33%

### 테스트 대상

테스트는 `src/lib` 디렉토리의 핵심 비즈니스 로직에 집중되어 있습니다:

- ✅ **lib/services**: 모든 서비스 로직 (auth, menu, order, table)
- ✅ **lib/auth**: JWT 토큰 생성/검증, 인증 미들웨어
- ✅ **lib/db**: Prisma 클라이언트 설정
- ✅ **lib/api-utils**: API 응답 유틸리티

## 테스트 구조

```
src/
├── lib/
│   ├── __tests__/
│   │   └── api-utils.test.ts
│   ├── auth/
│   │   └── __tests__/
│   │       ├── jwt.test.ts
│   │       ├── jwt-edge.test.ts
│   │       └── middleware.test.ts
│   ├── db/
│   │   └── __tests__/
│   │       └── index.test.ts
│   └── services/
│       └── __tests__/
│           ├── auth-service.test.ts
│           ├── menu-service.test.ts
│           ├── order-service.test.ts
│           └── table-service.test.ts
```

## 테스트 작성 가이드

### 서비스 테스트 예시

```typescript
import { prisma } from '@/lib/db';
import * as authService from '../auth-service';

jest.mock('@/lib/db');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('올바른 자격증명으로 로그인해야 함', async () => {
    // 테스트 코드
  });
});
```

## 주요 테스트 케이스

### 인증 서비스
- 테이블 로그인 (성공/실패)
- 관리자 로그인 (성공/실패)
- 비밀번호 해싱

### 메뉴 서비스
- 카테고리 조회
- 메뉴 아이템 CRUD
- 메뉴 순서 변경

### 주문 서비스
- 주문 생성
- 세션 관리
- 주문 조회

### 테이블 서비스
- 테이블 조회/생성
- 세션 완료
- 히스토리 조회

### JWT 인증
- 토큰 생성/검증
- Edge 환경 토큰 검증
- 인증 미들웨어

## CI/CD 통합

테스트는 CI/CD 파이프라인에서 자동으로 실행되며, 커버리지 임계값(80%)을 충족하지 못하면 빌드가 실패합니다.
