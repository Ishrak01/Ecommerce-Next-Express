"use client";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";

import { useState } from "react";

import { userLoggedIn } from "../redux/features/auth/authSlice";
import UserDetails from "./UserDetails";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Check if localStorage is defined
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Use localStorage only if it's available
  const token = isLocalStorageAvailable ? localStorage.getItem("auth") : null;
  const authData = isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem("auth"))
    : null;
  const userRole = authData && authData.user ? authData.user.role : null;
  dispatch(userLoggedIn());

  const logout = () => {
    localStorage.removeItem("auth");

  };


  // Retrieve cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.length;

  return (
    <div className=" p-2 border rounded-md  z-10  font-extrabold bg-red-500 text-[#FFFFFF] sticky top-0">
      <div className="flex mx-[80px] justify-between items-center  gap-4 font-extrabold ">
        <Link href="/">Ecommerce</Link>

        <div className="text-black ">
          <Search />
        </div>

        <div>
          {token ? (
            <UserDetails />
          ) : (
            <div className="flex gap-5 ">

              <Link href="/customer/registration">
                <h1>Register</h1>
              </Link>
              <Link href="/customer/Login" >
                <h1>Login</h1>
              </Link>



            </div>
          )}
        </div>


        <div>
          <Link href="/customer/cart">
            <FaCartPlus className="h-6 w-8" />
          </Link>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </div>

        {userRole === "admin" && (
          <Link href="/adminView" className="text-blue-600 hover:underline">
            Admin Panel
          </Link>
        )}




      </div>



    </div>
  );
};

export default Navbar;
