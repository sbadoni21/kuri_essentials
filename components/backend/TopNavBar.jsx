import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { TbSquareRounded } from "react-icons/tb";

const TopNavBar = () => {
  return (
    <div className="flex justify-between items-center pt-4 pb-4 pr-10 pl-10 bg-slate-950 fixed w-4/5  text-2xl text-slate
    bg-primary  h-20">
      <Link href="#">
          <GiHamburgerMenu className="mr-2" /> 
      </Link>
 <div className='flex space-x-3' >   <Link href="#">
          <IoIosNotifications className="" /> 
        </Link>
        <Link href="#">
          <GiHamburgerMenu className="" /> 
        </Link>

        <Link href="#">
          <TbSquareRounded className=" " /> 
        </Link></div>
     
 
    </div>
  );
};

export default TopNavBar;
