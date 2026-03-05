# 도메인 엔티티 - Unit 1: Foundation

## Prisma 스키마 설계 (전체 시스템)

### Admin (관리자)
```
Admin {
  id          Int       @id @default(autoincrement())
  username    String    @unique
  password    String    // bcrypt 해시
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Table (테이블)
```
Table {
  id          Int       @id @default(autoincrement())
  tableNumber Int       @unique
  password    String    // bcrypt 해시
  sessionId   String?   // 현재 세션 ID (null = 비활성)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  orders      Order[]
}
```

### Category (메뉴 카테고리)
```
Category {
  id          Int        @id @default(autoincrement())
  name        String     @unique
  sortOrder   Int        @default(0)
  createdAt   DateTime   @default(now())
  menuItems   MenuItem[]
}
```

### MenuItem (메뉴 항목)
```
MenuItem {
  id          Int       @id @default(autoincrement())
  name        String
  price       Int       // 원 단위 정수
  description String?
  categoryId  Int
  category    Category  @relation(fields: [categoryId], references: [id])
  sortOrder   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Order (주문)
```
Order {
  id          Int         @id @default(autoincrement())
  tableId     Int
  table       Table       @relation(fields: [tableId], references: [id])
  sessionId   String      // 테이블 세션 ID
  status      OrderStatus @default(PENDING)
  totalAmount Int         // 원 단위 정수
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  items       OrderItem[]
}
```

### OrderItem (주문 항목)
```
OrderItem {
  id          Int     @id @default(autoincrement())
  orderId     Int
  order       Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  menuItemName String // 주문 시점 메뉴명 스냅샷
  quantity    Int
  unitPrice   Int     // 주문 시점 단가 스냅샷
}
```

### OrderHistory (과거 주문 이력)
```
OrderHistory {
  id            Int      @id @default(autoincrement())
  tableId       Int
  tableNumber   Int      // 스냅샷
  sessionId     String
  orderNumber   Int      // 원본 주문 ID
  items         String   // JSON 직렬화된 주문 항목
  totalAmount   Int
  orderedAt     DateTime // 원본 주문 시각
  completedAt   DateTime @default(now()) // 이용 완료 시각
}
```

### OrderStatus (주문 상태 열거형)
```
enum OrderStatus {
  PENDING    // 대기중
  PREPARING  // 준비중
  COMPLETED  // 완료
}
```

## 엔티티 관계 요약

```
Admin (독립)

Table 1──N Order 1──N OrderItem
  │
  └── sessionId로 주문 그룹화

Category 1──N MenuItem

OrderHistory (독립, 아카이브 데이터)
```

## 설계 결정사항

1. **가격은 Int (원 단위)**: 소수점 없이 정수로 처리하여 부동소수점 오류 방지
2. **OrderItem에 메뉴명/단가 스냅샷**: 메뉴 변경 시에도 주문 이력 보존
3. **OrderHistory는 JSON items**: 아카이브 데이터로 정규화 불필요, 조회 전용
4. **sessionId는 UUID**: 테이블 세션 식별용, 첫 주문 시 자동 생성
5. **onDelete: Cascade**: Order 삭제 시 OrderItem 자동 삭제
