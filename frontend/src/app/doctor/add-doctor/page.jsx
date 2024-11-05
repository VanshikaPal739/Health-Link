'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

// Validation Schema for the form
const DctorSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.string().required('Contact is required'),
  address: Yup.string().required('Address is required'),
  specialization: Yup.string().required('Specialization is required'),
  experience: Yup.number().min(0, 'Experience must be a positive number').required('Experience is required'),

  // image: Yup.string().url('Invalid URL').required('Image URL is required'),
});


const AddDoctor = () => {
  const router = useRouter();

  // Formik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      specialization: '',
      experience: '',
      bio: '',
      contact: '',
      address: '',
      image: ''
    },

    validationSchema: DctorSchema,


    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axios.post('http://localhost:5000/doctor/add', values);
        toast.success('Doctor added successfully!');
        resetForm();
        router.push('/browse-doctor'); // Redirect after successful submission
      } catch (error) {
        toast.error('Error adding doctor');
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,

    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        res.json().then(data => {
          console.log(data);
          formik.setFieldValue('image', data.filename);

        })
      }
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Add Doctor</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"

              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter doctor's name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>


          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"

              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter doctor's email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>


          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter doctor's password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>


          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <input
              type="text"
              id="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.bio && formik.errors.bio ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter doctor's bio"
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.bio}</p>
            )}
          </div>


          {/* Specialty Field */}
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">specialization</label>
            <input
              type="text"

              id="specialization"
              value={formik.values.specialization}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.specialization && formik.errors.specialization ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter doctor's specialization"
            />
            {formik.touched.specialization && formik.errors.specialization && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.specialization}</p>
            )}
          </div>


          {/* Experience Field */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (Years)</label>
            <input
              type="number"
              id="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.experience && formik.errors.experience ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter years of experience"
            />
            {formik.touched.experience && formik.errors.experience && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.experience}</p>
            )}
          </div>


          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              id="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.contact && formik.errors.contact ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter doctor's contact"
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.contact}</p>
            )}
          </div>


          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">address</label>
            <input
              type="text"

              id="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm ${formik.touched.address && formik.errors.address ? 'border-red-500' : 'focus:border-blue-500'
                }`}
              placeholder="Enter doctor's address"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.address}</p>
            )}
          </div>


          {/* Image URL Field */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input type="file"
              className="w-full p-3 border border-black text-black rounded-lg focus:border-blue-600"
              onChange={uploadFile}
            />
          </div>


          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddDoctor;
