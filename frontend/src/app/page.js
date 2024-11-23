'use client';
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-800 text-white">

  {/* Main Navigation */}
  <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
    {/* Logo */}
    <h1 className="text-2xl font-bold">Care Link Hub</h1>

    {/* Navigation Links */}
    <nav className="hidden md:flex space-x-16">
      <a href="services" className="hover:text-gray-300 transition duration-300">
        Services
      </a>
      <a href="About" className="hover:text-gray-300 transition duration-300">
        About
      </a>
      <a href="browse-doctor" className="hover:text-gray-300 transition duration-300">
        Doctors
      </a>
      <a href="news" className="hover:text-gray-300 transition duration-300">
        News
      </a>
      <a href="contact" className="hover:text-gray-300 transition duration-300">
        Contact
      </a>
    </nav>

    {/* Social Icons */}
    <div className="flex items-center space-x-4">
      <a href="#" className="text-white hover:text-gray-300">
        <i className="fab fa-facebook-f"></i> {/* Replace with react-icons if necessary */}
      </a>
      <a href="#" className="text-white hover:text-gray-300">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" className="text-white hover:text-gray-300">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</header>


      <header className="relative bg-gray-100">
  {/* Background Image and Overlay */}
  <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://m.media-amazon.com/images/I/81Js2zC+-xL.jpg')" }}>
    <div className="absolute inset-0 bg-black/40"></div>
  </div>

  {/* Content on top of the image */}
  <div className="absolute top-0 left-0 right-0 h-full flex items-center px-6 md:px-12 lg:px-20">
    <div className="text-white space-y-6 max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        The Hospital of the <span className="text-blue-800">future, today.</span>
      </h1>
      <p className="text-lg">
        Quisquam suspendisse elementum gravida fusce massa enim accumsan
        faucibus vel facilisis.
      </p>
      <div className="flex gap-4 mt-4">
        <a herf="signup" 
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg">
          Learn More
        </a>
        <a href="login"
         className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
          Get Started
        </a>
      </div>
    </div>
  </div>

  {/* Features Section */}
  <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 transform translate-y-1/2">
    <section className="bg-white py-4 mt-32">
      <div className="container mx-auto px-6">
        {/* Grid for Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Feature Card */}
          <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
            <div className="text-blue-600 text-3xl mb-4">
              {/* Replace with an appropriate icon */}
              👩‍⚕️
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Professional Staff
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
            <div className="text-green-600 text-3xl mb-4">
              {/* Replace with an appropriate icon */}
              💰
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Affordable Prices
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
            <div className="text-purple-600 text-3xl mb-4">
              {/* Replace with an appropriate icon */}
              ⭐
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Great Services
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
            <div className="text-pink-600 text-3xl mb-4">
              {/* Replace with an appropriate icon */}
              💬
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Free Consultation
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</header>


      


<section className="bg-gray-50 py-40">
      <div className="container mx-auto px-8">       
        {/* Middle Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              We Provide Finest Patient's Care & Amenities
            </h2>
            <ul className="list-disc ml-8 text-gray-800 space-y-2 text-md">
              <li>Advanced medical technology for accurate diagnoses.</li>
              <li>Qualified and experienced medical professionals.</li>
              <li>24/7 emergency and non-emergency services.</li>
              <li>Comfortable, hygienic, and modern facilities.</li>
              <li>Secure online platform for patient records.</li>
            </ul>
            <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700">
              Learn More
            </button>
          </div>
          <div className="flex-1 mt-10 md:mt-0 md:ml-10">
            <div className="relative">
              <img
                src="https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534_1280.jpg"
                alt="Doctor with Equipment"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-purple-700 text-white p-4 rounded-lg shadow-md">
                <p className="text-2xl font-bold">22</p>
                <p>Specialists</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-blue-700 text-white p-4 rounded-lg shadow-md">
                <p className="text-2xl font-bold">5k+</p>
                <p>Happy Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-14 px-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            We Serve In Different Areas For Our Patients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-2">
            {/* Feature Cards */}
            {[
              { title: 'Surgery', icon: '🔬' },
              { title: 'Cardiology', icon: '❤️' },
              { title: 'Neurology', icon: '🧠' },
              { title: 'Orthopedics', icon: '🦴' },
              { title: 'Dentistry', icon: '🦷' },
              { title: 'Dermatology', icon: '🌟' },
              { title: 'Pediatrics', icon: '👶' },
              { title: 'Fitness & Nutrition', icon: '🍎' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>


      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8 ">
        <div className="container mx-auto text-center">
          <p className="animate-fade-in">© 2024 Healthcare Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
