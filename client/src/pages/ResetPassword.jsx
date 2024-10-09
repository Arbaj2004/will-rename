import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const { resetToken: ResetToken } = useParams();
  const [data, setData] = useState({
    password: "",
    passwordConfirm: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ResetToken from useParams:", ResetToken); // Log the token to debug
  }, [ResetToken]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/resetPassword/${ResetToken}`;
    console.log("API URL:", URL); // Log the API URL to debug

    try {
      const response = await axios.patch(URL, {
        password: data.password,
        passwordConfirm: data.passwordConfirm
      }, {
        withCredentials: true
      });

      if (response.data.status === "success") {
        toast.success("Password changed successfully");
        setTimeout(() => {
          setData({
            password: "",
            passwordConfirm: ""
          });
          navigate('/');
        }, 2000); // 2-second delay before redirecting
      }
    } catch (error) {
      toast.error("Password reset failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/1153643.webp')`,
          filter: 'blur(8px)',
          zIndex: -1
        }}
      ></div>

      {/* Toaster Component */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit} className="relative h-1/2 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl bg-slate-200 bg-opacity-90 flex justify-center flex-col p-5">
        <h1 className="font-sans text-2xl font-bold mt-6">Set a New Password</h1>

        {/* Password Input */}
        <div className="flex justify-between items-center mt-5">
          <label className="text-xs text-slate-500" htmlFor="password">Password</label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-slate-500 flex items-center"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            <p className="ml-1">{showPassword ? 'Hide' : 'Show'}</p>
          </button>
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          className="rounded p-2 mb-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          required
          value={data.password}
          onChange={handleOnChange}
        />

        {/* Confirm Password Input */}
        <div className="flex justify-between items-center mt-5">
          <label className="text-xs text-slate-500" htmlFor="passwordConfirm">Confirm Password</label>
          <button
            type="button"
            onClick={() => setShowPasswordConf(!showPasswordConf)}
            className="text-xs text-slate-500 flex items-center"
            title={showPasswordConf ? 'Hide password' : 'Show password'}
          >
            {showPasswordConf ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            <p className="ml-1">{showPasswordConf ? 'Hide' : 'Show'}</p>
          </button>
        </div>
        <input
          type={showPasswordConf ? 'text' : 'password'}
          id="passwordConfirm"
          name="passwordConfirm"
          className="rounded p-2 mb-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          required
          value={data.passwordConfirm}
          onChange={handleOnChange}
        />

        {/* Forgot Password Link */}
        <div className="flex justify-between mt-2">
          <p></p>
          <Link to="/forgot-password" className="text-xs cursor-pointer hover:text-slate-900 text-slate-600 font-semibold underline">
            Forgot Password
          </Link>
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          className="bg-slate-500 mt-3 mb-6 rounded-3xl p-2 text-white font-semibold hover:bg-slate-800"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
