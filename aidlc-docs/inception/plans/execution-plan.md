# Execution Plan

## Detailed Analysis Summary

### Change Impact Assessment
- **User-facing changes**: Yes - 고객용 주문 UI + 관리자 대시보드 신규 구축
- **Structural changes**: Yes - 전체 시스템 신규 설계 (Next.js 풀스택)
- **Data model changes**: Yes - 전체 데이터 모델 신규 설계 (SQLite + Prisma)
- **API changes**: Yes - REST API 전체 신규 설계 + SSE 엔드포인트
- **NFR impact**: No - 소규모 MVP, 보안 확장 미적용

### Risk Assessment
- **Risk Level**: Low (Greenfield, 소규모, 로컬 환경)
- **Rollback Complexity**: Easy (신규 프로젝트)
- **Testing Complexity**: Moderate (SSE 실시간 통신 포함)

## Workflow Visualization

### Text Alternative
```
Phase 1: INCEPTION
  - Workspace Detection (COMPLETED)
  - Requirements Analysis (COMPLETED)
  - User Stories (SKIP)
  - Workflow Planning (COMPLETED)
  - Application Design (COMPLETED)
  - Units Generation (COMPLETED)

Phase 2: CONSTRUCTION
  Unit 1 (Foundation):
    - Functional Design (COMPLETED)
    - Code Generation (COMPLETED)
  Unit 2 (Menu):
    - Functional Design (COMPLETED)
    - Code Generation (COMPLETED)
  Unit 3 (Order):
    - Functional Design (COMPLETED)
    - Code Generation (COMPLETED)
  Unit 4 (Admin Dashboard):
    - Functional Design (COMPLETED)
    - Code Generation (IN PROGRESS - 대시보드 페이지 미구현)
  - Build and Test (PENDING)
```

---

## Phases to Execute

### 🔵 INCEPTION PHASE
- [x] Workspace Detection (COMPLETED)
- [x] Requirements Analysis (COMPLETED)
- [x] User Stories - SKIP
- [x] Workflow Planning (COMPLETED)
- [x] Application Design (COMPLETED)
- [x] Units Generation (COMPLETED)

### 🟢 CONSTRUCTION PHASE

#### Unit 1: Foundation
- [x] Functional Design (COMPLETED)
- [x] Code Generation (COMPLETED)
  - 구현 완료: Prisma 스키마, 시드 데이터, JWT 인증, 로그인 API, 로그인 페이지, 레이아웃, 미들웨어

#### Unit 2: Menu
- [x] Functional Design (COMPLETED)
- [x] Code Generation (COMPLETED)
  - 구현 완료: MenuService, 메뉴 CRUD API, 카테고리 API, 고객 메뉴 조회 페이지, 관리자 메뉴 관리 페이지

#### Unit 3: Order
- [x] Functional Design (COMPLETED)
- [x] Code Generation (COMPLETED)
  - 구현 완료: OrderService, 주문 생성/조회 API, 고객 장바구니 페이지, 고객 주문내역 페이지

#### Unit 4: Admin Dashboard
- [x] Functional Design (COMPLETED)
- [ ] Code Generation (IN PROGRESS)
  - ✅ 구현 완료: TableService, 테이블 CRUD API, 이용완료 API, 과거내역 API, 테이블 관리 페이지, SSE 스트림 라우트, 로그아웃 API
  - ❌ 미구현: 관리자 대시보드 페이지 (실시간 주문 모니터링 그리드 UI)
  - ⚠️ 버그: SSE 스트림 라우트에서 잘못된 import 경로 (`@/lib/db/prisma` → `@/lib/db`)
  - ⚠️ 버그: 로그인 후 리다이렉트 문제 (수정 완료 - window.location.href 사용)

#### Build and Test
- [ ] Build and Test (PENDING - 모든 유닛 완료 후)

### 🟡 OPERATIONS PHASE
- [ ] Operations - PLACEHOLDER

---

## 현재 구현 상태 요약

### 구현 완료된 파일
**백엔드 (API + 서비스)**
- `src/lib/db/index.ts` - Prisma 클라이언트
- `src/lib/auth/jwt.ts` - JWT 생성/검증
- `src/lib/auth/jwt-edge.ts` - Edge Runtime JWT 검증
- `src/lib/auth/middleware.ts` - 인증 미들웨어
- `src/lib/services/auth-service.ts` - 인증 서비스
- `src/lib/services/menu-service.ts` - 메뉴 서비스
- `src/lib/services/order-service.ts` - 주문 서비스
- `src/lib/services/table-service.ts` - 테이블 서비스
- `src/lib/api-utils.ts` - API 응답 헬퍼
- `src/middleware.ts` - Next.js 미들웨어 (라우트 보호)
- `src/app/api/auth/*` - 인증 API (로그인, 로그아웃, 검증)
- `src/app/api/menu/*` - 메뉴 API (CRUD, 카테고리)
- `src/app/api/orders/route.ts` - 주문 API (생성, 조회)
- `src/app/api/tables/*` - 테이블 API (CRUD, 이용완료, 과거내역)
- `src/app/api/admin/orders/stream/route.ts` - SSE 스트림

**프론트엔드 (페이지)**
- `src/app/(customer)/table/[tableId]/login/page.tsx` - 테이블 로그인
- `src/app/(customer)/table/[tableId]/page.tsx` - 고객 메뉴 조회
- `src/app/(customer)/table/[tableId]/cart/page.tsx` - 장바구니
- `src/app/(customer)/table/[tableId]/orders/page.tsx` - 주문내역
- `src/app/(admin)/admin/login/page.tsx` - 관리자 로그인
- `src/app/(admin)/admin/menu/page.tsx` - 메뉴 관리
- `src/app/(admin)/admin/tables/page.tsx` - 테이블 관리
- `src/app/(admin)/admin/page.tsx` - 대시보드 (플레이스홀더)

### 남은 작업
1. 관리자 대시보드 페이지 구현 (실시간 주문 모니터링 그리드 UI)
2. SSE 스트림 import 경로 수정
3. Build and Test 단계

---

## Extension Compliance Summary
| Extension | Status | Rationale |
|---|---|---|
| security-baseline | Disabled | 사용자 선택 (Q9: B) - MVP/프로토타입 수준 |

## Success Criteria
- **Primary Goal**: 단일 매장용 테이블오더 MVP 서비스 구현
- **Key Deliverables**: Next.js 풀스택 앱 (고객 UI + 관리자 UI + API + SQLite DB)
- **Quality Gates**: 빌드 성공, 핵심 주문 플로우 동작, SSE 실시간 업데이트 동작
