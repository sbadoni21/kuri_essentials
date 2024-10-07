"use client";
import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Link from "next/link";
import { GiMagnifyingGlass } from "react-icons/gi";
import { BsChevronBarDown } from "react-icons/bs";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);

        // Fetch tags
        const tagSnapshot = await getDocs(collection(db, "tags"));
        const tagsData = tagSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTags(tagsData);

        // Fetch products
        const productSnapshot = await getDocs(collection(db, "product"));
        const productsData = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts(categoryId, selectedTags, searchQuery);
  };

  const handleTagChange = (tagId) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((tag) => tag !== tagId)
      : [...selectedTags, tagId];
    setSelectedTags(updatedTags);
    filterProducts(selectedCategory, updatedTags, searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(selectedCategory, selectedTags, e.target.value);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    sortProducts(filteredProducts, order);
  };

  const filterProducts = (categoryId, tags, query) => {
    let filtered = products;

    // Filter by category
    if (categoryId) {
      filtered = filtered.filter((product) =>
        product.categories.includes(categoryId)
      );
    }

    // Filter by tags
    if (tags.length > 0) {
      filtered = filtered.filter((product) =>
        tags.every((tag) => product.tags.includes(tag))
      );
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    sortProducts(filtered, sortOrder); // Sort after filtering
  };

  const sortProducts = (productsToSort, order) => {
    const sorted = [...productsToSort].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredProducts(sorted);
  };

  return (
    <div className="bg-bgmain2 md:pt-20">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col bg-white p-4 shadow-md md:hidden sticky top-16 z-10 rounded-lg">
          <div className="flex items-center border border-gray-300 rounded-md mb-2">
            <GiMagnifyingGlass className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="p-2 w-full outline-none rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative mb-2">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md appearance-none pr-8"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
            <BsChevronBarDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="block w-full p-2 border border-gray-300 rounded-md appearance-none pr-8"
            >
              <option value="asc">Sort by A-Z</option>
              <option value="desc">Sort by Z-A</option>
            </select>
            <BsChevronBarDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4 ">
          <h2 className="text-6xl font-bold  text-white px-5  pt-5  md:pl-10 md:pt-10 allura">
            Products
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 py-5 md:px-20 md:py-5">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                    <img
                      src={product.imgURL}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Rating: {product.rating}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Right Side Filter Section for Desktop */}
        <div className="hidden md:block w-1/4  bg-white shadow-lg mt-20 sticky top-0">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="p-2 border border-gray-300 rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>

          <h3 className="text-lg font-semibold mb-2">Sort Options</h3>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          >
            <option value="asc">Sort by A-Z</option>
            <option value="desc">Sort by Z-A</option>
          </select>

          {/* Tags Filter */}
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <ul className="space-y-2">
            {tags.map((tag) => (
              <li key={tag.id}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                  />
                  <span>{tag.tag}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
