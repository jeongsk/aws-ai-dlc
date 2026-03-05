# 비즈니스 로직 모델 - Unit 1: Foundation

## 1. 테이블 로그인 플로우

```
1. 클라이언트가 tableNumber + password 전송
2. DB에서 tableNumber로 테이블 조회
3. 테이블 미존재 → 401 에러 ("테이블을 찾을 수 없습니다")
4. bcrypt.compare(password, table.password)
5. 비밀번호 불일치 → 401 에러 ("비밀번호가 올바르지 않습니다")
6. JWT 토큰 생성:
   - payload: { tableId, tableNumber, type: "table" }
   - 만료: 없음 (세션 만료 없음, 관리자 수동 리셋)
7. 토큰 + tableId + tableNumber 반환
8. 클라이언트: 토큰을 localStorage에 저장
9. 이후 요청 시 Authorization: Bearer <token> 헤더로 전송
```

## 2. 관리자 로그인 플로우

```
1. 클라이언트가 username + password 전송
2. DB에서 username으로 관리자 조회
3. 관리자 미존재 → 401 에러 ("인증 정보가 올바르지 않습니다")
4. bcrypt.compare(password, admin.password)
5. 비밀번호 불일치 → 401 에러 ("인증 정보가 올바르지 않습니다")
6. JWT 토큰 생성:
   - payload: { adminId, username, type: "admin" }
   - 만료: 16시간 (57600초)
7. 토큰 반환
8. 클라이언트: 토큰을 localStorage에 저장
9. 이후 요청 시 Authorization: Bearer <token> 헤더로 전송
10. 16시간 후 토큰 만료 → 401 → 로그인 페이지로 리다이렉트
```

## 3. JWT 토큰 구조

### 테이블 토큰
```json
{
  "tableId": 1,
  "tableNumber": 5,
  "type": "table",
  "iat": 1709600000
}
```
- 만료 없음
- 서명: HS256 + JWT_SECRET 환경변수

### 관리자 토큰
```json
{
  "adminId": 1,
  "username": "admin",
  "type": "admin",
  "iat": 1709600000,
  "exp": 1709657600
}
```
- 만료: 16시간 (57600초)
- 서명: HS256 + JWT_SECRET 환경변수

## 4. 인증 미들웨어 로직

```
1. Authorization 헤더에서 Bearer 토큰 추출
2. 토큰 없음 → 401 에러
3. JWT 검증 (서명 + 만료)
4. 검증 실패 → 401 에러
5. payload에서 type 확인:
   - "table" → 고객용 API 접근 허용
   - "admin" → 관리자용 API 접근 허용
6. 요청 컨텍스트에 payload 첨부
```

## 5. 시드 데이터

### 관리자 계정
```
username: "admin"
password: bcrypt("admin1234") // 초기 비밀번호
```

### 기본 카테고리
```
- { name: "메인 메뉴", sortOrder: 1 }
- { name: "사이드 메뉴", sortOrder: 2 }
- { name: "음료", sortOrder: 3 }
```
