'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BrandFilter({Brands}) {
    const router = useRouter()
    const [selBrand, setSelBrand] = useState(null);
    useEffect(() => {
        const brand = new URLSearchParams({ brand: selBrand });
        if (selBrand) {
            router.push(`?${brand.toString()}`);

        }
    }, [selBrand])

    return (
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
    )
}

export default BrandFilter