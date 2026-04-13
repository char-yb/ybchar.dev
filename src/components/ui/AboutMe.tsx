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
        <li><code>이 기능을 왜 만들어야 하는가</code>를 먼저 묻고, 팀원과 함께 문제의 본질을 정의한 뒤 기술적 방향을 설계합니다.</li>
        <li>결제·주문 도메인에서 데이터 정합성과 시스템 안정성을 최우선으로 둡니다. 이전 Redis 장애를 직접 겪으며 <code>캐시는 데이터 원본이 되어서는 안 된다</code>는 원칙을 세웠습니다.</li>
        <li>기술 선택의 근거를 중시합니다. 경험 중 배포 전략 중 Blue/Green 대신 Rolling을 택한 이유는 세션 연속성이었고, 캐시 도입 여부도 데이터 특성의 정확성 허용 범위로 판단합니다.</li>
        <li>Claude Code·Codex·Gemini를 개발 프로세스에 활용하고 있으며, AI Native로 Admin 대시보드를 1인 개발한 경험이 있습니다.</li>
        <li>코드 리뷰에서 새로운 관점을 얻는 것을 좋아하고, 레거시 시스템의 점진적 개선에서 성취감을 느낍니다.</li>
        <li>다양한 도메인에 적응하고자 여러 프로젝트에 참여하여 적응력을 키우고 있습니다.</li>
        <li>
          <code>코드 리뷰</code>에 대한 두려움보다는 새로운 인사이트를 얻으며 상호 간 지식 공유를 지향하고 있습니다.
        </li>
      </ul>
    </div>
  );
};

export default AboutMe;
