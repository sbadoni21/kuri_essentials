import React from 'react';
import SquareBox from './SquareBox'; 
import TitleSection from './TitleSection';

const CategoriesSection = () => {
  const squareData = [
    { color: '#c1db9b', text: 'Peppermint Oil', link: '/shop1' },
    { color: '#b1cf86', text: 'Rosemary Oil', link: '/explore' },
    { color: '#c1db9b', text: 'Lavender Oil', link: '/buy' },
    { color: '#b1cf86', text: 'Jojoba Oil', link: '/discover' },
  ];

  return (
   <div className='pb-20 bg-bgmain2'>
         <div className="pl-5 pt-10 md:pl-10 pb-5"><TitleSection text={"Our Essentials"} /></div>
     <div className=" flex flex-wrap justify-center items-center  gap-4">
      {squareData.map((square, index) => (
        <SquareBox
          key={index}
          color={square.color}
          text={square.text}
          link={square.link}
        />
      ))}
    </div>
   </div>
  );
};

export default CategoriesSection;
