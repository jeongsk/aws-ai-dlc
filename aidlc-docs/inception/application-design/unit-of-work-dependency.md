# Unit of Work 의존성 매트릭스

## 의존성 관계

| Unit | 의존 대상 | 의존 유형 |
|---|---|---|
| Unit 1 (Foundation) | 없음 | - |
| Unit 2 (Menu) | Unit 1 | Prisma 스키마, 인증 미들웨어, 타입 정의 |
| Unit 3 (Order) | Unit 1, Unit 2 | Prisma 스키마, 인증, MenuItem 참조 |
| Unit 4 (Admin Dashboard) | Unit 1, Unit 2, Unit 3 | 인증, OrderService, SSEService, TableService |

## 의존성 다이어그램

```
Unit 1 (Foundation)
  │
  ├──→ Unit 2 (Menu)
  │       │
  │       └──→ Unit 3 (Order)
  │               │
  │               └──→ Unit 4 (Admin Dashboard)
  │                       ↑
  ├───────────────────────┘
  └───────────────────────→
```

## 순차 구현 근거

- **선형 의존성**: 각 유닛이 이전 유닛에 의존하는 순차적 구조
- **점진적 통합**: 각 유닛 완료 시 동작 가능한 기능 증가
- **리스크 최소화**: 기반 → 데이터 → 비즈니스 로직 → UI 순서로 안정적 구축

## 유닛별 공유 리소스

| 공유 리소스 | 제공 유닛 | 사용 유닛 |
|---|---|---|
| Prisma Client & Schema | Unit 1 | Unit 2, 3, 4 |
| JWT 인증 유틸리티 | Unit 1 | Unit 2, 3, 4 |
| TypeScript 타입 정의 | Unit 1 | Unit 2, 3, 4 |
| SSEService | Unit 3 | Unit 4 |
| OrderService | Unit 3 | Unit 4 |
