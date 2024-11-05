'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300">
      {/* Navbar */}
      <motion.nav
        className="fixed w-full bg-blue-600 text-white py-4 px-6 shadow-lg z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold hover:text-blue-200 transition duration-300">
              Doctor Connect
            </span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-200 transition duration-300">
              Home
            </Link>
            <Link href="About" className="hover:text-blue-200 transition duration-300">
              About
            </Link>
            <Link href="browse-doctor" className="hover:text-blue-200 transition duration-300">
              Doctors
            </Link>
            <Link href="contact" className="hover:text-blue-200 transition duration-300">
              Contact
            </Link>
            <Link href="book-appointment">
              <span className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition duration-300">
                Book Appointment
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-600 to-sky-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold mb-4">Welcome to Doctor Connect</h1>
        <p className="text-xl mb-8">Connecting you with the best doctors, anytime, anywhere</p>
        <Link
        href="book-appointment"
          className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Book an Appointment
        </Link>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="py-16 bg-white text-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="p-8 bg-blue-50 rounded-lg shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">24/7 Doctor Access</h3>
              <p className="text-gray-600">
                Get access to top doctors anytime, anywhere through our platform.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="p-8 bg-blue-50 rounded-lg shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your health data is safe with us, with advanced encryption protocols.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="p-8 bg-blue-50 rounded-lg shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Specialized Care</h3>
              <p className="text-gray-600">
                Choose from a range of specialists in various medical fields.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 mb-4">
                “Doctor Connect made it easy for me to book an appointment with a specialist without any hassle. The service was fantastic!”
              </p>
              <p className="text-blue-600 font-bold">- Sarah Johnson</p>
            </motion.div>
            {/* Testimonial 2 */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 mb-4">
                “I was able to consult a doctor late at night, and it was extremely helpful. Highly recommend Doctor Connect!”
              </p>
              <p className="text-blue-600 font-bold">- John Doe</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="py-16 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Connect with a Doctor?</h2>
        <motion.button
          className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </motion.div>  

    </div>
  );
}