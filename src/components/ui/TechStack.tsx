import React from 'react';
import Image from 'next/image';
import techStackData from '../content/techStackData';

const TechStack: React.FC = () => {
  return (
    <div>
      {techStackData.map((section) => (
        <div key={section.title}>
          <h3 className="mb-2 mt-4">
            {section.icon} {section.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {section.items.map((item) => (
              <div
                style={{ textAlign: 'center', margin: '0', lineHeight: '0.8' }}
                key={item.name}
                className="text-center"
              >
                <Image src={item.icon} alt={item.name} width={120} height={32} className="h-8 mx-auto" />
                {/* <p className="text-sm mt-1">{item.name}</p> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
