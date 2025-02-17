'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
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
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">MEDICAL APPOINTMENT CALENDAR</h1>
        </div>

        {/* Doctor Details Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">DOCTOR DETAILS</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-semibold">Dr. John Williams</p>
            </div>
            <div>
              <p className="text-gray-600">Specialization:</p>
              <p className="font-semibold">Cardio Surgeon</p>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left">DATE</th>
                <th className="py-3 px-4 text-left">PATIENT NAME</th>
                <th className="py-3 px-4 text-left">REASON FOR VISIT</th>
                <th className="py-3 px-4 text-left">STATUS</th>
                <th className="py-3 px-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{appointment.slot?.date || 'N/A'}</td>
                  <td className="py-3 px-4">{appointment.patient?.name || 'N/A'}</td>
                  <td className="py-3 px-4">{appointment.prescribedTest || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      appointment.status === 'booked' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {appointment.status === 'booked' && (
                        <Link
                          href={"/doctor/edit-appointment/"+appointment._id}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </Link>
                      )}
                      <a
                        href={`https://zoom.us/j/${appointment.doctor?.zoomLink || ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Video Call
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appointments available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}