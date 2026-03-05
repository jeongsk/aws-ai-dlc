# 요구사항 명확화 질문

제공해주신 요구사항 문서를 분석한 결과, 아래 항목들에 대한 명확화가 필요합니다.
각 질문의 `[Answer]:` 태그 뒤에 선택지 알파벳을 입력해 주세요.

---

## Question 1
프로젝트의 기술 스택(프로그래밍 언어 및 프레임워크)은 어떤 것을 사용하시겠습니까?

A) TypeScript + React (프론트엔드) / TypeScript + Node.js + Express (백엔드)
B) TypeScript + React (프론트엔드) / TypeScript + Node.js + NestJS (백엔드)
C) TypeScript + Next.js (풀스택)
D) JavaScript + React (프론트엔드) / JavaScript + Node.js + Express (백엔드)
X) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 2
데이터베이스는 어떤 것을 사용하시겠습니까?

A) PostgreSQL (관계형 데이터베이스)
B) MySQL (관계형 데이터베이스)
C) SQLite (경량 관계형 데이터베이스, 개발/소규모 매장용)
D) MongoDB (NoSQL 문서형 데이터베이스)
X) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 3
배포 환경은 어떻게 계획하고 계십니까?

A) 로컬 개발 환경만 (Docker Compose 등)
B) 클라우드 배포 (AWS)
C) 클라우드 배포 (기타: GCP, Azure 등)
D) VPS/자체 서버 배포
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 4
매장(Store) 관리 구조는 어떻게 되나요? (멀티테넌시 관련)

A) 단일 매장만 지원 (하나의 매장에서만 사용)
B) 다중 매장 지원 (각 매장이 독립적으로 운영, 하나의 시스템에서 여러 매장 관리)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 5
메뉴 이미지 관리는 어떻게 하시겠습니까?

A) 외부 이미지 URL 직접 입력 (별도 이미지 호스팅 사용)
B) 서버에 이미지 파일 업로드 기능 포함
C) 이미지 없이 텍스트만으로 MVP 진행
X) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 6
동시 접속 사용자 규모는 어느 정도를 예상하십니까?

A) 소규모 (1개 매장, 테이블 20개 이하)
B) 중규모 (1~5개 매장, 테이블 총 100개 이하)
C) 대규모 (5개 이상 매장, 테이블 100개 이상)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 7
관리자 계정 관리는 어떻게 하시겠습니까?

A) 시스템 초기 설정 시 관리자 계정 1개를 시드 데이터로 생성 (매장당 1개 계정)
B) 관리자 회원가입 기능 포함 (매장 등록 + 관리자 계정 생성)
C) 슈퍼 관리자가 매장 및 관리자 계정을 생성/관리
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 8
테이블 태블릿의 세션 만료 정책은 어떻게 하시겠습니까?

A) 세션 만료 없음 (태블릿은 항상 로그인 상태 유지, 관리자가 수동으로 리셋)
B) 일정 시간 후 자동 만료 (예: 24시간)
C) 매장 영업 종료 시 관리자가 일괄 리셋
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 9: Security Extensions
이 프로젝트에 보안 확장 규칙(SECURITY rules)을 적용하시겠습니까?

A) Yes — 모든 SECURITY 규칙을 blocking constraint로 적용 (프로덕션 수준 애플리케이션에 권장)
B) No — SECURITY 규칙 건너뛰기 (PoC, 프로토타입, 실험적 프로젝트에 적합)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

---
