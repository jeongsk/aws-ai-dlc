# E2E 테스트 가이드

## 개요
Playwright를 사용한 End-to-End 테스트 구현

## 테스트 실행

### 기본 실행
```bash
npm run test:e2e
```

### UI 모드 (권장)
```bash
npm run test:e2e:ui
```

### 디버그 모드
```bash
npm run test:e2e:debug
```

### 리포트 확인
```bash
npm run test:e2e:report
```

## 테스트 구조

### Page Object Model (POM)
- `e2e/pages/index.ts`: 페이지 객체 정의
  - LoginPage: 로그인 페이지
  - CustomerPage: 고객 주문 페이지
  - AdminPage: 관리자 페이지

### 테스트 파일
- `e2e/customer.spec.ts`: 고객 주문 플로우
- `e2e/admin.spec.ts`: 관리자 주문 관리
- `e2e/workflow.spec.ts`: 전체 워크플로우 통합 테스트

## 2026 Best Practices 적용

1. **Page Object Model**: 재사용 가능한 페이지 객체
2. **자동 대기**: Playwright의 자동 대기 기능 활용
3. **실패 시 스크린샷**: 자동 캡처
4. **재시도 정책**: CI 환경에서 2회 재시도
5. **병렬 실행**: 테스트 속도 최적화

## 주의사항

- 테스트 실행 전 데이터베이스 초기화 필요
- 개발 서버가 자동으로 시작됨 (포트 3000)
- 실제 UI 구현에 맞춰 셀렉터 수정 필요
