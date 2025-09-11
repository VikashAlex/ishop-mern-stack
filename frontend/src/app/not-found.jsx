"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <motion.div
        className="text-center p-8 rounded-2xl shadow-lg bg-gray-900 border border-gray-800 max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <AlertTriangle className="w-20 h-20 text-red-500" />
        </motion.div>

        <h1 className="text-6xl font-extrabold mt-6">404</h1>
        <p className="mt-4 text-lg text-gray-400">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-md text-white font-medium hover:opacity-90 transition-all"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
