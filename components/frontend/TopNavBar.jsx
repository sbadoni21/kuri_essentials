"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const TopNavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Handle scrolling when the menu is open
  useEffect(() => {
    if (showMenu) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "auto";
    }

    // Cleanup function to restore scroll
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  // Close the menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest(".menu-container")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  const handleMenuClick = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <>
      <div className="hidden md:flex justify-center items-center text-bgmain4 allura text-3xl font-bold">
        <div className="fixed top-0 flex justify-center gap-16 items-center pt-4 pb-4 pr-10 pl-10 bg-white w-screen rounded-b-full backdrop-filter backdrop-blur-2xl h-16 z-10">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact us</Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden sticky bg-bgmain2 z-10 top-0 justify-start items-start backdrop-blur-2xl w-screen ">
        <button
          onClick={handleMenuClick}
          className="hover:bg-blue-700 text-5xl font-bold py-2 px-4 rounded"
        >
          <IoMdMenu className="text-white" />
        </button>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-1/2 bg-white  text-bgmain5 text-2xl transition-transform duration-700 ease-in-out transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } z-20 flex flex-col items-start p-8 menu-container`}
      >
        <div className="flex flex-col h-full gap-8 text-left justify-center">
          <Link
            href="/"
            onClick={handleMenuClick}
            className="transition-all duration-300 hover:border-b-2 hover:border-white"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={handleMenuClick}
            className="transition-all duration-300 hover:border-b-2 hover:border-white"
          >
            Products
          </Link>
          <Link
            href="/contact"
            onClick={handleMenuClick}
            className="transition-all duration-300 hover:border-b-2 hover:border-white"
          >
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
