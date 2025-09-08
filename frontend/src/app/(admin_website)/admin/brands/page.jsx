"use client";
import { Edit, Trash2, RefreshCcw, Plus } from "lucide-react";
import Link from "next/link";
import { getBrands } from "../../../../../library/api_calls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { TbCategory2 } from "react-icons/tb";
import { Axiosinstance } from "@/app/utils/helper";
import Swal from "sweetalert2";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBrands();
      const data = await res.data;
      setBrands(data);
    };
    fetchData();
  }, [flag]);

  const deleteBrands = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        Axiosinstance
          .delete(`brands/delete/${id}`)
          .then((res) => {
            if (res.status == 201) {
              toast.success(res.data.msg);
              setFlag(!flag);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const updateBrands = (id) => {
    Axiosinstance
      .patch(`brands/update/${id}`)
      .then((res) => {
        if (res.status == 201) {
          toast.success(res.data.msg);
          setFlag(!flag);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-8 w-full bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Brands</h1>
        <Link href="/admin/brands/add">
          <button className="flex cursor-pointer items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition">
            <Plus className="w-5 h-5" /> Add Brands
          </button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl shadow-md bg-white">
        {brands.length == 0 ? (
          <div className="w-full h-[70vh] flex items-center justify-center">
            <div className="relative w-full max-w-xl rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
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
                Brands not available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No Brands has been created yet. Start by adding a new
                Brands.
              </p>

              <motion.button
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white shadow-md hover:shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/admin/brands/add">+ Add Brands</Link>
              </motion.button>
              <motion.div
                className="absolute right-6 top-6 h-2 w-2 rounded-full bg-blue-500"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <motion.div
                className="absolute left-8 bottom-6 h-2 w-2 rounded-full bg-indigo-500"
                animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              />
            </div>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Logo</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Brands</th>
                <th className="px-6 py-3">Satus</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brands, index) => (
                <tr
                  key={index + 1}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      className="w-[30px]"
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${brands.logo}`} alt={brands.logo} />
                  </td>
                  <td className="px-6 py-4">{brands.name}</td>
                  <td className="px-6 py-4">{brands.slug}</td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-white rounded-lg text-center ${brands.status ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {brands.status ? "Active" : "Inactive"}
                    </p>
                  </td>

                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => deleteBrands(brands._id)}
                      className="flex items-center gap-1 px-3 cursor-pointer py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <button onClick={() => updateBrands(brands._id)} className="flex cursor-pointer items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-xs">
                      <RefreshCcw className="w-4 h-4" /> Update
                    </button>
                    <Link href={`/admin/brands/edit/${brands._id}`}>
                      <button className="flex items-center gap-1 px-3 cursor-pointer py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
