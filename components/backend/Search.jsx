'use client'
import React, { useState } from "react";

const SearchUser = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex pt-20 text-black justify-center p-0 gap-4 items-center align-middle">
      <input
        className="border p-2 mt-2 hover:border w-[40vw] h-12 shadow-xl shadow-graydark rounded-xl" 
        type="text"
        placeholder="Search Users by email, User ID, name, IP, Refer Code, Country, Iso Code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 text-sm h-12 translate-y-1 rounded-xl shadow-xl shadow-graydark "
      >
        Search
      </button>
    </form>
  );
};

export default SearchUser;

