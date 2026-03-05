# 컴포넌트 정의

## 1. 프로젝트 구조 개요

```
Next.js App Router 기반 풀스택 구조

src/
├── app/                          # Next.js App Router
│   ├── (customer)/               # 고객용 라우트 그룹
│   │   ├── table/[tableId]/      # 테이블별 고객 페이지
│   │   │   ├── page.tsx          # 메뉴 조회 (기본 화면)
│   │   │   ├── cart/page.tsx     # 장바구니
│   │   │   ├── orders/page.tsx   # 주문 내역
│   │   │   └── login/page.tsx    # 테이블 로그인
│   ├── (admin)/                  # 관리자용 라우트 그룹
│   │   ├── admin/
│   │   │   ├── page.tsx          # 대시보드 (주문 모니터링)
│   │   │   ├── login/page.tsx    # 관리자 로그인
│   │   │   ├── menu/page.tsx     # 메뉴 관리
│   │   │   └── tables/page.tsx   # 테이블 관리
│   └── api/                      # API 라우트
│       ├── auth/                 # 인증 API
│       ├── menu/                 # 메뉴 API
│       ├── orders/               # 주문 API
│       ├── tables/               # 테이블 API
│       └── sse/                  # SSE 엔드포인트
├── components/                   # 공유 UI 컴포넌트
│   ├── customer/                 # 고객용 컴포넌트
│   └── admin/                    # 관리자용 컴포넌트
├── lib/                          # 비즈니스 로직 및 유틸리티
│   ├── services/                 # 서비스 레이어
│   ├── db/                       # 데이터베이스 (Prisma)
│   └── auth/                     # 인증 유틸리티
└── types/                        # TypeScript 타입 정의
```

---

## 2. 컴포넌트 상세

### 2.1 고객용 UI 컴포넌트 (Customer UI)

| 컴포넌트 | 책임 |
|---|---|
| TableLoginPage | 테이블 초기 로그인 (매장ID, 테이블번호, 비밀번호) |
| MenuPage | 메뉴 목록 표시, 카테고리 필터링, 장바구니 추가 |
| CartPage | 장바구니 관리 (수량 조절, 삭제, 주문 확정) |
| OrdersPage | 현재 세션 주문 내역 조회 |
| MenuCard | 개별 메뉴 카드 UI |
| CategoryNav | 카테고리 탭 네비게이션 |
| CartItem | 장바구니 개별 항목 |
| OrderCard | 주문 내역 카드 |

### 2.2 관리자용 UI 컴포넌트 (Admin UI)

| 컴포넌트 | 책임 |
|---|---|
| AdminLoginPage | 관리자 로그인 (사용자명, 비밀번호) |
| DashboardPage | 실시간 주문 모니터링 대시보드 (SSE) |
| MenuManagementPage | 메뉴 CRUD 관리 |
| TableManagementPage | 테이블 설정 및 세션 관리 |
| TableCard | 테이블별 주문 요약 카드 |
| OrderDetailModal | 주문 상세 보기 모달 |
| MenuForm | 메뉴 등록/수정 폼 |
| OrderHistoryModal | 과거 주문 내역 모달 |

### 2.3 API 라우트 컴포넌트

| 컴포넌트 | 책임 |
|---|---|
| POST /api/auth/table-login | 테이블 태블릿 로그인 |
| POST /api/auth/admin-login | 관리자 로그인 |
| GET /api/menu | 메뉴 목록 조회 (카테고리별) |
| POST /api/menu | 메뉴 등록 |
| PUT /api/menu/[id] | 메뉴 수정 |
| DELETE /api/menu/[id] | 메뉴 삭제 |
| PATCH /api/menu/reorder | 메뉴 순서 변경 |
| GET /api/orders | 주문 목록 조회 |
| POST /api/orders | 주문 생성 |
| PATCH /api/orders/[id]/status | 주문 상태 변경 |
| DELETE /api/orders/[id] | 주문 삭제 |
| GET /api/tables | 테이블 목록 조회 |
| POST /api/tables | 테이블 등록 |
| POST /api/tables/[id]/complete | 테이블 이용 완료 |
| GET /api/tables/[id]/history | 과거 주문 내역 조회 |
| GET /api/sse/orders | SSE 주문 실시간 스트림 |

### 2.4 서비스 레이어

| 컴포넌트 | 책임 |
|---|---|
| AuthService | 인증/인가 처리 (JWT 생성/검증, bcrypt) |
| MenuService | 메뉴 CRUD 비즈니스 로직 |
| OrderService | 주문 생성/조회/상태변경/삭제 비즈니스 로직 |
| TableService | 테이블 관리, 세션 라이프사이클 |
| SSEService | SSE 연결 관리, 이벤트 브로드캐스트 |

### 2.5 데이터 액세스 레이어

| 컴포넌트 | 책임 |
|---|---|
| Prisma Client | SQLite 데이터베이스 ORM |
| Prisma Schema | 데이터 모델 정의 (Admin, Table, Category, MenuItem, Order, OrderItem, OrderHistory) |
| Seed Script | 초기 데이터 생성 (관리자 계정, 샘플 카테고리) |
