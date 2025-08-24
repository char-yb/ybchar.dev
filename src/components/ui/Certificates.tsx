import React from 'react';
import certificatesData from '../content/certificatesData';

const Certificates: React.FC = () => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">자격증</th>
          <th className="border border-gray-300 px-4 py-2">취득일</th>
          <th className="border border-gray-300 px-4 py-2">발급기관</th>
        </tr>
      </thead>
      <tbody>
        {certificatesData.map((cert, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{cert.name}</td>
            <td className="border border-gray-300 px-4 py-2">{cert.date}</td>
            <td className="border border-gray-300 px-4 py-2">{cert.issuer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Certificates;
