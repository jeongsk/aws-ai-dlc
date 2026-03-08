# Application Design - 상세 단계

## 목적
**고수준 컴포넌트 식별 및 서비스 레이어 설계**

Application Design은 다음에 중점을 둡니다:
- 주요 기능 컴포넌트와 그 책임 식별
- 컴포넌트 인터페이스 정의 (상세한 비즈니스 로직 제외)
- 오케스트레이션을 위한 서비스 레이어 설계
- 컴포넌트 의존성 및 통신 패턴 설정

**참고**: 상세한 비즈니스 로직 설계는 나중에 Functional Design에서 수행됩니다 (단위별, CONSTRUCTION 단계)

## 전제 조건
- Context Assessment가 완료되어야 함
- Requirements Assessment 권장 (기능적 컨텍스트 제공)
- Story Development 권장 (사용자 스토리가 설계 결정을 안내)
- 실행 계획에서 Application Design 단계 실행이 표시되어야 함

## 단계별 실행

### 1. 컨텍스트 분석
- `aidlc-docs/inception/requirements/requirements.md`와 `aidlc-docs/inception/user-stories/stories.md` 읽기
- 주요 비즈니스 기능 및 기능 영역 식별
- 설계 범위 및 복잡성 결정

### 2. Application Design 계획 생성
- application design을 위한 체크박스 [] 포함 계획 생성
- 컴포넌트, 책임, 메서드, 비즈니스 규칙, 서비스에 중점
- 각 단계와 하위 단계에는 체크박스 []가 있어야 함

### 3. 계획에 필수 설계 산출물 포함
- **항상** 설계 계획에 다음 필수 산출물을 포함:
  - [ ] 컴포넌트 정의 및 고수준 책임이 포함된 components.md 생성
  - [ ] 메서드 시그니처가 포함된 component-methods.md 생성 (비즈니스 규칙은 나중에 Functional Design에서 상세화)
  - [ ] 서비스 정의 및 오케스트레이션 패턴이 포함된 services.md 생성
  - [ ] 의존성 관계 및 통신 패턴이 포함된 component-dependency.md 생성
  - [ ] 설계 완전성 및 일관성 검증

### 4. 컨텍스트에 적합한 질문 생성
**지시사항**: 요구사항과 스토리를 분석하여 이 특정 application design과 관련된 질문만 생성하세요. 아래 카테고리를 영감으로 사용하되, 필수 체크리스트로 사용하지 마세요. 해당되지 않는 전체 카테고리는 건너뛰세요.

- [Answer]: 태그 형식을 사용하여 질문 포함
- 이 컨텍스트에 특정한 모호성과 누락된 정보에 중점
- 설계 결정에 사용자 입력이 필요한 경우에만 질문 생성

**예시 질문 카테고리** (필요에 따라 조정):
- **컴포넌트 식별** - 컴포넌트 경계나 조직이 불분명한 경우에만
- **컴포넌트 메서드** - 메서드 시그니처에 명확화가 필요한 경우에만 (상세한 비즈니스 규칙은 나중에)
- **서비스 레이어 설계** - 서비스 오케스트레이션이나 경계가 모호한 경우에만
- **컴포넌트 의존성** - 통신 패턴이나 의존성 관리가 불분명한 경우에만
- **설계 패턴** - 아키텍처 스타일이나 패턴 선택에 사용자 입력이 필요한 경우에만

### 5. Application Design 계획 저장
- `aidlc-docs/inception/plans/application-design-plan.md`로 저장
- 사용자 입력을 위한 모든 [Answer]: 태그 포함
- 계획이 모든 설계 측면을 다루는지 확인

### 6. 사용자 입력 요청
- 사용자에게 계획 문서에서 직접 [Answer]: 태그를 채우도록 요청
- 설계 결정의 중요성 강조
- [Answer]: 태그 완성에 대한 명확한 지침 제공

### 7. 답변 수집
- 사용자가 문서의 [Answer]: 태그를 사용하여 모든 질문에 답변할 때까지 대기
- 모든 [Answer]: 태그가 완성될 때까지 진행하지 마세요
- 문서를 검토하여 [Answer]: 태그가 비어있지 않은지 확인

### 8. 답변 분석 (필수)
진행하기 전에 모든 사용자 답변을 다음 사항에 대해 신중히 검토해야 합니다:
- **모호하거나 애매한 응답**: "혼합", "중간 정도", "확실하지 않음", "상황에 따라"
- **정의되지 않은 기준이나 용어**: 명확한 정의 없이 개념을 참조
- **모순된 답변**: 서로 충돌하는 응답
- **누락된 설계 세부사항**: 구체적인 지침이 부족한 답변
- **옵션을 결합한 답변**: 명확한 결정 규칙 없이 다른 접근 방식을 병합한 응답

### 9. 필수 후속 질문
8단계의 분석에서 모호한 답변이 발견되면 반드시:
- [Answer]: 태그를 사용하여 계획 문서에 구체적인 후속 질문 추가
- 모든 모호성이 해결될 때까지 승인으로 진행하지 마세요
- 필요한 후속 질문의 예:
  - "A와 B의 '혼합'이라고 하셨는데 - A와 B 중 언제 사용할지 결정하는 구체적인 기준은 무엇인가요?"
  - "A와 B 사이 '중간 정도'라고 하셨는데 - 정확한 중간 지점 접근 방식을 정의해 주실 수 있나요?"
  - "'확실하지 않음'이라고 하셨는데 - 결정하는 데 도움이 될 추가 정보는 무엇인가요?"
  - "'복잡성에 따라'라고 하셨는데 - 복잡성 수준을 어떻게 정의하시나요?"

### 10. Application Design 산출물 생성
- 승인된 계획을 실행하여 설계 산출물 생성
- 다음을 포함하여 `aidlc-docs/inception/application-design/components.md` 생성:
  - 컴포넌트 이름 및 목적
  - 컴포넌트 책임
  - 컴포넌트 인터페이스
- 다음을 포함하여 `aidlc-docs/inception/application-design/component-methods.md` 생성:
  - 각 컴포넌트의 메서드 시그니처
  - 각 메서드의 고수준 목적
  - 입력/출력 타입
  - 참고: 상세한 비즈니스 규칙은 Functional Design에서 정의됩니다 (단위별, CONSTRUCTION 단계)
- 다음을 포함하여 `aidlc-docs/inception/application-design/services.md` 생성:
  - 서비스 정의
  - 서비스 책임
  - 서비스 상호작용 및 오케스트레이션
- 다음을 포함하여 `aidlc-docs/inception/application-design/component-dependency.md` 생성:
  - 관계를 보여주는 의존성 매트릭스
  - 컴포넌트 간 통신 패턴
  - 데이터 플로우 다이어그램

### 11. 승인 기록
- 타임스탬프와 함께 `aidlc-docs/audit.md`에 승인 프롬프트 기록
- 완전한 승인 프롬프트 텍스트 포함
- ISO 8601 타임스탬프 형식 사용

### 12. 완료 메시지 제시

```markdown
# 🏗️ Application Design 완료

[생성된 application design 산출물의 AI 생성 요약을 불릿 포인트로]

> **📋 <u>**검토 필요:**</u>**  
> application design 산출물을 검토해 주세요: `aidlc-docs/inception/application-design/`

> **🚀 <u>**다음 단계:**</u>**
>
> **다음을 선택할 수 있습니다:**
>
> 🔧 **변경 요청** - 필요한 경우 application design 수정 요청
> [Units Generation이 건너뛰어진 경우:]
> 📝 **Units Generation 추가** - **Units Generation** 단계 포함 선택 (현재 건너뛰어짐)
> ✅ **승인 및 계속** - 설계를 승인하고 **[Units Generation/CONSTRUCTION PHASE]**로 진행
```

### 13. 명시적 승인 대기
- 사용자가 명시적으로 application design을 승인할 때까지 진행하지 마세요
- 승인은 명확하고 애매하지 않아야 함
- 사용자가 변경을 요청하면 설계를 업데이트하고 승인 과정을 반복

### 14. 승인 응답 기록
- 타임스탬프와 함께 사용자의 승인 응답을 `aidlc-docs/audit.md`에 기록
- 정확한 사용자 응답 텍스트 포함
- 승인 상태를 명확히 표시

### 15. 진행 상황 업데이트
- `aidlc-docs/aidlc-state.md`에서 Application Design 단계를 완료로 표시
- "Current Status" 섹션 업데이트
- 다음 단계로의 전환 준비