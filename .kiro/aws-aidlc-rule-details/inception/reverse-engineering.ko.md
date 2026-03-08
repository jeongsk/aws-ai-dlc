# Reverse Engineering

**목적**: 기존 코드베이스를 분석하고 포괄적인 설계 산출물을 생성

**실행 시점**: Brownfield 프로젝트 감지 시 (workspace에서 기존 코드 발견)

**건너뛰기 조건**: Greenfield 프로젝트 (기존 코드 없음)

**재실행 동작**: Brownfield 프로젝트 감지 시 항상 재실행, 산출물이 존재해도 실행. 이는 산출물이 현재 코드 상태를 반영하도록 보장

## 1단계: 다중 패키지 발견

### 1.1 Workspace 스캔
- 모든 패키지 (언급된 것만이 아닌)
- 설정 파일을 통한 패키지 관계
- 패키지 유형: Application, CDK/Infrastructure, Models, Clients, Tests

### 1.2 비즈니스 컨텍스트 이해
- 시스템이 전체적으로 구현하는 핵심 비즈니스
- 모든 패키지의 비즈니스 개요
- 시스템에서 구현된 비즈니스 트랜잭션 목록

### 1.3 Infrastructure 발견
- CDK 패키지 (CDK 의존성이 있는 package.json)
- Terraform (.tf 파일)
- CloudFormation (.yaml/.json 템플릿)
- 배포 스크립트

### 1.4 빌드 시스템 발견
- 빌드 시스템: Brazil, Maven, Gradle, npm
- 빌드 시스템 선언을 위한 설정 파일
- 패키지 간 빌드 의존성

### 1.5 서비스 아키텍처 발견
- Lambda 함수 (handlers, triggers)
- 컨테이너 서비스 (Docker/ECS 설정)
- API 정의 (Smithy models, OpenAPI specs)
- 데이터 저장소 (DynamoDB, S3 등)

### 1.6 코드 품질 분석
- 프로그래밍 언어 및 프레임워크
- 테스트 커버리지 지표
- Linting 설정
- CI/CD 파이프라인

## 1단계: 비즈니스 개요 문서 생성

`aidlc-docs/inception/reverse-engineering/business-overview.md` 생성:

```markdown
# 비즈니스 개요

## 비즈니스 컨텍스트 다이어그램
[비즈니스 컨텍스트를 보여주는 Mermaid 다이어그램]

## 비즈니스 설명
- **비즈니스 설명**: [시스템이 수행하는 전체 비즈니스 설명]
- **비즈니스 트랜잭션**: [시스템이 구현하는 비즈니스 트랜잭션 목록과 설명]
- **비즈니스 사전**: [시스템이 따르는 비즈니스 사전 용어와 의미]

## 컴포넌트 레벨 비즈니스 설명
### [패키지/컴포넌트 이름]
- **목적**: [비즈니스 관점에서 수행하는 작업]
- **책임**: [주요 책임]
```

## 2단계: 아키텍처 문서 생성

`aidlc-docs/inception/reverse-engineering/architecture.md` 생성:

```markdown
# 시스템 아키텍처

## 시스템 개요
[시스템의 고수준 설명]

## 아키텍처 다이어그램
[모든 패키지, 서비스, 데이터 저장소, 관계를 보여주는 Mermaid 다이어그램]

## 컴포넌트 설명
### [패키지/컴포넌트 이름]
- **목적**: [수행하는 작업]
- **책임**: [주요 책임]
- **의존성**: [의존하는 것들]
- **유형**: [Application/Infrastructure/Model/Client/Test]

## 데이터 플로우
[주요 워크플로우의 Mermaid 시퀀스 다이어그램]

## 통합 지점
- **외부 API**: [목적과 함께 목록]
- **데이터베이스**: [목적과 함께 목록]
- **서드파티 서비스**: [목적과 함께 목록]

## Infrastructure 컴포넌트
- **CDK Stacks**: [목적과 함께 목록]
- **배포 모델**: [설명]
- **네트워킹**: [VPC, subnets, security groups]
```

## 3단계: 코드 구조 문서 생성

`aidlc-docs/inception/reverse-engineering/code-structure.md` 생성:

```markdown
# 코드 구조

## 빌드 시스템
- **유형**: [Maven/Gradle/npm/Brazil]
- **설정**: [주요 빌드 파일 및 설정]

## 주요 클래스/모듈
[Mermaid 클래스 다이어그램 또는 모듈 계층구조]

### 기존 파일 인벤토리
[모든 소스 파일을 목적과 함께 나열 - 이들은 brownfield 프로젝트에서 수정 후보]

**예시 형식**:
- `[path/to/file]` - [목적/책임]

## 디자인 패턴
### [패턴 이름]
- **위치**: [사용된 곳]
- **목적**: [사용 이유]
- **구현**: [구현 방법]

## 중요한 의존성
### [의존성 이름]
- **버전**: [버전 번호]
- **사용**: [사용 방법 및 위치]
- **목적**: [필요한 이유]
```

## 4단계: API 문서 생성

`aidlc-docs/inception/reverse-engineering/api-documentation.md` 생성:

```markdown
# API 문서

## REST API
### [엔드포인트 이름]
- **메서드**: [GET/POST/PUT/DELETE]
- **경로**: [/api/path]
- **목적**: [수행하는 작업]
- **요청**: [요청 형식]
- **응답**: [응답 형식]

## 내부 API
### [인터페이스/클래스 이름]
- **메서드**: [시그니처와 함께 목록]
- **매개변수**: [매개변수 설명]
- **반환 타입**: [반환 타입 설명]

## 데이터 모델
### [모델 이름]
- **필드**: [필드 설명]
- **관계**: [관련 모델]
- **검증**: [검증 규칙]
```

## 5단계: 컴포넌트 인벤토리 생성

`aidlc-docs/inception/reverse-engineering/component-inventory.md` 생성:

```markdown
# 컴포넌트 인벤토리

## Application 패키지
- [패키지 이름] - [목적]

## Infrastructure 패키지
- [패키지 이름] - [CDK/Terraform] - [목적]

## 공유 패키지
- [패키지 이름] - [Models/Utilities/Clients] - [목적]

## 테스트 패키지
- [패키지 이름] - [Integration/Load/Unit] - [목적]

## 총 개수
- **총 패키지**: [개수]
- **Application**: [개수]
- **Infrastructure**: [개수]
- **공유**: [개수]
- **테스트**: [개수]
```

## 6단계: 기술 스택 문서 생성

`aidlc-docs/inception/reverse-engineering/technology-stack.md` 생성:

```markdown
# 기술 스택

## 프로그래밍 언어
- [언어] - [버전] - [사용]

## 프레임워크
- [프레임워크] - [버전] - [목적]

## Infrastructure
- [서비스] - [목적]

## 빌드 도구
- [도구] - [버전] - [목적]

## 테스팅 도구
- [도구] - [버전] - [목적]
```

## 7단계: 의존성 문서 생성

`aidlc-docs/inception/reverse-engineering/dependencies.md` 생성:

```markdown
# 의존성

## 내부 의존성
[패키지 의존성을 보여주는 Mermaid 다이어그램]

### [패키지 A]가 [패키지 B]에 의존
- **유형**: [Compile/Runtime/Test]
- **이유**: [의존성이 존재하는 이유]

## 외부 의존성
### [의존성 이름]
- **버전**: [버전]
- **목적**: [사용 이유]
- **라이선스**: [라이선스 유형]
```

## 8단계: 코드 품질 평가 생성

`aidlc-docs/inception/reverse-engineering/code-quality-assessment.md` 생성:

```markdown
# 코드 품질 평가

## 테스트 커버리지
- **전체**: [백분율 또는 Good/Fair/Poor/None]
- **단위 테스트**: [상태]
- **통합 테스트**: [상태]

## 코드 품질 지표
- **Linting**: [설정됨/설정되지 않음]
- **코드 스타일**: [일관됨/일관되지 않음]
- **문서화**: [Good/Fair/Poor]

## 기술 부채
- [문제 설명 및 위치]

## 패턴 및 안티패턴
- **좋은 패턴**: [목록]
- **안티패턴**: [위치와 함께 목록]
```

## 9단계: 타임스탬프 파일 생성

`aidlc-docs/inception/reverse-engineering/reverse-engineering-timestamp.md` 생성:

```markdown
# Reverse Engineering 메타데이터

**분석 날짜**: [ISO 타임스탬프]
**분석기**: AI-DLC
**Workspace**: [Workspace 경로]
**분석된 총 파일 수**: [개수]

## 생성된 산출물
- [x] architecture.md
- [x] code-structure.md
- [x] api-documentation.md
- [x] component-inventory.md
- [x] technology-stack.md
- [x] dependencies.md
- [x] code-quality-assessment.md
```

## 10단계: 상태 추적 업데이트

`aidlc-docs/aidlc-state.md` 업데이트:

```markdown
## Reverse Engineering 상태
- [x] Reverse Engineering - [타임스탬프]에 완료
- **산출물 위치**: aidlc-docs/inception/reverse-engineering/
```

## 11단계: 사용자에게 완료 메시지 제시

```markdown
# 🔍 Reverse Engineering 완료

[분석에서 얻은 주요 발견사항의 AI 생성 요약을 불릿 포인트 형태로]

> **📋 <u>**검토 필요:**</u>**  
> reverse engineering 산출물을 검토해 주세요: `aidlc-docs/inception/reverse-engineering/`

> **🚀 <u>**다음 단계:**</u>**
>
> **다음을 선택할 수 있습니다:**
>
> 🔧 **변경 요청** - 필요한 경우 reverse engineering 분석 수정 요청
> ✅ **승인 및 계속** - 분석을 승인하고 **Requirements Analysis**로 진행
```

## 12단계: 사용자 승인 대기

- **필수**: 사용자가 명시적으로 승인할 때까지 진행하지 마세요
- **필수**: 사용자의 응답을 완전한 원본 입력으로 audit.md에 기록