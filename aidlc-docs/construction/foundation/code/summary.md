# Unit 1: Foundation - 코드 요약

## 생성된 파일 목록

### 프로젝트 설정
- `package.json` - 프로젝트 의존성 및 스크립트
- `tsconfig.json` - TypeScript 설정
- `next.config.ts` - Next.js 설정
- `.env` / `.env.example` - 환경변수
- `.gitignore` - Git 제외 파일

### 데이터베이스
- `prisma/schema.prisma` - 전체 데이터 모델 (7 엔티티 + 1 enum)
- `prisma/seed.ts` - 시드 데이터 (관리자, 카테고리, 샘플 테이블)

### 백엔드
- `src/lib/db/index.ts` - Prisma 클라이언트 싱글톤
- `src/lib/auth/jwt.ts` - JWT 생성/검증
- `src/lib/auth/middleware.ts` - 인증 미들웨어
- `src/lib/services/auth-service.ts` - 인증 서비스
- `src/lib/api-utils.ts` - API 응답 헬퍼
- `src/types/index.ts` - 공통 타입 정의
- `src/app/api/auth/table-login/route.ts` - 테이블 로그인 API
- `src/app/api/auth/admin-login/route.ts` - 관리자 로그인 API

### 프론트엔드
- `src/app/layout.tsx` - 루트 레이아웃
- `src/app/globals.css` - 글로벌 스타일
- `src/app/(customer)/layout.tsx` - 고객용 레이아웃 (하단 네비게이션)
- `src/app/(admin)/layout.tsx` - 관리자용 레이아웃 (상단 네비게이션)
- `src/app/(customer)/table/[tableId]/login/page.tsx` - 테이블 로그인
- `src/app/(admin)/admin/login/page.tsx` - 관리자 로그인
- `src/hooks/use-auth.ts` - 인증 커스텀 훅

## 초기 설정 명령어
```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
```
