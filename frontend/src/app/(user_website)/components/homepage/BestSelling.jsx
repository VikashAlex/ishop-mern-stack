
import CardUi from "../store/CardUi";
import Link from "next/link";
import NoProductFound from "../store/NoProductFound";
const product = [
    {
        img: "/product/prod19.png",
        brands: "iPhone (ios)",
        items: 74,
    },
    {
        img: "/product/prod20.png",
        brands: "Android",
        items: 35,
    },
    {
        img: "/product/prod21.png",
        brands: "5G Support",
        items: 12,
    },
    {
        img: "/product/prod22.png",
        brands: "Apple Tablets",
        items: 22,
    },
    {
        img: "/product/prod23.png",
        brands: "Smartphone Chargers",
        items: 33,
    },
    {
        img: "/product/prod24.png",
        brands: "Gaming",
        items: 9,
    },
]


function BestSelling({ products }) {

    return (
        <main className="bg-white px-4 py-6 my-4 ">
            <div className="flex justify-between items-center px-6">
                <h3 className="text-[16px] md:text-[18px] font-bold uppercase mb-5 text-center md:text-left">
                    Best Laptops & Computers
                </h3>
                <div className="text-[13px] uppercase text-[#666666]">
                    <Link href='/store'>
                        view all
                    </Link>
                </div>
            </div>



            {/* Banner Wrapper */}
            <div className="grid grid-cols-2 gap-x-3 px-6 border-b border-slate-200 pb-5 ">

                {/* Left Banner */}
                <div className=' h-[220px] md:h-[280px] lg:h-[200px] bg-[url("/slider/imagebest.png")] rounded-[10px] bg-cover bg-center text-white px-6 md:px-10 py-4 md:py-5'>
                    <h1 className="text-[22px] mb-2 md:text-[28px] uppercase lg:text-[30px] font-bold text-white max-w-[240px] leading-9">
                        Mobok 2
                        superchard
                        <p className="font-normal">by M2</p>

                    </h1>

                    <p className="text-[11px] md:text-[18px] text-[#666666] mb-2">Start from <span className="text-green-500">$1,199</span></p>


                </div>

                {/* Right Banner */}
                <div className=' rounded-[10px]  grid grid-cols-3  '>
                    {product.map((pro, index) => {
                        return (
                            <Link key={index + 1} href={'/store'}>

                                <div
                                    className="flex gap-x-3 md:gap-x-6 items-center   justify-center"

                                >
                                    <div>
                                        <img
                                            src={pro.img}
                                            width={40}
                                            height={40}
                                            alt={pro.brands}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold capitalize text-[13px] md:text-[14px]">
                                            {pro.brands}
                                        </h3>
                                        <p className="text-[#666666] text-[11px] md:text-[12px]">
                                            {pro.items} items
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>

            <div className="grid grid-cols-5 gap-x-3 px-6">
                {(() => {
                    const filtered = products?.filter((p) =>
                        ["laptops", "tablets", "smartphones"].includes(
                            p.categoryId?.name?.toLowerCase()
                        )
                    ) || [];

                    if (filtered.length === 0) {
                        return (
                            <div className="col-span-5">
                                <NoProductFound />
                            </div>
                        );
                    }

                    // Dummy products ka dhacha banane ke liye
                    const dummyCount = 5 - filtered.length;
                    const dummyArray = Array.from({ length: dummyCount });

                    return (
                        <>
                            {filtered.map((item, index) => (
                                <CardUi item={item} key={`real-${index}`} />
                            ))}

                            {dummyArray.map((_, i) => (
                                <div
                                    key={`dummy-${i}`}
                                    className="relative my-6 border-gray-200 border rounded-[7px]"
                                >
                                    
                                </div>
                            ))}
                        </>
                    );
                })()}
            </div>


        </main>
    )
}

export default BestSelling