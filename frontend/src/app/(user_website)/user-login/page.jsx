'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Axiosinstance } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addTouser } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";


export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const searchParams = useSearchParams()
  const redirect = searchParams.get('rfe') || '/'
  const dispatcher = useDispatch()
  const [value, setValue] = useState(null);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const user = useSelector((state) => state.user.userDetails)
  useEffect(() => {
    if (!user) {
      router.push('/user-login')
    } else {
      router.push('/profile')
    }
  }, [user])


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
        router.push(redirect)
      }
      const data = {
        userId: res.data.data.user._id,
        cart: value?.items || null,
      }
      const updatecart = await Axiosinstance.post('cart/snyc', data)
      let finalPrice_Total = 0
      let originalPrice_Total = 0
      const items = updatecart.data.cart?.map((prod) => {

        finalPrice_Total += Number(prod.product_id.finalPrice * prod.qnty)
        originalPrice_Total += Number(prod.product_id.originalPrice * prod.qnty)
        return {
          productId: prod.product_id._id,
          qnty: prod.qnty
        }

      })
      localStorage.setItem('cart', JSON.stringify({ items, finalPrice_Total, originalPrice_Total }))

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
    const comfirmPass = e.target.comfirmPass.value;
    if (password != comfirmPass) {
      return toast.error("please enter same password....")
    }
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

    <div className="grid grid-cols-2  rounded-2xl bg-white h-[100vh] p-10">
      {/* Left Image/Illustration */}
      <div className="flex items-center justify-center bg-gray-100 rounded-[10px]  p-8 h-full">
        <img
          src="/login.png"
          alt="Illustration"
          className="w-[80%]"
        />
      </div>

      {/* Right Register Form */}
      {
        isLogin
          ?
          <div className="p-10 flex flex-col justify-center h-full  ">
            <h2 className="text-2xl font-bold text-teal-600">Welcome Back</h2>
            <p className="text-gray-500 mb-6">LOGIN TO CONTINUE</p>

            <form className="space-y-4" onSubmit={loginHandel}>

              {/* Email */}
              <input
                type="email"
                placeholder="Example@gmail.com"
                name="email"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-teal-400 outline-none"
                />
                <p className="text-gray-500 mt-2">Forget Password ?</p>
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div>
                <button className="bg-[#01A49E] px-6 py-1 font-semibold cursor-pointer rounded-[7px] text-white text-[18px]">login</button>
              </div>
            </form>

            <p className="mt-5 text-sm text-gray-500">
              New User ?{" "}
              <button onClick={() => setIsLogin(false)} className="cursor-pointer text-green-600 font-medium">
                Sign up
              </button>
            </p>

          </div>
          :
          <div className="p-10 flex flex-col justify-center h-full  ">
            <h2 className="text-2xl font-bold text-teal-600">Register</h2>
            <p className="text-gray-500 mb-6">Join to us</p>

            <form className="space-y-4" onSubmit={signupHandel}>
              {/* Name */}
              <input
                type="text"
                placeholder="John Deo"
                name="name"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Example@gmail.com"
                name="email"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-teal-400 outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="comfirmPass"
                  required
                  className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-teal-400 outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-all"
              >
                Register
              </button>
            </form>

            <p className="mt-5 text-sm text-gray-500">
              Already User?{" "}
              <button onClick={() => setIsLogin(true)} className="cursor-pointer text-green-600 font-medium">
                Login
              </button>
            </p>
          </div>
      }

    </div>
  );
}
