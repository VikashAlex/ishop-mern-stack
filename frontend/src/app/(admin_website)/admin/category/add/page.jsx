"use client";
import { Axiosinstance, getCokies, helper } from "@/app/utils/helper";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from 'react-toastify';


function page() {
  const router = useRouter();
  const token = getCokies('admin_token')
  const nameRfe = useRef(null);
  const slugRfe = useRef(null);
  const statusRfe = useRef(null);
  const imgRfe = useRef(null);
  const formHandler = (e) => {
    e.preventDefault();
    const name = nameRfe.current.value;
    const slug = slugRfe.current.value;
    const status = statusRfe.current.checked;
    const image = imgRfe.current.files[0];
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("status", status);
    formData.append("image", image);
    Axiosinstance.post("category/create", formData, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      if (res.status == 201) {
        toast.success(res.data.msg)
        setTimeout(() => {
          router.push('/admin/category');
        }, 5000);
      }
    }).catch((err) => {
      if (err.response.status == 301) {
        toast.warning(err.response.data.msg)
      }
      else {
        toast.warning(err.response.data.msg)
      }
    });
  };
  const createSlug = () => {
    const slug = helper(nameRfe.current.value);
    slugRfe.current.value = slug;
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4 sm:p-6 w-full">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Add New Category
            </h1>
          </div>
          <Link href="/admin/category">
            <button className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base hover:bg-gray-100 transition">
              Back
            </button>
          </Link>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={formHandler}>
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category Name
            </label>
            <input
              type="text"
              required
              ref={nameRfe}
              onChange={createSlug}
              placeholder="Enter category name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Slug
            </label>
            <input
              type="text"
              ref={slugRfe}
              required
              placeholder="Auto-generated or enter manually"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category Image
            </label>
            <label
              htmlFor="categoryImage"
              className="flex flex-col items-center justify-center w-full h-36 sm:h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-center px-3"
            >
              <span className="text-gray-600 text-sm font-medium">
                Tap to upload or drag & drop
              </span>
              <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</span>
              <input
                id="categoryImage"
                type="file"
                accept="image/*"
                name="image"
                ref={imgRfe}
                className="hidden"
              />
            </label>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-600">
              Active Status
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary scale-90 sm:scale-100"
              ref={statusRfe}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Link href="/admin/category">
              <button
                type="button"
                className="cursor-pointer px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="cursor-pointer px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition w-full sm:w-auto"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>


  );
}

export default page;
