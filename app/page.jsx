"use client";
import React, { useState, useEffect } from "react";
import TopNavBar from "@/components/frontend/TopNavBar";
import HeroSection from "@/components/frontend/HeroSection";
import HomeProductSection from "@/components/frontend/HomeProductSection";
import Space16 from "@/components/backend/Space16";
import BlogSection from "@/components/frontend/BlogSection";
import Instagram from "@/components/frontend/Instagram";
import Footer from "@/components/frontend/Footer";
import firebase_app, { db } from "@/firebase/firebase";
import VideoPage from "@/pages/frontend/VideoPage";
import VideoSection from "@/components/frontend/VideoSection";
import ShopNowSection from "@/components/frontend/ShopNowSection";
import CategoriesSection from "@/components/frontend/CategoriesSection";
import HighlightProduct from "@/components/frontend/HighlightProduct";

const HomePage = () => {


  return (
    <div className="overflow-x-hidden">
      <TopNavBar />
      <HeroSection />
      <CategoriesSection/>
      <ShopNowSection />
      <HomeProductSection />
      <HighlightProduct />
      {/* <BlogSection/> */}
      {/* <VideoSection/> */}
      {/* <Instagram /> */}
      <Footer/>
    </div>
  );
};

export default HomePage;
