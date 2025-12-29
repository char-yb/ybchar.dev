import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-xl font-bold mb-2">About Me</h1>
      <div className="flex items-center bg-gray-150 dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 rounded-md p-4 mb-4">
        <p className="m-0">
          <strong>
            반갑습니다! <br />
            꾸준히 잔디를 심는 4년차 백엔드 개발자 차윤범입니다 :)
          </strong>
        </p>
      </div>
      <ul className="list-disc pl-5 space-y-1">
        <li>다양한 도메인에 적응하고자 여러 프로젝트에 참여하여 적응력을 키우고 있습니다.</li>
        <li>
          <code>코드 리뷰</code>에 대한 두려움보다는 새로운 인사이트를 얻으며 성장하고 있습니다.
        </li>
        <li>모르는 것에 대해 부끄러움이 없습니다. 모르는 것이 있다면 흡수하려 해요.</li>
        <li>비즈니스의 `Pain Point`를 해결하는 데에 초점을 두고자 합니다.</li>
        <li>레거시 프로젝트를 개선하는 것에 보람과 성취감을 느낍니다:)</li>
        <li>사용자에게 좋은 경험을 선사하고자 주도적으로 의견을 제시합니다.</li>
        <li>서비스를 A to Z까지 만드는 것에 재미를 느낍니다.</li>
      </ul>
    </div>
  );
};

export default AboutMe;
