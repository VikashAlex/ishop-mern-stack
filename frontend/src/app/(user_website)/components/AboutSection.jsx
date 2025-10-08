'use client'
import CountUp from "react-countup";
function AboutSection() {
    return (
        <section className="rounded-xl overflow-hidden shadow-sm bg-white ">

            <div className="border border-gray-200 mb-4 rounded-[10px]">
                <div className="px-15 py-12 bg-[url('/aboutBanner.png')] ">
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        Best experience <br />
                        <span className="font-light">always wins</span>
                    </h2>
                    <p className="text-gray-500 mt-4 ">
                        #1 Online Marketplace for Electronic & Technology <br /> in
                        Mahanttan, CA
                    </p>

                </div>


                <div className="bg-white text-black px-15 py-12 grid grid-cols-3 gap-x-10">

                    <div className="text-black-500 font-bold uppercase tracking-wide col-span-1">
                        <h1>our purpose is to <span className="text-green-400"> enrich
                            <br />
                            and enhance lives </span> through
                            <br />
                            technology</h1>
                    </div>

                    <div className="col-span-2 grid grid-cols-3 gap-x-5">
                        <div>
                            <h4 className="text-[40px] font-bold text-balck uppercase">
                                <CountUp
                                    start={0}
                                    end={12.5}
                                    duration={2.5}
                                    prefix="$"
                                    suffix="M"
                                    decimals={1}
                                />
                            </h4>
                            <p className="font-semibold text-[#666666] uppercase text-[12px">total revenue from
                                2001 - 2023</p>
                        </div>

                        <div>
                            <h4 className="text-[40px] font-bold text-balck uppercase">
                                <CountUp
                                    start={0}
                                    end={12}
                                    duration={2.5}
                                    suffix="K+"
                                />
                            </h4>
                            <p className="font-semibold text-[#666666] uppercase text-[12px]">orders delivered
                                successful on everyday</p>
                        </div>

                        <div>
                            <h4 className="text-[40px] font-bold text-balck uppercase">
                                <CountUp
                                    start={0}
                                    end={12.5}
                                    duration={2.5}
                                    suffix="K+"
                                />
                            </h4>
                            <p className="font-semibold text-[#666666] uppercase text-[12px]">store and office in U.S
                                and worldwide</p>
                        </div>

                    </div>
                </div>
            </div>


            <div className="grid grid-cols-2 mb-4">
                <div className="bg-[url('/about2.png')] h-[420px] rounded-[10px] bg-cover bg-center"></div>
                <div className="rounded-[10px] bg-[#E2E4EB] p-20">
                    <h1 className="text-[18px] font-bold mb-4">We connect millions of buyers and sellers around
                        the world, empowering people & creating economic
                        opportunity for all.</h1>
                    <p className="mb-4 text-[14px]">Within our markets, millions of people around the world connect,
                        both online and offline, to make, sell and buy unique goods. We also
                        offer a wide range of Seller Services and tools that help creative
                        entrepreneurs start, manage & scale their businesses.</p>

                    <div>
                        <button className="px-5 py-2 text-white bg-[#01A49E] rounded-[10px]"> our showreel</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-x-3 mb-4">


                <div className="rounded-[10px] bg-white p-8">
                    <div className="flex justify-between items-center font-bold mb-4">
                        <h1 className="max-w-[200px] uppercase">100% authentic products</h1>
                        <div className="w-[60px] h-[60px] rounded-full bg-[#01A49E]"></div>
                    </div>
                    <p className="text-[#666666]">Swoo Tech Mart just distribute 100% authorized products &
                        guarantee quality. Nulla porta nulla nec orci vulputate, id
                        rutrum sapien varius.</p>
                </div>
                <div className="rounded-[10px] bg-white p-8">
                    <div className="flex justify-between items-center font-bold mb-4">
                        <h1 className="max-w-[200px] uppercase">fast
                            delivery</h1>
                        <div className="w-[60px] h-[60px] rounded-full bg-[#01A49E]"></div>
                    </div>
                    <p className="text-[#666666]">Fast shipping with a lots of option to delivery. 100%
                        guarantee that your goods alway on time and perserve
                        quality.</p>
                </div>
                <div className="rounded-[10px] bg-white p-8">
                    <div className="flex justify-between items-center font-bold mb-4">
                        <h1 className="max-w-[200px] uppercase">affordable
                            price</h1>
                        <div className="w-[60px] h-[60px] rounded-full bg-[#01A49E]"></div>
                    </div>
                    <p className="text-[#666666]">We offer an affordable & competitive price with a lots of
                        special promotions.</p>
                </div>

            </div>

            <div className="border border-gray-200 mb-4 p-8">
                <h1 className="uppercase font-bold mb-3 text-[18px]">our mission and vision</h1>
                <p className="text-[14px] mb-4">Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras non elit vel magna molestie pellentesque in eu dui. Donec laoreet quis erat vitae finibus. Vestibulum enim eros, porta eget
                    quam et, euismod dictum elit. Nullam eu tempus magna. Fusce malesuada nisi id felis placerat porta vel sed augue. Vivamus mollis mauris vitae rhoncus egestas. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis egestas.</p>

                <div className="h-[400px] bg-[url('/aboutimg.png')] bg-cover bg-center rounded-[10px]">

                </div>
            </div>
        </section>
    )
}

export default AboutSection