import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-xl font-bold mb-2">About Me</h1>
      <div className="flex items-center bg-gray-150 dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 rounded-md p-4 mb-4">
        <p className="m-0">
          <strong>
            반갑습니다! <br />
            4년차 백엔드 개발자 차윤범입니다. 🙌
          </strong>
        </p>
      </div>
      <ul className="list-disc pl-5 space-y-1">
        <li>결제·주문·보상처럼 정확성이 사용자 신뢰와 바로 이어지는 도메인을 주로 맡았습니다. 환불 오분류, 중복 주문, Redis 장애 후 잔액 불일치를 멱등키·분산 락·백필 절차로 재발까지 막았습니다.</li>
        <li>장애는 고치는 데서 끝내지 않고 구조를 바꿉니다. 예외 우회 경로 세 개를 접수 지점 하나로, 취소가 실패로 집계되는 문제를 상태 전이 순서 하나로 정리한 식입니다.</li>
        <li>성능 개선은 실측과 A/B로 근거를 남기고 진행합니다. 랭킹 API 9.8초 → 100ms, LLM 튜닝 파이프라인 4.1분 → 3.2분, 2천만 건 통계 조회 인덱스·페이지네이션 개선 경험이 있습니다.</li>
        <li>레이어드 → 멀티모듈 Clean Architecture, Spring Modulith 이벤트 분리, 도메인 공통 커널 추출처럼 기술부채를 단계적으로 걷어낸 경험이 있습니다.</li>
        <li>ECS Fargate 무중단 배포, Lambda/EventBridge 스케줄 분리, OpenTelemetry·Grafana 관측성까지 운영을 직접 맡았습니다.</li>
        <li>AI 도구는 규칙을 실행 단계에서 강제하는 협업 파이프라인으로 씁니다. 설계·구현·QA 체크리스트와 훅으로 산출물 품질이 사람에 따라 흔들리지 않게 했습니다.</li>
      </ul>
    </div>
  );
};

export default AboutMe;
