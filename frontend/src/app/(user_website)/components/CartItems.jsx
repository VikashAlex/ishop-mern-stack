'use client'

import { addQnty, removeTocart } from "@/app/redux/features/cartSlice";
import { Axiosinstance, formatCurrencyINR } from "@/app/utils/helper";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


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
            router.push('user-login?rfe=/checkout')
        }
    }
    const payloadSend = (flag, product) => {
        if (user != null) {
            Axiosinstance.patch(`/cart/qnty-manage/${user._id}/${product._id}/${flag}`).then((res) => {
                if (res.status == 200) {
                    toast.success(res.data.msg)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        dispatcher(addQnty({ product, flag }))
    }

    const removehandel = (product) => {
        if (user != null) {
            Axiosinstance.delete(`/cart/remove-to-cart/${user._id}/${product._id}`).then((res) => {
                if (res.status == 200) {
                    toast.success(res.data.msg)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        dispatcher(removeTocart({ product }))
        window.scrollTo({ top: 0, behavior: "smooth" });

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
                                    <p className="text-red-500 font-bold text-lg">{formatCurrencyINR((items.find((item) => item.productId === product._id)?.qnty * product.finalPrice))}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            disabled={items.find((item) => item.productId === product._id)?.qnty <= 1 ? true : false}
                                            onClick={() => payloadSend("-", product)}
                                            className="px-2 py-1 border rounded">-</button>
                                        <span>
                                            {items.find((item) => item.productId === product._id)?.qnty || 0}
                                        </span>
                                        <button
                                            onClick={() => payloadSend("+", product)}
                                            className="px-2 py-1 border rounded">+</button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-xs justify-between">
                                        <span className={product.stock ? "text-green-600" : "bg-red-500"}>{product.stock ? "In stock" : "Out Stock"}</span>
                                        <button onClick={() => removehandel(product)} className="py-1 px-4 text-[14px] cursor-pointer shadow-2xl rounded-2xl bg-blue-700 text-white">Remove</button>
                                    </div>

                                </div>

                            </div>
                        )
                    })
                }
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-full lg:w-90 bg-white rounded-lg shadow-md p-6 h-fit">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span className="font-medium">${formatCurrencyINR(cart?.originalPrice_Total || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Saving :</span>
                        <span className="font-medium text-[#1ABA1A]">${formatCurrencyINR(cart?.originalPrice_Total - cart.finalPrice_Total || 0)}</span>
                    </div>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
                    <span>Final Price:</span>
                    <span>${formatCurrencyINR(cart?.finalPrice_Total || 0)}</span>
                </div>

                <button
                    onClick={clickHandel}
                    className="w-full cursor-pointer mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md">
                    CHECKOUT
                </button>
            </div>
        </div>
    );
}


export default CartItems;