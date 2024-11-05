'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

// Validation Schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const router = useRouter();

  // Formik Hook to handle form state and validation
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/doctor/authenticate', values);
        toast.success('Login Success');
        router.push('/doctor/add-doctor');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-blue-400 to-blue-600">
      {/* Left Section with Info Text */}
      <div className="w-1/2 flex flex-col justify-center px-10 text-white space-y-6 animate__animated animate__fadeInLeft">
        <h1 className="text-5xl font-bold leading-tight">Welcome Back to Healthcare Link</h1>
        <p className="text-lg">
          Log in to access your account and start connecting with patients. Keep track of your appointments, consults, and much more from your dashboard.
        </p>
        <ul className="list-disc space-y-2 ml-5 text-sm">
          <li>Manage your schedule efficiently</li>
          <li>Respond to patient queries instantly</li>
          <li>Stay up-to-date with your medical records</li>
        </ul>
      </div>

      {/* Right Section with Login Form */}
     {/* Right Section with Login Form */}
<div className="w-1/2 flex justify-center items-center animate__animated animate__fadeInRight">
  <form 
    onSubmit={loginForm.handleSubmit} 
    className="relative w-96 p-8 rounded-lg bg-white shadow-2xl transition-transform transform hover:scale-105 hover:shadow-lg duration-500 ease-in-out"
  >
    {/* Login Form Title */}
    <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center animate-pulse">Login</h1>
    <p className="text-gray-500 mb-6 text-center">Sign in to access your account</p>

    

          {/* Email Field */}
          <div className="relative mb-6">
            <input 
              type="text"
              id="email"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              className="peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-blue-500 transition duration-300"
              placeholder="Enter Your Email"
            />
            <label
              htmlFor="email"
              className="absolute left-2 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
            >
              Enter Your Email
            </label>
            {loginForm.touched.email && loginForm.errors.email && (
              <p className="text-xs text-red-600 mt-2">{loginForm.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative mb-6">
            <input 
              type="password"
              id="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              className="peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-blue-500 transition duration-300"
              placeholder="Enter Your Password"
            />
            <label
              htmlFor="password"
              className="absolute left-2 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
            >
              Enter Your Password
            </label>
            {loginForm.touched.password && loginForm.errors.password && (
              <p className="text-xs text-red-600 mt-2">{loginForm.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white shadow-lg hover:bg-blue-500 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm font-medium text-gray-600 hover:underline">Forgot your password?</a>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">Don't have an account? 
              <a href="doctor-signup" className="ml-1 font-semibold text-blue-600 hover:underline">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



