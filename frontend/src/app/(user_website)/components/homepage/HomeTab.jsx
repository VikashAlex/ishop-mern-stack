'use client'
import { useState } from 'react'
import CardUi from '../store/CardUi'
import NoProductFound from '../store/NoProductFound'

function HomeTab({ products }) {
    const [tab, setTab] = useState('best')
    const [limit, setLimit] = useState(5)

    return (
        <div className="rounded-[10px] px-6 bg-white py-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-6 uppercase">
                    <h2 onClick={() => setTab('best')} className={` cursor-pointer text-[18px] ${tab == 'best' ? "font-bold" : "text-[#666666]"}`}>Best Seller</h2>
                    <h2 onClick={() => setTab('new')} className={` cursor-pointer text-[18px] ${tab == 'new' ? "font-bold" : "text-[#666666]"}`}>New in</h2>
                    <h2 onClick={() => setTab('popular')} className={` cursor-pointer text-[18px] ${tab == 'popular' ? "font-bold" : "text-[#666666]"}`}>popular</h2>
                </div>

                {
                    limit <= 5 ?
                        <div onClick={() => setLimit(Infinity)} className="text-[13px] uppercase text-[#666666]">
                            view all
                        </div>
                        :
                        <div onClick={() => setLimit(5)} className="text-[13px] uppercase text-[#666666]">
                            show less
                        </div>
                }
            </div>

            {
                tab == 'best' &&

                <div className="grid grid-cols-5 gap-x-3 px-6">
                    {

                        products.slice(0, limit).map((item, index) => (
                            <CardUi item={item} key={index + 1} />
                        ))

                    }

                </div>
            }

            {
                tab == 'new' &&
                <div className="grid grid-cols-5 gap-x-3 px-6">
                    {products.slice(5, 10).map((item, index) => (
                        <CardUi item={item} key={index + 1} />
                    ))}
                </div>
            }

            {tab == 'popular' &&
                <div className="grid grid-cols-5 gap-x-3 px-6">
                    {products.slice(10, 15).length > 0 ? (
                        products.slice(10, 15).map((item, index) => (
                            <CardUi item={item} key={index} />
                        ))
                    ) : (
                        <div className='col-span-5'>
                            <NoProductFound />
                        </div>
                    )}
                </div>
            }



        </div>
    )
}

export default HomeTab