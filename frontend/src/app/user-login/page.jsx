'use client'
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
        {/* Back Button */}
        <button
          onClick={()=>router.push('/')} // yahan apna navigate logic lagao
          className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-teal-600 transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {/* Toggle Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 font-medium transition ${
              isLogin ? "bg-teal-600 text-white" : "text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 font-medium transition ${
              !isLogin ? "bg-teal-600 text-white" : "text-gray-600"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition">
              Login
            </button>
            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-teal-600 cursor-pointer font-medium hover:underline"
              >
                Signup
              </span>
            </p>
          </form>
        ) : (
          /* Signup Form */
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition">
              Signup
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-teal-600 cursor-pointer font-medium hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
