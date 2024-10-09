import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => { 
  const [data, setData] = useState({
    email: ""
  });
  
  // Step indicator: 'request' for form, 'confirmation' for message
  const [step, setStep] = useState('request');

  // Handle form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/forgotPassword`;
    try {
      const response = await axios.post(URL, {
        userkey: data.email
      }, {
        withCredentials: true
      });

      if (response.data.status === "success") {
        // Clear the input field and show the confirmation message
        setData({
          email: ""
        });

        // Display success toast and go to confirmation step
        toast.success("Reset link sent via email");
        setStep('confirmation');
      } else {
        toast.error("Failed to send reset link. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Invalid Email or MIS");
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/1153643.webp')`, // Replace with your image path
          filter: 'blur(8px)', // Adjust blur amount as needed
          zIndex: -1 // Place behind other content
        }}
      ></div>

      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Login Form */}
      {step === 'request' && (
        <form onSubmit={handleSubmit} className="relative h-2/5 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl bg-slate-200 bg-opacity-90 flex justify-center flex-col p-5 pt-2">
          <h1 className="font-sans text-2xl font-bold">Forgot Password</h1>
          <p className="text-sm text-slate-500 mb-4">Enter your Email or MIS to reset the password</p>
          <label className="text-xs text-slate-800" htmlFor="email">Email or MIS</label>
          <input
            type="text"
            id="email"
            name="email"
            className="mt-1 mb-3 rounded p-2 w-full text-sm"
            required
            value={data.email}
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="bg-slate-500 mt-4 rounded-3xl p-2 text-white font-semibold hover:bg-slate-800"
          >
            Reset Password
          </button>
        </form>
      )}

      {/* Confirmation Message */}
      {step === 'confirmation' && (
        <div className="relative h-2/5 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl bg-green-500 bg-opacity-90 flex justify-center items-center p-5 text-center">
          <p className="text-white font-bold">
            A reset link has been sent to your email or MIS. Please check your inbox and follow the instructions to reset your password.
            <p className='mt-3 text-blue-700 underline cursor-pointer' onClick={()=>{setStep('request')}}>Resend Link →</p>
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
