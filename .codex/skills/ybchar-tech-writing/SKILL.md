---
name: ybchar-tech-writing
description: Use when planning, drafting, or refining ybchar.dev tech-blog posts in the author's own tone, especially prompts like tech-blog 글 써줘, 초안 잡아줘, 내 톤으로 다듬어줘, Spring/Kotlin 기술 글 써줘, or 왜 이 선택을 했는지 글로 정리해줘. Automatically orchestrate planner -> source-curator -> tone-calibrator -> drafter -> reviewer with a bounded revision loop.
metadata:
  short-description: ybchar.dev 톤으로 기술 글을 기획하고 다듬는 오버레이
---

# ybchar Tech Writing

`ybchar.dev` 의 기술 글 문체, 제목 패턴, frontmatter, 대표 이미지 배치, 질문형 소제목
습관을 반영하는 로컬 오버레이 스킬입니다.

## Workflow

1. 먼저 전역 코어 스킬을 읽습니다.
   - `/Users/yunbeom/.codex/skills/spring-kotlin-technical-writing-core/SKILL.md`
   - 같은 디렉터리의 `references/*`
2. 다음 문서를 읽습니다.
   - [technical-writing-workflow.md](../../docs/technical-writing-workflow.md)
   - [technical-writing-validation.md](../../docs/technical-writing-validation.md)
3. 로컬 참조 파일을 읽습니다.
   - [author-style-profile.md](./references/author-style-profile.md)
   - [content-canon.md](./references/content-canon.md)
   - [headline-patterns.md](./references/headline-patterns.md)
   - [publication-harness.md](./references/publication-harness.md)
   - [visual-playbook.md](./references/visual-playbook.md)
4. 실제 글쓰기 요청이면 `technical-writing-orchestrator` 를 진입점으로 사용합니다.
5. 요청 성격에 따라 아래처럼 fan-out 합니다.
   - 주제 추천 / 개요: planner + source-curator + tone-calibrator
   - 새 초안 / publish 가능한 글: planner + source-curator + tone-calibrator -> drafter -> reviewer + tone-calibrator
   - 기존 초안 다듬기: reviewer + tone-calibrator -> drafter -> reviewer + tone-calibrator

## Local Rules

- tone anchor 는 최근 기술 글 다섯 편을 우선합니다.
  - `2025-01-01`
  - `2025-03-02`
  - `2025-03-16`
  - `2026-04-11`
  - `2026-04-13`
- 회고 글은 문장 온도와 연결 표현만 약하게 반영합니다.
- 기본 문체는 한국어 `합니다체` 입니다.
- 문제 제기와 작성 계기를 초반 2~3문단 안에 드러냅니다.
- 제목은 가능한 한 구체 기술명과 설명 범위를 드러냅니다.
- 너무 차갑지 않은 1인칭 실무 공유 톤을 유지합니다.
- `백엔드 개발자 관점에서` 같은 메타 프레이밍보다 `제가 구현하면서`, `제가 중요하게 본 점은` 같은 직접 경험형 문장을 우선합니다.
- 비유는 1~2개 이하로 제한하고, 바로 기술 설명으로 회수합니다.
- 대표 이미지가 있으면 frontmatter 바로 아래에 둡니다.
- 이미지가 확정되지 않았다면 `이미지 제안` 에만 남깁니다.
- publish 가능한 초안의 기본 출력 계약은 `개요 / 초안 / 이미지 제안 / References / Revision Notes` 입니다.

## Output Guidance

- 기획 전용 요청:
  - `제목 후보 / 독자 / 한 줄 주장 / 비교할 대안 / 개요 / 섹션별 근거 / 이미지 제안 / 근거 팩 초안`
- 초안 요청:
  - `개요 / 초안 / 이미지 제안 / References / Revision Notes`
- reviewer:
  - `치명적 오류 / 보강 필요 / 톤 드리프트 / 이미지 조정 / 레퍼런스 누락 / 최종 판정`
- tone-calibrator:
  - `제목 적합도 / 도입부 온도 / 문체 일관성 / 질문형 소제목 제안 / 과한 표현 제거 / 최종 판정`
