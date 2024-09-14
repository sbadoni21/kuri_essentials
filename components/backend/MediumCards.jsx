import React from "react";

const MediumCards = ({ title, data }) => {
  return (
    <div className="min-w-60 h-24 text-white flex flex-col justify-center items-center  rounded-lg p-6 shadow-md bg-slate-950 ">
      <div className="text-xl ">{title}</div>
      <divc className="text-base">{data}</divc>
    </div>
  );
};

export default MediumCards;
