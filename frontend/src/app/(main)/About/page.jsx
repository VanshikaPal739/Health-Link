'use client'
import { motion } from 'framer-motion';

export default function AboutPage() {
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
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-lg">
            Discover who we are and what drives us to connect patients and doctors in a seamless experience.
          </p>
        </motion.div>

        {/* About Us Section */}
        <motion.div
          className="p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            We are committed to improving healthcare access by connecting patients with the best doctors online. Our platform makes it easy to book appointments, manage healthcare, and stay in touch with trusted professionals—all from the comfort of your home.
          </p>
          
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our vision is to revolutionize the healthcare system through technology. By bringing patients and doctors closer, we ensure that everyone receives the care they deserve, wherever they are.
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {/* Team Member 1 */}
            <motion.div
              className="text-center p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 1"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-500">CEO & Founder</p>
              <p className="mt-2 text-gray-600">
                Passionate about healthcare and technology, John founded the company with a vision to create a seamless platform for doctor-patient connections.
              </p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              className="text-center p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 2"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-500">Chief Medical Officer</p>
              <p className="mt-2 text-gray-600">
                With years of experience in the medical field, Jane ensures our platform maintains high standards of care and compliance.
              </p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              className="text-center p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 3"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">David Lee</h3>
              <p className="text-gray-500">CTO</p>
              <p className="mt-2 text-gray-600">
                David leads our technology team, ensuring that our platform runs smoothly and meets the needs of both doctors and patients.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="bg-blue-600 text-white text-center py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold">Join Us in Revolutionizing Healthcare</h2>
          <p className="mt-4 text-lg">
            Whether you're a patient looking for the best care, or a doctor wanting to join our platform, we’d love to hear from you!
          </p>
          <motion.button
            className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
