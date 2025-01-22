'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ManageAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/appointment/getappointment', {
        headers: { 'x-auth-token': token },
      });
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <motion.div
          className="text-center py-12 bg-gradient-to-r from-blue-600 to-teal-500 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold">Manage Appointments</h1>
          <p className="mt-4 text-lg">View and manage all booked appointments.</p>
        </motion.div>

        {/* Appointments Table Section */}
        <motion.div
          className="p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Booked Appointments</h2>

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Patient Name</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Report</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b">
                  <td className="py-3 px-4">{appointment.patient?.name || 'N/A'}</td>
                  <td className="py-3 px-4">{appointment.slot?.date || 'N/A'}</td>
                  <td className="py-3 px-4">{appointment.slot?.time || 'N/A'}</td>
                  <td className="py-3 px-4">{appointment.prescription || 'N/A'}</td>
                  <td className="py-3 px-4">{appointment.prescribedTest || 'N/A'}</td>
                  <td className="py-3 px-4 capitalize">{appointment.status}</td>
                  <td className="py-3 px-4">
                    {appointment.status === 'booked' ? (
                    <Link href={"/doctor/edit-appointment/"+appointment._id}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        View/Edit Appointment
                        </Link>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`https://zoom.us/j/${appointment.doctor?.zoomLink || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      Join Video Call
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <p className="text-center text-gray-600 mt-6">No appointments available.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
