'use client'
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Axiosinstance } from "../utils/helper";
import { useDispatch } from "react-redux";
import { addTouser } from "../redux/features/userSlice";
import { ToastContainer, toast } from "react-toastify";

export default function page() {
  const dispatcher = useDispatch()
  const [value, setValue] = useState(null);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setValue(cart);
  }, [])
  
  const loginHandel = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };
    Axiosinstance.post("user/login", data).then(async (res) => {
      if (res.status === 200) {
        toast.success(res.data.msg)
        dispatcher(addTouser({ user: res.data.data.user, token: res.data.data.token }))
      }
      const data = {
        userId: res.data.data.user._id,
        cart: value?.items || null,
      }
      const updatecart = await Axiosinstance.post('cart/snyc', data)
      let finalPrice_Total = 0
      let originalPrice_Total =0
      const items =  updatecart.data.cart?.map((prod)=>{
          
        finalPrice_Total += prod.product_id.finalPrice
        originalPrice_Total += prod.product_id.originalPrice
        return {
          productId:prod.product_id._id,
          qnty:prod.qnty
        }

      })
      localStorage.setItem('cart',JSON.stringify({items,finalPrice_Total,originalPrice_Total}))

    }).catch((error) => {
      console.log("Login error:");
      if (error.response) {
        toast.warning(error.response.data.msg)
      } else {
        console.log(error.message);
      }
    });
  };

  const signupHandel = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { name, email, password };
    Axiosinstance.post("user/create", data).then((res) => {
      if (res.status === 201) {
        toast.success(res.data.msg)
        setTimeout(() => {
          setIsLogin(true)
        }, 5000);
      }
    }).catch((error) => {
      console.log("Login error:");
      if (error.response) {
        toast.warning(error.response.data.msg)
      } else {
        console.log(error.message);
      }
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')} // yahan apna navigate logic lagao
          className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-teal-600 transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}

        </h2>
        <ToastContainer />

        {/* Toggle Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 font-medium transition ${isLogin ? "bg-teal-600 text-white" : "text-gray-600"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 font-medium transition ${!isLogin ? "bg-teal-600 text-white" : "text-gray-600"
              }`}
          >
            Signup
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form className="space-y-4" onSubmit={loginHandel}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button type="submit" className="cursor-pointer w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition">
              Login
            </button>
            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-teal-600 cursor-pointer font-medium hover:underline"
              >
                Signup
              </span>
            </p>
          </form>
        ) : (
          /* Signup Form */
          <form className="space-y-4" onSubmit={signupHandel}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button type="submit" className="cursor-pointer w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition">
              Signup
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-teal-600 cursor-pointer font-medium hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
