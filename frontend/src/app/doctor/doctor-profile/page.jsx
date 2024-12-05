'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [doctorInfo, setDoctorInfo] = useState({
    name: "Dr. John Smith",
    specialization: "Cardiology",
    bio: "Dr. John Smith has over 15 years of experience in cardiology, dedicated to providing exceptional patient care. He believes in a holistic approach to healthcare, focusing on the well-being of each patient.",
    specialties: ["Cardiac Surgery", "Heart Failure Management", "Preventive Cardiology", "Electrophysiology"],
    email: "dr.johnsmith@example.com",
    phone: "(123) 456-7890",
  });

  // Handle editing input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save updates (for now, we'll just toggle the editing mode back)
  const handleSave = () => {
    setIsEditing(false);
    // Here you could also add a call to an API to save updated info.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        
        {/* Header Section */}
        <motion.div
          className="text-center py-12 bg-gradient-to-r from-blue-600 to-sky-500 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={doctorInfo.name}
              onChange={handleChange}
              className="text-5xl font-bold bg-transparent border-b-2 border-white focus:outline-none"
            />
          ) : (
            <h1 className="text-5xl font-bold">{doctorInfo.name}</h1>
          )}
          {isEditing ? (
            <input
              type="text"
              name="specialization"
              value={doctorInfo.specialization}
              onChange={handleChange}
              className="mt-4 text-lg bg-transparent border-b-2 border-white focus:outline-none"
            />
          ) : (
            <p className="mt-4 text-lg">{doctorInfo.specialization}</p>
          )}
        </motion.div>

        {/* Profile Section */}
        <motion.div
          className="flex flex-col md:flex-row p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Picture */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <motion.img
              src="https://via.placeholder.com/150"
              alt="Doctor"
              className="w-full h-auto rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
          </div>

          {/* Bio Section */}
          <div className="md:w-2/3 md:pl-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Biography</h2>
            {isEditing ? (
              <textarea
                name="bio"
                value={doctorInfo.bio}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-600 mb-6">{doctorInfo.bio}</p>
            )}

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Specialties</h3>
            {isEditing ? (
              <textarea
                name="specialties"
                value={doctorInfo.specialties.join(', ')}
                onChange={(e) => handleChange({ target: { name: "specialties", value: e.target.value.split(', ') } })}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {doctorInfo.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>
            )}

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h3>
            {isEditing ? (
              <>
                <input
                  type="email"
                  name="email"
                  value={doctorInfo.email}
                  onChange={handleChange}
                  className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="phone"
                  value={doctorInfo.phone}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-2">Email: {doctorInfo.email}</p>
                <p className="text-gray-600 mb-2">Phone: {doctorInfo.phone}</p>
              </>
            )}

            {/* Edit and Save Buttons */}
            <motion.button
              onClick={isEditing ? handleSave : toggleEdit}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </motion.button>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          className="p-12 bg-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Patient Reviews</h2>

          {/* Review 1 */}
          <div className="mb-4 border-b pb-4">
            <h3 className="font-semibold text-gray-800">Emily Johnson</h3>
            <p className="text-gray-600">“Dr. Smith is an amazing cardiologist. He took the time to 
              listen to my concerns and provided the best treatment options.”</p>
          </div>

          {/* Review 2 */}
          <div className="mb-4 border-b pb-4">
            <h3 className="font-semibold text-gray-800">Michael Brown</h3>
            <p className="text-gray-600">“I had a great experience with Dr. Smith. His expertise and care made me feel comfortable throughout my treatment.”</p>
          </div>

          {/* Review 3 */}
          <div className="mb-4 border-b pb-4">
            <h3 className="font-semibold text-gray-800">Sarah Wilson</h3>
            <p className="text-gray-600">“Highly recommend Dr. Smith! He is professional, caring, and truly cares about his patients.”</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
