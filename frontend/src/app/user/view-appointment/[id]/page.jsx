'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ViewAppointmentPage() {
  const { id } = useParams(); // Get appointment ID from URL
  const [appointments, setAppointments] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointment/getbyid/${id}`, {
        headers: { 'x-auth-token': token },
      });
      
      const data = response.data;
      // If the data is an object, wrap it in an array
      setAppointments(Array.isArray(data) ? data : [data]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch appointment details.', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAppointmentDetails();
  }, [token]);

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (appointments.length === 0) {
    return <h1 className="text-center mt-10">No Appointments Found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">View Appointments</h1>
      {appointments.map((appointment, index) => (
        <div key={index} className="space-y-4 border-b pb-4 mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-700">Date:</h2>
            <p>{appointment.date || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Time:</h2>
            <p>{appointment.time || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Status:</h2>
            <p>{appointment.status || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Prescription:</h2>
            <p>{appointment.prescription || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Report:</h2>
            <p>{appointment.report || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Medicine:</h2>
            <p>{appointment.medicine || 'N/A'}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Test:</h2>
            <p>{appointment.test || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
