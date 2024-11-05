'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

// Validation Schema using Yup
const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
  const router = useRouter();

  // Formik Hook to handle form state and validation
  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      specialization: '',
      experience: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      axios.post('http://localhost:5000/doctor/add', values)
        .then((response) => {
          toast.success('Doctor Registered Successfully');
          resetForm();
          router.push('/doctor-login');
        })
        .catch((err) => {
          if (err.response?.data?.code === 11000) {
            toast.error('Email already exists');
          } else {
            toast.error('Error during signup');
          }
          setSubmitting(false);
        });
    },
    validationSchema: signupSchema,
  });

  return (
    <div className="min-h-screen flex flex-row justify-between items-center bg-gradient-to-r from-blue-400 to-blue-600 px-10">
      
      {/* Left Section with Info Text */}
      <div className="w-1/2 text-white space-y-6 animate__animated animate__fadeInLeft">
        <h1 className="text-5xl font-bold">Join Our Medical Community</h1>
        <p className="text-xl">Be a part of a platform where doctors and patients connect seamlessly. Sign up today and provide your expertise to those in need.</p>
        <ul className="list-disc ml-5">
          <li>Grow your medical practice</li>
          <li>Access more patients</li>
          <li>Enhance your visibility online</li>
        </ul>
      </div>

      {/* Right Section with Signup Form */}
      <div className="w-1/2 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInRight">
        <h1 className="text-3xl font-bold text-center text-blue-600">Doctor Signup</h1>
        <form onSubmit={signupForm.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={signupForm.handleChange}
              value={signupForm.values.name}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {signupForm.touched.name && signupForm.errors.name && (
              <p className="text-xs text-red-600 mt-2">{signupForm.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <p className="text-xs text-red-600 mt-2">{signupForm.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {signupForm.touched.password && signupForm.errors.password && (
              <p className="text-xs text-red-600 mt-2">{signupForm.errors.password}</p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              id="specialization"
              onChange={signupForm.handleChange}
              value={signupForm.values.specialization}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {signupForm.touched.specialization && signupForm.errors.specialization && (
              <p className="text-xs text-red-600 mt-2">{signupForm.errors.specialization}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experience (in years)
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              onChange={signupForm.handleChange}
              value={signupForm.values.experience}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter years of experience"
              min="0"
            />
            {signupForm.touched.experience && signupForm.errors.experience && (
              <p className="text-xs text-red-600 mt-2">{signupForm.errors.experience}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
