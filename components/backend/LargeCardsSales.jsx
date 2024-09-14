import React from "react";
import { IoCardOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";

const LargeCardsSales = ({ cardName, info }) => {
  let iconComponent = null;

  return (
    <div className="bg-green-400 flex flex-col items-center justify-center  text-white rounded-lg p-6 shadow-md min-w-60 min-h-60">
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div className="mr-4">
          <IoCardOutline className="text-5xl" />
        </div>

        <h2 className="text-base font-semibold">{cardName}</h2>
      </div>
      {info && (
        <p className="flex items-center justify-center text-xl">
        
          <FaRupeeSign />
          {info}
        </p>
      )}
    </div>
  );
};

export default LargeCardsSales;
