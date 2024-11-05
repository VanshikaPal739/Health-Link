'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: '',
    bio: ''
  });
  const [formData, setFormData] = useState({}); // State for form inputs

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user/profile'); // Adjust to your actual endpoint
        setUser(res.data); // Populate the user data
        setFormData(res.data); // Set the form data with the fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  // Toggle editing state
  const handleEditToggle = () => {
    setEditing(!editing);
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission and send updated data to the backend
  const handleSaveChanges = async () => {
    try {
      const res = await axios.put('http://localhost:5000/user/profile', formData); // Adjust endpoint & method as needed
      setUser(res.data); // Update the displayed user data with the response
      setEditing(false); // Exit editing mode
      console.log('Profile updated successfully:', res.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <motion.div
          className="p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center">
            {/* User Image */}
            <motion.img
              src={user.image || 'https://via.placeholder.com/150'} // Use a placeholder if no image
              alt={user.name}
              className="w-40 h-40 object-cover rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />

            {/* User Info */}
            <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-gray-600">{user.bio}</p>

              <motion.button
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                onClick={handleEditToggle}
                whileHover={{ scale: 1.05 }}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* User Details Section */}
        <motion.div
          className="p-8 bg-gradient-to-r from-blue-600 to-sky-500 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

          {/* Edit Form (if editing) */}
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm">Bio</label>
                <textarea
                  name="bio"
                  className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="4"
                  value={formData.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="md:col-span-2 flex justify-center mt-4">
                <motion.button
                  className="px-6 py-2 bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </motion.button>
              </div>
            </div>
          ) : (
            // Display user details (if not editing)
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg">
                  <span className="font-semibold">Email: </span>
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-lg">
                  <span className="font-semibold">Phone: </span>
                  {user.phone}
                </p>
              </div>
              <div>
                <p className="text-lg">
                  <span className="font-semibold">Address: </span>
                  {user.address}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg">
                  <span className="font-semibold">Bio: </span>
                  {user.bio}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

