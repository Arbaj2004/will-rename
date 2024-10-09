import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-screen lg:flex-row w-screen overflow-y-hidden">
      {/* Left Section */}
      <div className=" hidden lg:flex text-center lg:w-3/5 w-full  justify-center items-center p-4">
        <p className="text-black font-mono font-extrabold text-lg lg:text-2xl">Welcome to the Landing Page</p>
      </div>

      {/* Right Section */}
      <div className="lg:w-3/5 w-full h-screen bg-blue-300 flex justify-center items-center p-4">
        {/* Sign-in Form */}
        <div className="w-full mb-10 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 h-auto min-h-[300px] flex justify-center items-center p-3 rounded-lg bg-[#0F5660]">
          <div className="w-full">
            {/* Sign-in Header */}
            <div className="flex justify-center mt-4 mb-6">
              <h1 className="font-bold text-2xl text-white">SIGN IN</h1>
            </div>
            <form className="flex justify-center flex-col items-center">
              {/* Email Input */}
              <div className="flex flex-col mb-4 w-full px-6">
                <label className="text-sm text-white" htmlFor="email">Email or MIS</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="mt-1 rounded p-2 w-full"
                  placeholder="E-mail or MIS*"
                  required
                />
              </div>
              {/* Password Input */}
              <div className="flex flex-col w-full px-6 relative">
      <label className="text-sm text-white" htmlFor="password">
        Password
      </label>
      <div className="flex items-center mt-1">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          className="rounded-l p-2 mb-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Password*"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="bg-white mb-2 rounded-r p-2.5 "
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FaEye size={20}  /> : <FaEyeSlash size={20}  />}
        </button>
      </div>
    </div>
              {/* Forgot Password */}
              <p className="text-blue-300 text-sm mt-2 mb-4 cursor-pointer hover:text-blue-400">
                Forgot Password?
              </p>
              {/* Sign-in Button */}
              <button
                className="bg-purple-700 mb-5 mt-2 w-full md:w-60 p-2 text-white font-semibold rounded hover:bg-purple-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
