# Publication Harness

## 목적

이 문서는 `ybchar.dev` 기술 글을 publish 가능한 형태로 정리할 때의 기본 하네스를 정의합니다.

## Frontmatter

기술 글 초안은 가능하면 아래 frontmatter 를 포함합니다.

```md
---
title: "..."
description: "..."
date: "YYYY-MM-DD"
tags:
  - ...
  - ...
---
```

규칙:

- `title` 은 기술명과 범위를 드러냅니다
- `description` 은 글의 핵심 선택 이유나 설명 범위를 한 문장에 담습니다
- publish-ready 초안이면 `date`, `tags` 를 기본 포함합니다
- 미완성 초안이라면 날짜나 태그가 임시임을 `Revision Notes` 에 명시합니다

## 대표 이미지

- 대표 이미지가 확정돼 있으면 frontmatter 바로 아래에 둡니다
- 장식용 이미지라면 억지로 넣지 않습니다
- 아직 URL 이 없으면 `이미지 제안` 섹션에만 남깁니다

## 기본 섹션 흐름

주제에 따라 달라질 수 있지만 기본은 아래 흐름입니다.

1. `서론` 또는 `계기`
2. `왜 이 글을 쓰는가`
3. `개념/배경 설명`
4. `구조/과정 설명`
5. `대안 비교`
6. `예상치 못한 이슈` 또는 `헷갈리기 쉬운 지점`
7. `결론` 또는 `후기`

## 최종 출력 계약

초안 요청의 기본 결과는 아래 다섯 섹션입니다.

```md
개요
초안
이미지 제안
References
Revision Notes
```

## References 운영 규칙

- publish 본문에 raw 로컬 파일 나열을 관성적으로 넣지 않습니다
- 필요하면 코드 컨텍스트, 짧은 발췌, 흐름 설명으로 녹입니다
- 출력용 `References` 섹션은 아래처럼 정리할 수 있습니다
  - `Local References`
  - `External References`
  - `Writing Benchmarks`
- benchmark 는 구조 참고일 때만 넣고, 사실 근거로 쓰지 않습니다

## Revision Notes

`Revision Notes` 에는 아래 중 필요한 것만 짧게 남깁니다.

- 미확정 이미지
- 약한 근거
- reviewer / tone-calibrator 수정 반영 사항
- 다음 redraft 에서 봐야 할 포인트
