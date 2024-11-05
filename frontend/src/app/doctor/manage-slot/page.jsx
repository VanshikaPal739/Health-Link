'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ManageSlotsPage() {
  const [slots, setSlots] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [token, setToken] = useState(null);
  const runOnce = useRef(false); // Ensures doctor and slot fetching only happens once

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  // Fetch doctors list to map their names with slots
  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/doctor/getall', {
        headers: { 'x-auth-token': token },
      });
      setDoctorList(res.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to fetch doctor list');
    }
  };

  // Fetch slots data from the backend API
  const fetchSlots = async () => {
    if (!token) return; // Ensure token is set before fetching

    try {
      const res = await axios.get('http://localhost:5000/slot/getbydoctor', {
        headers: { 'x-auth-token': token },
      });
      setSlots(res.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to fetch slots');
    }
  };

  // Fetch doctors and slots only once when component mounts
  useEffect(() => {
    if (!runOnce.current && token) {
      fetchDoctors();
      fetchSlots();
      runOnce.current = true;
    }
  }, [token]);

  // Helper function to find doctor name by ID
  const getDoctorName = (doctorId) => {
    const doctor = doctorList.find((doc) => doc.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
      status: 'Active',
    },
    validationSchema: Yup.object({
      date: Yup.string().required('Date is required'),
      time: Yup.string().required('Time is required'),
      status: Yup.string().required('Status is required'),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/slot/add`, values, {
          headers: { 'x-auth-token': token },
        });
        toast.success('Slot added successfully');
        resetForm();
        fetchSlots();
      } catch (error) {
        console.error('Error adding slot:', error);
        toast.error('Error adding slot');
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <motion.div
          className="text-center py-12 bg-gradient-to-r from-blue-600 to-sky-500 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold">Manage Appointment Slots</h1>
          <p className="mt-4 text-lg">View and manage your appointment slots here.</p>
        </motion.div>

        {/* Slots Table Section */}
        <motion.div
          className="p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Current Slots</h2>

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Doctor</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id} className={`border-b ${slot.status === 'Inactive' ? 'bg-gray-200' : ''}`}>
                  <td className="py-3 px-4">{slot.date}</td>
                  <td className="py-3 px-4">{slot.time}</td>
                  <td className="py-3 px-4">{getDoctorName(slot.doctorId)}</td>
                  <td className="py-3 px-4">{slot.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Add Slot Form Section */}
        <motion.div
          className="p-12 bg-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Slot</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              {/* Date Input */}
              <input
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`flex-1 p-4 border rounded-lg ${formik.errors.date && formik.touched.date ? 'border-red-500' : ''}`}
              />
              {formik.errors.date && formik.touched.date && (
                <div className="text-red-500">{formik.errors.date}</div>
              )}

              {/* Time Input */}
              <input
                type="time"
                name="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`flex-1 p-4 border rounded-lg ${formik.errors.time && formik.touched.time ? 'border-red-500' : ''}`}
              />
              {formik.errors.time && formik.touched.time && (
                <div className="text-red-500">{formik.errors.time}</div>
              )}

              {/* Status Dropdown */}
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="flex-1 p-4 border rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <motion.button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            >
              Add Slot
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
