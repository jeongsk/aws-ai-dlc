# 프론트엔드 컴포넌트 - Unit 1: Foundation

## 1. 테이블 로그인 페이지 (TableLoginPage)

### 경로: `/table/[tableId]/login`
### 용도: 관리자가 태블릿 초기 설정 시 1회 사용

### 컴포넌트 구조
```
TableLoginPage
├── LoginForm
│   ├── Input (테이블 번호)
│   ├── Input (비밀번호)
│   ├── Button (로그인)
│   └── ErrorMessage (에러 표시)
└── LoadingSpinner (로그인 처리 중)
```

### State
```typescript
{
  tableNumber: string    // 입력값
  password: string       // 입력값
  isLoading: boolean     // 로그인 처리 중
  error: string | null   // 에러 메시지
}
```

### 사용자 인터랙션 플로우
1. 테이블 번호 입력
2. 비밀번호 입력
3. "로그인" 버튼 클릭
4. POST /api/auth/table-login 호출
5. 성공 → 토큰 localStorage 저장 → 메뉴 페이지로 리다이렉트
6. 실패 → 에러 메시지 표시

### 자동 로그인 로직
- 페이지 로드 시 localStorage에서 토큰 확인
- 토큰 존재 → 메뉴 페이지로 자동 리다이렉트
- 토큰 없음 → 로그인 폼 표시

---

## 2. 관리자 로그인 페이지 (AdminLoginPage)

### 경로: `/admin/login`

### 컴포넌트 구조
```
AdminLoginPage
├── LoginForm
│   ├── Input (사용자명)
│   ├── Input (비밀번호, type=password)
│   ├── Button (로그인)
│   └── ErrorMessage (에러 표시)
└── LoadingSpinner (로그인 처리 중)
```

### State
```typescript
{
  username: string
  password: string
  isLoading: boolean
  error: string | null
}
```

### 사용자 인터랙션 플로우
1. 사용자명 입력
2. 비밀번호 입력
3. "로그인" 버튼 클릭
4. POST /api/auth/admin-login 호출
5. 성공 → 토큰 localStorage 저장 → 대시보드로 리다이렉트
6. 실패 → 에러 메시지 표시

### 세션 만료 처리
- API 호출 시 401 응답 → 토큰 삭제 → 로그인 페이지로 리다이렉트
- 16시간 후 자동 만료

---

## 3. 공통 레이아웃

### 고객용 레이아웃
```
CustomerLayout
├── Header (테이블 번호 표시)
├── BottomNav
│   ├── NavItem (메뉴 - 기본)
│   ├── NavItem (장바구니)
│   └── NavItem (주문내역)
└── children (페이지 콘텐츠)
```

### 관리자용 레이아웃
```
AdminLayout
├── Header (매장명, 로그아웃 버튼)
├── SideNav / TopNav
│   ├── NavItem (대시보드)
│   ├── NavItem (메뉴 관리)
│   └── NavItem (테이블 관리)
└── children (페이지 콘텐츠)
```
