"use client";
import { useState, useEffect } from "react";
import GoogleAdPcItem from "../backend/Ads";

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 10);

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      <div className="hidden md:flex">
        {" "}
        <div className="flex  justify-center text-white items-center h-screen text-9xl w-full">
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="allura text-[400px] transition-opacity duration-1000 ease-in"
          >
            K
          </p>
          <img
            src="/highlightedproduct.png"
            alt="Background Image"
            className="absolute inset-0 w-full h-full  object-scale-down object-top -z-10 bg-bgmain2  "
          />
          <div className="flex flex-col items-start justify-start ">
            <div className="flex justify-start items-end align-bottom">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="text-9xl londrinaoutline transition-opacity duration-1000 ease-in delay-300 font-extrabold"
              >
                uri
              </p>
              <p style={{ opacity: showContent ? 1 : 0 }} className="w-4"></p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="text-9xl allura transition-opacity duration-1000 ease-in delay-500"
              >
                Essentials
              </p>
            </div>

            <div className="flex items-end justify-start align-bottom">
           
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura text-6xl pr-4   transition-opacity duration-1000 ease-in delay-1000 font-semibold"
              >
                Simply Natural
              </p>
         
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura text-6xl transition-opacity duration-1000 ease-in delay-1000 font-semibold"
              >
                Simply Better
                </p>
            </div>
          </div>
          <div className="flex flex-row absolute  top-[700px] gap-20  text-3xl text-center ">
            {/* <div className="w-48 h-20 bg-black text-white rounded-full flex items-center justify-center">
              Blogs
            </div> */}
            {/* <Link href={"/products"} className="w-48 h-20 bg-black text-white rounded-full  flex items-center justify-center">
              Organics
            </Link>

            <Link href={"/products"} className="w-48 h-20 bg-black text-white rounded-full  flex items-center justify-center">
              Essential Oils
            </Link> */}
          </div>
        </div>
      </div>
      <div className=" h-[60vh] md:hidden">
        {" "}
        <div className=" text-white items-center  text-8xl w-full ">
          <div className=" pt-20  pb-20 flex flex-col items-center justify-center ">
            <div className="flex justify-center items-end  align-bottom">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura text-[180px] transition-opacity duration-1000 ease-in "
              >
                   K
              </p>
              <img
                src="/highlightedproduct.png"
                alt="Background Image"
                className="absolute inset-0 w-full h-full  object-scale-down object-center -translate-y-28 -z-10 bg-bgmain2  "
              />
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura  transition-opacity -translate-y-10 duration-1000 ease-in delay-300 "
              >
                uri
              </p>
              <p style={{ opacity: showContent ? 1 : 0 }} className="w-4"></p>
           
            </div>
            <p
                style={{ opacity: showContent ? 1 : 0 }}
                className=" allura transition-opacity duration-1000 -translate-y-6 ease-in delay-500"
              >
                Essentials 
              </p>
            {/* <div
              style={{ opacity: showContent ? 1 : 0 }}
              className="allura   pr-4 text-center items-center  transition-opacity duration-1000 ease-in delay-700"
            >
              By
            </div> */}
            <div className="flex flex-col items-center justify-start align-bottom text-5xl">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura  pr-4   transition-opacity duration-1000 ease-in delay-1000 font-semibold"
              >
                Simply Natural
              </p>
          
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura  transition-opacity duration-1000 ease-in delay-1000 font-semibold"
              >
                Simply Better
                </p>
            </div>
          </div>
        </div>
      </div>
      <GoogleAdPcItem />
    </>
  );
};

export default HeroSection;
