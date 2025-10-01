"use client";
import { Edit, Trash2, RefreshCcw, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { getColors } from "../../../../../library/api_calls";
import { Axiosinstance } from "@/app/utils/helper";
import EditCompo from "../../components/EditCompo";
import Swal from "sweetalert2";

export default function ProductsPage() {
  const [Colors, setColors] = useState([]);
  const [editflag, setEditflag] = useState(false)
  const [id, setID] = useState(null)
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getColors();
      setColors(res);
    };
    fetchData();
  }, [flag]);

  const updateColors = async (id) => {
    const res = await Axiosinstance.patch(`color/update/${id}`);
    if (res.status == 201) {
      toast.success(res.data.msg)
      setFlag(!flag)
    }
    else if (res.status == 301) {
      toast.info(res.data.msg)
    }
    else {
      toast.info(res.data.msg)
    }
  }
  const deleteColors = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        const res = await Axiosinstance.delete(`color/delete/${id}`);
        if (res.status == 201) {
          toast.success(res.data.msg)
          setFlag(!flag)
        } else if (res.status == 301) {
          toast.info(res.data.msg)
        } else {
          toast.info(res.data.msg)
        }
      }
    });
  }

  const handel = (id) => {
    setEditflag(true)
    setID(id)
  }
  return (
    <div className="p-8 w-full bg-gray-50 min-h-screen relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Colors</h1>
        <Link href="/admin/color/add">
          <button className="flex cursor-pointer items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition">
            <Plus className="w-5 h-5" /> Add colors
          </button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl shadow-md bg-white">
        {Colors.length == 0 ? (
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

                </motion.span>
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-800">
                Colors not available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No Colors has been created yet. Start by adding a new
                Colors.
              </p>

              <motion.button
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white shadow-md hover:shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/admin/color/add">+ Add Colors</Link>
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
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Colors</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Satus</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Colors.map((Colors, index) => (
                <tr
                  key={index + 1}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>

                  <td className="px-6 py-4">{Colors.name}</td>
                  <td className="px-6 py-4">
                    <div className="w-[40px] h-[40px] border border-gray-300 rounded-full" style={{ backgroundColor: Colors.hexacode }}></div>
                  </td>
                  <td className="px-6 py-4">{Colors.slug}</td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-white rounded-lg text-center ${Colors.status ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {Colors.status ? "Active" : "Inactive"}
                    </p>
                  </td>

                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => deleteColors(Colors._id)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <button onClick={() => updateColors(Colors._id)} className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-xs">
                      <RefreshCcw className="w-4 h-4" /> Update
                    </button>

                    <button
                      onClick={() => handel(Colors._id)}
                      className=" cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs">
                      <Edit className="w-4 h-4" /> Edit
                    </button>

                    <AnimatePresence>
                      {editflag && (
                        <motion.section
                          initial={{ opacity: 0, y: "100%" }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: "100%" }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute top-0 left-0 h-full w-full bg-white shadow-2xl p-6"
                        >
                          <EditCompo id={id} setEditflag={setEditflag} setFlag={setFlag} flag={flag} />
                        </motion.section>
                      )}
                    </AnimatePresence>

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
