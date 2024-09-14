import React from "react";
import { GiStack } from "react-icons/gi"; 
import { FaRupeeSign } from "react-icons/fa";

const LargeCardsOrders = ({ cardName, info1, info2, info3 }) => {
  let iconComponent = null;

  return (
    <div className="bg-orange-400 flex flex-col justify-center  text-white rounded-lg p-6 shadow-md min-w-60  min-h-60">
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div className="mr-4">
          <GiStack className="text-5xl" />
        </div>

        <h2 className="text-base font-semibold">{cardName}</h2>
      </div>
      {info1 && (
        <p className="flex items-center justify-center">
          <p className="text-base">Card : </p>
          <FaRupeeSign />
          {info1}
        </p>
      )}
      {info2 && (
        <p className="flex items-center justify-center">
          <p className="text-base">Credit : </p>
          <FaRupeeSign />
          {info2}
        </p>
      )}
      {info3 && (
        <p className="flex items-center justify-center">
          <p className="text-base">Cash : </p>

          <FaRupeeSign />
          {info3}
        </p>
      )}
    </div>
  );
};

export default LargeCardsOrders;
