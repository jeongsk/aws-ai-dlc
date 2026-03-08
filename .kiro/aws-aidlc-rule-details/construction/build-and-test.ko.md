# Build and Test

**목적**: 모든 유닛을 빌드하고 포괄적인 테스트 전략 실행

## 전제 조건
- 모든 유닛에 대한 Code Generation이 완료되어야 함
- 모든 코드 아티팩트가 생성되어야 함
- 프로젝트가 빌드 및 테스트 준비 완료

---

## 단계 1: 테스트 요구사항 분석

적절한 테스트 전략을 결정하기 위해 프로젝트 분석:
- **Unit tests**: 코드 생성 중 유닛별로 이미 생성됨
- **Integration tests**: 유닛/서비스 간 상호작용 테스트
- **Performance tests**: 로드, 스트레스 및 확장성 테스트
- **End-to-end tests**: 완전한 사용자 워크플로우
- **Contract tests**: 서비스 간 API 계약 검증
- **Security tests**: 취약점 스캔, 침투 테스트

---

## 단계 2: 빌드 지침 생성

`aidlc-docs/construction/build-and-test/build-instructions.md` 생성:

```markdown
# 빌드 지침

## 전제 조건
- **빌드 도구**: [도구명 및 버전]
- **의존성**: [필요한 모든 의존성 나열]
- **환경 변수**: [필요한 환경 변수 나열]
- **시스템 요구사항**: [OS, 메모리, 디스크 공간]

## 빌드 단계

### 1. 의존성 설치
\`\`\`bash
[의존성 설치 명령]
# 예: npm install, mvn dependency:resolve, pip install -r requirements.txt
\`\`\`

### 2. 환경 구성
\`\`\`bash
[환경 설정 명령]
# 예: export 변수, 자격 증명 구성
\`\`\`

### 3. 모든 유닛 빌드
\`\`\`bash
[모든 유닛 빌드 명령]
# 예: mvn clean install, npm run build, brazil-build
\`\`\`

### 4. 빌드 성공 확인
- **예상 출력**: [성공적인 빌드 출력 설명]
- **빌드 아티팩트**: [생성된 아티팩트 및 위치 나열]
- **일반적인 경고**: [허용 가능한 경고 사항]

## 문제 해결

### 의존성 오류로 빌드 실패
- **원인**: [일반적인 원인]
- **해결책**: [단계별 수정 방법]

### 컴파일 오류로 빌드 실패
- **원인**: [일반적인 원인]
- **해결책**: [단계별 수정 방법]
```

---

## 단계 3: Unit Test 실행 지침 생성

`aidlc-docs/construction/build-and-test/unit-test-instructions.md` 생성:

```markdown
# Unit Test 실행

## Unit Tests 실행

### 1. 모든 Unit Tests 실행
\`\`\`bash
[모든 unit tests 실행 명령]
# 예: mvn test, npm test, pytest tests/unit
\`\`\`

### 2. 테스트 결과 검토
- **예상**: [X]개 테스트 통과, 0개 실패
- **테스트 커버리지**: [예상 커버리지 백분율]
- **테스트 보고서 위치**: [테스트 보고서 경로]

### 3. 실패한 테스트 수정
테스트가 실패하는 경우:
1. [위치]에서 테스트 출력 검토
2. 실패한 테스트 케이스 식별
3. 코드 문제 수정
4. 모든 테스트가 통과할 때까지 재실행
```

---

## 단계 4: Integration Test 지침 생성

`aidlc-docs/construction/build-and-test/integration-test-instructions.md` 생성:

```markdown
# Integration Test 지침

## 목적
유닛/서비스 간 상호작용을 테스트하여 올바르게 함께 작동하는지 확인합니다.

## 테스트 시나리오

### 시나리오 1: [Unit A] → [Unit B] Integration
- **설명**: [테스트 대상]
- **설정**: [필요한 테스트 환경 설정]
- **테스트 단계**: [단계별 테스트 실행]
- **예상 결과**: [예상되는 결과]
- **정리**: [테스트 후 정리 방법]

### 시나리오 2: [Unit B] → [Unit C] Integration
[유사한 구조]

## Integration Test 환경 설정

### 1. 필요한 서비스 시작
\`\`\`bash
[서비스 시작 명령]
# 예: docker-compose up, 테스트 데이터베이스 시작
\`\`\`

### 2. 서비스 엔드포인트 구성
\`\`\`bash
[엔드포인트 구성 명령]
# 예: export API_URL=http://localhost:8080
\`\`\`

## Integration Tests 실행

### 1. Integration Test Suite 실행
\`\`\`bash
[integration tests 실행 명령]
# 예: mvn integration-test, npm run test:integration
\`\`\`

### 2. 서비스 상호작용 확인
- **테스트 시나리오**: [주요 integration test 시나리오 나열]
- **예상 결과**: [예상되는 결과 설명]
- **로그 위치**: [로그 확인 위치]

### 3. 정리
\`\`\`bash
[테스트 환경 정리 명령]
# 예: docker-compose down, 테스트 서비스 중지
\`\`\`
```

---

## 단계 5: Performance Test 지침 생성 (해당하는 경우)

`aidlc-docs/construction/build-and-test/performance-test-instructions.md` 생성:

```markdown
# Performance Test 지침

## 목적
로드 하에서 시스템 성능을 검증하여 요구사항을 충족하는지 확인합니다.

## 성능 요구사항
- **응답 시간**: 요청의 [Y]%에 대해 < [X]ms
- **처리량**: 초당 [X]개 요청
- **동시 사용자**: [X]명의 동시 사용자 지원
- **오류율**: < [X]%

## Performance Test 환경 설정

### 1. 테스트 환경 준비
\`\`\`bash
[성능 테스트 설정 명령]
# 예: 서비스 스케일링, 로드 밸런서 구성
\`\`\`

### 2. 테스트 매개변수 구성
- **테스트 기간**: [X]분
- **램프업 시간**: [X]초
- **가상 사용자**: [X]명 사용자

## Performance Tests 실행

### 1. Load Tests 실행
\`\`\`bash
[load tests 실행 명령]
# 예: jmeter -n -t test.jmx, k6 run script.js
\`\`\`

### 2. Stress Tests 실행
\`\`\`bash
[stress tests 실행 명령]
# 예: 실패할 때까지 점진적으로 로드 증가
\`\`\`

### 3. 성능 결과 분석
- **응답 시간**: [실제 vs 예상]
- **처리량**: [실제 vs 예상]
- **오류율**: [실제 vs 예상]
- **병목 지점**: [식별된 병목 지점]
- **결과 위치**: [성능 보고서 경로]

## 성능 최적화

성능이 요구사항을 충족하지 않는 경우:
1. 테스트 결과에서 병목 지점 식별
2. 코드/쿼리/구성 최적화
3. 개선 사항 검증을 위해 테스트 재실행
```

---

## 단계 6: 추가 테스트 지침 생성 (필요에 따라)

프로젝트 요구사항에 따라 추가 테스트 지침 파일 생성:

### Contract Tests (마이크로서비스용)
`aidlc-docs/construction/build-and-test/contract-test-instructions.md` 생성:
- 서비스 간 API 계약 검증
- Consumer-driven contract 테스트
- 스키마 검증

### Security Tests
`aidlc-docs/construction/build-and-test/security-test-instructions.md` 생성:
- 취약점 스캔
- 의존성 보안 검사
- 인증/권한 부여 테스트
- 입력 검증 테스트

### End-to-End Tests
`aidlc-docs/construction/build-and-test/e2e-test-instructions.md` 생성:
- 완전한 사용자 워크플로우 테스트
- 교차 서비스 시나리오
- UI 테스트 (해당하는 경우)

---

## 단계 7: 테스트 요약 생성

`aidlc-docs/construction/build-and-test/build-and-test-summary.md` 생성:

```markdown
# Build and Test 요약

## 빌드 상태
- **빌드 도구**: [도구명]
- **빌드 상태**: [성공/실패]
- **빌드 아티팩트**: [아티팩트 나열]
- **빌드 시간**: [소요 시간]

## 테스트 실행 요약

### Unit Tests
- **총 테스트**: [X]개
- **통과**: [X]개
- **실패**: [X]개
- **커버리지**: [X]%
- **상태**: [통과/실패]

### Integration Tests
- **테스트 시나리오**: [X]개
- **통과**: [X]개
- **실패**: [X]개
- **상태**: [통과/실패]

### Performance Tests
- **응답 시간**: [실제] (목표: [예상])
- **처리량**: [실제] (목표: [예상])
- **오류율**: [실제] (목표: [예상])
- **상태**: [통과/실패]

### 추가 테스트
- **Contract Tests**: [통과/실패/해당없음]
- **Security Tests**: [통과/실패/해당없음]
- **E2E Tests**: [통과/실패/해당없음]

## 전체 상태
- **빌드**: [성공/실패]
- **모든 테스트**: [통과/실패]
- **Operations 준비**: [예/아니오]

## 다음 단계
[모두 통과한 경우]: 배포 계획을 위한 Operations 단계로 진행 준비
[실패한 경우]: 실패한 테스트 해결 후 재빌드
```

---

## 단계 8: 상태 추적 업데이트

`aidlc-docs/aidlc-state.md` 업데이트:
- Build and Test 단계를 완료로 표시
- 현재 상태 업데이트

---

## 단계 9: 사용자에게 결과 제시

포괄적인 메시지 제시:

```
"🔨 Build and Test 완료!

**빌드 상태**: [성공/실패]

**테스트 결과**:
✅ Unit Tests: [X]개 통과
✅ Integration Tests: [X]개 시나리오 통과
✅ Performance Tests: [상태]
✅ 추가 테스트: [상태]

**생성된 파일**:
1. ✅ build-instructions.md
2. ✅ unit-test-instructions.md
3. ✅ integration-test-instructions.md
4. ✅ performance-test-instructions.md (해당하는 경우)
5. ✅ [필요에 따른 추가 테스트 파일]
6. ✅ build-and-test-summary.md

aidlc-docs/construction/build-and-test/build-and-test-summary.md에서 요약을 검토하세요

**배포 계획을 위한 Operations 단계로 진행할 준비가 되었나요?""
```

---

## 단계 10: 상호작용 로그

**필수**: `aidlc-docs/audit.md`에 단계 완료 로그:

```markdown
## Build and Test 단계
**타임스탬프**: [ISO 타임스탬프]
**빌드 상태**: [성공/실패]
**테스트 상태**: [통과/실패]
**생성된 파일**:
- build-instructions.md
- unit-test-instructions.md
- integration-test-instructions.md
- performance-test-instructions.md
- build-and-test-summary.md

---
```