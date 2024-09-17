import React from 'react';

const TitleSection = ({ text }) => {
  return (
    <div className="flex items-start justify-start gap-4 ">
      <div className="text-4xl md:text-6xl allura text-white transition-opacity duration-1000 opacity-100 hover:opacity-50">
        {text}
      </div>
    </div>
  );
};

export default TitleSection;
