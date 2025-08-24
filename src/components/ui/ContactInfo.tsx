import React from 'react';
import Image from 'next/image';

const ContactInfo: React.FC = () => {
  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-xl font-bold mb-2">Introduction</h1>
      <div className="max-w-[300px] mx-auto mb-4 text-center">
        <Image src="/images/git_profile.png" alt="Profile" width={300} height={300} className="w-full rounded-md" />
      </div>
      <p>
        <strong>Email</strong>: uiurihappy@naver.com <br />
        <strong>Github</strong>: <a href="https://github.com/char-yb">https://github.com/char-yb</a> <br />
        <strong>Velog</strong>: <a href="https://velog.io/@uiurihappy">https://velog.io/@uiurihappy</a> <br />
        <strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/yb-char-394842264">in/yb-char-394842264</a>
      </p>
    </div>
  );
};

export default ContactInfo;
