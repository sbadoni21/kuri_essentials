import React from "react";
const HighlightProduct = () => {
  return (
    <>
      {" "}
      <div className="relative min-h-[80vh] md:min-h-[150vh] w-screen overflow-hidden">
        <div className="absolute z-10 w-full flex justify-center items-center pt-10">
          {" "}
      
            <div className="text-5xl md:text-9xl  font-bold md:font-normal underline   rounded-xl allura text-white transition-opacity duration-1000 opacity-100 hover:opacity-50 ">
              Top Seller This Month
            </div>
        </div>{" "}
        <img
          src="/highlightedproduct.png"
          alt="Background Image"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <img
          src="/esssbo-Photoroom.png"
          alt="Overlay Image"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute z-20 inset-0 flex justify-center items-end pb-10">
          <button className="px-6 py-3 rounded-3xl bg-transparent border-white border-2 text-white text-2xl backdrop-blur-2xl shadow-2xl shadow-bgmain transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.6)] hover:border-transparent">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default HighlightProduct;
