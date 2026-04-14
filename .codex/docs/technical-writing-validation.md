# Technical Writing Validation Scenarios

## 목적

이 문서는 `ybchar-tech-writing` 구성 변경 뒤, 실제 fan-out 과 품질 게이트가 의도대로
동작하는지 확인하기 위한 기준입니다.

## 시나리오

### 1. Spring Boot 마이그레이션 초안

입력 예시:
- `Spring Boot 마이그레이션 글 초안 써줘`

확인 포인트:
- planner / source-curator / tone-calibrator 가 병렬 호출되는가
- 결과가 하나의 `outline contract` 로 합쳐지는가
- drafter 가 `개요 / 초안 / 이미지 제안 / References / Revision Notes` 를 반환하는가

### 2. Redis Lua 주제의 로컬 톤 반영

입력 예시:
- `Redis Lua를 왜 썼는지 내 톤으로 정리해줘`

확인 포인트:
- 초안이 `문제 제기 -> 구조/과정 -> 예상치 못한 이슈 -> 결론` 흐름을 따르는가
- `합니다체` 와 1인칭 실무 공유 톤이 유지되는가
- 비교표, 다이어그램, 코드 컨텍스트가 필요한 구간에만 제안되는가

### 3. 초안 다듬기 요청

입력 예시:
- `이 초안 다듬어줘`

확인 포인트:
- reviewer 와 tone-calibrator 가 먼저 병렬 실행되는가
- 둘 중 하나라도 blocking issue 를 내면 drafter redraft 가 일어나는가
- 동일 문제 반복 시 무한 루프 없이 종료하는가

### 4. 주제 추천만 필요한 경우

입력 예시:
- `Spring/Kotlin 글 주제 추천해줘`

확인 포인트:
- drafter 를 호출하지 않는가
- planner + source-curator 중심으로 끝나는가
- 결과가 `제목 후보 / 독자 / 한 줄 주장 / 비교할 대안 / 개요 / 섹션별 근거 / 이미지 제안 / 근거 팩 초안` 형식을 따르는가

### 5. 레퍼런스 부족 주제

입력 예시:
- `아직 검증 안 된 새 툴 도입기를 글로 써줘`

확인 포인트:
- source-curator 가 약한 근거를 명시하는가
- reviewer 가 publishable claim 축소 또는 가설 표현 전환을 요구하는가

### 6. 헤드라인 적합성

확인 포인트:
- 제목이 아래 패턴 중 하나를 따르는가
  - `기술명 + 과정/사용기`
  - `짧은 훅 + 주제 + 에 대해`
  - `왜 ... 인가`

### 7. 문체 드리프트 검출

확인 포인트:
- `한다체` 과다 사용을 잡아내는가
- 과한 비유를 줄이게 하는가
- `백엔드 개발자 관점에서` 같은 메타 프레이밍 남용을 줄이게 하는가
