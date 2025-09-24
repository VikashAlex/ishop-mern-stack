"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import TopPart from "./TopPart";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { lsCartItem } from "@/app/redux/features/cartSlice";
import { ShoppingCart } from "lucide-react";
import { lsUserData } from "@/app/redux/features/userSlice";

const Links = [
  { path: "/", name: "Home" },
  { path: "/pages", name: "Pages" },
  { path: "/store", name: "Store" },
  { path: "/contact", name: "Contact" },
  { path: "/profile", name: "My Profile" },
];

function Nav() {
  const cartitems = useSelector((state) => state.cart);
  const user = useSelector((state)=>state.user.userDetails)
  const [open, setOpen] = useState(false);
  const dispatcher = useDispatch()
  const { items, finalPrice_Total } = cartitems;
  useEffect(() => {
    dispatcher(lsCartItem())
    dispatcher(lsUserData())
  }, [dispatcher])

  
  return (
    <div className="p-4 bg-white flex flex-col gap-y-8 pb-6  relative z-50">
      <TopPart />

      {/* Navbar */}
      <nav className="flex justify-between items-center">
        {/* Left part */}
        <div className="flex flex-1  items-center gap-x-10 ">
          <Logo />

          {/* Desktop Links */}
          <div className="hidden md:flex   flex-1 justify-center  items-center text-base gap-x-6 ">
            {Links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                className="font-semibold hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right part (Desktop only) */}
        <div className="hidden md:flex gap-x-6 items-center ">
          <div className="flex gap-x-3">
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6] flex justify-center items-center">
              <CiHeart />
            </button>
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
          </div>

          <div className="flex flex-col text-[12px] uppercase gap-y-0">
            <p>welcome</p>
            {
              user
              ?
              <h1 className="font-bold text-center">{user.name}</h1>
              :
              <Link href={'/user-login?rfe=/'}>
              <h1 className="font-bold">log in / Register</h1>
              </Link>
            }
          </div>

          <Link href={"/cart"}>
            <div className="flex items-center gap-x-3 bg-white rounded-full px-4 py-2  hover:shadow-lg transition duration-300 cursor-pointer">
              {/* Cart Icon + Badge */}
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#1ABA1A]" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1ABA1A] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                    {items.length}
                  </span>
                )}
              </div>

              {/* Cart Info */}
              <div className="flex flex-col text-[12px] uppercase leading-tight">
                <span className="text-gray-500">Cart</span>
                <span className="font-bold text-gray-800">${finalPrice_Total || 0}</span>
              </div>
            </div>
          </Link>

        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)} className="text-2xl">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-6 flex flex-col gap-y-6 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo + Close Btn */}
        <div className="flex justify-between items-center mb-4">
          <Logo />
          <button onClick={() => setOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-y-4">
          {Links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* User + Cart (Mobile) */}
        <div className="mt-auto">
          <div className="flex gap-x-3 items-center mb-4">
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6] flex justify-center items-center">
              <CiHeart />
            </button>
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
          </div>

          <div className="flex flex-col text-[12px] uppercase mb-4">
            <p>welcome</p>
            <h1 className="font-bold">log in / Register</h1>
          </div>

          <div className="flex gap-x-3 items-center">
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
            <div className="flex flex-col text-[12px] uppercase">
              <p>cart</p>
              <h1 className="font-bold">$1,689.00</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
