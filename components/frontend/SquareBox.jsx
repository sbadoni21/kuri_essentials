import React from 'react';
import TitleSection from './TitleSection';

const   SquareBox = ({ color, text, link }) => {
  return (
    <div
      className="relative h-80 w-80"
      style={{ backgroundColor: color, border: '4px solid rgba(0,0,0,0.2)', boxSizing: 'border-box' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <a
          href={link}
          className="text-white text-center font-semibold p-2"
        >
          <TitleSection text={text} />
        </a>
      </div>
    </div>
  );
};

export default SquareBox;
