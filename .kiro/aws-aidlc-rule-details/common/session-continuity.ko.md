# Session Continuity 템플릿

## 재방문 프롬프트 템플릿
사용자가 기존 AI-DLC 프로젝트 작업을 계속하기 위해 돌아왔을 때, 다음 프롬프트를 제시하세요:

```markdown
**다시 오신 것을 환영합니다! 진행 중인 AI-DLC 프로젝트가 있는 것을 확인했습니다.**

aidlc-state.md를 기반으로 한 현재 상태입니다:
- **프로젝트**: [project-name]
- **현재 Phase**: [INCEPTION/CONSTRUCTION/OPERATIONS]
- **현재 Stage**: [Stage Name]
- **마지막 완료**: [Last completed step]
- **다음 단계**: [Next step to work on]

**오늘 무엇을 작업하고 싶으신가요?**

A) 중단한 지점부터 계속하기 ([Next step description])
B) 이전 단계 검토하기 ([Show available stages])

[Answer]: 
```

## 필수: Session Continuity 지침
1. **기존 프로젝트 감지 시 항상 aidlc-state.md를 먼저 읽기**
2. **workflow 파일에서 현재 상태를 파싱하여** 프롬프트에 채우기
3. **필수: 이전 Stage 산출물 로드** - 어떤 단계든 재개하기 전에, 이전 단계의 모든 관련 산출물을 자동으로 읽기:
   - **Reverse Engineering**: architecture.md, code-structure.md, api-documentation.md 읽기
   - **Requirements Analysis**: requirements.md, requirement-verification-questions.md 읽기
   - **User Stories**: stories.md, personas.md, story-generation-plan.md 읽기
   - **Application Design**: application-design 산출물 읽기 (components.md, component-methods.md, services.md)
   - **Design (Units)**: unit-of-work.md, unit-of-work-dependency.md, unit-of-work-story-map.md 읽기
   - **Per-Unit Design**: functional-design.md, nfr-requirements.md, nfr-design.md, infrastructure-design.md 읽기
   - **Code Stages**: 모든 코드 파일, 계획, 그리고 모든 이전 산출물 읽기
4. **Stage별 스마트 컨텍스트 로딩**:
   - **초기 Stages (Workspace Detection, Reverse Engineering)**: workspace 분석 로드
   - **Requirements/Stories**: reverse engineering + requirements 산출물 로드
   - **Design Stages**: requirements + stories + architecture + design 산출물 로드
   - **Code Stages**: 모든 산출물 + 기존 코드 파일 로드
5. **아키텍처 선택과 현재 phase에 따라** 옵션 적응
6. **일반적인 설명보다는** 구체적인 다음 단계 보여주기
7. **timestamp와 함께** audit.md에 continuity 프롬프트 로그 기록
8. **컨텍스트 요약**: 산출물 로드 후, 사용자 인식을 위해 로드된 내용의 간략한 요약 제공
9. **질문하기**: 명확화나 사용자 피드백 질문은 항상 .md 파일에 배치하세요. 채팅 세션에서 객관식 질문을 인라인으로 배치하지 마세요.

## 오류 처리
세션 재개 중 산출물이 누락되거나 손상된 경우, 복구 절차에 대한 지침은 [error-handling.md](error-handling.md)를 참조하세요.