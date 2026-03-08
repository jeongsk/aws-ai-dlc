# Workspace Detection

**목적**: workspace 상태를 결정하고 기존 AI-DLC 프로젝트 확인

## 1단계: 기존 AI-DLC 프로젝트 확인

`aidlc-docs/aidlc-state.md`가 존재하는지 확인:
- **존재하는 경우**: 마지막 단계에서 재개 (이전 단계에서 컨텍스트 로드)
- **존재하지 않는 경우**: 새 프로젝트 평가 계속

## 2단계: 기존 코드에 대한 Workspace 스캔

**workspace에 기존 코드가 있는지 확인:**
- 소스 코드 파일에 대한 workspace 스캔 (.java, .py, .js, .ts, .jsx, .tsx, .kt, .kts, .scala, .groovy, .go, .rs, .rb, .php, .c, .h, .cpp, .hpp, .cc, .cs, .fs 등)
- 빌드 파일 확인 (pom.xml, package.json, build.gradle 등)
- 프로젝트 구조 지표 찾기
- workspace 루트 디렉토리 식별 (aidlc-docs/가 아닌)

**발견사항 기록:**
```markdown
## Workspace 상태
- **기존 코드**: [Yes/No]
- **프로그래밍 언어**: [발견된 경우 목록]
- **빌드 시스템**: [발견된 경우 Maven/Gradle/npm/등]
- **프로젝트 구조**: [Monolith/Microservices/Library/Empty]
- **Workspace 루트**: [절대 경로]
```

## 3단계: 다음 단계 결정

**workspace가 비어있는 경우 (기존 코드 없음)**:
- 플래그 설정: `brownfield = false`
- 다음 단계: Requirements Analysis

**workspace에 기존 코드가 있는 경우**:
- 플래그 설정: `brownfield = true`
- `aidlc-docs/inception/reverse-engineering/`에서 기존 reverse engineering 산출물 확인
- **reverse engineering 산출물이 존재하는 경우**: 로드하고 Requirements Analysis로 건너뛰기
- **reverse engineering 산출물이 없는 경우**: 다음 단계는 Reverse Engineering

## 4단계: 초기 상태 파일 생성

`aidlc-docs/aidlc-state.md` 생성:

```markdown
# AI-DLC 상태 추적

## 프로젝트 정보
- **프로젝트 유형**: [Greenfield/Brownfield]
- **시작 날짜**: [ISO 타임스탬프]
- **현재 단계**: INCEPTION - Workspace Detection

## Workspace 상태
- **기존 코드**: [Yes/No]
- **Reverse Engineering 필요**: [Yes/No]
- **Workspace 루트**: [절대 경로]

## 코드 위치 규칙
- **Application 코드**: Workspace 루트 (aidlc-docs/에 절대 안됨)
- **문서**: aidlc-docs/만
- **구조 패턴**: code-generation.md Critical Rules 참조

## 단계 진행
[워크플로우 진행에 따라 채워질 예정]
```

## 5단계: 완료 메시지 제시

**Brownfield 프로젝트의 경우:**
```markdown
# 🔍 Workspace Detection 완료

Workspace 분석 결과:
• **프로젝트 유형**: Brownfield 프로젝트
• [workspace 발견사항의 AI 생성 요약을 불릿 포인트로]
• **다음 단계**: 기존 코드베이스 분석을 위해 **Reverse Engineering**으로 진행...
```

**Greenfield 프로젝트의 경우:**
```markdown
# 🔍 Workspace Detection 완료

Workspace 분석 결과:
• **프로젝트 유형**: Greenfield 프로젝트
• **다음 단계**: **Requirements Analysis**로 진행...
```

## 6단계: 자동으로 진행

- **사용자 승인 불필요** - 이는 정보 제공용일 뿐
- 자동으로 다음 단계로 진행:
  - **Brownfield**: Reverse Engineering (기존 산출물이 없는 경우) 또는 Requirements Analysis (산출물이 존재하는 경우)
  - **Greenfield**: Requirements Analysis