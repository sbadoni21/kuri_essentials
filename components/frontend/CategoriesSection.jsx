import React from "react";
import SquareBox from "./SquareBox";
import TitleSection from "./TitleSection";
import { categoriesData } from "@/data/categoriesData";

const CategoriesSection = () => {
  return (
    <div className="pb-20 bg-bgmain2">
      <div className="pl-5 pt-10 md:pl-10 pb-5">
        <TitleSection text={"Our Essentials"} />
      </div>
      <div className=" flex flex-wrap justify-center items-center  gap-4">
        {categoriesData.map((square, index) => (
          <SquareBox
            key={index}
            color={square.color}
            text={square.text}
            link={square.link}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
