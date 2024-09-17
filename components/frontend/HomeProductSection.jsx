"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Loader from "./Loading";
import Space16 from "../backend/Space16";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Link from "next/link";
import TitleSection from "./TitleSection";
import "@/styles/globals.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-0 flex items-center justify-center w-12 h-12 bg-white text-bgmain4  rounded-full shadow-lg cursor-pointer z-10"
    onClick={onClick}
    style={{ top: '50%', transform: 'translateY(-50%)' }}
  >
    < FaArrowLeft />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-0 flex items-center justify-center w-12 h-12 bg-white text-bgmain4  rounded-full shadow-lg cursor-pointer z-10"
    onClick={onClick}
    style={{ top: '50%', transform: 'translateY(-50%)' }}
  >
    < FaArrowRight />

  </div>
);

const HomeProductSection = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-bgmain4 backdrop-blur-xl opacity-95 w-full py-10">
      <div className="pl-5 pt-10 md:pl-10">
        <TitleSection text={"Your Essentials"} />
      </div>
      <Space16 />
      <Space16 />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <Slider {...settings} className="relative px-12 md:px-20">
          {products.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`}>
              <div className="shadow-lg rounded-lg overflow-hidden mx-2 my-4 bg-white">
                <img
                  src={item.imgURL}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                  <Space16 />
                  <p className="text-sm text-gray-600">Rating: {item.rating}</p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      )}

      <div className="flex justify-center items-center mt-6">
        <Link href="/products">
        <button className="px-6 py-3 rounded-3xl bg-transparent border-white border-2 text-white text-2xl backdrop-blur-2xl shadow-2xl shadow-bgmain transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.6)] hover:border-transparent">
            See all...
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeProductSection;
