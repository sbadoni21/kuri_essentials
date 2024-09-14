import React from "react";
import Space16 from "../backend/Space16";
import { BsInstagram } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import Link from "next/link";
import { MdPrivacyTip } from "react-icons/md";

const Footer = () => {
  return (
    <div className="w-full h-1/2   pl-6 md:pl-20 pr-20 pt-20 pb-20 bg-black text-[#77DD77] text-center montserrat_Alternates  ">
      <div className="flex items-center justify-start gap-4 ">
        <div className=" text-3xl md:text-6xl allura text-white">Hey Contact Us</div>
      </div>
      <Space16 />
      <Space16 />
      <Space16 />
      <div className="text-base md:text-3xl text-white"><div className="flex gap-4">
        <div className="">EMAIL:</div>
        <div className="">kuriricloset@gmail.com</div>
      </div>
      <Space16 />
      <div className="flex">
        <div className="">SOCIALS</div>
      </div>
      <Space16 />
      <Link href={`https://www.instagram.com/selfcareshari/`}    className="flex gap-6">
        <BsInstagram className="" />
        <div className="">Instagram</div>
      </Link>
      <Link href={`https://youtube.com/@SelfCareShaRi?si=I6YpPxuFNhi5lMTP`} className="flex gap-6">
        <AiFillYoutube className="" />
        <div className="">Youtube</div>
      </Link>
      <Link href={`/privacypolicy`} className="flex gap-6">
      <MdPrivacyTip />

        <div className="">Privacy Policy</div>
      </Link></div>
      
    </div>
  );
};

export default Footer;
