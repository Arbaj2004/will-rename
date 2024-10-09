import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

const LoginCard = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
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
      const userData = response.data.data.user;
      console.log(userData)
      dispatch(loginSuccess(userData)); // Dispatch the user state to Redux

      if (response.data.status === "success") {
        toast.success("Successful login");
        
        setTimeout(() => {
          setData({
            password: "",
            email: ""
          });
          onClose(); // Close the login modal
          navigate('/'); // Redirect to the home page
        }, 1000);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Please check your email and password");
      console.log(">>", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className='flex justify-center items-center h-full md:w-1/4 w-1/2'>
        <form onSubmit={handleSubmit} className='relative w-full max-w-md dark:text-white dark:bg-blue-950 h-auto rounded-2xl bg-slate-200 bg-opacity-90 flex flex-col p-6 shadow-lg'>
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={onClose} // Close the card when clicked
          >
            &times;
          </button>
          <h1 className='font-sans text-2xl font-bold mb-6 text-center'>Sign In</h1>
          <label className="text-xs text-slate-500 dark:text-white " htmlFor="email">Email or MIS</label>
          <input
            type="text"
            id="email"
            name="email"
            className="mt-1 rounded p-2 w-full text-sm text-black"
            required
            value={data.email}
            onChange={handleOnChange}
          />
          <div className='flex justify-between items-center mt-5'>
            <label className="text-xs text-slate-500 dark:text-white" htmlFor="password">Password</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-slate-500 dark:text-white flex items-center"
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
            className="rounded text-black p-2 mb-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
            value={data.password}
            onChange={handleOnChange}
          />
          <div className='flex justify-between'>
            <p></p>
            <Link to={"/forgot-password"} className='text-xs cursor-pointer hover:text-slate-900 text-slate-600 dark:text-white font-semibold underline'>
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
    </>
  );
};

export default LoginCard;
