'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ColorFillter from "./ColorFillter";

const brands = [
  {
    brand: "/fillter/brand1.png",
    alt: "brand1",
    count: "(14)",
  },
  {
    brand: "/fillter/brand2.png",
    alt: "brand3",
    count: "(6)",
  },
  {
    brand: "/fillter/brand3.png",
    alt: "brand3",
    count: "(7)",
  },
  {
    brand: "/fillter/brand4.png",
    alt: "brand4",
    count: "(18)",
  },
  {
    brand: "/fillter/brand5.png",
    alt: "brand5",
    count: "(1)",
  },
];
const memory = [
  {
    memory: "12GB",
    count: "(4)",
  },
  {
    memory: "8GB",
    count: "(3)",
  },
  {
    memory: "6GB",
    count: "(12)",
  },
  {
    memory: "4GB",
    count: "(6)",
  },
  {
    memory: "3GB",
    count: "(7)",
  },
  {
    memory: "1.5GB",
    count: "(1)",
  },
  {
    memory: "1GB",
    count: "(4)",
  },
  {
    memory: "512MB",
    count: "(4)",
  },
];

const conditions = [
  {
    condi: "New",
    count: "(21)",
  },
  {
    condi: "Like New",
    count: "(3)",
  },
  {
    condi: "Open Box",
    count: "(30)",
  },
]
function Fillter({ Brands, Colors }) {
  const router = useRouter()
  const [selBrand, setSelBrand] = useState(null);
  useEffect(() => {
    const brand = new URLSearchParams({ brand: selBrand });
    if (selBrand) {
      router.push(`/store?${brand.toString()}`);
      
    }
  }, [selBrand])

  return (
    <div className="flex flex-col gap-y-2 bg-[#EEEFF6] rounded-[10px] p-4 md:p-6 w-full md:w-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[16px] md:text-[18px] font-bold uppercase">
          categories
        </h1>
        <p className="text-[12px] md:text-[14px] cursor-pointer">Reset All</p>
      </div>

      {/* Selected Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2 mb-5">
        <div className="bg-white px-2 md:px-3 py-1 rounded-[10px] text-[11px] md:text-[12px]">
          Min: $45.00
        </div>
        <div className="bg-white px-2 md:px-3 py-1 rounded-[10px] text-[11px] md:text-[12px]">
          10.9 inch
        </div>
        <div className="bg-white px-2 md:px-3 py-1 rounded-[10px] text-[11px] md:text-[12px]">
          Color: Red
        </div>
        <div className="bg-white px-2 md:px-3 py-1 rounded-[10px] text-[11px] md:text-[12px]">
          128GB
        </div>
      </div>

      {/* By Brands */}
      <div className="mb-2 border-b border-gray-300 pb-5">
        <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Brands</h3>
        <input
          type="text"
          className="w-full border-[#EEEFF6] border rounded-[5px] mb-4 bg-white py-2 outline-0 px-3 text-[13px]"
          placeholder="Search brands..."
        />
        <div>
          {Brands.map((item) => (
            <div key={item._id} className="mb-1 flex justify-between items-center">
              <label onClick={() => setSelBrand(item.slug)} className="inline-flex items-center gap-x-2 my-1">
                <input type="radio" name="brand" />
                <div className=" rounded-[5px] py-[1px] px-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${item.logo}`}
                    alt={item.name}
                    width={30}
                    height={20}
                  />
                </div>
                <p className="text-[#686868] text-[18px] font-semibold md:text-sm">{item.name}</p>
                <p className="text-[#636363]">( {item.productCount} )</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* By Price */}
      <div className="mb-2 border-b border-gray-300 pb-5">
        <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Price</h3>
        <div className="flex items-center mb-4">
          <div className="w-[10px] h-[10px] bg-[#1ABA1A] rounded-full"></div>
          <div className="flex-1 h-[3px] bg-[#1ABA1A]"></div>
          <div className="w-[10px] h-[10px] bg-[#1ABA1A] rounded-full"></div>
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <input
            className="py-2 px-2 bg-white rounded-[5px] w-[50px] outline-0 font-bold text-[12px]"
            placeholder="$ 0"
          />
          <div>-</div>
          <input
            className="py-2 px-2 bg-white rounded-[5px] w-[80px] md:w-[100px] outline-0 font-bold text-[12px]"
            placeholder="$ 1000"
          />
          <div className="bg-[#1ABA1A] py-2 px-3 rounded-[5px] text-white text-[12px] cursor-pointer">
            GO
          </div>
        </div>
      </div>

      {/* By Rating */}
      <div className="mb-2 border-b border-gray-300 pb-5">
        <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Rating</h3>
        <div>
          {brands.slice(0, 4).map((item, index) => (
            <div key={index} className="mb-1">
              <label className="inline-flex items-center gap-x-1">
                <input type="checkbox" />
                <div className="w-[50px] md:w-[60px] rounded-[5px] py-[1px] px-2"></div>
                <p className="text-[#888888] text-xs md:text-sm">{item.count}</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* By Screen Size */}
      <div className="mb-2 border-b border-gray-300 pb-5">
        <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Screen Size</h3>
        <div className="flex flex-wrap gap-2 mb-5">
          {["7” & Under", "7.1” - 8.9”", "9” - 10.9”", "11” & Greater"].map(
            (size, i) => (
              <div
                key={i}
                className="bg-white py-1 px-2 text-center rounded-[10px] text-[12px] md:text-[14px]"
              >
                {size}
              </div>
            )
          )}
        </div>
      </div>

      {/* By Color */}
     <ColorFillter Colors={Colors}/>

      {/* By Memory */}
      <div className="mb-2 border-b border-gray-300 pb-5">
        <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Memory</h3>
        <div className="grid grid-cols-2 gap-y-3">
          {memory.map((item, index) => (
            <div key={index}>
              <label className="flex items-center gap-x-2 text-[12px] md:text-[14px]">
                <input type="checkbox" />
                <span>{item.memory}</span>
                <p className="text-[#888888]">{item.count}</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* By Conditions */}
      <div className="border-b border-gray-300 pb-5">
        <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Conditions</h3>
        <div className="grid grid-cols-1 gap-y-3">
          {conditions.map((item, index) => (
            <div key={index}>
              <label className="flex items-center gap-x-2 text-[12px] md:text-[14px]">
                <input type="checkbox" />
                <span>{item.condi}</span>
                <p className="text-[#888888] text-xs md:text-sm">{item.count}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default Fillter;
