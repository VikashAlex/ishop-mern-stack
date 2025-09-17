'use client'

import { addQnty, removeTocart } from "@/app/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


function CartItems({ product }) {
    const dispatcher = useDispatch()
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails)
    const cart = useSelector((state) => state.cart);
    const { items } = cart
    const cartprod = cart.items.map((item) => {
        return product.find((prod) => prod._id === item.productId)
    })

    const clickHandel = () => {
        if (user) {
            router.push('checkout')
        } else {
            router.push('user-login')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col lg:flex-row gap-6">
            {/* Left Side - Cart Items */}
            <div className="flex-1 space-y-6">
                {
                    cartprod.map((product) => {
                        return (
                            <div key={product._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                <div className="relative">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product.thumbnail}`}
                                        alt={product.name}
                                        className="w-24 h-24 rounded-md object-cover"
                                    />
                                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                        SAVE ${product.discountPercentage}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm font-semibold">
                                        {product.name}
                                    </h2>
                                    <h4 className="line-clamp-1 max-w-[80%]">{product.shortDescription}</h4>
                                    <p className="text-red-500 font-bold text-lg">${items.find((item) => item.productId === product._id)?.qnty*product.finalPrice}</p>
                                    <div className="flex items-center gap-2 mt-2">

                                        
                                        <button
                                            disabled={items.find((item) => item.productId === product._id)?.qnty===1?true:false}
                                            onClick={() => dispatcher(addQnty({ product, type: "-" }))}
                                            className="px-2 py-1 border rounded">-</button>
                                        <span>
                                            {
                                                items.find((item) => item.productId === product._id)?.qnty || 0
                                            }
                                        </span>
                                        <button
                                            disabled={items.find((item) => item.productId === product._id)?.qnty===5?true:false}
                                            onClick={() => dispatcher(addQnty({ product, type: "+" }))}
                                            className="px-2 py-1 border rounded">+</button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-xs justify-between">
                                        <span className={product.stock ? "text-green-600" : "bg-red-500"}>{product.stock ? "In stock" : "Out Stock"}</span>
                                        <button onClick={() => dispatcher(removeTocart({ product, items }))} className="py-1 px-4 text-[14px] cursor-pointer shadow-2xl rounded-2xl bg-blue-700 text-white">Remove</button>
                                    </div>

                                </div>

                            </div>
                        )
                    })
                }
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-full lg:w-80 bg-white rounded-lg shadow-md p-6 h-fit">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span className="font-medium">${cart.originalPrice_Total}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Saving :</span>
                        <span className="font-medium">${(cart.originalPrice_Total - cart.finalPrice_Total).toFixed()}</span>
                    </div>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
                    <span>Final Price:</span>
                    <span>${cart.finalPrice_Total.toFixed()}</span>
                </div>

                <button
                    onClick={clickHandel}
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md">
                    CHECKOUT
                </button>
            </div>
        </div>
    );
}


export default CartItems;