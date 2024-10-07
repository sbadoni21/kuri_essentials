"use client";
import React from "react";
import Image from "next/image"; // Import Image from Next.js

const Loading = () => {
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-slate-200">
      <div className="relative flex justify-center items-center">
        {/* Logo in the center */}
        <Image 
          src="/logoSHARI.jpg" // Update with your logo path
          alt="Logo"
          width={100} // Adjust the width as needed
          height={100} // Adjust the height as needed
          className="z-10 w-24 h-24" // Ensures the logo appears above the spinner
        />
        
        {/* Interactive Spinner surrounding the logo */}
        <div className="absolute h-48 w-48 rounded-full border-8 border-t-transparent border-blue-500 animate-spin">
          {/* Inner spinner for extra visual effect */}
          <div className="h-full w-full rounded-full border-8 border-t-transparent border-green-400 animate-ping absolute top-0 left-0" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
