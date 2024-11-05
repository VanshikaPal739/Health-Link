'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values)
        .then((response) => {
          console.log(response.status);
          resetForm();
          toast.success('User Registered Successfully');
          router.push('/login');
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.code === 11000) {
            toast.error('Email already exists');
          }
          setSubmitting(false);
        });
    },
    validationSchema: signupSchema,
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-600">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex">
        {/* Left Section (Image) */}
        <div
          className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center sm:w-2/5 animate__animated animate__fadeInLeft"
          style={{
            backgroundImage:
              'url(https://static.vecteezy.com/system/resources/thumbnails/031/552/282/small_2x/advertising-portrait-shot-of-a-doctor-team-standing-together-in-a-hospital-and-they-look-at-the-camera-generative-ai-photo.jpg)',
          }}
        />
        
        {/* Right Section with Signup Form */}
        <div className="w-full sm:w-3/5 animate__animated animate__fadeInRight">
          <div className="p-8">
            <h1 className="text-3xl font-black text-slate-700">Sign Up</h1>

            <form className="mt-8" onSubmit={signupForm.handleSubmit}>
              {/* Name Field */}
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="name"
                  onChange={signupForm.handleChange}
                  value={signupForm.values.name}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Name
                </label>
                {signupForm.touched.name && signupForm.errors.name && (
                  <p className="text-xs text-red-600 mt-2">{signupForm.errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="email"
                  onChange={signupForm.handleChange}
                  value={signupForm.values.email}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Email
                </label>
                {signupForm.touched.email && signupForm.errors.email && (
                  <p className="text-xs text-red-600 mt-2">{signupForm.errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative mt-2 w-full">
                <input
                  type="password"
                  id="password"
                  onChange={signupForm.handleChange}
                  value={signupForm.values.password}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Password
                </label>
                {signupForm.touched.password && signupForm.errors.password && (
                  <p className="text-xs text-red-600 mt-2">{signupForm.errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <input
                className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
                type="submit"
                value="Create account"
              />
            </form>

            {/* Login Redirect */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="login" className="font-bold text-blue-600 hover:text-blue-400">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
