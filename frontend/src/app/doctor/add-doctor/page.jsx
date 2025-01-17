'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik } from 'formik';

const AddDoctor = () => {
  const router = useRouter();

  const [doctorData, setDoctorData] = useState(null);
  const token = localStorage.getItem('token');

  const getDoctorData = async () => {
    const res = await axios.get('http://localhost:5000/doctor/get-detail', {
      headers: {
        'x-auth-token': token
      }
    });
    console.log(res.data);
    setDoctorData(res.data);
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

  // const updateForm = useupdateForm({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     password: '',
  //     specialization: '',
  //     experience: '',
  //     bio: '',
  //     contact: '',
  //     address: '',
  //     image: '',
  //   },

  
  //   validationSchema: DctorSchema,

  //   onSubmit: async (values, { resetForm, setSubmitting }) => {
  //     try {
  //       await axios.post('http://localhost:5000/doctor/add', values);
  //       toast.success('Doctor added successfully!');
  //       resetForm();
  //       router.push('/browse-doctor');
  //     } catch (error) {
  //       toast.error('Error adding doctor');
  //       console.error(error);
  //       setSubmitting(false);
  //     }
  //   },
  // });

  const uploadFile = (e) => {
    const file = e.target.files[0];
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
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Add Doctor</h1>

        {
          doctorData !== null ? (
            <Formik initialValues={doctorData} onSubmit={submitForm}>
              {
                (updateForm) => {
                  return (
                    <form onSubmit={updateForm.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          id="name"
                          value={updateForm.values.name}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.name && updateForm.errors.name ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Full Name"
                        />
                        {updateForm.touched.name && updateForm.errors.name && <p className="text-xs text-red-500 mt-1">{updateForm.errors.name}</p>}
                      </div>
      
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={updateForm.values.email}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.email && updateForm.errors.email ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Email Address"
                        />
                        {updateForm.touched.email && updateForm.errors.email && <p className="text-xs text-red-500 mt-1">{updateForm.errors.email}</p>}
                      </div>
      
                      {/* Password */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                          type="password"
                          id="password"
                          value={updateForm.values.password}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.password && updateForm.errors.password ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Password"
                        />
                        {updateForm.touched.password && updateForm.errors.password && <p className="text-xs text-red-500 mt-1">{updateForm.errors.password}</p>}
                      </div>
      
                      {/* Specialization */}
                      <div>
                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
                        <input
                          type="text"
                          id="specialization"
                          value={updateForm.values.specialization}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.specialization && updateForm.errors.specialization ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Specialization"
                        />
                        {updateForm.touched.specialization && updateForm.errors.specialization && <p className="text-xs text-red-500 mt-1">{updateForm.errors.specialization}</p>}
                      </div>
      
                      {/* Experience */}
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                        <input
                          type="number"
                          id="experience"
                          value={updateForm.values.experience}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.experience && updateForm.errors.experience ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Years of Experience"
                        />
                        {updateForm.touched.experience && updateForm.errors.experience && <p className="text-xs text-red-500 mt-1">{updateForm.errors.experience}</p>}
                      </div>
      
                      {/* Bio */}
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        <input
                          type="text"
                          id="bio"
                          value={updateForm.values.bio}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.bio && updateForm.errors.bio ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Short Bio"
                        />
                        {updateForm.touched.bio && updateForm.errors.bio && <p className="text-xs text-red-500 mt-1">{updateForm.errors.bio}</p>}
                      </div>
      
                      {/* Contact */}
                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                        <input
                          type="text"
                          id="contact"
                          value={updateForm.values.contact}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.contact && updateForm.errors.contact ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Contact Number"
                        />
                        {updateForm.touched.contact && updateForm.errors.contact && <p className="text-xs text-red-500 mt-1">{updateForm.errors.contact}</p>}
                      </div>
      
                      {/* Address */}
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                          type="text"
                          id="address"
                          value={updateForm.values.address}
                          onChange={updateForm.handleChange}
                          onBlur={updateForm.handleBlur}
                          className={`w-full p-2 border rounded-lg ${updateForm.touched.address && updateForm.errors.address ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-300'}`}
                          placeholder="Address"
                        />
                        {updateForm.touched.address && updateForm.errors.address && <p className="text-xs text-red-500 mt-1">{updateForm.errors.address}</p>}
                      </div>
      
                      {/* Image Upload */}
                      <div className="col-span-full">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                          type="file"
                          className="w-full p-2 border rounded-lg"
                          onChange={uploadFile}
                        />
                      </div>
                    </div>
      
                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={updateForm.isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-500"
                      >
                        Add Doctor
                      </button>
                    </div>
                  </form>

                  )
                }
              }

         
            </Formik>
          ) : (<div> Loading...</div>)}
      </div>
    </div>
  );
};

export default AddDoctor;
