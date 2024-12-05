'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Formik } from 'formik';

const UserProfile = () => {

  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');


  const getUserData = async () => {
    const res = await axios.get('http://localhost:5000/user/getall', {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log(res.data);
    setUserData(res.data);

  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateUserData = async () => {
    axios.put(`http://localhost:5000/user/update`, data, {
      headers: {
        'x-auth-token': token,
      },
    })
      .then((result) => {
        toast.success('User Information Updated');
        // router.back();
        console.log(result.data);

        setUserData(result.data);
      }).catch((err) => {
        console.log(err);
        toast.error('Unable to update the User Information');

      });
  };

  const submitForm = (values) => {
    console.log(values);
    updateUser(values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {userData !== null ? (
          <Formik initialValues={userData} onSubmit={submitForm}>
            {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>


                  {/* Address */}
                  <div>
                    <label className="block mb-2 text-sm">Address</label>
                    <input
                      type="text"
                      id="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {touched.address && errors.address && (
                      <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>


                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block mb-2 text-sm">Bio</label>
                    <input
                      type="text"
                      id="bio"
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {touched.bio && errors.bio && (
                      <p className="text-xs text-red-500 mt-1">{errors.bio}</p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}


export default UserProfile;