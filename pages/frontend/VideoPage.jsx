"use client"
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Adjust the import path as needed
import Space16 from "@/components/backend/Space16";

const VideoDetailPage = () => {
    const currentPage = usePathname();
    const pathArray = currentPage.split("/");
    const id = pathArray[pathArray.length - 1];
  
  const [video, setVideo] = useState(null);

  const fetchVideo = async () => {
    try {
      if (id) {
        const docRef = doc(db, "videoRoutines", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVideo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (!video) {
    return <div className="min-h-screen bg-gray-100 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8  bg-gradient-to-t from-black from-10% to-bgmain to-95% pt-20 ">
      <div className="container mx-auto px-4 ">
        <div className="relative  h-[600px] bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.url}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-4 text-left text-white">
          <h1 className="text-4xl font-bold">{video.title}</h1>
          <Space16/>
          <p className="mt-2 text-lg">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
