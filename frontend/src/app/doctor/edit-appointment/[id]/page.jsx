'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik } from 'formik';
import Link from 'next/link';

export default function EditAppointmentPage() {
  const { id } = useParams();
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
      router.push('/user/view-appointment');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update the appointment.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen ">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-12 ">
      {/* Navigation Steps */}
      <div className="max-w-4xl mx-auto mb-8 ">
        <div className="bg-white bg-opacity-20 rounded-full p-2 flex justify-between">
        
        </div>
      </div>

      {/* Main Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-medium text-gray-800 mb-4">Update Appointment</h1>
          <p className="text-gray-600 mb-8">Enter the appointment details to update your medical record.</p>

          {appointment ? (
            <Formik initialValues={appointment} onSubmit={submitForm}>
              {(formProps) => (
                <form onSubmit={formProps.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Prescription</label>
                      <textarea
                        id="prescription"
                        name="prescription"
                        onChange={formProps.handleChange}
                        value={formProps.values.prescription || ''}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="Enter prescription details"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Report</label>
                      <textarea
                        id="report"
                        name="report"
                        onChange={formProps.handleChange}
                        value={formProps.values.report || ''}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="Enter report details"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Medicine</label>
                      <textarea
                        id="medicine"
                        name="medicine"
                        onChange={formProps.handleChange}
                        value={formProps.values.medicine || ''}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="Enter medicine details"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Test</label>
                      <textarea
                        id="test"
                        name="test"
                        onChange={formProps.handleChange}
                        value={formProps.values.test || ''}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="Enter test details"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="text-blue-600 font-medium hover:text-blue-700"
                    >
                      Back
                    </button>
                    <Link
                      href={"/user/view-appointment/"+appointment._id}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Appointment
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          ) : (
            <div className="text-center py-8">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}