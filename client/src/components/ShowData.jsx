import React, { useState, useEffect } from "react";
import InputField from "./InputField"; 

function ShowData() {
  const [Data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  const [isCollapsed, setIsCollapsed] = useState(true); 

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const sorting = (col) => {
    const sortOrder = order === "ASC" ? "DSC" : "ASC";
    const sortedData = [...Data].sort((a, b) => {
      if (col === "id") {
        return sortOrder === "ASC" ? a[col] - b[col] : b[col] - a[col];
      } else {
        if (typeof a[col] !== "string" || typeof b[col] !== "string") {
          return 0;
        }

        const compareValueA = a[col].toString().toLowerCase();
        const compareValueB = b[col].toString().toLowerCase();

        return sortOrder === "ASC"
          ? compareValueA.localeCompare(compareValueB)
          : compareValueB.localeCompare(compareValueA);
      }
    });

    setData(sortedData);
    setOrder(sortOrder);
  };

  useEffect(() => {
    getData();
  }, []);

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function Cpage(n) {
    setCurrentPage(n);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 items-center">
        <label htmlFor="search" className="mr-2 text-lg font-medium">Search:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 border rounded mr-2 flex-grow" 
        />
        <button
          className="bg-gray-300 p-2 border rounded hover:bg-gray-400 focus:outline-none"
          onClick={() => setIsCollapsed(!isCollapsed)} 
        >
          {isCollapsed ? "Add Record" : "Collapse Form"}
        </button>
      </div>

      <InputField isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> 

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow">
          <thead>
            <tr className="bg-gray-200">
              <th
                onClick={() => sorting("id")}
                className="py-2 px-4 cursor-pointer"
              >
                Sno
              </th>
              <th
                onClick={() => sorting("c_name")}
                className="py-2 px-4 cursor-pointer"
              >
                Customer Name
              </th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Mobile Number</th>
              <th className="py-2 px-4">Address</th>
              <th
                onClick={() => sorting("created_at")}
                className="py-2 px-4 cursor-pointer"
              >
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((data, index) => (
              <tr
                key={data.id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="py-2 px-4">{data.id}</td>
                <td className="py-2 px-4">{data.c_name}</td>
                <td className="py-2 px-4">{data.age}</td>
                <td className="py-2 px-4">{data.phone}</td>
                <td className="py-2 px-4">{data.loc}</td>
                <td className="py-2 px-4">{data.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="flex justify-center my-4">
        <ul className="flex space-x-2">
          <li>
            <a
              href="#"
              onClick={prePage}
              className="px-3 py-1 bg-gray-200 rounded-md cursor-pointer"
            >
              Prev
            </a>
          </li>

          {number.map((n, i) => (
            <li key={i}>
              <a
                href="#"
                onClick={() => Cpage(n)}
                className={`px-3 py-1 rounded-md cursor-pointer ${
                  currentPage === n ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {n}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              onClick={nextPage}
              className="px-3 py-1 bg-gray-200 rounded-md cursor-pointer"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default ShowData;
