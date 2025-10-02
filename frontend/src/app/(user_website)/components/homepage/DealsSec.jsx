'use client'
import React, { useEffect, useState } from "react";
import HomeTab from "./HomeTab";
import Slider from "./Slider";
import Link from "next/link";



function DealsSec({ producte }) {
  const [product, setProduct] = useState(null)
  useEffect(() => {
    const randIndex = Math.floor(Math.random() * producte.length);
    setProduct(producte[randIndex])
  }, [producte])


  return (
    <div className="px-4">
      <div className="flex gap-x-5">
        <div className="w-[971px] ">
          <div className="bg-[#01A49E] uppercase text-white rounded-[10px] text-[18px] font-bold py-3 pl-6 ">
            Deals of the day
          </div>

          {
            product ?
              <div className=" bg-white h-full rounded-[10px] flex px-6 py-5">
                {/* Left Side Images */}
                <div className="flex-1/2 flex p-5">
                  <div className="w-[30px] flex flex-col justify-items-start gap-y-5">
                    {product?.images?.map((img, i) => (
                      <img
                        key={i}
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img}`}
                        width={100}
                        height={100}
                        className="rounded-[10px]"
                        alt={`${product?.name}-${i}`}
                      />
                    ))}
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center ">
                    <div className="flex justify-end w-full">
                      <div className="bg-[#EBEDF3] w-[30px] h-[30px] rounded-full"></div>
                    </div>
                    <div>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product?.thumbnail}`}
                        width={200}
                        height={200}
                        alt={product?.name}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side Info */}
                <div className="flex-1/2 px-5">
                  <p className="text-[#666] text-center mb-1">({product?.colors?.length})</p>

                  <h1 className="font-bold text-[16px] mb-2">{product?.name}</h1>

                  <div className="flex items-center gap-x-3 mb-2">
                    <h1 className="font-bold text-[#01A49E]">
                      ₹{product?.finalPrice?.toLocaleString()}
                    </h1>
                    <p className="line-through text-[#666666]">
                      ₹{product?.originalPrice?.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className="text-[12px] mb-4"

                  >

                    {product?.shortDescription}
                  </div>

                  <div className="flex gap-x-3 items-center mb-5">
                    <div className="text-[#01A49E] rounded-[6px] bg-gray-200 text-[12px] py-1 px-3 uppercase font-bold ">
                      free shipping
                    </div>
                    <div className="text-[#01A49E] rounded-[6px] bg-gray-200 text-[12px] py-1 px-3 uppercase font-bold ">
                      free gift
                    </div>
                  </div>

                  {/* Fake countdown */}
                  <div className="flex gap-x-3 items-center py-3 border-b border-[#EBEDF3]">
                    <div className="w-[100px] text-sm font-bold">
                      hurry up! Promotion will expires in
                    </div>
                    <div className="px-6 flex-1 flex justify-between ">
                      <div className="w-[55px] h-[74px] rounded-[6px] bg-[#EBEDF3] flex justify-center items-center font-bold">
                        -01
                      </div>
                      <div className="w-[55px] h-[74px] rounded-[6px] bg-[#EBEDF3] flex justify-center items-center font-bold">
                        -12
                      </div>
                      <div className="w-[55px] h-[74px] rounded-[6px] bg-[#EBEDF3] flex justify-center items-center font-bold">
                        -45
                      </div>
                      <div className="w-[55px] h-[74px] rounded-[6px] bg-[#EBEDF3] flex justify-center items-center font-bold">
                        -09
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="my-5">
                    <div className="h-[10px] bg-[#E2E4EB] rounded-[10px] mb-2">
                      <div
                        className="bg-[#01A49E] h-full rounded-[10px]"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                    <p>
                      Sold: <span className="font-bold">26/75</span>
                    </p>
                  </div>
                  <div className="my-3">
                    <Link href={`/product/${product._id}`}>
                      <button className="btn btn-outline px-3 py-1 rounded-2xl cursor-pointer bg-[#EBEDF3] border transition-all duration-300 hover:bg-[#01A49E] hover:text-white border-[#01A49E] text-[#01A49E]">Buy Now</button>
                    </Link>
                  </div>
                </div>
              </div>
              :

              <div className="bg-white rounded-[10px] flex px-6 py-5">
                {/* Left Side Images */}
                <div className="flex-1/2 flex p-5">
                  <div className="w-[30px] flex flex-col gap-y-5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-[50px] h-[50px] bg-gray-200 rounded-md animate-pulse"
                      ></div>
                    ))}
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="flex justify-end w-full">
                      <div className="bg-gray-200 animate-pulse w-[30px] h-[30px] rounded-full"></div>
                    </div>
                    <div className="mt-4">
                      <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse rounded-md"></div>
                    </div>
                  </div>
                </div>

                {/* Right Side Info */}
                <div className="flex-1/2 px-5">
                  <div className="w-16 h-4 bg-gray-200 animate-pulse mx-auto mb-2 rounded"></div>
                  <div className="h-5 bg-gray-200 animate-pulse w-3/4 mb-2 rounded"></div>
                  <div className="flex gap-x-3 mb-2">
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 animate-pulse w-full mb-4 rounded"></div>

                  <div className="flex gap-x-3 items-center mb-5">
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </div>

                  {/* Countdown Dummy */}
                  <div className="flex gap-x-3 items-center py-3 border-b border-[#EBEDF3]">
                    <div className="w-[100px] h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="px-6 flex-1 flex justify-between gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-[55px] h-[74px] bg-gray-200 animate-pulse rounded"
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar Dummy */}
                  <div className="my-5">
                    <div className="h-[10px] bg-gray-200 rounded-[10px] mb-2 animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
          }

        </div>



        {/* right  */}
        <div className="flex flex-col gap-y-3 w-[200px] flex-1 ">
          <Slider img1={'bg-[url("/homeimg/img15.png")]'} img2={'bg-[url("/homeimg/img16.png")]'} img3={'bg-[url("/homeimg/img17.png")]'} />
          <Slider img1={'bg-[url("/homeimg/img16.png")]'} img2={'bg-[url("/homeimg/img15.png")]'} img3={'bg-[url("/homeimg/img17.png")]'} />
          <Slider img1={'bg-[url("/homeimg/img16.png")]'} img2={'bg-[url("/homeimg/img17.png")]'} img3={'bg-[url("/homeimg/img15.png")]'} />
        </div>

      </div>


      {/* miidle section */}
      <div>
        <div className="bg-[#01A49E] rounded-[20px] h-[140px] relative overflow-hidden text-white flex justify-around items-center">
          <div className="absolute h-[400px] w-[400px] -z-0 rounded-full bg-[#5F81A2] left-75 top-20 -translate-y-1/2"></div>
          <div>
            <h1 className="uppercase font-bold text-[24px]">Pre Order</h1>
            <p className="text-[14px]">From $399</p>
          </div>

          <div className="h-[125px] w-[386px] mt-[15px] z-1 bg-[url('/homeimg/banner2.png')] bg-cover">

          </div>

          <div>
            <p className="text-[12px]">Opplo Watch Sport Series 8</p>
            <h1 className="text-[30px]">A healthy leap ahead</h1>
          </div>

          <div className='flex justify-items-end'>
            <Link href='/store'>
              <button className="bg-[#fff] text-black py-2 px-4 rounded-full font-bold">Discover Now</button>
            </Link>
          </div>


        </div>
      </div>
      {/* tab section */}

      <HomeTab products={producte} />

    </div>
  );
}

export default DealsSec;
