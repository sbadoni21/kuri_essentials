"use client";
import React, { useEffect, useState } from "react";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Space16 from "../backend/Space16";
import Link from "next/link";

const BlogSection = () => {
  const [routineData, setRoutineData] = useState([]);

  useEffect(() => {
    const fetchRoutineData = async () => {
      const querySnapshot = await getDocs(query(collection(db, "routines")));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => {
          const routine = doc.data();
          return {
            title: routine.title,
            id: routine.id,
            description: routine.description,
            heroImage: routine.heroImage,
            timestamp: routine.timestamp,
            title: routine.title,
          };
        });
        setRoutineData(data);
      }
    };

    fetchRoutineData();
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
    <div className="w-full h-1/2 p-5 md:p-20 bg-gradient-to-t to-bgmain from-10% from-black to-95% text-pink-500 text-center lemonada">
      <div className="flex items-center justify-start gap-4  ">
        <div className=" text-4xl md:text-6xl allura text-white">Routines</div>
      </div>
      <Space16 />
      <Space16 />
      <div className=" flex flex-col md:flex-row gap-10 justify-center items-center align-middle">
        {routineData.slice(0, 5).map((routine, index) => (
          <Link href={`/blogs/${routine.id}`} key={index}>
            <div
              key={index}
              className="w-56 h-96 bg-white border-8 border-white p-2"
            >
              <img
                src={routine.heroImage}
                alt="Routine Image"
                className="h-40 object-cover"
              />
              <div className="flex justify-center items-center pt-4">
                {routine.title}
              </div>
              <div className="flex justify-center items-center pt-4 text-sm">
                {truncateText(routine.description,20)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
