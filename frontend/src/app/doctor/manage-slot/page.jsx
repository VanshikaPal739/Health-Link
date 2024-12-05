'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ManageSlotsPage() {
  const [slots, setSlots] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [token, setToken] = useState(null);
  const runOnce = useRef(false); // Ensures fetching happens only once

  // Retrieve token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  // Fetch logged-in doctor's details
  const fetchLoggedInDoctor = async () => {
    try {
      const res = await axios.get('http://localhost:5000/doctor/getbyid', {
        headers: { 'x-auth-token': token },
      });
      setDoctor(res.data); // Update state with logged-in doctor details
    } catch (error) {
      console.error('Error fetching logged-in doctor:', error);
      toast.error('Failed to fetch logged-in doctor details');
    }
  };

  // Fetch slots for the logged-in doctor
  const fetchSlots = async () => {
    if (!token || !doctor?.id) return;

    try {
      const res = await axios.get(`http://localhost:5000/slot/getbydoctor/${doctor.id}`, {
        headers: { 'x-auth-token': token },
      });
      console.log('Slots:', res.data);

      setSlots(res.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to fetch slots');
    }
  };

  // Fetch doctor and slots on component mount
  useEffect(() => {
    if (!runOnce.current && token) {
      fetchLoggedInDoctor();
      runOnce.current = true;
    }
  }, [token]);

  useEffect(() => {
    if (doctor?.id) {
      fetchSlots();
    }
  }, [doctor]);

  // Formik setup for adding a slot
  const formik = useFormik({
    initialValues: {
      time: '',
      status: 'Active',
    },
    validationSchema: Yup.object({
      time: Yup.string().required('Time is required'),
      status: Yup.string().required('Status is required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const data = { ...values, doctorId: doctor?.id }; // Add the logged-in doctor's ID to the payload
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/slot/add`, data, {
          headers: { 'x-auth-token': token },
        });
        const newSlot = res.data;

        // Update slots immediately after adding
        setSlots((prevSlots) => [...prevSlots, newSlot]);
        console.log('New Slot Added:', newSlot);

        toast.success('Slot added successfully');
        resetForm();
      } catch (error) {
        console.error('Error adding slot:', error);
        toast.error('Error adding slot');
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
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id} className={`border-b ${slot.status === 'Inactive' ? 'bg-gray-200' : ''}`}>
                  <td className="py-3 px-4">{slot.time}</td>
                  <td className="py-3 px-4">{slot.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
