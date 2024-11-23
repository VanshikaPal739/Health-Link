'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);

      axios
        .post('http://localhost:5000/user/authenticate', values)
        .then((response) => {
          toast.success('Login Success');
          router.push('/browse-doctor');
          localStorage.setItem('token', response.data.token);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-4xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-center items-center w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Welcome</h1>
          <p className="text-center text-lg">
            Introducing Broker Operating System
          </p>
          <div className="mt-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Phone Illustration"
              className="w-2/3 mx-auto"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Login
          </h2>
          <form onSubmit={loginForm.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.email}
                placeholder=" "
                className="peer block w-full appearance-none border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Enter Your Email
              </label>
              {loginForm.touched.email && loginForm.errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {loginForm.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                placeholder=" "
                className="peer block w-full appearance-none border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Enter Your Password
              </label>
              {loginForm.touched.password && loginForm.errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  {loginForm.errors.password}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-36 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                Login
              </button>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline transition-all"
              >
                Forgot your password?
              </a>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <a
              href="signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
