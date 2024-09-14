"use client";
import React, { useState } from "react";
import SearchUser from "./Search";
import Space16 from "./Space16";

const DashboardTable = ({ columns, data, entriesPerPageDefault }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(entriesPerPageDefault);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full mx-auto bg-black text-white rounded-3xl ">
      <SearchUser onSearch={setSearchTerm} />

      <div>
        <table className="w-full border-none mt-8">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="font-mono text-sm">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-2 font-light text-sm pl-16">
                    {entry[column.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Space16 />
        <Space16 />
      </div>
      <div className="mt-2 flex justify-center items-center ">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-2 bg-green-500 text-white border rounded-lg  ${
              currentPage === index + 1 ? "bg-green-800" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Space16 />
      <Space16 />
    </div>
  );
};

export default DashboardTable;
