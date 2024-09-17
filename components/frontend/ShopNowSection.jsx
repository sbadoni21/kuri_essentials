import React from "react";

const ShopNowSection = () => {
  return (
    <div className="h-screen w-screen">
      <div className="relative h-full w-full ">
        <img
          src="/secondHero.png"
          alt="Shop Now Background"
          className="h-full w-full object-cover object-top shadow-lg"
        />
        <div className="absolute z-10 inset-0 flex justify-center items-end -translate-y-20">
          <button className="px-6 py-3 rounded-3xl bg-transparent border-white border-2 text-white text-2xl backdrop-blur-2xl shadow-2xl shadow-bgmain transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.6)] hover:border-transparent">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopNowSection;
