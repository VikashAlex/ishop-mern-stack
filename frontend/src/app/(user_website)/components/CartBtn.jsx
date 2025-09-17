"use client";

import { addTocart } from "@/app/redux/features/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";


export default function CartBtn({ productId, originalPrice, finalPrice }) {
    const dispatcher = useDispatch();
    return (
        <button
            onClick={() => dispatcher(addTocart({ productId, originalPrice, finalPrice }))}
            className="flex items-center gap-2 text-[13px] px-[10px] cursor-pointer py-[5px] rounded-[8px] bg-gradient-to-r from-[#1ABA1A] to-[#43d443] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
        </button>
    );
}
