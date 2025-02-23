"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaStar, FaStethoscope, FaUserMd } from "react-icons/fa";

const BrowseDoctors = () => {
  const runOnce = useRef(false);
  const [doctorList, setDoctorList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const { doctor } = useParams();

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

  const searchDoctor = (e) => {
    const keyword = e.target.value.toLowerCase();
    setDoctorList(
      masterList.filter((doctor) =>
        doctor.name.toLowerCase().includes(keyword)
      )
    );
  };

  const filterCategory = (specialization) => {
    if (specialization === "") {
      setDoctorList(masterList);
      return;
    }
    setDoctorList(
      masterList.filter((doctor) =>
        doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.header 
        className="relative w-full h-[40vh] bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10 bg-cover bg-center" />
        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Perfect Doctor
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Expert Healthcare at Your Fingertips
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Search & Filter Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name..."
                onChange={searchDoctor}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
            </div>
            <select
              onChange={(e) => filterCategory(e.target.value)}
              className="py-4 px-6 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 cursor-pointer"
            >
              <option value="">All Specialties</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Homopathy">Homopathy</option>
              <option value="Dentist">Dentist</option>
              <option value="Pulmonologist">Pulmonologist</option>
            </select>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12"
        >
          {doctorList.length > 0 ? (
            doctorList.map((doctor) => (
              <motion.div
                key={doctor._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
              >
                <div className="relative">
                  <img
                    src={process.env.NEXT_PUBLIC_API_URL + "/" + doctor.image || "/api/placeholder/400/300"}
                    alt={doctor.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {doctor.specialization}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {doctor.name}
                  </h2>
                  <div className="flex items-center mt-2 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-200"}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">{doctor.rating}</span>
                  </div>
                  <p className="mt-3 text-gray-600 line-clamp-2">{doctor.bio}</p>
                  <Link
                    href={`/view-doctor/${doctor._id}`}
                    className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform group-hover:scale-[1.02]"
                  >
                    <FaUserMd className="mr-2" />
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              variants={itemVariants}
              className="col-span-full text-center py-12"
            >
              <FaStethoscope className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">No doctors found matching your criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseDoctors;