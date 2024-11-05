'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';

const appointmentData = [
  {
    id: 1,
    doctor: 'Dr. John Doe',
    specialty: 'Cardiologist',
    date: '2024-09-30',
    time: '10:00 AM',
    location: 'New York, NY',
  },
  {
    id: 2,
    doctor: 'Dr. Sarah Lee',
    specialty: 'Dermatologist',
    date: '2024-10-02',
    time: '02:00 PM',
    location: 'Los Angeles, CA',
  },
  {
    id: 3,
    doctor: 'Dr. Michael Smith',
    specialty: 'Orthopedic',
    date: '2024-10-05',
    time: '01:00 PM',
    location: 'San Francisco, CA',
  },
];

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState(appointmentData);

  // Handler for canceling appointments
  const cancelAppointment = (id) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(updatedAppointments);
  };

  // Handler for rescheduling appointments (for simplicity, it just updates the time)
  const rescheduleAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, time: '12:00 PM' }; // Example time change
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <motion.h1
          className="text-4xl font-bold text-center text-blue-700 py-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Manage Appointments
        </motion.h1>

        <div className="p-6">
          {appointments.length === 0 ? (
            <motion.div
              className="text-center text-xl text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No appointments available.
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {appointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    {appointment.doctor}
                  </h2>
                  <p className="text-lg">{appointment.specialty}</p>
                  <p className="text-lg mt-4">
                    Date: <span className="font-semibold">{appointment.date}</span>
                  </p>
                  <p className="text-lg">
                    Time: <span className="font-semibold">{appointment.time}</span>
                  </p>
                  <p className="text-lg mt-2">
                    Location: <span className="font-semibold">{appointment.location}</span>
                  </p>

                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={() => rescheduleAppointment(appointment.id)}
                      className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}



