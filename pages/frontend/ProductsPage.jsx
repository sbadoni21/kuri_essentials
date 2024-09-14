'use client'
import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categorySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);
        const allProductSnapshot = await getDocs(
          query(collection(db, "product"))
        );
        const allProducts = allProductSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllProducts(allProducts);
        const productsData = [];
        for (const category of categoriesData) {
          const productSnapshot = await getDocs(
            query(collection(db, "product"), where("categories", "array-contains", category.id))
          );

          const products = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          productsData.push({ category, products });
        }
     console.log(productsData);
        setProducts(productsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };



    fetchCategoryDetails();
  }, []);
  const handleSearch = () => {
    const searchedProducts = allProducts.filter(product => {
      const title = product.title.toLowerCase();
      return title.includes(searchQuery.toLowerCase());
    });
    setSearchedProducts(searchedProducts);
    setClicked(true);
  };
  const clearSearchQuery = () => {
    setSearchQuery('');
    setClicked(false);
    setSearchedProducts([]);
  };
  

  return (
    <div className="bg-gradient-to-t from-black from-10% to-bgmain to-95% pt-20 ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex justify-center ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-slate text-white font-bold rounded-md px-4 py-2"
        >
          Search
        </button>
        {searchQuery && (
          <button
            onClick={clearSearchQuery}
            className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-md px-4 py-2 ml-2"
          >
            X
          </button>
        )}
      </div>

     {(clicked ? <div className="pt-4 flex overflow-x-scroll gap-4 pl-20 pr-20">
        {searchedProducts.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-slate-100 rounded-lg bg-black text-white shadow-2xl shadow-gray-400 overflow-hidden w-48 h-72">
              <img src={product.imgURL} key={product.id} alt={product.title} className="w-full h-3/4 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.title.toString().slice(0,10)}</h2>
                <p className="text-gray-800 mb-2">Rating: {product.rating}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Details</a>
              </div>
            </div>
          </Link>
        ))}
      </div> : <div></div> )} 
      
        {products.map(category => (
  category.products && category.products.length > 0 && (
    <div key={category.id} className=' pt-20 '>
      <h3 className="text-6xl allura mb-4 text-white pl-20">{category.category.category}</h3>
      <Carousel
        key={category.id} 
        
        draggable={true}
        swipeable={true}
        infinite={true}
         autoPlay={true}
        partialVisible={false}
        autoPlaySpeed={3000}
        centerMode={true}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        className='pb-10'
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        }}
      >
        {category.products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-slate-100 rounded-lg bg-black text-white shadow-2xl shadow-gray-400 overflow-hidden m-4">
              <img src={product.imgURL} key={product.id} alt={product.title} className="w-full h-3/4 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.title.toString().slice(0,25)}....</h2>
                <p className="text-gray-800 mb-2">Rating: {product.rating}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Details</a>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  )
))}
 <h3 className="text-6xl allura mb-4 text-white pl-20">All Products</h3>
      <Carousel
        draggable={true}
        swipeable={true}
        infinite={true}
        autoPlay={true}
        partialVisible={false}
        autoPlaySpeed={3000}
        centerMode={true}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        className='pb-10'
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        }}
      >
        {allProducts.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-slate-100 rounded-lg bg-black text-white shadow-2xl shadow-gray-400 overflow-hidden m-4">
              <img src={product.imgURL} key={product.id} alt={product.title} className="w-full h-3/4 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.title.toString().slice(0,25)}</h2>
                <p className="text-gray-800 mb-2">Rating: {product.rating}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Details</a>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>


        </div>
      )}
    </div>
  );
  
  
  
};

export default ProductsPage;
