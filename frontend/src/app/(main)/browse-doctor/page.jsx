'use client'; // This ensures the component is treated as a Client Component
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'next/navigation'; // Ensure you are importing correctly
import Link from 'next/link';


const BrowseDoctors = () => {
  const runOnce = useRef(false);
  const [doctorList, setDoctorList] = useState([]); // Holds list of doctors
  const [masterList, setMasterList] = useState([]); // Master list for filtering
  const { doctor } = useParams(); // If you're using dynamic routes with params (e.g., /doctor/:doctorId)


  // Fetch doctors data from the backend API in the client component
  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/doctor/getall'); // Ensure your API route is correct
      setDoctorList(res.data);  // Save the fetched doctors to state
      setMasterList(res.data);  // Save a master copy for filtering
      console.log(res.data);
      
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Fetch doctors only once when component mounts
  useEffect(() => {
    if (!runOnce.current) {
      fetchDoctors();  // Fetch data from the backend
      runOnce.current = true;
    }
  }, []);

  // Search doctors based on the input keyword
  const searchDoctor = (e) => {
    const keyword = e.target.value.toLowerCase();
    setDoctorList(
      masterList.filter((doctor) =>
        doctor.name.toLowerCase().includes(keyword)
      )
    );
  };

  // Filter doctors by specialty
  const filterCategory = (specialization) => {
    setDoctorList(
      masterList.filter((doctor) =>
        doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300">
      {/* Medium Header Section */}
      <header className="relative w-full h-[40vh] bg-gradient-to-r from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-wide"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Browse & Book Your Doctor
          </motion.h1>
          <p className="mt-2 text-lg md:text-xl font-light tracking-wide">
            Find specialists and book appointments easily
          </p>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Search & Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-12 items-center"
        >
          <input
            type="text"
            placeholder="Search by name"
            onChange={searchDoctor}
            className="w-full md:w-1/2 px-6 py-3 rounded-lg bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
          />

          <select
            onChange={(e) => filterCategory(e.target.value)}
            className="w-full md:w-1/4 px-6 py-3 rounded-lg bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
          >
            <option value="">All Specialties</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Homopathy">Homopathy</option>
            <option value="Dentist">Dentist</option>
            <option value="Pulmonologist">Pulmonologist</option>
          </select>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {doctorList.length > 0 ? (
            doctorList.map((doctor) => (
              <motion.div
                key={doctor.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_URL+'/'+doctor.image || '/default-doctor-image.jpg'} // Add fallback for image
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-gray-500">{doctor.bio}</p>
                  <p className="text-yellow-500 mt-2">
                    Rating: {doctor.rating} ⭐
                  </p>
                  <Link 
                  href={"/view-doctor/"+doctor._id}
                  className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition duration-300">
                    View Doctor
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600">No doctors found</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};


export default BrowseDoctors;