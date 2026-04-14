# ybchar.dev Technical Writing Workflow

## 목적

이 문서는 `ybchar-tech-writing` 이 `ybchar.dev` 기술 글 요청을 어떻게 분해하고,
agent 간 합의 루프를 어떻게 운영할지 정의합니다.

핵심 목표는 아래 다섯 가지입니다.

- 전역 코어 규칙과 로컬 톤 오버레이를 함께 적용합니다
- `4년차 Spring/Kotlin 백엔드 개발자` 독자상에 맞춰 설명 깊이를 고정합니다
- 기획, 근거 수집, 초안, 리뷰, 톤 보정 역할을 agent 별로 분리합니다
- reviewer 와 tone-calibrator 가 모두 통과시킬 때까지 제한된 재협업을 허용합니다
- 무한 반복 대신 최대 `2회 redraft` 로 품질과 제어 가능성을 같이 잡습니다

## 읽기 순서

1. 전역 코어 스킬
   - `/Users/yunbeom/.codex/skills/spring-kotlin-technical-writing-core/SKILL.md`
   - 같은 디렉터리의 `references/*`
2. 로컬 오버레이 스킬
   - `../skills/ybchar-tech-writing/SKILL.md`
   - `../skills/ybchar-tech-writing/references/*`
3. 이 워크플로 문서
4. 필요 시 `technical-writing-validation.md`

## 요청 유형별 라우팅

### 주제 추천 / 개요 / 아웃라인만 필요한 경우

- `technical-writing-orchestrator`
- 병렬 fan-out:
  - `technical-writing-planner`
  - `technical-writing-source-curator`
  - `tone-calibrator`
- drafter 와 reviewer 는 호출하지 않습니다

### 새 초안 또는 publish 가능한 글이 필요한 경우

- `technical-writing-orchestrator`
- 1차 병렬 fan-out:
  - `technical-writing-planner`
  - `technical-writing-source-curator`
  - `tone-calibrator`
- `outline contract` 합성
- `technical-writing-drafter`
- 2차 병렬 fan-out:
  - `technical-writing-reviewer`
  - `tone-calibrator`
- blocking issue 가 있으면 `technical-writing-drafter` redraft

### 기존 초안 다듬기 / 내 톤으로 수정하기

- 기존 초안을 먼저 읽습니다
- `technical-writing-reviewer` 와 `tone-calibrator` 를 먼저 병렬 호출합니다
- 수정 delta 를 합친 뒤 `technical-writing-drafter` 로 재작성합니다
- 필요 시 reviewer 와 tone-calibrator 를 한 번 더 호출합니다

## 협업 루프

1. orchestrator 가 요청 유형을 분류합니다
2. planner / source-curator / tone-calibrator 를 병렬 호출합니다
3. 세 결과를 하나의 `outline contract` 로 합칩니다
4. drafter 가 `개요 / 초안 / 이미지 제안 / References / Revision Notes` 를 작성합니다
5. reviewer 와 tone-calibrator 를 병렬 호출합니다
6. 둘 중 하나라도 blocking issue 를 내면 orchestrator 가 수정 delta 를 합칩니다
7. drafter 가 redraft 합니다
8. reviewer 와 tone-calibrator 가 재검토합니다
9. 아래 중 하나를 만족하면 종료합니다
   - reviewer severity 가 `minor` 이하이고 tone drift 가 없음
   - 최대 redraft 2회 도달
   - 같은 유형의 지적이 2회 반복됨

## 중단 규칙

- 기본 최대 redraft 는 `2회` 입니다
- `minor` 이하 수정만 남고 tone drift 가 없으면 즉시 종료합니다
- 같은 유형의 지적이 `2회` 반복되면 추가 redraft 없이 unresolved delta 만 남깁니다
- 사실 근거가 부족한 claim 이 핵심 주장이라면 문장을 줄이거나 범위를 좁힙니다

## Outline Contract

planner / source-curator / tone-calibrator 결과는 아래 계약으로 합칩니다.

```md
제목 후보:
- ...

독자:
- ...

한 줄 주장:
- ...

비교할 대안:
- ...

개요:
- ...

섹션별 근거:
- ...

이미지 제안:
- ...

근거 팩 초안:
- Local References
- External References
- Writing Benchmarks

톤 가드레일:
- ...
```

## Draft Contract

초안 요청의 기본 출력 계약은 아래와 같습니다.

```md
개요
초안
이미지 제안
References
Revision Notes
```

- `초안` 은 publish 가능한 MDX 를 기본값으로 봅니다
- 대표 이미지가 있으면 frontmatter 바로 아래에 둡니다
- 이미지 URL 이 확정되지 않았으면 `이미지 제안` 에만 남깁니다
- `References` 는 `Local References / External References / Writing Benchmarks` 로 정리할 수 있습니다
- publish 본문에는 raw 파일 목록을 남기지 말고, 필요하면 짧은 코드 컨텍스트나 흐름 설명으로 녹입니다

## Reviewer / Tone Output Contract

### reviewer

```md
치명적 오류:
- ...

보강 필요:
- ...

톤 드리프트:
- ...

이미지 조정:
- ...

레퍼런스 누락:
- ...

최종 판정:
- pass | minor | blocking
```

### tone-calibrator

```md
제목 적합도:
- ...

도입부 온도:
- ...

문체 일관성:
- ...

질문형 소제목 제안:
- ...

과한 표현 제거:
- ...

최종 판정:
- pass | minor | blocking
```

## 운영 원칙

- 기본 작성 언어는 한국어입니다
- 기본 독자상은 `Spring/Kotlin 중심의 4년차 백엔드 개발자` 입니다
- 기술 글 기준 tone anchor 는 아래 다섯 글을 우선합니다
  - `2025-01-01` Java 21, Spring boot 3.4.x 마이그레이션 과정
  - `2025-03-02` LocalStack과 DynamoDB 사용기
  - `2025-03-16` 소프트웨어 디자인도 전략적으로, 전략 패턴에 대해
  - `2026-04-11` Lua 스크립트로 Redis 원자성 보장하기
  - `2026-04-13` TSID는 왜 사용하는가
- 회고 글은 문장 온도와 연결 표현만 약하게 참고합니다
- 기존 콘텐츠를 일괄 수정하지 않고 새 요청부터 이 규칙을 적용합니다
