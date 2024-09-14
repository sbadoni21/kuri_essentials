"use client";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../../firebase/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    description: "",
    imgURL: null,
    link: "",
    rating: "",
    title: "",
    tags: [],
    categories: [],
  });
  const [showLoader, setShowLoader] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id:"",
    url:""
  });
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  const [editID, setEditID] = useState("");

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "product"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchTags = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchTags();
    fetchProducts();
    fetchCategories();
  }, []);

  const handleEdit = (id) => {
    const itemToEdit = products.find((item) => item.id == id);
    setProductData((prevState) => ({
      id: itemToEdit.id,
      ...itemToEdit,
    }));

    setEditID(id);
    setShowModal(true);
    setEdit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storageRef = ref(storage, `product_images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, productData.imgURL);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setShowLoader(true);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading photo", error);
        },
        async () => {
         const photoURL= await getDownloadURL(uploadTask.snapshot.ref);
          setShowLoader(false);
          const docRef = collection(db, "product");

          if (edit) {
            const itemRef = doc(docRef, editID);
            if(upload) {
            await updateDoc(itemRef, {
              description: productData.description,
              imgURL:  photoURL,
              link: productData.link,
              rating: productData.rating,
              title: productData.title,
              tags: productData.tags,                                                     
              categories: productData.categories,
            });
            setUpload(false);
            } else{
              await updateDoc(itemRef, {
                description: productData.description,
                link: productData.link,
                rating: productData.rating,
                title: productData.title,
                tags: productData.tags,                                                     
                categories: productData.categories,
              });
            }       
          } else {
            const docRef2 = await addDoc(docRef, {
              description: productData.description,
              imgURL: photoURL,
              link: productData.link,
                rating: productData.rating,
              title: productData.title,
              tags: productData.tags,
              categories: productData.categories,
            });
            await updateDoc(docRef2, { id: docRef2.id });
          }
          setProductData({
            description: "",
            imgURL: "",
            link: "",
            rating: "",
            title: "",
            tags: [],
            categories: [],
          });
          setShowModal(false);
          fetchProducts();
          setEdit(false);
          console.log("Product added successfully!");
        }
      );
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };
  const confirmDelete = (id, imgURL) => {
    setDeleteConfirmation({id, url:imgURL});
  };
  const handlePhotoChange = (e) => {
    setUpload(true);
    const file = e.target.files[0];
    setProductData({ ...productData, imgURL: file });
  };
  const handleDelete = async ({id, url}) => {   
    try {

      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      const photoRef = doc(db, "product", id);
      await deleteDoc(photoRef);
       toast.success("Deleted Successfully !!!");
      setDeleteConfirmation({
        id:"",
        url:""
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting:", error);
     toast.error("Error deleting. Please try again.");
    }
  };

const handleTagsChange = (e) => {
  const { name, checked } = e.target;
  if (checked) {
    setProductData((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, name],
    }));
  } else {
    setProductData((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((tag) => tag !== name),
    }));
  }
};

const handleCategoriesChange = (e) => {
  const { name, checked } = e.target;
  if (checked) {
    setProductData((prevState) => ({
      ...prevState,
      categories: [...prevState.categories, name],
    }));
  } else {
    setProductData((prevState) => ({
      ...prevState,
      categories: prevState.categories.filter((category) => category !== name),
    }));
  }
};

  return (
    <div>
      <div className="m-20">
        <h2 className="text-5xl font-bold mb-4 allura text-primary sticky top-20">
          All Products
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-primary bg-slate font-bold py-2 px-4 rounded mb-6"
        >
          Add New Product
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <img
                src={product.imgURL}
                alt={product.title}
                className="mt-2 max-w-full h-auto"
              />
              <p className="mt-2">Rating: {product.rating}</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {product.link}
              </a>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => confirmDelete(product.id, product.imgURL)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {deleteConfirmation.id != "" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-primary text-gray-500 p-4 rounded-lg">
            <p className="text-lg">Are you sure you want to delete this tag?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDelete(deleteConfirmation)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteConfirmation({
                  id:"",
                  url:""
                })}
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-slate-600">
          <div className="bg-white p-4 rounded-lg ">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <div className="flex items-end justify-end text-3xl">
              {" "}
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 mr-2 text-red-600 hover:text-red-800 "
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit} className="max-w-lg ">
              <div className="mb-4">
                <label htmlFor="title" className="block mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black  border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="imgFile" className="block mb-1">
                  Upload Image:
                </label>
                <input
                  type="file"
                  id="imgFile"
                  name="imgFile"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full  px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex">       <div className="mb-4 overflow-y-auto" style={{ maxHeight: "100px" }}>

                <label className="block mb-1 ">Tags:</label>
                {tags.map((tag) => (
                  <div                      key={tag.id} className="flex items-center">
                    <input
                    key={tag.id}
                      type="checkbox"
                      id={tag.id}
                      name={tag.tag}
                      value={tag.tag}
                      checked={productData.tags.includes(tag.tag)}
                      onChange={handleTagsChange}
                      className="mr-2"
                    />
                    <label htmlFor={tag.id}>{tag.tag}</label>
                  </div>
                ))}
              </div>
              <div className="mb-4 overflow-y-auto" style={{ maxHeight: "100px" }}>

                <label className="block mb-1">Categories:</label>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category.id}
                      name={category.id}
                      value={category.id}
                      checked={productData.categories.includes(category.id)}
                      onChange={handleCategoriesChange}
                      className="mr-2"
                    />
                    <label htmlFor={category.id}>{category.category}</label>
                  </div>
                ))}
              </div></div>
             

              <div className="mb-4 ">
                <label htmlFor="link" className="block mb-1">
                  Link:
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={productData.link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rating" className="block mb-1">
                  Rating:
                </label>
                <input
                  type="text"
                  id="rating"
                  name="rating"
                  value={productData.rating}
                  onChange={handleChange}
                  className="w-full px-3 text-black py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-slate-500 rounded-lg focus:outline-none hover:bg-blue-600"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
