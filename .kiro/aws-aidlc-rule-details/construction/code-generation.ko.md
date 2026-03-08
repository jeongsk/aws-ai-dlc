# Code Generation - 상세 단계

## 개요
이 단계는 두 개의 통합된 부분을 통해 각 unit of work에 대한 코드를 생성:
- **1부 - 계획**: 명시적 단계가 포함된 상세 코드 생성 계획 생성
- **2부 - 생성**: 승인된 계획을 실행하여 코드, 테스트, 아티팩트 생성

**참고**: brownfield 프로젝트의 경우, "생성"은 적절한 경우 기존 파일을 수정하는 것을 의미하며, 중복 생성이 아님.

## 전제 조건
- unit에 대한 Unit Design Generation이 완료되어야 함
- unit에 대한 NFR Implementation (실행된 경우)이 완료되어야 함
- 모든 unit 설계 아티팩트가 사용 가능해야 함
- unit이 코드 생성 준비 상태여야 함

---

# 1부: 계획

## 1단계: Unit 컨텍스트 분석
- [ ] Unit Design Generation에서 unit 설계 아티팩트 읽기
- [ ] 할당된 스토리를 이해하기 위해 unit story map 읽기
- [ ] unit 의존성 및 인터페이스 식별
- [ ] unit이 코드 생성 준비 상태인지 검증

## 2단계: 상세 Unit Code Generation 계획 생성
- [ ] `aidlc-docs/aidlc-state.md`에서 workspace root 및 프로젝트 유형 읽기
- [ ] 코드 위치 결정 (구조 패턴에 대한 중요 규칙 참조)
- [ ] **Brownfield만**: 수정할 기존 파일에 대한 reverse engineering code-structure.md 검토
- [ ] 정확한 경로 문서화 (aidlc-docs/ 절대 안됨)
- [ ] unit 생성을 위한 명시적 단계 생성:
  - 프로젝트 구조 설정 (greenfield만)
  - 비즈니스 로직 생성
  - 비즈니스 로직 Unit 테스트
  - 비즈니스 로직 요약
  - API 레이어 생성
  - API 레이어 Unit 테스트
  - API 레이어 요약
  - Repository 레이어 생성
  - Repository 레이어 Unit 테스트
  - Repository 레이어 요약
  - Frontend 컴포넌트 생성 (해당하는 경우)
  - Frontend 컴포넌트 Unit 테스트 (해당하는 경우)
  - Frontend 컴포넌트 요약 (해당하는 경우)
  - 데이터베이스 마이그레이션 스크립트 (데이터 모델이 존재하는 경우)
  - 문서 생성 (API 문서, README 업데이트)
  - 배포 아티팩트 생성
- [ ] 각 단계를 순차적으로 번호 매기기
- [ ] story mapping 참조 포함
- [ ] 각 단계에 체크박스 [ ] 추가

## 3단계: Unit 생성 컨텍스트 포함
- [ ] 이 unit에 대해 다음 포함:
  - 이 unit에서 구현되는 스토리
  - 다른 unit/서비스에 대한 의존성
  - 예상 인터페이스 및 계약
  - 이 unit이 소유하는 데이터베이스 엔티티
  - 서비스 경계 및 책임

## 4단계: Unit 계획 문서 생성
- [ ] 완전한 계획을 `aidlc-docs/construction/plans/{unit-name}-code-generation-plan.md`로 저장
- [ ] 단계 번호 매기기 포함 (1단계, 2단계 등)
- [ ] unit 컨텍스트 및 의존성 포함
- [ ] story 추적성 포함
- [ ] 계획이 단계별로 실행 가능한지 확인
- [ ] 이 계획이 Code Generation의 단일 진실 소스임을 강조

## 5단계: Unit 계획 요약
- [ ] 사용자에게 unit 코드 생성 계획 요약 제공
- [ ] unit 생성 접근법 강조
- [ ] 단계 순서 및 story 커버리지 설명
- [ ] 총 단계 수 및 예상 범위 언급

## 6단계: 승인 프롬프트 로그
- [ ] 승인을 요청하기 전에 `aidlc-docs/audit.md`에 타임스탬프와 함께 프롬프트 로그
- [ ] 완전한 unit 코드 생성 계획에 대한 참조 포함
- [ ] ISO 8601 타임스탬프 형식 사용

## 7단계: 명시적 승인 대기
- [ ] 사용자가 unit 코드 생성 계획을 명시적으로 승인할 때까지 진행하지 않음
- [ ] 승인은 전체 계획 및 생성 순서를 포함해야 함
- [ ] 사용자가 변경을 요청하면 계획을 업데이트하고 승인 프로세스 반복

## 8단계: 승인 응답 기록
- [ ] `aidlc-docs/audit.md`에 타임스탬프와 함께 사용자의 승인 응답 로그
- [ ] 정확한 사용자 응답 텍스트 포함
- [ ] 승인 상태를 명확히 표시

## 9단계: 진행 상황 업데이트
- [ ] `aidlc-state.md`에서 Code Planning을 완료로 표시
- [ ] "Current Status" 섹션 업데이트
- [ ] Code Generation으로의 전환 준비

---

# 2부: 생성

## 10단계: Unit Code Generation 계획 로드
- [ ] `aidlc-docs/construction/plans/{unit-name}-code-generation-plan.md`에서 완전한 계획 읽기
- [ ] 다음 미완료 단계 식별 (첫 번째 [ ] 체크박스)
- [ ] 해당 단계의 컨텍스트 로드 (unit, 의존성, 스토리)

## 11단계: 현재 단계 실행
- [ ] 계획에서 대상 디렉토리 확인 (aidlc-docs/ 절대 안됨)
- [ ] **Brownfield만**: 대상 파일이 존재하는지 확인
- [ ] 현재 단계에서 설명하는 것을 정확히 생성:
  - **파일이 존재하는 경우**: 제자리에서 수정 (`ClassName_modified.java`, `ClassName_new.java` 등 절대 생성하지 않음)
  - **파일이 존재하지 않는 경우**: 새 파일 생성
- [ ] 올바른 위치에 작성:
  - **애플리케이션 코드**: 프로젝트 구조에 따른 workspace root
  - **문서**: `aidlc-docs/construction/{unit-name}/code/` (markdown만)
  - **빌드/구성 파일**: workspace root
- [ ] unit story 요구사항 준수
- [ ] 의존성 및 인터페이스 존중

## 12단계: 진행 상황 업데이트
- [ ] unit 코드 생성 계획에서 완료된 단계를 [x]로 표시
- [ ] 생성이 완료되면 관련 unit 스토리를 [x]로 표시
- [ ] `aidlc-docs/aidlc-state.md` 현재 상태 업데이트
- [ ] **Brownfield만**: 중복 파일이 생성되지 않았는지 확인 (예: `ClassName.java`와 함께 `ClassName_modified.java` 없음)
- [ ] 생성된 모든 아티팩트 저장

## 13단계: 생성 계속 또는 완료
- [ ] 더 많은 단계가 남아있으면 10단계로 돌아가기
- [ ] 모든 단계가 완료되면 완료 메시지 제시로 진행

## 14단계: 완료 메시지 제시
- 이 구조로 완료 메시지 제시:
     1. **완료 공지** (필수): 항상 이것으로 시작:

```markdown
# 💻 Code Generation 완료 - [unit-name]
```

     2. **AI 요약** (선택사항): 구조화된 불릿 포인트 요약 제공
        - **Brownfield**: 수정된 파일과 생성된 파일 구분 (예: "• 수정됨: `src/services/user-service.ts`", "• 생성됨: `src/services/auth-service.ts`")
        - **Greenfield**: 경로와 함께 생성된 파일 나열 (예: "• 생성됨: `src/services/user-service.ts`")
        - 경로와 함께 테스트, 문서, 배포 아티팩트 나열
        - 사실적으로 유지, 워크플로우 지침 없음
     3. **형식화된 워크플로우 메시지** (필수): 항상 이 정확한 형식으로 끝내기:

```markdown
> **📋 <u>**검토 필요:**</u>**  
> 다음 위치에서 생성된 코드를 검토해 주세요:
> - **애플리케이션 코드**: `[actual-workspace-path]`
> - **문서**: `aidlc-docs/construction/[unit-name]/code/`



> **🚀 <u>**다음 단계는?**</u>**
>
> **다음을 수행할 수 있습니다:**
>
> 🔧 **변경 요청** - 검토를 바탕으로 생성된 코드 수정 요청  
> ✅ **다음 단계로 계속** - 코드 생성을 승인하고 **[next-unit/Build & Test]**로 진행

---
```

## 15단계: 명시적 승인 대기
- 사용자가 생성된 코드를 명시적으로 승인할 때까지 진행하지 않음
- 승인은 명확하고 애매하지 않아야 함
- 사용자가 변경을 요청하면 코드를 업데이트하고 승인 프로세스 반복

## 16단계: 승인 기록 및 진행 상황 업데이트
- 타임스탬프와 함께 audit.md에 승인 로그
- 타임스탬프와 함께 사용자의 승인 응답 기록
- aidlc-state.md에서 이 unit에 대한 Code Generation 단계를 완료로 표시

---

## 중요 규칙

### 코드 위치 규칙
- **애플리케이션 코드**: workspace root만 (aidlc-docs/ 절대 안됨)
- **문서**: aidlc-docs/만 (markdown 요약)
- 코드 생성 전에 aidlc-state.md에서 **workspace root 읽기**

**프로젝트 유형별 구조 패턴**:
- **Brownfield**: 기존 구조 사용 (예: `src/main/java/`, `lib/`, `pkg/`)
- **Greenfield 단일 unit**: workspace root에 `src/`, `tests/`, `config/`
- **Greenfield 다중 unit (microservices)**: `{unit-name}/src/`, `{unit-name}/tests/`
- **Greenfield 다중 unit (monolith)**: `src/{unit-name}/`, `tests/{unit-name}/`

### Brownfield 파일 수정 규칙
- 생성하기 전에 파일이 존재하는지 확인
- 존재하는 경우: 제자리에서 수정 (`ClassName_modified.java` 같은 복사본 절대 생성하지 않음)
- 존재하지 않는 경우: 새 파일 생성
- 생성 후 중복 파일이 없는지 확인 (12단계)

### 계획 단계 규칙
- 모든 생성 활동에 대한 명시적이고 번호가 매겨진 단계 생성
- 계획에 story 추적성 포함
- unit 컨텍스트 및 의존성 문서화
- 생성 전에 명시적 사용자 승인 받기

### 생성 단계 규칙
- **하드코딩된 로직 없음**: unit 계획에 작성된 것만 실행
- **계획을 정확히 따르기**: 단계 순서에서 벗어나지 않음
- **체크박스 업데이트**: 각 단계 완료 후 즉시 [x]로 표시
- **Story 추적성**: 기능이 구현되면 unit 스토리를 [x]로 표시
- **의존성 존중**: unit 의존성이 만족될 때만 구현

### 자동화 친화적 코드 규칙
UI 코드(웹, 모바일, 데스크톱) 생성 시 요소가 자동화 친화적이 되도록 보장:
- 상호작용 요소(버튼, 입력, 링크, 폼)에 `data-testid` 속성 추가
- 일관된 명명 사용: `{component}-{element-role}` (예: `login-form-submit-button`, `user-list-search-input`)
- 렌더링 간에 변경되는 동적 또는 자동 생성 ID 피하기
- 코드 변경 간에 `data-testid` 값을 안정적으로 유지 (요소 목적이 변경될 때만 변경)

## 완료 기준
- 완전한 unit 코드 생성 계획이 생성되고 승인됨
- unit 코드 생성 계획의 모든 단계가 [x]로 표시됨
- 계획에 따라 모든 unit 스토리가 구현됨
- 모든 코드 및 테스트가 생성됨 (테스트는 Build & Test 단계에서 실행됨)
- 배포 아티팩트가 생성됨
- 빌드 및 검증을 위한 완전한 unit 준비