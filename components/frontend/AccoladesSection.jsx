import React from "react";
import { motion } from "framer-motion";
import TitleSection from "./TitleSection";
import { accoladeData } from "@/data/accoladeData";

const AccoladesSection = () => {
  return (
    <div className="bg-gradient-to-r from-bgmain4 to-bgmain3 w-full py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <div className="flex md:justify-center md:items-center pb-10">
          <TitleSection text={"Our Achievements"} />
        </div>

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
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {accolade.title}
              </h3>
              <p className="text-gray-600">{accolade.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccoladesSection;
