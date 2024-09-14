import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Adjust the import path as needed
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Space16 from "../backend/Space16";

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videoRoutines"));
      const videoData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videoData);
      setFilteredVideos(videoData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, videos]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" bg-gray-100 bg-gradient-to-t to-black from-10% from-bgmain py-8">
      <div className="container mx-auto px-4">
        <div className="pl-6 md:pl-0 text-4xl md:text-6xl allura text-white">
        Video Routines      </div>
        {/* <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full max-w-md"
          />
        </div> */}
        <Space16/>
        <Space16/>
 
        {filteredVideos.length > 0 ? (
          <Slider {...settings}>
            {filteredVideos.map((video) => (
              <div key={video.id} className="px-2">
              <Link key={video.id} href={`/videos/${video.id}`}
              className="relative  bg-black rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="400px" 
                    src={`https://www.youtube.com/embed/${video.url}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-2 text-white text-center">
            <h1 className="text-3xl sm:text-4xl ">{video.title}</h1>
          </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-500 text-2xl">
            No videos available
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
