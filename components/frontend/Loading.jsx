import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/lottie/loadingLottie.json";
const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <div className="w-full h-full">
        {" "}
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default Loader;
