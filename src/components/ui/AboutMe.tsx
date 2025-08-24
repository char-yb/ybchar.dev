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
          <code>코드 리뷰</code>에 대한 두려움보다는 재미를 느끼며 성장을 하고 있습니다.
        </li>
        <li>
          어려운 지식을 저만의 언어로 쉽게 풀어내 많은 사람에게 <code>지식을 전파</code>할 수 있는 사람이 되고자 합니다.
        </li>
        <li>다양한 방면의 기술을 공부하고 적용하는 데에 관심이 많습니다.</li>
        <li>비즈니스 문제를 해결하는 데에 초점을 두고자 합니다.</li>
        <li>레거시 프로젝트를 개선하는 것에 보람과 성취감을 느낍니다.</li>
      </ul>
    </div>
  );
};

export default AboutMe;
