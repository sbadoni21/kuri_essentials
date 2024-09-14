"use client";
import React from "react";
import animationData from "../public/lottie/loadingLottie.json";
import Lottie from "react-lottie";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-slate-200">
      <div>
        {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
