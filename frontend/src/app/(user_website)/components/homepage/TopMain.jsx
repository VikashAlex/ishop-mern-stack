
import Link from "next/link";
import HomeSlider from "./HomeSlider";
function TopMain({ Categories }) {

  return (
    <div className="flex gap-x-5 my-2 px-4">
      <div className="p-4 w-[298px] bg-white rounded-[15px]">
        <h1 className="border-b border-[#ECECEC] py-2 mb-4 font-bold text-[24px]">
          Category
        </h1>
        <ul className="flex flex-col gap-y-3 px-2 ">
          {Categories?.slice(0, 5)?.map((Category) => {
            return (
              <Link key={Category._id} href={`/store/${Category.slug}`}>
                <li
                  className="flex items-center justify-between p-3 border border-[#F2F3F4] rounded-[7px] transition-all duration-300 capitalize hover:bg-[#01A49E] hover:text-white"
                >
                  <div className="flex items-center  gap-x-2 text-sm font-bold">
                    {Category.name}
                  </div>
                  <span className="w-[20px] h-[20px] flex justify-center items-center bg-[#01A49E] rounded-full text-white">
                    {" "}
                    {Category.productCount}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="flex-1 rounded-[30px] h-[380px]  overflow-hidden">
        <HomeSlider />
      </div>
    </div>
  );
}

export default TopMain;
