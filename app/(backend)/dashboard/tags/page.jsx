"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const Page = () => {
  const [tags, setTags] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);


    const fetchTags = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tags"));
        const tagsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          tag: doc.data().tag,
        }));
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    useEffect(() => {
    fetchTags();
  }, []);

  const addTag = async (tagName) => {
    try {
      const docRef = await addDoc(collection(db, "tags"), { 
        tag: tagName 
      });
      await updateDoc(docRef, { id: docRef.id });
      fetchTags();
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const confirmDelete = (tagId) => {
    setDeleteConfirmation(tagId);
  };

  const deleteTag = async (tagId) => {
    try {
      await deleteDoc(doc(db, "tags", tagId));
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
      setDeleteConfirmation(null);
      console.log("Tag deleted successfully!");
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className="container  p-20 text-primary">
      <h2 className="text-5xl font-bold mb-6 allura">All Tags</h2>
      <div className="flex justify-end mt-4">
        <input 
          type="text" 
          placeholder="Enter tag name" 
          className="py-2 px-4 mr-4 w-64 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          id="tagInput"
        />
        <button 
          onClick={() => addTag(document.getElementById("tagInput").value)} 
          className="bg-blue-500 hover:bg-blue-700 text-slate font-bold py-2 px-4    rounded bg-primary"
        >
          Add New Tag
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 text-gray-600 mt-10 " >
        {tags.map((tag) => (
          <div key={tag.id} className="bg-primary p-4 rounded-lg flex justify-between items-center">
            <span className="text-lg">{tag.tag}</span>
            <button 
              onClick={() => confirmDelete(tag.id)} 
              className="text-red-600 hover:text-red-800"
            >
              &#10006;
            </button>
          </div>
        ))}
      </div>
      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-primary text-gray-500 p-4 rounded-lg">
            <p className="text-lg">Are you sure you want to delete this tag?</p>
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => deleteTag(deleteConfirmation)} 
                className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
              >
                Yes
              </button>
              <button 
                onClick={() => setDeleteConfirmation(null)} 
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
    </div>
  );
};

export default Page;
