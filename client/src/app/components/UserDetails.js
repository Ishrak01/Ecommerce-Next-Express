"use client"
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";



const Dropdown = () => {
  const router=useRouter()

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  let userName = null;

  // Check if "auth" exists in localStorage
  const authData = localStorage.getItem("auth");
  if (authData) {
    // Parse the JSON only if "auth" is not null
    const auth = JSON.parse(authData);
    // Check if "user" property exists
    if (auth && auth.user && auth.user.name) {
      const userNameArray = auth.user.name.split(" ");
      userName = userNameArray[0];
    }
  }
  

  const logout = () => {
    localStorage.removeItem("auth");
    router.push("/customer/Login")
   
  };

  return (
    
    <div className="relative flex items-center  text-left space-x-4">
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
          id="options-menu"
          onClick={toggleDropdown}
        >
       Hi,{userName}
        </button>
      </div>

      {isOpen && (
        <div className=" absolute top-10  mt-5 w-55 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-[50px]"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
          
            <Link
              href={`/customer/Profile/`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </Link>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </a>
            <button
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
          
        </div>
      )}
      <div>
            <Link href="/customer/cart">
              <FaCartPlus className="h-6 w-8" />
            </Link>
          </div>
    </div>
   
  );
};

export default Dropdown;