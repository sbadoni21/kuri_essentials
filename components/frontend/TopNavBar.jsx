"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const TopNavBar = () => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMenuButton(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <>
      {!showMenuButton && (
        <div className="flex justify-center items-center text-bgmain4  allura text-3xl font-bold">
          <div className="fixed top-0 flex justify-center gap-16 items-center pt-4 pb-4 pr-10 pl-10 bg-white w-screen rounded-b-full backdrop-filter backdrop-blur-2xl h-16 z-10">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            {/* <Link href="/aboutus">About Us</Link> */}
            {/* <Link href="/blogs">Blogs</Link> */}
            <Link href="/contact">Contact us</Link>

          </div>
        </div>
      )}

      {showMenuButton && (
        <div className="flex absolute z-10 top-0 justify-start items-start backdrop-blur-2xl w-screen">
          <button
            onClick={handleMenuClick}
            className="hover:bg-blue-700 text-gray-500 allura text-5xl font-bold py-2 px-4 rounded"
          >
            {showMenu ? <RxCross1 /> : <IoMdMenu />}
          </button>
        </div>
      )}

      {showMenu && (
        <div className="flex delay-1000 transition-transform  justify-center items-center text-5xl bg-gradient-to-t from-black from-10% to-bgmain to-95%  h-screen text-white ">
          <div className="flex flex-col  h-screen justify-center gap-20  allura  items-center">
            <Link onClick={handleMenuClick} href="/">
              Home
            </Link>
            <Link onClick={handleMenuClick} href="/products">
              Products
            </Link>
            {/* <Link onClick={handleMenuClick} href="/blogs">Blogs</Link> */}

            {/* <Link onClick={handleMenuClick} href="/aboutus">
              About Us
            </Link> */}
            <Link onClick={handleMenuClick} href="/contact">
              Contact us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavBar;
