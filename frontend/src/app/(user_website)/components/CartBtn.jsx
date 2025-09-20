"use client";

import { addTocart } from "@/app/redux/features/cartSlice";
import { Axiosinstance } from "@/app/utils/helper";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";


export default function CartBtn({ productId, originalPrice, finalPrice }) {
    const dispatcher = useDispatch();
    const user = useSelector((state)=>state.user.userDetails)

    const addToCart = () => {
        if (user!=null) {
            console.log(user)
            Axiosinstance.post('/cart/add-to-cart',{
                productId,
                userId:user?.userId
            }).then((res)=>{
                console.log(res)
            }).catch((error)=>{
                    console.log(error)
            })
        }

          dispatcher(addTocart({ productId, originalPrice, finalPrice }))
          
    }
    return (
        <button
            onClick={addToCart}
            className="flex items-center gap-2 text-[13px] px-[10px] cursor-pointer py-[5px] rounded-[8px] bg-gradient-to-r from-[#1ABA1A] to-[#43d443] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
        </button>
    );
}
