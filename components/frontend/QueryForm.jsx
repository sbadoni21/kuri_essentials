"use client"
import React, { useState } from 'react';
import { db } from '../../firebase/firebase'; 
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const QueryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQueryRef = await addDoc(collection(db, "queries"), {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      console.log("Query added successfully with ID: ", newQueryRef.id);
  
      await updateDoc(doc(db, "queries", newQueryRef.id), {
        id: newQueryRef.id
      });
  

      console.log("Query added successfully!");
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding query: ", error);
    }
  };

  return (
    <div className='flex-col  md:flex-row flex-1 justify-evenly  bg-gradient-to-t from-black from-10% to-bgmain to-95%  items-center pt-40 pb-40 text-white'>
      <div>
        <h3 className="text-4xl md:text-9xl pl-6 allura ">Contact Us</h3>
      </div>
      <div className="flex    flex-col items-center justify-center text-black">
        {submitted ? (
          <div className=" flex-col text-center">
            <h3 className="text-3xl font-bold mb-4">Thank you for your message!</h3>
            <p>We ll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full text-lg max-w-lg bg-white p-3 md:p-20 rounded-3xl allura">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-96 px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1">Message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-t from-black from-10% to-bgmain to-95%  py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QueryForm;
