# Functional Design

## 목적
**unit별 상세 비즈니스 로직 설계**

Functional Design은 다음에 집중:
- unit에 대한 상세 비즈니스 로직 및 알고리즘
- 엔티티 및 관계를 포함한 도메인 모델
- 상세 비즈니스 규칙, 검증 로직, 제약 조건
- 기술 독립적 설계 (인프라 관심사 없음)

**참고**: 이는 Application Design (INCEPTION 단계)의 고수준 컴포넌트 설계를 기반으로 구축됨

## 전제 조건
- Units Generation이 완료되어야 함
- Unit of work 아티팩트가 사용 가능해야 함
- Application Design 권장 (고수준 컴포넌트 구조 제공)
- 실행 계획에서 Functional Design 단계 실행이 표시되어야 함

## 개요
unit에 대한 상세 비즈니스 로직을 설계하며, 기술 독립적이고 순수하게 비즈니스 기능에 집중.

## 실행 단계

### 1단계: Unit 컨텍스트 분석
- `aidlc-docs/inception/application-design/unit-of-work.md`에서 unit 정의 읽기
- `aidlc-docs/inception/application-design/unit-of-work-story-map.md`에서 할당된 스토리 읽기
- unit 책임과 경계 이해

### 2단계: Functional Design 계획 생성
- functional design을 위한 체크박스 [] 포함 계획 생성
- 비즈니스 로직, 도메인 모델, 비즈니스 규칙에 집중
- 각 단계에는 체크박스 []가 있어야 함

### 3단계: 상황에 맞는 질문 생성
**지침**: unit 정의와 functional design 아티팩트를 철저히 분석하여 명확화가 functional design을 개선할 수 있는 모든 영역을 식별. 포괄적인 이해를 보장하기 위해 적극적으로 질문하기.

**중요**: functional design 품질에 영향을 줄 수 있는 모호성이나 누락된 세부사항이 있을 때는 기본적으로 질문하기. 잘못된 가정을 하는 것보다 너무 많은 질문을 하는 것이 낫습니다.

- [Answer]: 태그 형식을 사용하여 질문 포함
- 모든 모호성, 누락된 정보, 또는 명확화가 필요한 영역에 집중
- 사용자 입력이 functional design 결정을 개선할 수 있는 곳에서 질문 생성
- **의심스러울 때는 질문하기** - 과신은 설계 품질 저하로 이어짐

**고려할 질문 카테고리** (모든 카테고리 평가):
- **비즈니스 로직 모델링** - 핵심 엔티티, 워크플로우, 데이터 변환, 비즈니스 프로세스에 대해 질문
- **도메인 모델** - 도메인 개념, 엔티티 관계, 데이터 구조, 비즈니스 객체에 대해 질문
- **비즈니스 규칙** - 결정 규칙, 검증 로직, 제약 조건, 비즈니스 정책에 대해 질문
- **데이터 플로우** - 데이터 입력, 출력, 변환, 지속성 요구사항에 대해 질문
- **통합 지점** - 외부 시스템 상호작용, API, 데이터 교환에 대해 질문
- **오류 처리** - 오류 시나리오, 검증 실패, 예외 처리에 대해 질문
- **비즈니스 시나리오** - 엣지 케이스, 대안 플로우, 복잡한 비즈니스 상황에 대해 질문
- **Frontend 컴포넌트** (해당하는 경우) - UI 컴포넌트 구조, 사용자 상호작용, 상태 관리, 폼 처리에 대해 질문

### 4단계: 계획 저장
- `aidlc-docs/construction/plans/{unit-name}-functional-design-plan.md`로 저장
- 사용자 입력을 위한 모든 [Answer]: 태그 포함

### 5단계: 답변 수집 및 분석
- 사용자가 모든 [Answer]: 태그를 완료할 때까지 대기
- **필수**: 모든 응답을 주의 깊게 검토하여 모호하거나 애매한 답변 확인
- **중요**: 불분명한 응답에 대해서는 후속 질문 추가 - 모호성을 가지고 진행하지 않음
- "상황에 따라", "아마도", "확실하지 않음", "혼합", "중간 정도" 같은 응답 찾기
- 모호성이 감지되면 명확화 질문 파일 생성
- **모든 모호성이 해결될 때까지 진행하지 않음**

### 6단계: Functional Design 아티팩트 생성
- `aidlc-docs/construction/{unit-name}/functional-design/business-logic-model.md` 생성
- `aidlc-docs/construction/{unit-name}/functional-design/business-rules.md` 생성
- `aidlc-docs/construction/{unit-name}/functional-design/domain-entities.md` 생성
- unit이 frontend/UI를 포함하는 경우: `aidlc-docs/construction/{unit-name}/functional-design/frontend-components.md` 생성
  - 컴포넌트 계층 구조 및 구조
  - 각 컴포넌트의 Props 및 state 정의
  - 사용자 상호작용 플로우
  - 폼 검증 규칙
  - API 통합 지점 (각 컴포넌트가 사용하는 백엔드 엔드포인트)

### 7단계: 완료 메시지 제시
- 이 구조로 완료 메시지 제시:
     1. **완료 공지** (필수): 항상 이것으로 시작:

```markdown
# 🔧 Functional Design 완료 - [unit-name]
```

     2. **AI 요약** (선택사항): functional design의 구조화된 불릿 포인트 요약 제공
        - 형식: "Functional design이 [설명]을 생성했습니다:"
        - 주요 비즈니스 로직 모델 및 엔티티 나열 (불릿 포인트)
        - 정의된 비즈니스 규칙 및 검증 로직 나열
        - 도메인 모델 구조 및 관계 언급
        - 워크플로우 지침 포함하지 않기 ("검토해 주세요", "알려주세요", "다음 단계로 진행", "진행하기 전에")
        - 사실적이고 내용 중심으로 유지
     3. **형식화된 워크플로우 메시지** (필수): 항상 이 정확한 형식으로 끝내기:

```markdown
> **📋 <u>**검토 필요:**</u>**  
> 다음 위치에서 functional design 아티팩트를 검토해 주세요: `aidlc-docs/construction/[unit-name]/functional-design/`



> **🚀 <u>**다음 단계는?**</u>**
>
> **다음을 수행할 수 있습니다:**
>
> 🔧 **변경 요청** - 검토를 바탕으로 functional design 수정 요청  
> ✅ **다음 단계로 계속** - functional design을 승인하고 **[next-stage-name]**으로 진행

---
```

### 8단계: 명시적 승인 대기
- 사용자가 functional design을 명시적으로 승인할 때까지 진행하지 않음
- 승인은 명확하고 애매하지 않아야 함
- 사용자가 변경을 요청하면 설계를 업데이트하고 승인 프로세스 반복

### 9단계: 승인 기록 및 진행 상황 업데이트
- 타임스탬프와 함께 audit.md에 승인 로그
- 타임스탬프와 함께 사용자의 승인 응답 기록
- aidlc-state.md에서 Functional Design 단계를 완료로 표시