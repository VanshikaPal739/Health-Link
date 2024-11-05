'use client'
import { motion } from 'framer-motion';

const appointment = {
  id: 1,
  doctor: 'Dr. John Doe',
  specialty: 'Cardiologist',
  date: '2024-09-30',
  time: '10:00 AM',
  location: 'New York, NY',
  notes: 'Please bring your previous medical records.',
  image: 'https://via.placeholder.com/250', // Doctor image placeholder
  contact: {
    phone: '+1 123 456 7890',
    email: 'dr.johndoe@example.com',
  },
};

export default function ViewAppointment() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <motion.div
          className="flex flex-col md:flex-row"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Doctor Image */}
          <div className="md:w-1/3 bg-gradient-to-r from-blue-600 to-sky-500 p-8 flex items-center justify-center">
            <motion.img
              src={appointment.image}
              alt={appointment.doctor}
              className="w-48 h-48 object-cover rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Appointment Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Appointment with {appointment.doctor}
            </h1>
            <p className="text-lg text-blue-600">{appointment.specialty}</p>
            <p className="text-gray-600 mt-2">{appointment.location}</p>
            <p className="text-gray-700 mt-4">
              <span className="font-semibold">Date:</span> {appointment.date}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Time:</span> {appointment.time}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Phone:</span> {appointment.contact.phone}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Email:</span> {appointment.contact.email}
            </p>
            <p className="text-gray-700 mt-4">
              <span className="font-semibold">Notes:</span> {appointment.notes}
            </p>
          </div>
        </motion.div>

        {/* Actions Section */}
        <motion.div
          className="p-8 bg-gradient-to-r from-blue-600 to-sky-500 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Actions</h2>
          <div className="flex justify-center space-x-4">
            <motion.button
              className="px-6 py-3 bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Reschedule Appointment
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Cancel Appointment
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
