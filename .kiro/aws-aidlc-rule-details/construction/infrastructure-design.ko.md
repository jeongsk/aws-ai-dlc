# Infrastructure Design

## 전제 조건
- unit에 대한 Functional Design이 완료되어야 함
- NFR Design 권장 (매핑할 논리적 컴포넌트 제공)
- 실행 계획에서 Infrastructure Design 단계 실행이 표시되어야 함

## 개요
논리적 소프트웨어 컴포넌트를 배포 환경을 위한 실제 인프라 선택에 매핑.

## 실행 단계

### 1단계: 설계 아티팩트 분석
- `aidlc-docs/construction/{unit-name}/functional-design/`에서 functional design 읽기
- `aidlc-docs/construction/{unit-name}/nfr-design/`에서 NFR design 읽기 (존재하는 경우)
- 인프라가 필요한 논리적 컴포넌트 식별

### 2단계: Infrastructure Design 계획 생성
- 인프라 설계를 위한 체크박스 [] 포함 계획 생성
- 실제 서비스(AWS, Azure, GCP, on-premise)에 매핑하는 것에 집중
- 각 단계에는 체크박스 []가 있어야 함

### 3단계: 상황에 맞는 질문 생성
**지침**: functional 및 NFR design을 분석하여 이 특정 unit의 인프라 요구사항과 관련된 질문만 생성. 아래 카테고리를 영감으로 사용하되, 필수 체크리스트가 아님. 해당하지 않는 전체 카테고리는 건너뛰기.

- [Answer]: 태그 형식을 사용하여 질문 포함
- 이 unit에 특정한 모호성과 누락된 정보에 집중
- 인프라 결정에 사용자 입력이 필요한 경우에만 질문 생성

**예시 질문 카테고리** (필요에 따라 조정):
- **배포 환경** - 클라우드 제공업체나 환경 설정이 불분명한 경우에만
- **컴퓨팅 인프라** - 컴퓨팅 서비스 선택에 명확화가 필요한 경우에만
- **스토리지 인프라** - 데이터베이스나 스토리지 선택이 모호한 경우에만
- **메시징 인프라** - 메시징/큐잉 서비스 사양이 필요한 경우에만
- **네트워킹 인프라** - 로드 밸런싱이나 API gateway 접근법이 불분명한 경우에만
- **모니터링 인프라** - 관찰 가능성 도구에 명확화가 필요한 경우에만
- **공유 인프라** - 인프라 공유 전략이 모호한 경우에만

### 4단계: 계획 저장
- `aidlc-docs/construction/plans/{unit-name}-infrastructure-design-plan.md`로 저장
- 사용자 입력을 위한 모든 [Answer]: 태그 포함

### 5단계: 답변 수집 및 분석
- 사용자가 모든 [Answer]: 태그를 완료할 때까지 대기
- 모호하거나 애매한 응답 검토
- 필요한 경우 후속 질문 추가

### 6단계: Infrastructure Design 아티팩트 생성
- `aidlc-docs/construction/{unit-name}/infrastructure-design/infrastructure-design.md` 생성
- `aidlc-docs/construction/{unit-name}/infrastructure-design/deployment-architecture.md` 생성
- 공유 인프라인 경우: `aidlc-docs/construction/shared-infrastructure.md` 생성

### 7단계: 완료 메시지 제시
- 이 구조로 완료 메시지 제시:
     1. **완료 공지** (필수): 항상 이것으로 시작:

```markdown
# 🏢 Infrastructure Design 완료 - [unit-name]
```

     2. **AI 요약** (선택사항): 인프라 설계의 구조화된 불릿 포인트 요약 제공
        - 형식: "Infrastructure design이 [설명]을 매핑했습니다:"
        - 주요 인프라 서비스 및 컴포넌트 나열 (불릿 포인트)
        - 배포 아키텍처 결정 및 근거 나열
        - 클라우드 제공업체 선택 및 서비스 매핑 언급
        - 워크플로우 지침 포함하지 않기 ("검토해 주세요", "알려주세요", "다음 단계로 진행", "진행하기 전에")
        - 사실적이고 내용 중심으로 유지
     3. **형식화된 워크플로우 메시지** (필수): 항상 이 정확한 형식으로 끝내기:

```markdown
> **📋 <u>**검토 필요:**</u>**  
> 다음 위치에서 인프라 설계를 검토해 주세요: `aidlc-docs/construction/[unit-name]/infrastructure-design/`



> **🚀 <u>**다음 단계는?**</u>**
>
> **다음을 수행할 수 있습니다:**
>
> 🔧 **변경 요청** - 검토를 바탕으로 인프라 설계 수정 요청  
> ✅ **다음 단계로 계속** - 인프라 설계를 승인하고 **Code Generation**으로 진행

---
```

### 8단계: 명시적 승인 대기
- 사용자가 인프라 설계를 명시적으로 승인할 때까지 진행하지 않음
- 승인은 명확하고 애매하지 않아야 함
- 사용자가 변경을 요청하면 설계를 업데이트하고 승인 프로세스 반복

### 9단계: 승인 기록 및 진행 상황 업데이트
- 타임스탬프와 함께 audit.md에 승인 로그
- 타임스탬프와 함께 사용자의 승인 응답 기록
- aidlc-state.md에서 Infrastructure Design 단계를 완료로 표시