"use client";
import Space16 from "@/components/backend/Space16";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogsCatalogue = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutinesDetails = async () => {
      try {
        const routinesSnapshot = await getDocs(collection(db, "routines"));
        const data = routinesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoutines(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchRoutinesDetails();
  }, []);
  const truncateText = (text, limit) => {
    if (text === undefined) {
      return ""; 
    }
  
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };
  
  return (
    <div>
      {" "}
      <div className="w-full h-1/2 p-5 md:p-20 bg-gradient-to-t from-bgmain from-10% to-black to-95% text-pink-500 text-center lemonada">
        <div className="flex items-center justify-start gap-4  ">
          <div className=" text-4xl md:text-6xl allura text-white">
            Routines
          </div>
        </div>
        <Space16 />
        <Space16 />
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {routines.map((routine, index) => (
            <Link href={`/blogs/${routine.id}`} key={index}>
              <div
                key={index}
                className="w-56 h-96 bg-white border-8 border-white p-2"
              >
                <img
                  src={routine.heroImage}
                  alt="Routine Image "
                  className="h-40 object-cover"
                />
                <div className="flex justify-center items-center pt-4">
                  {routine.title}
                </div>
                <div className="flex justify-center  items-center pt-4">
                {truncateText(routine.description)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsCatalogue;
