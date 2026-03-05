# 컴포넌트 의존성 관계

## 1. 의존성 매트릭스

| 컴포넌트 | 의존 대상 |
|---|---|
| Customer Pages | fetch API → API Routes |
| Admin Pages | fetch API → API Routes, EventSource → SSE |
| API Auth Routes | AuthService |
| API Menu Routes | MenuService, AuthService (미들웨어) |
| API Order Routes | OrderService, AuthService (미들웨어) |
| API Table Routes | TableService, AuthService (미들웨어) |
| API SSE Route | SSEService, AuthService (미들웨어) |
| AuthService | Prisma Client |
| MenuService | Prisma Client |
| OrderService | Prisma Client, SSEService |
| TableService | Prisma Client, OrderService, SSEService |
| SSEService | (독립, in-memory) |
| Prisma Client | SQLite Database |

## 2. 통신 패턴

### 클라이언트 → 서버
- **REST API**: 고객/관리자 모든 CRUD 작업
- **SSE**: 관리자 대시보드 실시간 주문 업데이트 (단방향, 서버→클라이언트)

### 서비스 간 통신
- **동기 호출**: TableService → OrderService (이용 완료 시 주문 아카이브)
- **이벤트 발행**: OrderService/TableService → SSEService (주문/테이블 이벤트 브로드캐스트)

## 3. 데이터 흐름

### 주문 생성 플로우
```
Customer UI → POST /api/orders → OrderService.createOrder()
    → Prisma 트랜잭션 (Order + OrderItem 생성)
    → SSEService.broadcastOrderEvent(ORDER_CREATED)
    → Admin Dashboard (SSE로 실시간 수신)
```

### 테이블 이용 완료 플로우
```
Admin UI → POST /api/tables/[id]/complete → TableService.completeTableSession()
    → OrderService.archiveTableOrders() (주문 → OrderHistory 이동)
    → Table 세션 리셋 (sessionId = null, 총액 = 0)
    → SSEService.broadcastTableEvent(TABLE_SESSION_COMPLETED)
    → Admin Dashboard + Customer UI 업데이트
```

### 주문 상태 변경 플로우
```
Admin UI → PATCH /api/orders/[id]/status → OrderService.updateOrderStatus()
    → Prisma 업데이트
    → SSEService.broadcastOrderEvent(ORDER_STATUS_CHANGED)
    → Admin Dashboard + Customer UI 업데이트
```
