"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "next/navigation"; // Correct import for Next.js routing
import Link from "next/link";
import { FaSearch } from "react-icons/fa"; // Import search icon

const BrowseDoctors = () => {
  const runOnce = useRef(false);
  const [doctorList, setDoctorList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const { doctor } = useParams();

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/doctor/getall");
      setDoctorList(res.data);
      setMasterList(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    if (!runOnce.current) {
      fetchDoctors();
      runOnce.current = true;
    }
  }, []);

  // Search doctors
  const searchDoctor = (e) => {
    const keyword = e.target.value.toLowerCase();
    setDoctorList(
      masterList.filter((doctor) =>
        doctor.name.toLowerCase().includes(keyword)
      )
    );
  };

  // Filter doctors by specialization
  const filterCategory = (specialization) => {
    setDoctorList(
      masterList.filter((doctor) =>
        doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative w-full h-[30vh] bg-blue-600 text-white flex flex-col justify-center items-center shadow-lg">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-wide text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Find & Book Your Doctor
        </motion.h1>
        <p className="mt-2 text-lg md:text-xl font-light">
          Search for specialists and book appointments
        </p>
      </header>

      {/* Search & Filter Section */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8 items-center"
        >
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search doctor by name..."
              onChange={searchDoctor}
              className="w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
            />
            <FaSearch className="absolute right-4 top-4 text-gray-500" />
          </div>

          <select
            onChange={(e) => filterCategory(e.target.value)}
            className="w-full md:w-1/3 px-6 py-3 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
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
                key={doctor._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-transform transform duration-300 hover:shadow-2xl border border-gray-200"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + "/" + doctor.image || "/default-doctor.jpg"}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-gray-500">{doctor.bio}</p>
                  <p className="text-yellow-500 mt-2">⭐ {doctor.rating}</p>
                  <Link
                    href={`/view-doctor/${doctor._id}`}
                    className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-lg transition duration-300 inline-block"
                  >
                    View Doctor
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No doctors found</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseDoctors;
