"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import TitleSection from "./TitleSection";

const accoladeData = [
  {
    icon: <FaTrophy size={50} />,
    title: "Award-Winning",
    description: "Best Ecommerce Website 2023",
  },
  {
    icon: <FaShoppingCart size={50} />,
    title: "10,000+ Products Sold",
    description: "Trusted by thousands of customers",
  },
  {
    icon: <FaUserAlt size={50} />,
    title: "5,000+ Happy Customers",
    description: "High customer satisfaction rate",
  },
];

const AccoladesSection = () => {
  return (
    <div className="bg-gradient-to-r from-bgmain4 to-bgmain3 w-full py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <div className="flex md:justify-center md:items-center pb-10"><TitleSection text={"Our Achievements"}/></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {accoladeData.map((accolade, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              whileInView={{ opacity: [0, 1], y: [-20, 0] }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-bgmain mb-4">{accolade.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{accolade.title}</h3>
              <p className="text-gray-600">{accolade.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccoladesSection;
