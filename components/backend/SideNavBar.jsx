import Link from 'next/link';
import { FiHome, FiBox, FiTag, FiUser, FiGift,  } from 'react-icons/fi';
import { GiFarmTractor } from "react-icons/gi";
import { GiFireplace } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";
import { MdOutlineVideoSettings } from "react-icons/md";

import React from 'react';

export const SideNavBar = () => {
  return (
    <div className="bg-primary text-slate min-h-full top-0 fixed w-1/5 ">
      <Link href="/dashboard">
        <div className="flex items-center justify-center py-4 text-7xl">
<img src="/logoSHARI.jpg" alt="" className='h-20 w-20 rounded-full' />        </div>
      </Link>
      <div className="flex flex-col space-y-6 ml-5 ">
        <Link href="/dashboard">
          <div className="flex items-center px-4 py-2 hover:text-white  hover:bg-slate">
            <FiHome className="mr-2" /> 
            <span>Home</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2  hover:text-white  hover:bg-slate">
            <FiBox className="mr-2" /> 
            <span>Catalogue</span>
          </div>
        </Link>
        <Link href="/dashboard/product">
          <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
            <FiTag className="mr-2" /> 
            <span>Products</span>
          </div>
        </Link>
        <Link href="/dashboard/tags">
          <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
            <FiUser className="mr-2" /> 
            <span>Tags</span>
          </div>
        </Link>
        <Link href="/dashboard/categories">
          <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
            <FiGift className="mr-2" /> 
            <span>Categories</span>
          </div>
        </Link>
        <Link href="/dashboard/blogs">
          <div className="flex items-center px-4 py-2  hover:text-white  hover:bg-slate">
            <GiFireplace className="mr-2" /> 
            <span>Blogs</span>
          </div>
        </Link>
        <Link href="/dashboard/videos">
          <div className="flex items-center px-4 py-2  hover:text-white  hover:bg-slate">
            <MdOutlineVideoSettings className="mr-2" /> 
            <span>Video Routines</span>
          </div>
        </Link>
        <Link href="/dashboard/contactrequests">
          <div className="flex items-center px-4 py-2 hover:text-white  hover:bg-slate">
            <GiFarmTractor className="mr-2" /> 
            <span>Contact Requests</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2  hover:text-white  hover:bg-slate">
            <FaPeopleCarry className="mr-2" /> 
            <span>Staff</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
