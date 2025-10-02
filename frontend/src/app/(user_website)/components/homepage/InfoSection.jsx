import Link from "next/link";

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
    {
        img: "/product/prod25.png",
        brands: "Xiaomi",
        items: 52,
    },
    {
        img: "/product/prod26.png",
        brands: "Accessories",
        items: 18,
    },
    {
        img: "/product/prod27.png",
        brands: "Samsung Tablets",
        items: 16,
    },
    {
        img: "/product/prod28.png",
        brands: "eReader",
        items: 51,
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
];

function InfoSection() {
    return (
        <div className=' px-4 py-6 my-4'>
            <div className='grid grid-cols-3  gap-x-5'>
                <div className="bg-white p-5 rounded-[10px]">
                    <div className=" flex justify-between items-center">
                        <h3 className="text-[16px] md:text-[18px] font-bold uppercase  text-center md:text-left">
                            Audios & Cameras
                        </h3>

                        <div className="text-[13px] uppercase text-[#666666]">
                            <Link href={'/store'}>
                                view all
                            </Link>
                        </div>
                    </div>
                    <div className='my-3 p-6  h-[190px] bg-[url("/homeimg/img18.png")] rounded-[10px] bg-center bg-cover '>
                        <h1 className='text-[14px] max-w-2 font-bold text-white'>Best
                            Speaker
                            2023</h1>
                    </div>

                    <div className='grid grid-cols-2'>
                        {
                            product.slice(8, 10).map((item, index) => {
                                return <Link href={'/store'} key={index + 1}>
                                    <div className=" flex flex-col  items-center">
                                        <div className="w-[120px] h-[120px] rounded-full  flex justify-center items-center">
                                            <img src={item.img} alt={`image${index}`} width={100} height={100} />
                                        </div>
                                        <div className="text-center">
                                            <h1 className="text-center font-bold text-[14px]">{item.brands}</h1>
                                            <p className="text-[#666666] text-[10px]">{item.items}</p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                    <div className='grid grid-cols-2'>
                        {
                            product.slice(10, 12).map((item, index) => {
                                return <Link href={'/store'} key={index + 1}>
                                    <div key={index + 1} className=" flex flex-col  items-center">
                                        <div className="w-[120px] h-[120px] rounded-full  flex justify-center items-center">
                                            <img src={item.img} alt={`image${index}`} width={100} height={100} />
                                        </div>
                                        <div className="text-center">
                                            <h1 className="text-center font-bold text-[14px]">{item.brands}</h1>
                                            <p className="text-[#666666] text-[10px]">{item.items}</p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>


                <div className="bg-white p-5 rounded-[10px]">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[16px] md:text-[18px] font-bold uppercase text-center md:text-left">
                            gaming
                        </h3>

                        <div className="text-[13px] uppercase text-[#666666]">
                            <Link href={'/store'} >view all</Link>
                        </div>
                    </div>
                    <div className='my-3 p-7 pb-5  h-[190px] bg-[url("/homeimg/img19.png")] rounded-[10px] bg-center bg-cover '>

                        <h1 className='text-[14px] uppercase max-w-[100px]  font-bold text-black'>wireless
                            rgb gaming
                            mouse</h1>
                    </div>

                    <div className='grid grid-cols-2'>
                        {
                            product.slice(0, 2).map((item, index) => {
                                return <Link href={'/store'} key={index + 1}>
                                    <div key={index + 1} className=" flex flex-col  items-center">
                                        <div className="w-[120px] h-[120px] rounded-full  flex justify-center items-center">
                                            <img src={item.img} alt={`image${index}`} width={100} height={100} />
                                        </div>
                                        <div className="text-center">
                                            <h1 className="text-center font-bold text-[14px]">{item.brands}</h1>
                                            <p className="text-[#666666] text-[10px]">{item.items}</p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                    <div className='grid grid-cols-2'>
                        {
                            product.slice(2, 4).map((item, index) => {
                                return <Link href={'/store'} key={index + 1}>
                                    <div key={index + 1} className=" flex flex-col  items-center">
                                        <div className="w-[120px] h-[120px] rounded-full  flex justify-center items-center">
                                            <img src={item.img} alt={`image${index}`} width={100} height={100} />
                                        </div>
                                        <div className="text-center">
                                            <h1 className="text-center font-bold text-[14px]">{item.brands}</h1>
                                            <p className="text-[#666666] text-[10px]">{item.items}</p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>


                <div className="bg-white p-5 rounded-[10px]">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[16px] md:text-[18px] font-bold uppercase text-center md:text-left">
                            office equipments
                        </h3>

                        <div className="text-[13px] uppercase text-[#666666]">
                            <Link href={'/store'}>view all</Link>
                        </div>
                    </div>
                    <div className='my-3 pb-5  h-[190px] bg-[url("/homeimg/img20.png")] rounded-[10px] bg-center bg-cover flex flex-col justify-center items-center'>
                        <p className='text-center text-[10px] text-[#CCCCCC]'>Home Thearther 4k</p>
                        <h1 className='text-[24px] text-center font-bold text-white'>Laser Projector</h1>
                    </div>

                    <div className='grid grid-cols-2'>
                        {
                            product.slice(4, 6).map((item, index) => {
                                return <Link href={'/store'} key={index + 1}>
                                    <div key={index + 1} className=" flex flex-col  items-center">
                                        <div className="w-[120px] h-[120px] rounded-full  flex justify-center items-center">
                                            <img src={item.img} alt={`image${index}`} width={100} height={100} />
                                        </div>
                                        <div className="text-center">
                                            <h1 className="text-center font-bold text-[14px]">{item.brands}</h1>
                                            <p className="text-[#666666] text-[10px]">{item.items}</p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                    <div className='grid grid-cols-2'>
                        {
                            product.slice(6, 8).map((item, index) => {
                                return <Link href={'/store'} key={index + 1}>
                                    <div key={index + 1} className=" flex flex-col  items-center">
                                        <div className="w-[120px] h-[120px] rounded-full  flex justify-center items-center">
                                            <img src={item.img} alt={`image${index}`} width={100} height={100} />
                                        </div>
                                        <div className="text-center">
                                            <h1 className="text-center font-bold text-[14px]">{item.brands}</h1>
                                            <p className="text-[#666666] text-[10px]">{item.items}</p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InfoSection