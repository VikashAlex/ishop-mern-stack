import Link from "next/link";

function Category({ Categories }) {
  return (
    <div className="flex flex-col gap-y-2 bg-[#EEEFF6] rounded-[10px] p-4 md:p-6 w-full md:w-auto">
      <h1 className="text-[16px] md:text-[18px] font-bold uppercase text-center md:text-left">
        categories
      </h1>

      <div className="flex justify-center md:justify-start">
        <Link href={`/store`}>
          <button className=" font-bold py-1 px-4 md:px-5 rounded-[8px] text-[13px] md:text-[14px] cursor-pointer bg-[#1ABA1A] text-white transition-all duration-300">
            All Categories
          </button>
        </Link>
      </div>



      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-x-4 md:gap-x-0 text-center md:text-left">
        {Categories?.map((Category) => {
          return (
            <Link key={Category._id} href={`/store/${Category.slug}`} >
              <li className="text-[13px] md:text-[14px] flex justify-between items-center my-1 bg-white font-bold py-2 cursor-pointer hover:bg-[#1ABA1A] hover:text-white transition-all duration-300 px-4 md:px-5 rounded-[8px] ">
                <h3>{Category.name}</h3>  <p className="text-[#636363]">( {Category.productCount} )</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Category;
