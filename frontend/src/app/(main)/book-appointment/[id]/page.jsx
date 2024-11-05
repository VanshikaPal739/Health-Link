'use client';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

export default function BookAppointment({ selectedDoctor = null }) {
  const [doctorList, setDoctorList] = useState([]);
  const [slotList, setSlotList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams();

  // Fetch doctors list if no selected doctor is passed
  useEffect(() => {
    if (!selectedDoctor) {
      const fetchDoctors = async () => {
        try {
          const response = await axios.get('http://localhost:5000/doctor/getall'); // Replace with actual API
          setDoctorList(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          toast.error('Failed to load doctors. Please try again later.');
        }
      };
      fetchDoctors();
    }
  }, [selectedDoctor]);

  // Fetch slots data from the Manage Slot API
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('http://localhost:5000/slot/getall');
        const data = await response.json();
        setSlotList(data);
      } catch (error) {
        console.error('Error fetching slots:', error);
        toast.error('Failed to load slots. Please try again later.');
      }
    };
    fetchSlots();
  }, []);

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      doctorName: selectedDoctor ? selectedDoctor.name : '', // Use doctorName instead of doctorId
      date: '',
      time: '',
      patientName: '',
      slot: '',
      contact: '',
    },
    validationSchema: Yup.object({
      doctorName: Yup.string().required('Doctor is required'),
      contact: Yup.string().required('Phone number is required'),
      date: Yup.string().required('Appointment date is required'),
      time: Yup.string().required('Appointment time is required'),
      patientName: Yup.string().required('Patient name is required'),
      slot: Yup.string().required('Slot selection is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/appointment/add', values);
        if (response.status === 200) {
          toast.success('Appointment booked successfully!');
          resetForm();
        } else {
          toast.error('Failed to book appointment');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        toast.error('Error booking appointment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-blue-700 text-center mb-8"
        >
          Book Your Appointment
        </motion.h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Doctor Selection */}
<div>
  <label className="block text-lg font-semibold text-blue-700 mb-2">
    Doctor
  </label>
  <input
    type="text"
    name="doctorName"
    value={
      selectedDoctor
        ? `${selectedDoctor.name} - ${selectedDoctor.specialization}`
        : ''
    }
    readOnly
    className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
    placeholder="Doctor information will appear here"
  />
  {formik.errors.doctorName && formik.touched.doctorName ? (
    <div className="text-red-500">{formik.errors.doctorName}</div>
  ) : null}
</div>


          {/* Appointment Date */}
          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.errors.date && formik.touched.date ? 'border-red-500' : ''
                }`}
              required
            />
            {formik.errors.date && formik.touched.date ? (
              <div className="text-red-500">{formik.errors.date}</div>
            ) : null}
          </div>

          {/* Other form fields go here... */}
        

          {/* Contact Number */}
          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.errors.contact && formik.touched.contact ? 'border-red-500' : ''
                }`}
              placeholder="Enter your contact number"
              required
            />
            {formik.errors.contact && formik.touched.contact ? (
              <div className="text-red-500">{formik.errors.contact}</div>
            ) : null}
          </div>

          {/* Slot Dropdown */}
          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-2">
              Select Slot
            </label>
            <select
              name="slot"
              value={formik.values.slot}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.errors.slot && formik.touched.slot ? 'border-red-500' : ''
                }`}
              required
            >
              <option value="">Choose a slot</option>
              {slotList.length === 0 ? (
                <option disabled>Loading slots...</option>
              ) : (
                slotList.map((slot) => (
                  <option key={slot.id} value={slot.time}>
                    {slot.time} - {slot.status ? 'Available' : 'Unavailable'}
                  </option>
                ))
              )}
            </select>
            {formik.errors.slot && formik.touched.slot ? (
              <div className="text-red-500">{formik.errors.slot}</div>
            ) : null}
          </div>



          {/* Patient Name */}
          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={formik.values.patientName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.errors.patientName && formik.touched.patientName ? 'border-red-500' : ''
                }`}
              placeholder="Enter your full name"
              required
            />
            {formik.errors.patientName && formik.touched.patientName ? (
              <div className="text-red-500">{formik.errors.patientName}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className={`flex justify-center px-8 py-3 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Booking...' : 'Confirm Appointment'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
