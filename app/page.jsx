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

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="">
      <TopNavBar />
      <HeroSection />
      <HomeProductSection />
      {/* <BlogSection/> */}
      {/* <VideoSection/> */}
      {/* <Instagram /> */}
      <Footer/>
    </div>
  );
};

export default HomePage;
