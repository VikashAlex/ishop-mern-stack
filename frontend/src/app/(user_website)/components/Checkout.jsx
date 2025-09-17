'use client'

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const user =  useSelector((state) => state.user.userDetails);

    useEffect(() => {
        setTimeout(() => {
            if (!user) router.push('user-login')
        }, 2000);
    },[user])

    const handlePlaceOrder = () => {
        alert("Order Placed Successfully! 🎉");
        router.push("/"); 
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col lg:flex-row gap-6">
            {/* Left Side - Billing & Shipping Info */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            defaultValue={user?.name || ""}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            defaultValue={user?.email || ""}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <textarea
                            rows="3"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your shipping address"
                        ></textarea>
                    </div>
                </form>
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
                        <span className="font-medium">
                            ${cart.originalPrice_Total - cart.finalPrice_Total}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
                    <span>Final Price:</span>
                    <span>${cart.finalPrice_Total}</span>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md"
                >
                    PLACE ORDER
                </button>
            </div>
        </div>
    );
}
