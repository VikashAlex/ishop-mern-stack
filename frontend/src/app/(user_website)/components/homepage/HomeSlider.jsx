"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTelegram } from "react-icons/fa";

function HomeSlider() {
    return (
        <div className="w-full bg-yellow-200  h-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                height={100}
                className=" h-full"
            >

                <SwiperSlide className="h-full">
                    <div className="rounded-[30px]  bg-[url('/homeimg/banner.png')] bg-cover bg-center flex-1 py-3">
                        <div className="px-16 py-10 text-white">
                            <h1 className="mb-6  text-[72px] font-bold leading-[1.1]">Don’t miss amazing grocery deals</h1>
                            <p className="mb-4 text-[30px] font-semibold">Sign up for the daily newsletter</p>
                            <div className="border-[#9A9A9A] border inline-flex pl-5  gap-x-4 text-[16px] rounded-[50px] mt-4 overflow-hidden text-white">
                                <div className="flex items-center gap-x-4  ">
                                    <FaTelegram fill="#fff" />
                                    Your emaill address
                                </div>
                                <button className="bg-[#01A49E] px-6 py-3 rounded-[50px]">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                     <div className="rounded-[30px]  bg-[url('/homeimg/banner3.jpg')] bg-cover bg-center flex-1 py-3">
                        <div className="px-16 py-10 text-white">
                            <h1 className="mb-6  text-[72px] font-bold leading-[1.1]">Don’t miss amazing grocery deals</h1>
                            <p className="mb-4 text-[30px] font-semibold">Sign up for the daily newsletter</p>
                            <div className="border-[#9A9A9A] border inline-flex pl-5  gap-x-4 text-[16px] rounded-[50px] mt-4 overflow-hidden text-white">
                                <div className="flex items-center gap-x-4  ">
                                    <FaTelegram fill="#fff" />
                                    Your emaill address
                                </div>
                                <button className="bg-[#01A49E] px-6 py-3 rounded-[50px]">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                     <div className="rounded-[30px]  bg-[url('/homeimg/banner4.jpg')] bg-cover bg-center flex-1 py-3">
                        <div className="px-16 py-10 text-white">
                            <h1 className="mb-6  text-[72px] font-bold leading-[1.1]">Don’t miss amazing grocery deals</h1>
                            <p className="mb-4 text-[30px] font-semibold">Sign up for the daily newsletter</p>
                            <div className="border-[#9A9A9A] border inline-flex pl-5  gap-x-4 text-[16px] rounded-[50px] mt-4 overflow-hidden text-white">
                                <div className="flex items-center gap-x-4  ">
                                    <FaTelegram fill="#fff" />
                                    Your emaill address
                                </div>
                                <button className="bg-[#01A49E] px-6 py-3 rounded-[50px]">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default HomeSlider