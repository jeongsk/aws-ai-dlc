# Code Generation Plan - Unit 1: Foundation

## 유닛 컨텍스트
- **유닛**: Foundation (프로젝트 기반 및 데이터 모델)
- **요구사항**: FR-C01 (테이블 로그인), FR-A01 (관리자 인증)
- **의존성**: 없음 (첫 번째 유닛)
- **코드 위치**: 워크스페이스 루트

## 코드 생성 단계

### 프로젝트 구조 설정
- [x] Step 1: Next.js 프로젝트 초기화 (package.json, tsconfig.json, next.config.ts)
- [x] Step 2: Prisma 설정 및 스키마 정의 (prisma/schema.prisma)
- [x] Step 3: 환경변수 설정 (.env, .env.example)

### 공통 유틸리티 및 타입
- [x] Step 4: TypeScript 타입 정의 (src/types/)
- [x] Step 5: JWT 인증 유틸리티 (src/lib/auth/)
- [x] Step 6: Prisma 클라이언트 설정 (src/lib/db/)
- [x] Step 7: API 응답 헬퍼 (src/lib/api-utils.ts)

### 인증 서비스 및 API
- [x] Step 8: AuthService 구현 (src/lib/services/auth-service.ts)
- [x] Step 9: 인증 미들웨어 (src/lib/auth/middleware.ts)
- [x] Step 10: 테이블 로그인 API (src/app/api/auth/table-login/route.ts)
- [x] Step 11: 관리자 로그인 API (src/app/api/auth/admin-login/route.ts)

### 시드 데이터
- [x] Step 12: 시드 스크립트 (prisma/seed.ts)

### 프론트엔드 - 공통 레이아웃
- [x] Step 13: 고객용 레이아웃 (src/app/(customer)/layout.tsx)
- [x] Step 14: 관리자용 레이아웃 (src/app/(admin)/layout.tsx)
- [x] Step 15: 글로벌 스타일 및 루트 레이아웃 (src/app/layout.tsx, globals.css)

### 프론트엔드 - 로그인 페이지
- [x] Step 16: 테이블 로그인 페이지 (src/app/(customer)/table/[tableId]/login/page.tsx)
- [x] Step 17: 관리자 로그인 페이지 (src/app/(admin)/admin/login/page.tsx)

### 프론트엔드 - 인증 훅
- [x] Step 18: 인증 관련 커스텀 훅 (src/hooks/use-auth.ts)

### 문서화
- [x] Step 19: Unit 1 코드 요약 문서 (aidlc-docs/construction/foundation/code/summary.md)
