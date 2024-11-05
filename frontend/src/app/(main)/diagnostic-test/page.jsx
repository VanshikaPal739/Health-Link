'use client';

import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Test name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required'),
  reportTime: Yup.string().required('Report time is required'),
});

const AddTopBookedTest = () => {
  const router = useRouter();

  // Formik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      reportTime: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axios.post('http://localhost:5000/labtest/add', values);
        toast.success('Test added successfully!');
        resetForm();
        router.push('/lab-tests'); // Redirect after successful submission
      } catch (error) {
        toast.error('Error adding test');
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Add Top Booked Test</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Test Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-600 text-sm">{formik.errors.description}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-600 text-sm">{formik.errors.price}</p>
            )}
          </div>

          {/* Report Time Field */}
          <div>
            <label className="block text-gray-700 font-semibold">Report Time</label>
            <input
              type="text"
              name="reportTime"
              value={formik.values.reportTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.reportTime && formik.errors.reportTime && (
              <p className="text-red-600 text-sm">{formik.errors.reportTime}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={formik.isSubmitting}
          >
            Add Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTopBookedTest;
