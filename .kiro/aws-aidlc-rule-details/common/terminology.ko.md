# AI-DLC 용어 사전

## 핵심 용어

### Phase vs Stage

**Phase**: AI-DLC의 세 가지 고수준 생명주기 단계 중 하나
- 🔵 **INCEPTION PHASE** - 계획 및 아키텍처 (무엇을, 왜)
- 🟢 **CONSTRUCTION PHASE** - 설계, 구현 및 테스트 (어떻게)
- 🟡 **OPERATIONS PHASE** - 배포 및 모니터링 (향후 확장)

**Stage**: Phase 내의 개별 워크플로우 활동
- 예시: Context Assessment stage, Requirements Assessment stage, Code Planning stage
- 각 stage는 특정 전제 조건, 단계, 출력을 가짐
- Stage는 ALWAYS-EXECUTE 또는 CONDITIONAL일 수 있음

**사용 예시**:
- ✅ "CONSTRUCTION phase는 7개의 stages를 포함합니다"
- ✅ "Code Planning stage는 항상 실행됩니다"
- ✅ "우리는 INCEPTION phase에 있으며, Requirements Assessment stage를 실행하고 있습니다"
- ❌ "Requirements Assessment phase" ("stage"여야 함)
- ❌ "CONSTRUCTION stage" ("phase"여야 함)

## 3단계 생명주기

### INCEPTION PHASE
**목적**: 계획 및 아키텍처 결정  
**초점**: 무엇을 만들 것인지와 왜 만드는지 결정  
**위치**: `inception/` 디렉토리

**Stages**:
- Workspace Detection (ALWAYS)
- Reverse Engineering (CONDITIONAL - Brownfield만)
- Requirements Analysis (ALWAYS - 적응형 깊이)
- User Stories (CONDITIONAL)
- Workflow Planning (ALWAYS)
- Application Design (CONDITIONAL)
- Design - Units Planning/Generation (CONDITIONAL)

**출력**: Requirements, user stories, 아키텍처 결정, unit 정의

### CONSTRUCTION PHASE
**목적**: 상세 설계 및 구현  
**초점**: 어떻게 만들 것인지 결정  
**위치**: `construction/` 디렉토리

**Stages**:
- Functional Design (CONDITIONAL, per-unit)
- NFR Requirements (CONDITIONAL, per-unit)
- NFR Design (CONDITIONAL, per-unit)
- Infrastructure Design (CONDITIONAL, per-unit)
- Code Planning (ALWAYS)
- Code Generation (ALWAYS)
- Build and Test (ALWAYS)

**출력**: 설계 산출물, NFR 구현, 코드, 테스트

### OPERATIONS PHASE
**목적**: 배포 및 운영 준비  
**초점**: 어떻게 배포하고 실행할 것인지  
**위치**: `operations/` 디렉토리

**Stages**:
- Operations (PLACEHOLDER)

**출력**: 빌드 지침, 배포 가이드, 모니터링 설정, 검증 절차

---

## 워크플로우 Stages

### Always-Execute Stages
- **Workspace Detection**: 워크스페이스 상태 및 프로젝트 유형의 초기 분석
- **Requirements Analysis**: Requirements 수집 (복잡성에 따라 깊이 변화)
- **Workflow Planning**: 실행할 phases에 대한 실행 계획 생성
- **Code Planning**: 코드 생성을 위한 상세 구현 계획 생성
- **Code Generation**: 계획과 이전 산출물을 기반으로 실제 코드 생성
- **Build and Test**: 모든 units 빌드 및 포괄적인 테스트 실행

### Conditional Stages
- **Reverse Engineering**: 기존 codebase 분석 (brownfield 프로젝트만)
- **User Stories**: User stories와 personas 생성 (Story Planning과 Story Generation 포함)
- **Application Design**: Application components, methods, business rules, services 설계
- **Design**: 시스템 components 설계 (Units Planning, Units Generation, per-unit design 포함)
- **Functional Design**: 기술 독립적인 비즈니스 로직 설계 (per-unit)
- **NFR Requirements**: NFRs 결정 및 기술 스택 선택 (per-unit)
- **NFR Design**: NFR 패턴과 논리적 components 통합 (per-unit)
- **Infrastructure Design**: 실제 인프라 서비스에 매핑 (per-unit)

## Application Design 용어

- **Component**: 특정 책임을 가진 기능적 단위
- **Method**: 정의된 비즈니스 규칙을 가진 component 내의 함수 또는 연산
- **Business Rule**: method 동작과 검증을 관리하는 로직
- **Service**: components 간 비즈니스 로직을 조정하는 오케스트레이션 계층
- **Component Dependency**: components 간의 관계 및 통신 패턴

## 아키텍처 용어 (Infrastructure)

### Unit of Work
개발 목적을 위한 user stories의 논리적 그룹화. 계획 및 분해 중에 사용되는 용어.

**사용법**: "시스템을 units of work로 분해해야 합니다"

### Service
Microservices 아키텍처에서 독립적으로 배포 가능한 component. 각 service는 별도의 unit of work입니다.

**사용법**: "Payment Service는 모든 결제 처리를 담당합니다"

### Module
단일 service 또는 monolith 내의 기능적 논리 그룹화. Modules는 독립적으로 배포할 수 없습니다.

**사용법**: "User Service 내의 인증 module"

### Component
Service 또는 module 내의 재사용 가능한 빌딩 블록. Components는 특정 기능을 제공하는 클래스, 함수 또는 패키지입니다.

**사용법**: "EmailValidator component는 이메일 주소를 검증합니다"

## 용어 가이드라인

### 각 용어를 언제 사용할지

**Unit of Work**:
- Units Planning과 Units Generation phases 중
- 시스템 분해를 논의할 때
- 계획 문서와 논의에서
- 예시: "이것을 units of work로 어떻게 분해해야 할까요?"

**Service**:
- 독립적으로 배포 가능한 components를 언급할 때
- Microservices 아키텍처 맥락에서
- 배포 및 인프라 논의에서
- 예시: "Order Service는 ECS에 배포될 것입니다"

**Module**:
- Service 내의 논리적 그룹화를 언급할 때
- Monolith 아키텍처 맥락에서
- 내부 조직을 논의할 때
- 예시: "보고 module은 모든 보고서를 생성합니다"

**Component**:
- 특정 클래스, 함수 또는 패키지를 언급할 때
- 설계 및 구현 논의에서
- 재사용 가능한 빌딩 블록을 논의할 때
- 예시: "DatabaseConnection component는 연결을 관리합니다"

## Stage 용어

### Planning vs Generation
- **Planning**: 실행을 위한 질문과 체크박스가 있는 계획 생성
- **Generation**: 산출물을 생성하기 위한 계획 실행

예시:
- Story Planning → Story Generation
- Units Planning → Units Generation
- Unit Design Planning → Unit Design Generation
- NFR Planning → NFR Generation
- Code Planning → Code Generation

### 깊이 수준
- **Minimal**: 간단한 변경을 위한 빠르고 집중된 실행
- **Standard**: 일반적인 프로젝트를 위한 표준 산출물이 있는 일반적인 깊이
- **Comprehensive**: 복잡하고 고위험 프로젝트를 위한 모든 산출물이 있는 전체 깊이

## 산출물 유형

### Plans
실행을 안내하는 체크박스와 질문이 있는 문서.
- `aidlc-docs/plans/`에 위치
- 예시: `story-generation-plan.md`, `unit-of-work-plan.md`

### Artifacts
계획 실행으로부터 생성된 출력.
- 다양한 `aidlc-docs/` 하위 디렉토리에 위치
- 예시: `requirements.md`, `stories.md`, `design.md`

### State Files
워크플로우 진행 상황과 상태를 추적하는 파일.
- `aidlc-state.md`: 전체 워크플로우 상태
- `audit.md`: 모든 상호작용의 완전한 audit trail

## 일반적인 약어

- **AI-DLC**: AI-Driven Development Life Cycle
- **NFR**: Non-Functional Requirements
- **UOW**: Unit of Work
- **API**: Application Programming Interface
- **CDK**: Cloud Development Kit (AWS)