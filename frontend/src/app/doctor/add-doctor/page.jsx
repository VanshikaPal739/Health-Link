'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik } from 'formik';

const AddDoctor = () => {
  const router = useRouter();

  const [doctorData, setDoctorData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem('token');

  const getDoctorData = async () => {
    const res = await axios.get('http://localhost:5000/doctor/get-detail', {
      headers: {
        'x-auth-token': token
      }
    });
    console.log(res.data);
    setDoctorData(res.data);
    if (res.data.image) {
      setImagePreview(`http://localhost:5000/uploads/${res.data.image}`);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const updateDoctor = async (data) => {
    axios.put(`http://localhost:5000/doctor/update`, data, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((result) => {
        toast.success('Doctor Information Updated');
        // router.back();
        console.log(result.data);
        
        setDoctorData(result.data);
      }).catch((err) => {
        console.log(err);
        toast.error('Unable to update the Doctor Information');
      });
  }

  const submitForm = (values) => {
    console.log(values);
    updateDoctor(values);
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    
    const fd = new FormData();
    fd.append('myfile', file);
    fetch('http://localhost:5000/util/uploadfile', {
      method: 'POST',
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          // updateForm.setFieldValue('image', data.filename);
          updateDoctor({image: data.filename});
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-200 to-blue-400 py-8 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Doctor Profile
          </h1>
          <p className="mt-2 text-gray-600">Update your professional information</p>
        </div>

        {
          doctorData !== null ? (
            <Formik initialValues={doctorData} onSubmit={submitForm}>
              {
                (updateForm) => {
                  return (
                    <form onSubmit={updateForm.handleSubmit}>
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Column - Image and Basic Info */}
                        <div className="w-full md:w-1/3 space-y-4">
                          <div className="text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg">
                              {imagePreview ? (
                                <img 
                                  src={imagePreview} 
                                  alt="Doctor profile" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                                  <span className="text-indigo-400 text-3xl">📷</span>
                                </div>
                              )}
                            </div>
                            <label className="block">
                              <span className="sr-only">Choose profile photo</span>
                              <input 
                                type="file"
                                className="block w-full text-sm text-slate-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-indigo-50 file:text-indigo-700
                                  hover:file:bg-indigo-100"
                                onChange={uploadFile}
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>

                          <div className="space-y-3 bg-indigo-50 p-3 rounded-lg">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                              <input
                                type="text"
                                id="name"
                                value={updateForm.values.name}
                                onChange={updateForm.handleChange}
                                onBlur={updateForm.handleBlur}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.name && updateForm.errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                                placeholder="Dr. Jane Smith"
                              />
                              {updateForm.touched.name && updateForm.errors.name && <p className="mt-1 text-sm text-red-600">{updateForm.errors.name}</p>}
                            </div>

                            <div>
                              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
                              <input
                                type="text"
                                id="specialization"
                                value={updateForm.values.specialization}
                                onChange={updateForm.handleChange}
                                onBlur={updateForm.handleBlur}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.specialization && updateForm.errors.specialization ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                                placeholder="Cardiology"
                              />
                              {updateForm.touched.specialization && updateForm.errors.specialization && <p className="mt-1 text-sm text-red-600">{updateForm.errors.specialization}</p>}
                            </div>

                            <div>
                              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                              <input
                                type="number"
                                id="experience"
                                value={updateForm.values.experience}
                                onChange={updateForm.handleChange}
                                onBlur={updateForm.handleBlur}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.experience && updateForm.errors.experience ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                                placeholder="10"
                              />
                              {updateForm.touched.experience && updateForm.errors.experience && <p className="mt-1 text-sm text-red-600">{updateForm.errors.experience}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Contact Details */}
                        <div className="w-full md:w-2/3 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                              <input
                                type="email"
                                id="email"
                                value={updateForm.values.email}
                                onChange={updateForm.handleChange}
                                onBlur={updateForm.handleBlur}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.email && updateForm.errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                                placeholder="doctor@example.com"
                              />
                              {updateForm.touched.email && updateForm.errors.email && <p className="mt-1 text-sm text-red-600">{updateForm.errors.email}</p>}
                            </div>

                            <div>
                              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                              <input
                                type="text"
                                id="contact"
                                value={updateForm.values.contact}
                                onChange={updateForm.handleChange}
                                onBlur={updateForm.handleBlur}
                                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.contact && updateForm.errors.contact ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                                placeholder="+1 (555) 123-4567"
                              />
                              {updateForm.touched.contact && updateForm.errors.contact && <p className="mt-1 text-sm text-red-600">{updateForm.errors.contact}</p>}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                              type="text"
                              id="address"
                              value={updateForm.values.address}
                              onChange={updateForm.handleChange}
                              onBlur={updateForm.handleBlur}
                              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.address && updateForm.errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                              placeholder="123 Medical Plaza, Suite 101, City, State ZIP"
                            />
                            {updateForm.touched.address && updateForm.errors.address && <p className="mt-1 text-sm text-red-600">{updateForm.errors.address}</p>}
                          </div>

                          <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Professional Bio</label>
                            <textarea
                              id="bio"
                              value={updateForm.values.bio}
                              onChange={updateForm.handleChange}
                              onBlur={updateForm.handleBlur}
                              rows={4}
                              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.bio && updateForm.errors.bio ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                              placeholder="Share your education, professional background, and areas of expertise..."
                            />
                            {updateForm.touched.bio && updateForm.errors.bio && <p className="mt-1 text-sm text-red-600">{updateForm.errors.bio}</p>}
                          </div>

                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Update Password (leave blank to keep current)</label>
                            <input
                              type="password"
                              id="password"
                              value={updateForm.values.password || ''}
                              onChange={updateForm.handleChange}
                              onBlur={updateForm.handleBlur}
                              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 ${updateForm.touched.password && updateForm.errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'}`}
                              placeholder="••••••••"
                            />
                            {updateForm.touched.password && updateForm.errors.password && <p className="mt-1 text-sm text-red-600">{updateForm.errors.password}</p>}
                          </div>

                          <div className="flex gap-4 pt-4">
                            <button
                              type="button"
                              onClick={() => router.back()}
                              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={updateForm.isSubmitting}
                              className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {updateForm.isSubmitting ? 'Updating...' : 'Update Profile'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )
                }
              }
            </Formik>
          ) : (
            <div className="p-8 text-center">
              <div className="animate-pulse">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-indigo-200"></div>
                <div className="h-4 bg-indigo-100 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-indigo-100 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-indigo-700 mt-4 font-medium">Loading doctor information...</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default AddDoctor;