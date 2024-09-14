"use client";
import React, { useState, useEffect } from "react";
import TopNavBar from "@/components/frontend/TopNavBar";
import Footer from "@/components/frontend/Footer";

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-[#FDCCE0] w-screen h-screen text-white">
      <TopNavBar />
      <div className="w-full relative ">
        <img
          src="image4.jpg"
          alt=""
          className="w-60 h-96 absolute top-16 left-20"
        />
        <img
          src="image4.jpg"
          alt=""
          className="w-[800px] h-60 absolute top-20 right-20"
        />
        <img
          src="image4.jpg"
          alt=""
          className="w-60 h-96  absolute top-80 right-20"
        />
        <img
          src="image4.jpg"
          alt=""
          className="w-[800px] h-60  absolute top-[450px] left-20"
        />
        <div className="absolute top-0  w-screen h-screen flex items-center justify-center ">
          <div className="flex flex-col items-start justify-start relative w-1/2 h-1/2">
            <div className="flex justify-start items-end align-bottom ">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="text-9xl londrinaoutline transition-opacity duration-1000 ease-in delay-300 font-extrabold absolute top-0 left-0"
              >
                THE
              </p>
            </div>
            <p
              style={{ opacity: showContent ? 1 : 0 }}
              className="allura text-[140px] pr-4  transition-opacity duration-1000 ease-in delay-700 absolute top-10 left-20 z-50"
            >
              High Contrast
            </p>
            <div className="flex items-end justify-end align-bottom">
              <p
                style={{ opacity: showContent ? 1 : 0 }}
                className="londrinaoutline text-9xl pr-4   transition-opacity duration-1000 ease-in delay-1000 font-bold  absolute top-40 right-0"
              >
                DUO
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>

    </div>
  );
};

export default HomePage;
