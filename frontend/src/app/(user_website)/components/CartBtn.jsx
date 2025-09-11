"use client";

import { addTocart } from "@/app/redux/features/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";


export default function CartBtn({ productId, originalPrice, finalPrice }) {
    const dispatcher = useDispatch();
    return (
        <button
            onClick={() => dispatcher(addTocart({ productId, originalPrice, finalPrice }))}
            className="flex items-center gap-2 text-sm px-5 cursor-pointer py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
        </button>
    );
}
