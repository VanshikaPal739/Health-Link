'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik } from 'formik';
import Link from 'next/link';

export default function EditAppointmentPage() {
  const { id } = useParams(); // Get appointment ID from URL
  const router = useRouter();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointment/getbyid/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setAppointment(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch appointment details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token)
      fetchAppointmentDetails();
  }, [token]);

  const submitForm = async (values) => {
    try {
      await axios.put(`http://localhost:5000/appointment/update/${id}`, values, {
        headers: { 'x-auth-token': token },
      });
      toast.success('Appointment updated successfully!');
      router.push('/user/view-appointment'); // Redirect back to user view-appointments page
    } catch (error) {
      console.error(error);
      toast.error('Failed to update the appointment.');
    }
  };

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Appointment</h1>
      {appointment ? (
        <Formik initialValues={appointment} onSubmit={submitForm}>
          {(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <div className="space-y-4">             
                <div>
                  <label className="block text-gray-700 font-medium">Prescription</label>
                  <textarea
                    id="prescription"
                    name="prescription"
                    onChange={formProps.handleChange}
                    value={formProps.values.prescription || ''}
                    className="w-full border rounded-md p-2"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Report</label>
                  <textarea
                    id="report"
                    name="report"
                    onChange={formProps.handleChange}
                    value={formProps.values.report || ''}
                    className="w-full border rounded-md p-2"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Medicine</label>
                  <textarea
                    id="medicine"
                    name="medicine"
                    onChange={formProps.handleChange}
                    value={formProps.values.medicine || ''}
                    className="w-full border rounded-md p-2"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Test</label>
                  <textarea
                    id="test"
                    name="test"
                    onChange={formProps.handleChange}
                    value={formProps.values.test || ''}
                    className="w-full border rounded-md p-2"
                    rows="3"
                  ></textarea>
                </div>

                <div className="mt-6">
                  <Link href={"/user/view-appointment/"+appointment._id}
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600"
                  >
                    Update Appointment
                  </Link>
                 
                </div>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

