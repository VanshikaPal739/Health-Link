'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');


  const getUserData = async () => {
    const res = await axios.get('http://localhost:5000/user/get-detail', {
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

  const updateUser = async () => {
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
          
          {
            userData !== null ? (
              <Formik initialValues={userData} onSubmit={submitForm}>
                {updateForm => {
                  return (
                    <form onSubmit={updateForm.handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block mb-2 text-sm">Name</label>
                          <input
                            type="text"
                            id="name"
                            value={updateForm.values.name}
                            onChange={updateForm.handleChange}
                            onBlur={updateForm.handleBlur}
                            className={`w-full px-4 py-2 rounded-lg ${updateForm.touched.name && updateForm.errors.name ? 'shadow-md focus:outline-none focus' : 'ring-2 focus:ring-blue-400'}`}
                            placeholder="Full Name"
                          />
                          {updateForm.touched.name && updateForm.errors.name && <p className="text-xs text-red-500 mt-1">{updateForm.errors.name}</p>}
                        </div>
                        {/* Email */}
                        <div>
                          <label className="block mb-2 text-sm">Email</label>
                          <input
                            type="text"
                            id="email"
                            value={updateForm.values.email}
                            onChange={updateForm.handleChange}
                            onBlur={updateForm.handleBlur}
                            className={`w-full px-4 py-2 rounded-lg ${updateForm.touched.email && updateForm.errors.email ? 'shadow-md focus:outline-none focus' : 'ring-2 focus:ring-blue-400'}`}
                            placeholder="Email Address"
                          />
                          {updateForm.touched.email && updateForm.errors.email && <p className="text-xs text-red-500 mt-1">{updateForm.errors.email}</p>}
                        </div>
                        {/* Address */}
                        <div>
                          <label className="block mb-2 text-sm">Address</label>
                          <input
                            type="text"
                            id="address"
                            value={updateForm.values.address}
                            onChange={updateForm.handleChange}
                            onBlur={updateForm.handleBlur}
                            className={`w-full px-4 py-2 rounded-lg ${updateForm.touched.address && updateForm.errors.address ? 'shadow-md focus:outline-none focus' : 'ring-2 focus:ring-blue-400'}`}
                            placeholder="Address"
                          />
                          {updateForm.touched.address && updateForm.errors.address && <p className="text-xs text-red-500 mt-1">{updateForm.errors.address}</p>}
                        </div>
                        {/* Phone */}
                        <div>
                          <label className="block mb-2 text-sm">Phone</label>
                          <input
                            type="number"
                            id="phone"
                            value={updateForm.values.phone}
                            onChange={updateForm.handleChange}
                            onBlur={updateForm.handleBlur}
                            className={`w-full px-4 py-2 rounded-lg ${updateForm.touched.phone && updateForm.errors.phone ? 'shadow-md focus:outline-none focus' : 'ring-2 focus:ring-blue-400'}`}
                            placeholder="Phone"
                          />
                          {updateForm.touched.phone && updateForm.errors.phone && <p className="text-xs text-red-500 mt-1">{updateForm.errors.phone}</p>}
                        </div>
                        {/* Bio */}
                        <div>
                          <label className="block mb-2 text-sm">Bio</label>
                          <input
                            type="text"
                            id="bio"
                            value={updateForm.values.bio}
                            onChange={updateForm.handleChange}
                            onBlur={updateForm.handleBlur}
                            className={`w-full px-4 py-2 rounded-lg ${updateForm.touched.bio && updateForm.errors.bio ? 'shadow-md focus:outline-none focus' : 'ring-2 focus:ring-blue-400'}`}
                            placeholder="Bio"
                          />
                          {updateForm.touched.bio && updateForm.errors.bio && <p className="text-xs text-red-500 mt-1">{updateForm.errors.bio}</p>}
                        </div>
                      </div>
                      {/* Submit Button */}
                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={updateForm.isSubmitting}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-500"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  );
                }}
          </Formik>
            ) : (<div> Loading...</div>)}
        </div>
      </div>
  );
}; 

                

export default UserProfile