# 비즈니스 규칙 - Unit 1: Foundation

## 인증 규칙

### BR-AUTH-01: 테이블 로그인 검증
- tableNumber: 필수, 양의 정수
- password: 필수, 문자열
- 존재하지 않는 테이블 번호 → 401

### BR-AUTH-02: 관리자 로그인 검증
- username: 필수, 문자열, 최대 50자
- password: 필수, 문자열
- 보안: 사용자명/비밀번호 어느 것이 틀렸는지 구분하지 않는 에러 메시지

### BR-AUTH-03: 비밀번호 해싱
- 알고리즘: bcrypt
- salt rounds: 10
- 평문 비밀번호는 절대 저장하지 않음

### BR-AUTH-04: JWT 토큰 관리
- 서명 알고리즘: HS256
- 비밀키: JWT_SECRET 환경변수 (필수)
- 테이블 토큰: 만료 없음
- 관리자 토큰: 16시간 만료

### BR-AUTH-05: API 접근 제어
- 공개 API: POST /api/auth/table-login, POST /api/auth/admin-login
- 고객용 API: type="table" 토큰 필요
- 관리자용 API: type="admin" 토큰 필요
- 잘못된 토큰 타입으로 접근 시 403

## 데이터 검증 규칙

### BR-DATA-01: 테이블 생성 검증
- tableNumber: 필수, 양의 정수, 유니크
- password: 필수, 최소 4자

### BR-DATA-02: 가격 규칙
- 모든 가격은 원(KRW) 단위 정수
- 최소 0원, 최대 1,000,000원

### BR-DATA-03: 세션 ID 생성
- 형식: UUID v4
- 생성 시점: 테이블의 첫 주문 시 (sessionId가 null인 경우)
- 리셋 시점: 테이블 이용 완료 시 (sessionId → null)
