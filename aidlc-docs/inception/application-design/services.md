# 서비스 레이어 설계

## 1. 서비스 아키텍처 개요

```
Next.js App Router
    │
    ├── API Route Handlers (app/api/)
    │       │
    │       ├── AuthService ──── Prisma (Admin, Table)
    │       ├── MenuService ──── Prisma (Category, MenuItem)
    │       ├── OrderService ─── Prisma (Order, OrderItem, OrderHistory)
    │       ├── TableService ─── Prisma (Table) + OrderService
    │       └── SSEService ───── In-memory client registry
    │
    └── Client Components
            │
            ├── Customer Pages ── fetch API ── /api/*
            └── Admin Pages ───── fetch API ── /api/* + EventSource ── /api/sse/*
```

## 2. 서비스 정의

### AuthService
- **책임**: 인증/인가 전체 처리
- **의존성**: Prisma (Admin, Table 테이블), bcrypt, jsonwebtoken
- **오케스트레이션**: 독립적 서비스, 다른 서비스에서 미들웨어로 활용

### MenuService
- **책임**: 메뉴 CRUD 및 카테고리 관리
- **의존성**: Prisma (Category, MenuItem 테이블)
- **오케스트레이션**: 독립적 서비스

### OrderService
- **책임**: 주문 라이프사이클 전체 관리
- **의존성**: Prisma (Order, OrderItem, OrderHistory), SSEService
- **오케스트레이션**: 주문 생성/변경/삭제 시 SSEService를 통해 실시간 이벤트 브로드캐스트

### TableService
- **책임**: 테이블 관리 및 세션 라이프사이클
- **의존성**: Prisma (Table), OrderService, SSEService
- **오케스트레이션**: 이용 완료 시 OrderService.archiveTableOrders() 호출 후 SSEService로 이벤트 전파

### SSEService
- **책임**: SSE 연결 관리 및 이벤트 브로드캐스트
- **의존성**: 없음 (in-memory 클라이언트 레지스트리)
- **오케스트레이션**: 싱글톤 패턴, OrderService/TableService에서 호출

## 3. 인증 미들웨어 패턴

```
요청 → JWT 검증 미들웨어 → API Route Handler → Service → Prisma → DB
                │
                └── 실패 시 401 Unauthorized 반환
```

- 고객용 API: 테이블 JWT 토큰 검증
- 관리자용 API: 관리자 JWT 토큰 검증 (16시간 만료)
- 공개 API: 인증 불필요 (로그인 엔드포인트)
