'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaUserLock } from "react-icons/fa"
import { Axiosinstance } from "@/app/utils/helper";
import { toast } from "react-toastify";
import { addTouser } from "@/app/redux/features/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";



function Page() {
  const router = useRouter()
  const [address, setAddress] = useState({})
  const [toggle, setToggle] = useState('account');
  const [add, setAdd] = useState(false)
  const dispatcher = useDispatch()
  const user = useSelector((state) => state.user.userDetails)

  const Buttons = ({ tab, flag }) => {
    return (
      <button
        onClick={() => setToggle(flag)}
        className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-lg ${flag === toggle ? "bg-teal-500 text-white" : " bg-gray-100"}`}
      >
        <span>{tab}</span>
        <span>→</span>
      </button>
    );
  };

  useEffect(() => {
    const getuser = async () => {
      const res = await Axiosinstance.get(`/user/get/${user?._id}`)
      const data = await res.data.data.user
      setAddress(data)
    }
    getuser()
  }, [user])

  const addresshandler = (e) => {
    e.preventDefault();
    const data = {
      addressLine1: e.target.addressLine1.value,
      addressLine2: e.target.addressLine2.value,
      city: e.target.city.value,
      contact: e.target.contact.value,
      state: e.target.state.value,
      country: e.target.country.value,
      zip: e.target.zip.value,
    }
    if (!user) {
      setTimeout(() => {
        router.push('/user-login')
      }, 3000);
      return toast.error("Please Login Now...")
    }
    Axiosinstance.post(`user/address/${user?._id}`, data).then((res) => {
      if (res.status == 200) {
        const current = JSON.parse(localStorage.getItem('user'))
        dispatcher(addTouser({ user: res.data.user, token: current.token, atLogin: current.atLogin }))
        setAdd(false)
        toast.success(res.data.msg)
      }

    }).catch((error) => {
      console.log(error)
      setAdd(false)
      toast.info(error.response.data.msg)
    })


  }

  const addressDelete = (index) => {
    Axiosinstance.delete(`user/add_delete/${index}/${user._id}`).then((res) => {
      if (res.status == 200) {
        const current = JSON.parse(localStorage.getItem('user'))
        dispatcher(addTouser({ user: res.data.user, token: current.token, atLogin: current.atLogin }))
        toast.success(res.data.msg)
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  const updatePassword = (e) => {
    e.preventDefault()
    const curr_pass = e.target.currentpass.value;
    const new_pass = e.target.newpass.value;
    const confirm_pass = e.target.confirmpass.value;
    if (new_pass != confirm_pass) {
      return toast.info('both  password shoud bhi same')
    }
    const data = {
      curr_pass,
      new_pass
    }
    Axiosinstance.patch(`/user/password/${user._id}`, data).then((res) => {
      if (res.status == 200) {
        toast.success(res.data.msg)
        e.target.currentpass.value = ""
        e.target.confirmpass.value = ""
        e.target.newpass.value = ""
      }
    }).catch((error) => {
      console.log(error.response)
      if (error.response.status == 404) {
        toast.info(error.response.data.msg)
      } else if (error.response.status == 400) {
        toast.error(error.response.data.msg)
      }
    })
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl flex w-full max-w-7xl">

        {/* Left Sidebar */}
        <div className="w-1/3 border-r border-gray-300 p-6 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 flex justify-center items-center">
            {
              user ?
                <img
                  src="https://vikashalwar.vercel.app/_next/image?url=%2Fhero%2Fdeveloper.png&w=1920&q=75"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                :
                <FaUserLock className="text-blue-600 text-7xl drop-shadow-lg" />
            }

          </div>

          {
            user ?
              <>
                <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'user no found'}</h2>
                <p className="text-sm text-gray-500 mb-6">{user?.email || 'email not found.'}</p>
              </>
              :
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Login Required
                </h2>
          }


          <div className="space-y-3 w-full">
            <Buttons tab={'Account info'} flag={'account'} />
            <Buttons tab={'My order'} flag={'order'} />
            <Buttons tab={'My address'} flag={'address'} />
            <Buttons tab={'Change password'} flag={'password'} />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 p-8">
          <AnimatePresence mode="wait">

            {toggle === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {
                  user ?
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Account Info</h2>
                      <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Vikash"
                              defaultValue={user?.name.split(" ")[0] || "frist name"}
                              readOnly
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              readOnly
                              defaultValue={user?.name.split(" ")[1] || "last name"}
                              placeholder="Kumar"
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            defaultValue={user?.email || "email not found.."}
                            placeholder="vikash123@gmail.com"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <button
                          type="button"
                          className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition"
                        >
                          SAVE
                        </button>
                      </form>
                    </div>
                    :
                    <UserLoginUi />
                }
              </motion.div>

            )}
            {toggle === 'order' && (

              <motion.div
                key="order"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {
                  user ?
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-gray-800">Order #12345</h3>
                            <span className="text-sm text-teal-600">Delivered</span>
                          </div>
                          <p className="text-sm text-gray-600">2x T-shirt, 1x Shoes</p>
                          <p className="text-sm text-gray-500 mt-1">Placed on: 12 Sept 2025</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-gray-800">Order #12346</h3>
                            <span className="text-sm text-yellow-600">Processing</span>
                          </div>
                          <p className="text-sm text-gray-600">1x Jacket</p>
                          <p className="text-sm text-gray-500 mt-1">Placed on: 10 Sept 2025</p>
                        </div>
                      </div>
                    </div>
                    :
                    <UserLoginUi />
                }
              </motion.div>
            )}
            {toggle === 'address' && (

              <motion.div
                key="address"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >

                {
                  user ?


                    <div className=" relative">
                      <div className="bg-white ">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h2 className="text-xl font-semibold">My Shipping Addresses</h2>
                            <p className="text-sm text-gray-500">Manage your saved addresses</p>
                          </div>
                          <button
                            onClick={() => setAdd(true)}
                            className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700"
                            aria-label="Add new address"
                          >
                            + Add Address
                          </button>
                        </div>

                        {/* Addresses list (static - no logic) */}
                        <div className="space-y-4">

                          {address?.shipping_address?.map((item, index) => {
                            return (
                              <div key={index + 1} className="border rounded-xl p-4 flex items-start gap-4 opacity-90">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                                    {item.city?.charAt(0).toUpperCase()}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h3 className="text-sm font-semibold">Home</h3>
                                      <p className="text-xs text-gray-500">{user.name} • {item.contact} </p>
                                    </div>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
                                  </div>

                                  <p className="mt-2 text-sm text-gray-700">
                                    {item.addressLine1}, {item.addressLine2}, {item.city}, {item.state} - {item.zip}
                                  </p>

                                  <div className="mt-3 flex gap-2">
                                    <button
                                      onClick={() => addressDelete(index)}
                                      className="text-sm px-3 py-1 rounded-md border border-red-200 cursor-pointer text-red-600 hover:bg-red-50">Delete</button>
                                  </div>
                                </div>

                              </div>
                            )
                          })}

                        </div>

                        <p className="mt-5 text-xs text-gray-500">You can save up to 3 addresses. Click on an address to delete or edit it.</p>
                      </div>


                      {/* form Address */}

                      {
                        add && <motion.div
                          className="absolute w-full h-full top-0 transition-all left-0 bg-white"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: .3 }}
                        >
                          <form action="/submit-address" method="POST" onSubmit={addresshandler} >
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                              Shipping Address
                            </h2>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                              <div className="col-span-3">
                                <label
                                  htmlFor="addressLine1"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Address Line 1
                                </label>
                                <input
                                  type="text"
                                  id="addressLine1"
                                  name="addressLine1"
                                  required
                                  placeholder="House no, Street name"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="col-span-3">
                                <label
                                  htmlFor="addressLine2"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Address Line 2
                                </label>
                                <input
                                  type="text"
                                  id="addressLine2"
                                  name="addressLine2"
                                  placeholder="Near Landmark (optional)"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  required
                                  placeholder="Alwar"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="state"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  State
                                </label>
                                <input
                                  type="text"
                                  id="state"
                                  name="state"
                                  required
                                  placeholder="Rajasthan"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  id="country"
                                  name="country"
                                  required
                                  placeholder="India"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="zip"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  ZIP Code
                                </label>
                                <input
                                  type="text"
                                  id="zip"
                                  name="zip"
                                  required
                                  placeholder="301001"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="contact"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Contact
                                </label>
                                <input
                                  type="text"
                                  id="contact"
                                  name="contact"
                                  placeholder="6375256614"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>
                              <div >
                                <button
                                  type="submit"
                                  className="w-full py-3 my-4 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                            <div className="my-2 flex justify-end">
                              <button className="py-1 px-4 bg-red-600 rounded-[7px] text-white font-semibold cursor-pointer" onClick={() => setAdd(false)}>Close</button>
                            </div>
                          </form>
                        </motion.div>
                      }
                    </div>
                    :
                    <UserLoginUi />
                }

              </motion.div>

            )}
            {toggle === 'password' && (

              <motion.div
                key="password"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {
                  user ?
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
                      <form className="space-y-5" onSubmit={updatePassword}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input
                            type="password"
                            name="currentpass"
                            required
                            placeholder="Enter current password"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input
                            type="password"
                            name="newpass"
                            required
                            placeholder="Enter new password"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmpass"
                            required
                            placeholder="Confirm new password"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition"
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                    :
                    <UserLoginUi />
                }


              </motion.div>

            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Page;


const UserLoginUi = () => {
  return (
    <div className="flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className=" rounded-2xl p-10 text-center w-full "
      >

        <motion.div
          initial={{ y: -15 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
          className="flex justify-center mb-6"
        >
          <FaUserLock className="text-blue-600 text-7xl drop-shadow-lg" />
        </motion.div>


        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Login Required
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-base mb-8">
          Please login to access your account and continue exploring.
        </p>

        {/* Button */}
        <Link
          href="/user-login"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Login Now
        </Link>
      </motion.div>
    </div>
  )
}