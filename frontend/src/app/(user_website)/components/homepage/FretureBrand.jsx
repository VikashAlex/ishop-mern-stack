'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function FretureBrand({ Brands, Categories }) {
  const [brandLimit, setBrandLimit] = useState(5)
  const [cateLimit, setCateLimit] = useState(5)

  const router = useRouter()
  const [selBrand, setSelBrand] = useState(null);
  useEffect(() => {
    const brand = new URLSearchParams({ brand: selBrand });
    if (selBrand) {
      router.push(`/store?${brand.toString()}`);

    }
  }, [selBrand])

  return (
    <div className="flex gap-x-5 my-3 px-4">
      <div className=" bg-white p-4 rounded-[10px] flex-1/2  ">
        <h1 className="text-[18px] font-bold flex uppercase justify-between mb-5">
          featured brands{" "}
          {
            brandLimit <= 5 ?
              <span onClick={() => setBrandLimit(Infinity)} className="cursor-pointer text-[13px] font-normal capitalize text-[#666666]">
                View All
              </span>
              :
              <span onClick={() => setBrandLimit(5)} className="cursor-pointer text-[13px] font-normal capitalize text-[#666666]">
                Show less
              </span>
          }
        </h1>
        <div className="grid grid-cols-5 items-center justify-items-center gap-3 ">
          {Brands?.slice(0, brandLimit).map((item) => {
            return (
              <img
                onClick={() => setSelBrand(item.slug)}
                key={item._id}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${item.logo}`}
                width={70}
                height={100}
                style={{ height: "auto" }}
                alt={`image${item.name}`}
              />
            );
          })}
        </div>
      </div>

      <div className=" bg-white p-4 rounded-[10px] flex-1/2 ">
        <h1 className="text-[18px] font-bold flex uppercase justify-between mb-5">
          top categories
          {
            cateLimit <= 5 ?
              <span onClick={() => setCateLimit(Infinity)} className="cursor-pointer text-[13px] font-normal capitalize text-[#666666]">
                View All
              </span>
              :
              <span onClick={() => setCateLimit(5)} className="cursor-pointer text-[13px] font-normal capitalize text-[#666666]">
                Show less
              </span>
          }
        </h1>
        <div className="grid grid-cols-5 items-center justify-items-center gap-3">
          {Categories?.slice(0, cateLimit).map((item) => {
            return (
              <div key={item._id} className="flex flex-col items-center justify-center" >
                <Link href={`/store/${item.slug}`} >
                  <div className="w-[70px] h-[70px] flex  justify-center items-center">
                    <img
                      className="rounded-full h-full w-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${item.image}`}
                      alt={item.name}

                    />
                  </div>
                </Link>
                <p className="mt-2 text-[12px] text-center">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FretureBrand;
