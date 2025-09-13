'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Page() {
  const [toggle, setToggle] = useState('account');

  const Buttons = ({ tab, flag }) => {
    return (
      <button
        onClick={() => setToggle(flag)}
        className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-lg ${flag === toggle ? "bg-teal-500 text-white" : " bg-gray-100"}`}
      >
        <span>{tab}</span>
        <span>→</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl flex w-full max-w-7xl">
        
        {/* Left Sidebar */}
        <div className="w-1/3 border-r border-gray-300 p-6 flex flex-col items-center">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-200 mb-4">
            <img
              src="https://vikashalwar.vercel.app/_next/image?url=%2Fhero%2Fdeveloper.png&w=1920&q=75"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Vikash Kumar</h2>
          <p className="text-sm text-gray-500 mb-6">vikash123@gmail.com</p>

          <div className="space-y-3 w-full">
            <Buttons tab={'Account info'} flag={'account'} />
            <Buttons tab={'My order'} flag={'order'} />
            <Buttons tab={'My address'} flag={'address'} />
            <Buttons tab={'Change password'} flag={'password'} />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 p-8">
          <AnimatePresence mode="wait">
            {toggle === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Account Info</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Vikash"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Kumar"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="vikash123@gmail.com"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 0231 4554 452"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition"
                  >
                    SAVE
                  </button>
                </form>
              </motion.div>
            )}

            {toggle === 'order' && (
              <motion.div
                key="order"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">Order #12345</h3>
                      <span className="text-sm text-teal-600">Delivered</span>
                    </div>
                    <p className="text-sm text-gray-600">2x T-shirt, 1x Shoes</p>
                    <p className="text-sm text-gray-500 mt-1">Placed on: 12 Sept 2025</p>
                  </div>
                  <div className="border rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">Order #12346</h3>
                      <span className="text-sm text-yellow-600">Processing</span>
                    </div>
                    <p className="text-sm text-gray-600">1x Jacket</p>
                    <p className="text-sm text-gray-500 mt-1">Placed on: 10 Sept 2025</p>
                  </div>
                </div>
              </motion.div>
            )}

            {toggle === 'address' && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">My Address</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-800">Home Address</h3>
                    <p className="text-sm text-gray-600 mt-1">123 Street, City Center, New York, USA</p>
                    <p className="text-sm text-gray-500 mt-1">Phone: +1 0231 4554 452</p>
                  </div>
                  <div className="border rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-800">Office Address</h3>
                    <p className="text-sm text-gray-600 mt-1">456 Business Park, San Francisco, USA</p>
                    <p className="text-sm text-gray-500 mt-1">Phone: +1 0999 1111 222</p>
                  </div>
                </div>
                <button className="mt-6 px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition">
                  Add New Address
                </button>
              </motion.div>
            )}

            {toggle === 'password' && (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition"
                  >
                    Update Password
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Page;
