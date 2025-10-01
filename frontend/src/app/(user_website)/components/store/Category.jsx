'use client'
import Link from "next/link";
import { useState } from "react";

function Category({ Categories }) {
  const [limit, setlimit] = useState(10)
  return (
    <div className="flex flex-col gap-y-2 bg-[#EEEFF6] rounded-[10px] p-4 md:p-6 w-full md:w-auto">
      <h1 className="text-[16px] md:text-[18px] font-bold uppercase text-center md:text-left">
        categories
      </h1>

      <div className="flex justify-center md:justify-start">
        <Link href={`/store`}>
          <button className="relative cursor-pointer inline-flex items-center justify-start px-6 py-1 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white"> All Categories</span>
          </button>
        </Link>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-x-4 md:gap-x-0 text-center md:text-left">
        {Categories?.slice(0, limit)?.map((Category) => {
          return (
            <Link key={Category._id} href={`/store/${Category.slug}`} >
              <li className="text-[13px] md:text-[14px] flex justify-between items-center my-1 bg-white font-bold py-2 cursor-pointer hover:bg-[#1ABA1A] hover:text-white transition-all duration-300 px-4 md:px-5 rounded-[8px] ">
                <h3>{Category.name}</h3>  <p className="text-[#636363]">( {Category.productCount} )</p>
              </li>
            </Link>
          );
        })}
      </ul>


      <div className="flex ">
        {
          limit == 10 ?
            <button onClick={() => setlimit(Infinity)} className="relative cursor-pointer inline-flex items-center justify-start px-6 py-1 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">View All</span>
            </button>
            :
            <button onClick={() => setlimit(10)} className="relative cursor-pointer inline-flex items-center justify-start px-6 py-1 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Show Less</span>
            </button>
        }

      </div>

    </div>
  );
}

export default Category;
