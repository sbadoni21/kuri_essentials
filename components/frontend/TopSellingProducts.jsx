"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loading";
import Space16 from "../backend/Space16";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Link from "next/link";
import TitleSection from "./TitleSection";
import "@/styles/globals.scss";

const TopSellerSection = () => {
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

  return (
    <div className="bg-bgmain4 backdrop-blur-xl opacity-95 w-full py-10">
      <div className="pl-5  md:pl-10">
        <TitleSection text={"Top Sellers"} />
      </div>
      <Space16 />
      <Space16 />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16">
          {products.slice(0, 6).map((item) => ( 
            <Link key={item.id} href={`/products/${item.id}`}>
              <div className="shadow-lg rounded-lg overflow-hidden bg-white">
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
        </div>
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

export default TopSellerSection;
