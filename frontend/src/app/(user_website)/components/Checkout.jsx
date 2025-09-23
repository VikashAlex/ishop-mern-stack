'use client'
import { Axiosinstance, formatCurrencyINR } from "@/app/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export default function CheckoutPage() {
    const [address, setAddress] = useState(0)
    const [payment, setPayment] = useState(0)
    const router = useRouter()
    const user = useSelector((state) => state.user.userDetails)
    const cart = useSelector((state) => state.cart)

    const submithandler = () => {
        Axiosinstance.post('order/order-place', {
            userId: user?._id,
            payment_mode: payment,
            shipping_details: user.shipping_address[address]
        }).then((res) => {
            if (res.status == 201) {
                toast.success(res.data.msg)
                localStorage.setItem('cart', JSON.stringify({items:[],originalPrice_Total:0,finalPrice_Total:0}));
                setTimeout(() => {
                    router.push(`thankyou/${res.data.order_id}`)
                }, 5000);
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Address List */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Select Address</h2>
                        <div className="space-y-3">

                            {
                                user?.shipping_address?.map((add, index) => {
                                    return (
                                        <div
                                            onClick={() => setAddress(index)}
                                            style={{ backgroundColor: index == address ? "#01A49E " : "white", color: index == address ? "white " : "#666" }
                                            }
                                            key={index} className="p-4 border rounded-xl cursor-pointer hover:bg-[#01A49E] transition">
                                            <p className="font-medium">{user?.name || "User"}</p>
                                            <p className="text-sm ">{add.addressLine1}, {add.addressLine2}, {add.city}, {add.state}</p>
                                            <p className="text-sm ">{add.country}, Code: {add.zip}</p>
                                            <p className="text-sm ">Contact: {add.contact}</p>
                                        </div>
                                    )
                                })
                            }




                            <Link href={'/profile'}>
                                <button className="mt-2 cursor-pointer px-4 py-2 bg-[#01A49E] text-white rounded-xl hover:bg-[#037a76] transition">
                                    + Add New Address
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Select Payment Mode</h2>
                        <div className=" my-2 gap-x-5 flex  ">
                            <button
                                onClick={() => setPayment(0)}
                                className={`${payment == 0 ? "bg-[#01A49E] text-white" : "text-black"} cursor-pointer   w-full px-4 py-3 font-semibold  rounded-xl shadow-2xl border border-gray-300 transition`}>
                                Cash on Delivery (COD)
                            </button>
                            <button
                                onClick={() => setPayment(1)}
                                className={`${payment == 1 ? "bg-[#01A49E] text-white" : "text-black"} cursor-pointer   w-full px-4 py-3 font-semibold  rounded-xl shadow-2xl border border-gray-300 transition`}>
                                Online Payment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section - Order Summary */}
                <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3 text-sm font-semibold">
                        <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span>{formatCurrencyINR(cart?.originalPrice_Total || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount:</span>
                            <span className="text-[#1ABA1A]">{formatCurrencyINR(cart?.originalPrice_Total - cart?.finalPrice_Total || 0)}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-3">
                            <span>Final Amount:</span>
                            <span>{formatCurrencyINR(cart?.finalPrice_Total || 0)}</span>
                        </div>
                    </div>
                    <button
                        onClick={submithandler}
                        className="mt-6 cursor-pointer w-full px-4 py-3 bg-[#01A49E] text-white rounded-xl hover:bg-[#077a77] transition">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
