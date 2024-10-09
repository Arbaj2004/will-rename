import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/login`;
    try {
      const response = await axios.post(URL, {
        userkey: data.email,
        password: data.password,
      }, {
        withCredentials: true
      });
      
      if (response.data.status === "success") {
        // Store the token and reset data
        toast.success("Successful login");
        localStorage.setItem('token', response?.data?.token);
        
        // Display success toast and navigate
        setTimeout(() => {
          setData({
            password: "",
            email: ""
          });
          navigate('/');
        }, 1000); // 2-second delay before redirecting
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Please check your email and password");
      console.log(">>", error);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center relative overflow-hidden'>
      {/* Blurred Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url('/1153643.webp')`, // Replace with your image path
          filter: 'blur(8px)', // Adjust blur amount as needed
          zIndex: -1 // Place behind other content
        }}
      ></div>

      {/* Toaster Component */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Login Form */}
      <form onSubmit={handleSubmit} className='relative h-1/2 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl bg-slate-200 bg-opacity-90 flex justify-center flex-col p-5'>
        <h1 className='font-sans text-2xl font-bold mb-6'>Sign In</h1>

        <label className="text-xs text-slate-500" htmlFor="email">Email or MIS</label>
        <input
          type="text"
          id="email"
          name="email"
          className="mt-1 rounded p-2 w-full text-sm"
          required
          value={data.email}
          onChange={handleOnChange}
        />

        <div className='flex justify-between items-center mt-5'>
          <label className="text-xs text-slate-500" htmlFor="password">Password</label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-slate-500 flex items-center"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            <p className='ml-1'> {showPassword ? 'Hide' : 'Show'}</p>
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

        <div className='flex justify-between'>
          <p></p>
          <Link to={"/forgot-password"} className='text-xs cursor-pointer hover:text-slate-900 text-slate-600 font-semibold underline'>
            Forgot Password
          </Link>
        </div>

        <button type="submit"
          className="bg-slate-500 mt-3 rounded-3xl p-2 text-white font-semibold hover:bg-slate-800"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
