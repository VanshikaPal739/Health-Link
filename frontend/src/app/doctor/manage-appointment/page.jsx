'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function BookedAppointmentsPage() {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const runOnce = useRef(false);

  // Retrieve token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  // Fetch logged-in doctor's details
  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/user/getbyid', {
        headers: { 'x-auth-token': token },
      });
      setDoctor(res.data);
    } catch (error) {
      console.error('Error fetching logged-in patient:', error);
      toast.error('Failed to fetch patient details');
    }
  };

  // Fetch booked appointments
  const fetchBookedAppointments = async () => {
    if (!token || !user?.id) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/appointment/getbyuser/${user.id}`,
        { headers: { 'x-auth-token': token } }
      );
      setBookedAppointments(res.data);
    } catch (error) {
      console.error('Error fetching booked appointments:', error);
      toast.error('Failed to fetch booked appointments');
    }
  };

  // Fetch doctor and appointments on component mount
  useEffect(() => {
    if (!runOnce.current && token) {
      fetchLoggedInUser();
      runOnce.current = true;
    }
  }, [token]);

  useEffect(() => {
    if (user?.id) {
      fetchBookedAppointments();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <motion.div
          className="text-center py-12 bg-gradient-to-r from-green-600 to-teal-500 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold">Booked Appointments</h1>
          <p className="mt-4 text-lg">View details of appointments booked by patients.</p>
        </motion.div>

        {/* Booked Appointments Table Section */}
        <motion.div
          className="p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Booked Appointments</h2>

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Patient Name</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="py-3 px-4">{appointment.patient}</td>
                  <td className="py-3 px-4">{appointment.date}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">{appointment.status}</td>
                  <td className="py-3 px-4">{appointment.contact}</td>
                  <td className="py-3 px-4 space-x-2">
                    {appointment.status !== 'Completed' && (
                      <button
                        onClick={() =>
                          toast.success('Further action logic can be added here!')
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Mark as Seen
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookedAppointments.length === 0 && (
            <p className="text-center text-gray-600 mt-6">No booked appointments available.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
