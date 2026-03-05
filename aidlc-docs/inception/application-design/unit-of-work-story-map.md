# Unit of Work - 요구사항 매핑

User Stories 단계를 건너뛰었으므로, 요구사항(FR)을 유닛에 직접 매핑합니다.

## 요구사항-유닛 매핑

| 요구사항 ID | 요구사항 | Unit |
|---|---|---|
| FR-C01 | 테이블 태블릿 자동 로그인 | Unit 1 (Foundation) |
| FR-A01 | 매장 인증 (관리자 로그인) | Unit 1 (Foundation) |
| FR-C02 | 메뉴 조회 및 탐색 | Unit 2 (Menu) |
| FR-A04 | 메뉴 관리 (CRUD) | Unit 2 (Menu) |
| FR-C03 | 장바구니 관리 | Unit 3 (Order) |
| FR-C04 | 주문 생성 | Unit 3 (Order) |
| FR-C05 | 주문 내역 조회 | Unit 3 (Order) |
| FR-A02 | 실시간 주문 모니터링 | Unit 4 (Admin Dashboard) |
| FR-A03 | 테이블 관리 | Unit 4 (Admin Dashboard) |

## 유닛별 요구사항 커버리지

### Unit 1: Foundation
- FR-C01: 테이블 태블릿 자동 로그인 및 세션 관리
- FR-A01: 매장 인증 (16시간 JWT, bcrypt)
- 공통: Prisma 스키마, 타입 정의, 프로젝트 구조

### Unit 2: Menu
- FR-C02: 메뉴 조회 및 탐색 (카테고리별, 카드 레이아웃)
- FR-A04: 메뉴 관리 (등록/수정/삭제/순서 조정)

### Unit 3: Order
- FR-C03: 장바구니 관리 (로컬 저장, 수량 조절)
- FR-C04: 주문 생성 (트랜잭션, 5초 후 리다이렉트)
- FR-C05: 주문 내역 조회 (현재 세션만)
- SSE 인프라 구축

### Unit 4: Admin Dashboard
- FR-A02: 실시간 주문 모니터링 (SSE, 그리드 레이아웃, 상태 변경)
- FR-A03: 테이블 관리 (초기 설정, 주문 삭제, 이용 완료, 과거 내역)

## 커버리지 검증
- **전체 요구사항 9개 중 9개 매핑 완료** (100% 커버리지)
- 모든 기능 요구사항이 하나의 유닛에 할당됨
- 누락된 요구사항 없음
