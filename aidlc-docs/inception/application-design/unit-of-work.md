# Unit of Work 정의

## 배포 모델
- **단일 모놀리스**: Next.js App Router 기반 풀스택 애플리케이션
- **논리적 모듈 분리**: 기능 도메인별 모듈로 구분하여 개발

## 유닛 목록

### Unit 1: 프로젝트 기반 및 데이터 모델 (Foundation)
- **범위**: 프로젝트 초기 설정, Prisma 스키마, 시드 데이터, 공통 타입, 인증 유틸리티
- **책임**:
  - Next.js 프로젝트 구조 생성
  - Prisma 스키마 정의 (전체 데이터 모델)
  - 시드 스크립트 (관리자 계정, 샘플 카테고리)
  - JWT 인증 유틸리티 (생성/검증)
  - 공통 TypeScript 타입 정의
  - 인증 API (테이블 로그인, 관리자 로그인)
- **산출물**: 프로젝트 스캐폴딩, DB 스키마, 인증 시스템

### Unit 2: 메뉴 관리 (Menu)
- **범위**: 메뉴 CRUD API + 관리자 메뉴 관리 UI + 고객 메뉴 조회 UI
- **책임**:
  - MenuService (CRUD, 카테고리 조회, 순서 변경)
  - 메뉴 API 라우트 (GET/POST/PUT/DELETE/PATCH)
  - 관리자 메뉴 관리 페이지
  - 고객 메뉴 조회 페이지 (카테고리 탭, 메뉴 카드)
- **산출물**: 메뉴 API, 관리자 메뉴 관리 UI, 고객 메뉴 UI

### Unit 3: 주문 및 장바구니 (Order)
- **범위**: 장바구니 관리 + 주문 CRUD API + 고객 주문 UI + SSE 실시간 통신
- **책임**:
  - OrderService (생성, 조회, 상태변경, 삭제, 아카이브)
  - SSEService (연결 관리, 이벤트 브로드캐스트)
  - 주문 API 라우트 + SSE 엔드포인트
  - 고객 장바구니 페이지 (로컬 저장, 수량 조절)
  - 고객 주문 내역 페이지
- **산출물**: 주문 API, SSE, 장바구니 UI, 주문 내역 UI

### Unit 4: 관리자 대시보드 및 테이블 관리 (Admin Dashboard)
- **범위**: 관리자 대시보드 + 테이블 관리 API/UI
- **책임**:
  - TableService (테이블 CRUD, 세션 관리, 이용 완료)
  - 테이블 API 라우트
  - 관리자 대시보드 페이지 (SSE 실시간 주문 모니터링, 그리드 레이아웃)
  - 관리자 테이블 관리 페이지 (초기 설정, 주문 삭제, 이용 완료, 과거 내역)
  - 주문 상태 변경 UI
  - 주문 상세 모달, 과거 내역 모달
- **산출물**: 테이블 API, 관리자 대시보드, 테이블 관리 UI

---

## 구현 순서

```
Unit 1 (Foundation) → Unit 2 (Menu) → Unit 3 (Order) → Unit 4 (Admin Dashboard)
```

1. **Unit 1** 먼저: 모든 유닛이 의존하는 프로젝트 기반, DB 스키마, 인증
2. **Unit 2** 다음: 메뉴 데이터가 있어야 주문 가능
3. **Unit 3** 다음: 주문 시스템 + SSE 구축
4. **Unit 4** 마지막: 주문/테이블 서비스를 활용하는 관리자 대시보드

---

## 코드 조직 전략 (Greenfield)

```
src/
├── app/
│   ├── (customer)/table/[tableId]/   # Unit 2, 3 (고객 UI)
│   ├── (admin)/admin/                # Unit 2, 4 (관리자 UI)
│   └── api/                          # Unit 1, 2, 3, 4 (API)
├── components/                       # Unit 2, 3, 4 (UI 컴포넌트)
├── lib/
│   ├── services/                     # Unit 1, 2, 3, 4 (서비스 레이어)
│   ├── db/                           # Unit 1 (Prisma)
│   └── auth/                         # Unit 1 (인증)
├── types/                            # Unit 1 (타입 정의)
└── prisma/
    ├── schema.prisma                 # Unit 1 (스키마)
    └── seed.ts                       # Unit 1 (시드)
```
