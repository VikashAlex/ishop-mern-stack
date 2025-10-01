import React from "react";
import ProductSlider from "./Sliders";

function TopBanner() {
  return (
    <main className="bg-white px-4 py-6 my-4 ">
      <h3 className="text-[16px] md:text-[18px] font-bold uppercase mb-5 text-center md:text-left">
        top cell phones & tablets
      </h3>

      {/* Banner Wrapper */}
      <div className="flex flex-col lg:flex-row gap-3">
        
        {/* Left Banner */}
        <div className='w-[800px] lg:w-[800px] h-[220px] md:h-[280px] lg:h-[310px] rounded-[10px]  overflow-hidden'>
          <ProductSlider img1={'/sliders/banner1.jpg'} img2={'/sliders/banner2.png'} img3={'sliders/banner3.jpg'}/>
        </div>

        {/* Right Banner */}
        <div className='flex-1 h-[220px] md:h-[280px] lg:h-[310px]  rounded-[10px]  overflow-hidden '>
          <div >
            <ProductSlider img1={'/sliders/banner4.jpg'} img2={'/sliders/banner5.jpg'} img3={'sliders/banner6.jpg'}/>
          </div>
        </div>

      </div>
    </main>
  );
}

export default TopBanner;
