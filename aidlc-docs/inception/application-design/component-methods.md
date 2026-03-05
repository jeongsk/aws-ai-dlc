# 컴포넌트 메서드 시그니처

## 1. AuthService

```typescript
class AuthService {
  // 테이블 태블릿 로그인 - 테이블번호+비밀번호 검증 후 JWT 발급
  tableLogin(tableNumber: number, password: string): Promise<{ token: string; tableId: number }>

  // 관리자 로그인 - 사용자명+비밀번호 검증 후 JWT 발급 (16시간 만료)
  adminLogin(username: string, password: string): Promise<{ token: string }>

  // JWT 토큰 검증
  verifyToken(token: string): Promise<{ valid: boolean; payload: TokenPayload }>

  // 비밀번호 해싱
  hashPassword(password: string): Promise<string>

  // 비밀번호 검증
  comparePassword(password: string, hash: string): Promise<boolean>
}
```

## 2. MenuService

```typescript
class MenuService {
  // 카테고리 목록 조회
  getCategories(): Promise<Category[]>

  // 메뉴 목록 조회 (카테고리별 필터링 옵션)
  getMenuItems(categoryId?: number): Promise<MenuItem[]>

  // 메뉴 단건 조회
  getMenuItem(id: number): Promise<MenuItem | null>

  // 메뉴 등록
  createMenuItem(data: CreateMenuItemInput): Promise<MenuItem>

  // 메뉴 수정
  updateMenuItem(id: number, data: UpdateMenuItemInput): Promise<MenuItem>

  // 메뉴 삭제
  deleteMenuItem(id: number): Promise<void>

  // 메뉴 노출 순서 변경
  reorderMenuItems(items: { id: number; sortOrder: number }[]): Promise<void>
}
```

## 3. OrderService

```typescript
class OrderService {
  // 주문 생성 (트랜잭션 처리)
  createOrder(data: CreateOrderInput): Promise<Order>

  // 테이블별 현재 세션 주문 조회
  getOrdersByTable(tableId: number, sessionId: string): Promise<Order[]>

  // 전체 활성 주문 조회 (관리자용)
  getAllActiveOrders(): Promise<Order[]>

  // 주문 상태 변경 (대기중→준비중→완료)
  updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order>

  // 주문 삭제 (관리자 직권)
  deleteOrder(orderId: number): Promise<void>

  // 테이블 이용 완료 시 주문 이력 이동
  archiveTableOrders(tableId: number, sessionId: string): Promise<void>

  // 과거 주문 내역 조회
  getOrderHistory(tableId: number, dateFilter?: DateRange): Promise<OrderHistory[]>
}
```

## 4. TableService

```typescript
class TableService {
  // 테이블 목록 조회
  getTables(): Promise<Table[]>

  // 테이블 등록 (초기 설정)
  createTable(data: CreateTableInput): Promise<Table>

  // 테이블 정보 조회
  getTable(id: number): Promise<Table | null>

  // 테이블 이용 완료 처리 (세션 종료 + 주문 아카이브 + 리셋)
  completeTableSession(tableId: number): Promise<void>

  // 새 세션 시작 (첫 주문 시 자동)
  startNewSession(tableId: number): Promise<string>

  // 테이블 총 주문액 계산
  getTableTotal(tableId: number, sessionId: string): Promise<number>
}
```

## 5. SSEService

```typescript
class SSEService {
  // SSE 연결 등록
  addClient(clientId: string, response: ReadableStreamController): void

  // SSE 연결 해제
  removeClient(clientId: string): void

  // 주문 이벤트 브로드캐스트 (신규 주문, 상태 변경, 삭제)
  broadcastOrderEvent(event: OrderEvent): void

  // 테이블 이벤트 브로드캐스트 (이용 완료)
  broadcastTableEvent(event: TableEvent): void
}
```

## 6. API 엔드포인트 입출력 타입

```typescript
// 주문 생성 입력
interface CreateOrderInput {
  tableId: number
  sessionId: string
  items: { menuItemId: number; quantity: number }[]
}

// 주문 상태
type OrderStatus = 'PENDING' | 'PREPARING' | 'COMPLETED'

// SSE 이벤트 타입
type OrderEvent = {
  type: 'ORDER_CREATED' | 'ORDER_STATUS_CHANGED' | 'ORDER_DELETED'
  data: Order
}

type TableEvent = {
  type: 'TABLE_SESSION_COMPLETED'
  data: { tableId: number }
}
```
