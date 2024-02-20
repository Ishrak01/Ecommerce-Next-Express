"use client"
import Link from "next/link";
import { useState } from "react";
import { useSearchProductMutation } from "../redux/features/admin/adminApi";

const SearchBar = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchProduct, { data: searchResults }] = useSearchProductMutation();
  const [open,setOpen]=useState(false)

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    // Trigger the search when the user clicks the search button
    searchProduct({ "query": inputQuery.trim() });
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
    setInputQuery("");
  };

  const handleOnChange=(input)=>{
    setInputQuery(input);
    searchProduct({ "query": inputQuery.trim() });
    setOpen(true);
  }

  return (
    <div className="w-full  md:w-[800px] mx-auto">
      <form onSubmit={handleSearch} className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
           
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-15 p-2.5 "
            placeholder="Search"
            value={inputQuery}
            onChange={(e) => handleOnChange(e.target.value)}
            required
          />
        </div>
        
      </form>
{/* Display search results in a modal */}
 {/* Display search results in a modal */}
 {open && searchResults && (
        
        <div className="absolute top-full left-0  mt-2 bg-teal-400 w-full border border-gray-300 rounded-lg shadow-md p-4">
        <button onClick={handleClose} className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <ul>
          {searchResults.map((product) => (
            <Link key={product._id} href={`/customer/singleProduct/${product._id}`}>
            <li onClick={handleClose} key={product.id}>{product.name}</li>
            </Link>
          ))}
        </ul>
      </div>
     
    )}
  </div>
  );
};

export default SearchBar;
