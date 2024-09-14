"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Loader from "./Loading";
import Space16 from "../backend/Space16";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Link from "next/link";


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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 464,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{ position: "relative" }}
      className="md:h-full w-full bg-gradient-to-t from-black from-10% to-bgmain to-95% overflow-hidden"
    >
      <div className="flex items-start justify-start gap-4 p-4 md:pl-24">
        <div className="text-4xl md:text-6xl allura text-white transition-opacity duration-1000 opacity-100 hover:opacity-50">
          Best Products for you
        </div>
      </div>
      <Space16 />
      <Space16 />

      {loading ? (
        <Loader />
      ) : (
        <Slider {...settings} className="pb-10">
          {products.map((item, index) => (
            <Link key={index} href={`/products/${item.id}`}>
              <div className="shadow-xl shadow-gray-700 rounded-2xl overflow-hidden mx-4 my-6 flex-col montserrat_Alternates md:h-[460px]  text-white justify-between">
                <img
                  src={item.imgURL}
                  alt={item.title}
                  className="h-4/6 w-full object-center object-cover"
                />
                <div className="text-start m-4 text text-sm md:text-base">
                  <p className="text-slate-700">{item.title}</p>
                  <Space16 />
                  <p className="text-sm md:text-base text-slate-700 text-primary">
                    Rating : {item.rating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      )}

      <div className="flex justify-center items-center pb-2">
        <Link href="/products">
          <div className="pt-3 text-2xl allura bg-gradient-to-r shadow-2xl shadow-gray-600 from-bgmain from-10% to-black to-95% text-white p-16 pb-2 pr-4 pl-4 rounded-3xl bg-pink-300">
            See all...
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeProductSection;
