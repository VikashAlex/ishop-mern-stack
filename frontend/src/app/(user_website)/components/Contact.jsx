"use client";
import { Axiosinstance } from "@/app/utils/helper";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ContactPage() {
  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Axiosinstance.post("/contact/api", formData)
      .then((res) => {
        if (res.status == 200) {
          toast(res.data.msg);
          setFormData(initialForm);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 bg-white py-8 sm:py-10 md:py-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center md:text-left">
        READY TO WORK WITH US
      </h2>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 ">
        {/* Left Form */}
        <div className="md:col-span-2 order-2 md:order-1">
          <p className="text-[#666666] mb-5 text-center md:text-left">
            Contact us for all your questions and opinions
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                onChange={handleChange}
                value={formData.firstName}
                name="firstName"
                type="text"
                placeholder="First Name *"
                className="border-[#CCCCCC] w-full border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-1 focus:ring-green-500 outline-none"
              />
              <input
                required
                onChange={handleChange}
                value={formData.lastName}
                name="lastName"
                type="text"
                placeholder="Last Name *"
                className="border-[#CCCCCC] w-full border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>

            <input
              required
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email Address *"
              className="border-[#CCCCCC] w-full border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-1 focus:ring-green-500 outline-none"
            />

            <input
              required
              onChange={handleChange}
              value={formData.phone}
              name="phone"
              type="text"
              placeholder="Phone Number (Optional)"
              className="border-[#CCCCCC] w-full border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-1 focus:ring-green-500 outline-none"
            />

            <select className="w-full border rounded-md px-3 py-2 border-[#CCCCCC] text-sm sm:text-base focus:ring-1 focus:ring-green-500 outline-none">
              <option>Alwar Rajasthan (IN)</option>
              <option>Udaipur</option>
              <option>Jaipur Pink-City</option>
              <option>New Delhi</option>
            </select>

            <input
              onChange={handleChange}
              value={formData.subject}
              name="subject"
              type="text"
              placeholder="Subject (Optional)"
              className="border-[#CCCCCC] w-full border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-1 focus:ring-green-500 outline-none"
            />

            <textarea
              onChange={handleChange}
              value={formData.message}
              name="message"
              placeholder="Message"
              rows="4"
              className="border-[#CCCCCC] w-full border rounded-md px-3 py-2 text-sm sm:text-base focus:ring-1 focus:ring-green-500 outline-none"
            ></textarea>

            <div className="flex items-start gap-2 sm:items-center sm:gap-3">
              <input required type="checkbox" className="mt-1 sm:mt-0" />
              <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                I want to receive news and updates once in a while. By
                submitting, I agree to the{" "}
                <span className="text-green-600 cursor-pointer">
                  Terms & Conditions
                </span>.
              </p>
            </div>

            <button
              type="submit"
              className="cursor-pointer mt-6 bg-green-600 w-full sm:w-auto text-white px-6 py-3 rounded-md font-medium text-sm sm:text-base hover:bg-green-700 transition-colors duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="space-y-6 order-1 md:order-2 ">
          <div className=" rounded-[10px]  p-5 sm:p-6 space-y-4 text-center md:text-left">
            <div>
              <h4 className="text-sm font-bold text-[#666666] mb-3">
                RAJASTHAN STATES (HEAD QUATER)
              </h4>
              <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600 mb-1 text-sm">
                <MapPin size={16} /> 152 Malakhera, Alwar, 301001, India
              </p>
              <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600 mb-1 text-sm">
                <Phone size={16} /> (+91) 6375256614
              </p>
              <p className="flex justify-center md:justify-start items-center gap-2 text-green-600 mb-1 text-sm">
                <Mail size={16} /> vkumar637525@gmail.com
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#666666] mb-3">
                ALWAR RAJASTHAN (BRANCH)
              </h4>
              <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600 mb-1 text-sm">
                <MapPin size={16} /> 12 Alwar Rd, Malakhera, Rajasthan
              </p>
              <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600 mb-1 text-sm">
                <Phone size={16} /> (+91) 6375256614
              </p>
              <p className="flex justify-center md:justify-start items-center gap-2 text-green-600 mb-1 text-sm">
                <Mail size={16} /> vkumar637525@gmail.com
              </p>
            </div>

            {/* Social Media */}
            <div className="flex justify-center md:justify-start gap-5 text-gray-600 text-xl mt-4">
              <Link href="https://github.com/vikashalex">
                <FaGithub className="cursor-pointer hover:text-green-600" />
              </Link>
              <Link href="https://www.facebook.com/vikash.alex.14942/">
                <FaFacebook className="cursor-pointer hover:text-green-600" />
              </Link>
              <Link href="https://www.instagram.com/heart_less_637/">
                <FaInstagram className="cursor-pointer hover:text-green-600" />
              </Link>
              <Link href="https://www.linkedin.com/in/vikash-kumar-75a507288/">
                <FaLinkedin className="cursor-pointer hover:text-green-600" />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center   md:justify-start ">
            <img
              src="/contact.png"
              alt="Contact illustration"
              className="rounded-md shadow-md w-full object-cover  md:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-12">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center md:text-left">
          FIND US ON GOOGLE MAP
        </h2>
        <div className="rounded-lg overflow-hidden shadow-md h-[300px] sm:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113191.98042584377!2d76.56397334715288!3d27.554769646854936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3972998fa7e65df3%3A0x38cebba39ee426f2!2sAlwar%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1759490528492!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
