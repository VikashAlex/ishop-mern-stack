"use client";
import { Edit, Trash2, RefreshCcw, Plus } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { getCategory } from "../../../../../library/api_calls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { TbCategory2 } from "react-icons/tb";
import { Axiosinstance } from "@/app/utils/helper";

export default function CategoryPage() {
  const [category, setCategory] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategory();
      const data = await res.data;
      setCategory(data);
    };
    fetchData();
  }, [flag]);

  const deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axiosinstance.delete(`category/delete/${id}`)
          .then((res) => {
            if (res.status == 201) {
              toast.success(res.data.msg);
              setFlag(!flag);
            }
          })
          .catch((err) => console.log(err));
        Swal.fire("Deleted!", "Category removed successfully.", "success");
      }
    });
  };

  const updateCategory = (id) => {
    Axiosinstance.patch(`category/update/${id}`)
      .then((res) => {
        if (res.status == 201) {
          toast.success(res.data.msg);
          setFlag(!flag);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4 sm:p-8 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Category</h1>
        <Link href="/admin/category/add">
          <button className="flex cursor-pointer items-center justify-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition">
            <Plus className="w-5 h-5" /> Add Category
          </button>
        </Link>
      </div>

      {/* Category List */}
      <div className="overflow-hidden rounded-2xl shadow-md bg-white">
        {category.length === 0 ? (
          // Empty State
          <div className="w-full h-[70vh] flex items-center justify-center p-6">
            <div className="relative w-full max-w-md sm:max-w-xl rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
              <motion.div
                className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              <motion.div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100"
                initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <TbCategory2 className="h-8 w-8 text-blue-600" />
                </motion.span>
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-800">
                No Categories Found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by adding a new category to manage your products easily.
              </p>

              <motion.button
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white shadow-md hover:shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/admin/category/add">+ Add Category</Link>
              </motion.button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((cat, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4 font-medium">{index + 1}</td>
                      <td className="px-6 py-4">
                        <img
                          className="w-[35px] h-[35px] rounded-md object-cover"
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
                          alt={cat.name}
                        />
                      </td>
                      <td className="px-6 py-4">{cat.name}</td>
                      <td className="px-6 py-4">{cat.slug}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-md ${
                            cat.status ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {cat.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => deleteCategory(cat._id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                        <button
                          onClick={() => updateCategory(cat._id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-xs"
                        >
                          <RefreshCcw className="w-4 h-4" /> Update
                        </button>
                        <Link href={`/admin/category/edit/${cat._id}`}>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs">
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden p-4 space-y-4">
              {category.map((cat, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 bg-gray-50 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
                      alt={cat.name}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-500">{cat.slug}</p>
                    </div>
                  </div>
                  <p
                    className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-md ${
                      cat.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {cat.status ? "Active" : "Inactive"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <button
                      onClick={() => updateCategory(cat._id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs"
                    >
                      <RefreshCcw className="w-4 h-4" /> Update
                    </button>
                    <Link href={`/admin/category/edit/${cat._id}`}>
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
