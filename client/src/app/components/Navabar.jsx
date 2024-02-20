"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import Search from "../components/Search";

import { useState } from "react";
import logo from "../components/logo.svg";

import { useDispatch } from "react-redux";
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
    //dispatch(userLoggedOut());
  };

  return (
    <div className="flex h-14 justify-between items-center z-10 py-3 px-8 font-extrabold bg-pink-700 text-[#FFFFFF] sticky top-0">
      <div className="flex  md:flex-row items-center justify-between gap-4 font-extrabold relative">
        {!token ? (
          <button onClick={toggleDropdown} className="block md:hidden">
            <TiThMenu />
          </button>
        ) : (
          <div></div>
        )}

        {isDropdownOpen && (
          <div className="relative w-full flex flex-col bg-blue-700 p-4  md:block">
            <Link href="/customer/registration">Register</Link>
            <Link href="/customer/Login">Login</Link>
          </div>
        )}

        <Link href="/">
          <Image src={logo} alt="Logo" />{" "}
        </Link>
      </div>

      <div className="text-black items-center">
        <Search />
      </div>

      {userRole === "admin" && (
        <Link href="/adminView" className="text-blue-600 hover:underline">
          Admin Panel
        </Link>
      )}

      {token ? (
        <UserDetails />
      ) : (
        <div className="flex gap-5 justify-around">
          {/* Displayed on larger screens */}
          <Link href="/customer/registration" className="hidden md:block">
            <h1>Register</h1>
          </Link>
          <Link href="/customer/Login" className="hidden md:block">
            <h1>Login</h1>
          </Link>

          {/* Always displayed, regardless of screen size */}
          <div>
            <Link href="/customer/cart">
              <FaCartPlus className="h-6 w-8" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
