import Link from "next/link";

function PopularCategories({ Categories }) {
  return (
    <main className="bg-white px-4 py-6 my-4 ">
      <h3 className="font-bold text-[16px] md:text-[18px] uppercase mb-4 md:mb-6 text-center md:text-left">
        popular categories
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8 px-2 md:px-5 py-4 md:py-6">
        {Categories?.slice(0,10)?.map((Category) => {
          return (
            <Link key={Category._id} href={`/store/${Category.slug}`}>
              <div className="flex gap-x-3 md:gap-x-6 items-center">
                <div>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${Category.image}`}
                    alt={Category.image}

                    className="object-cover w-[50px] h-[50px] rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold capitalize text-[13px] md:text-[14px]">
                    {Category.name}
                  </h3>
                  <p className="text-[#666666] text-[11px] md:text-[12px]">
                    {Category.productCount} items
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default PopularCategories;
