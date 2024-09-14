"use client";
import { useState, useEffect } from "react";
import GoogleAdPcItem from "../backend/Ads";
import Link from "next/link";

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [showSmallScreen, setshowSmallScreen] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setshowSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!showSmallScreen && (
        <div className="flex bg-gradient-to-t from-bgmain from-50% to-black to-95% justify-center text-white items-center h-screen text-9xl w-full">
          <p
            style={{ opacity: showContent ? 1 : 0 }}
            className="allura text-[400px] transition-opacity duration-1000 ease-in"
          >
            K
          </p>
          <div className="flex flex-col items-start justify-start">
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
                Orginials
              </p>
            </div>

            <div className="flex items-end justify-start align-bottom">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura text-9xl pr-4  transition-opacity duration-1000 ease-in delay-700"
              >
                By
              </p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="londrinaoutline text-9xl pr-4   transition-opacity duration-1000 ease-in delay-1000 font-bold"
              >
                SHA
              </p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura text-9xl pr-4   transition-opacity duration-1000 ease-in delay-1000"
              >
                &
              </p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="londrinaoutline  transition-opacity duration-1000 ease-in delay-1000 font-bold"
              >
                RI
              </p>
            </div>
          </div>
          <div className="flex flex-row absolute  top-[700px] gap-20  text-3xl text-center ">
            {/* <div className="w-48 h-20 bg-black text-white rounded-full flex items-center justify-center">
              Blogs
            </div> */}
            <Link href={"/products"} className="w-48 h-20 bg-black text-white rounded-full  flex items-center justify-center">
              Organics
            </Link>

            <Link href={"/products"} className="w-48 h-20 bg-black text-white rounded-full  flex items-center justify-center">
              Essential Oils
            </Link>
          </div>
        </div>
      )}
      {showSmallScreen && (
        <div className=" text-white items-center bg-gradient-to-t from-bgmain from-10% to-black to-95%  text-8xl w-full ">
          <div className=" pt-40 pb-48 flex flex-col items-center justify-center ">
            <div className="flex justify-center items-center  align-bottom">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura  transition-opacity duration-1000 ease-in "
              >
                S
              </p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura  transition-opacity duration-1000 ease-in delay-300 "
              >
                elf
              </p>
              <p style={{ opacity: showContent ? 1 : 0 }} className="w-4"></p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className=" allura transition-opacity duration-1000 ease-in delay-500"
              >
                Care
              </p>
            </div>

            <div
              style={{ opacity: showContent ? 1 : 0 }}
              className="allura   pr-4 text-center items-center  transition-opacity duration-1000 ease-in delay-700"
            >
              By
            </div>
            <div className="flex items-end justify-start align-bottom">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="londrinaoutline  pr-4   transition-opacity duration-1000 ease-in delay-1000 font-extrabold"
              >
                SHA
              </p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="allura  pr-4   transition-opacity duration-1000 ease-in delay-1000"
              >
                &
              </p>
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="londrinaoutline  transition-opacity duration-1000 ease-in delay-1000 font-extrabold"
              >
                RI
              </p>
            </div>
          </div>
        </div>
      )}
      <GoogleAdPcItem />
    </>
  );
};

export default HeroSection;
