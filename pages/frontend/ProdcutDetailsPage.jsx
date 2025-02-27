"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useProducts } from "@/providers/ProductProvider";

const ProductDetailsPage = () => {
  const currentPage = usePathname();
  const pathArray = currentPage.split("/");
  const uniqueID = pathArray[pathArray.length - 1];
  const { products } = useProducts();
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!loading && products.length > 0) {
          const selectedProduct = products.find(
            (product) => product.id === uniqueID
          );
          setProductData(selectedProduct || null);
        }
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
        const tagSnapshot = await getDocs(collection(db, "tags"));
        const tagsData = tagSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTags(tagsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductData();
  }, [uniqueID, products]);

  const getCategoryNames = (productCategories) => {
    return productCategories.map((categoryID) => {
      const category = categories.find((cat) => cat.id === categoryID);
      return category ? category.category : "Unknown Category";
    });
  };
  const getTagNames = (productTags) => {
    return productTags.map((tagID) => {
      const tag = tags.find((t) => t.id === tagID);
      return tag ? tag.tag : "Unknown Tag";
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 md:p-20 bg-bgmain">
      {productData ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={productData?.imgURL}
              alt={productData?.title}
              className="rounded-xl w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl font-bold">{productData?.title}</h1>
            <div className="text-2xl font-semibold text-green-600">
              ₹{productData.price}
            </div>
            <p className="text-lg text-gray-700">{productData?.description}</p>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {getCategoryNames(productData.categories).map(
                  (categoryName, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {categoryName}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {getTagNames(productData.tags).map((tagName, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                  >
                    {tagName}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">Routines:</h3>
              <ul className="list-disc pl-5">
                {productData?.routines?.map((routine, index) => (
                  <li key={index} className="text-gray-700">
                    {routine}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Specifications
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                        Specs
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData?.specifications?.map((spec, index) => (
                      <tr
                        key={index}
                        className="transition duration-200 ease-in-out hover:bg-blue-50"
                      >
                        <td className="px-6 py-4 text-gray-700 text-sm font-medium">
                          {spec.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No product data found.</div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
