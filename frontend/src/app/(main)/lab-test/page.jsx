'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const LabTests = () => {
  const [topBookedTests, setTopBookedTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

    // Fetch Top Booked Tests from the Backend
    useEffect(() => {
      const fetchTopBookedTests = async () => {
        try {
          const response = await fetch('http://localhost:5000/labtest/getall');
          const data = await response.json();
          setTopBookedTests(data);
        } catch (error) {
          console.error('Error fetching top booked tests:', error);
        }
      };
      fetchTopBookedTests();
    }, []);
    
  
    // Function to handle search query input
    const handleSearch = (e) => {
      setSearchQuery(e.target.value.toLowerCase());
    };
 

  const healthConcerns = [
    { name: 'Fever', icon: '/icons/fever.svg' },
    { name: 'Diabetes', icon: '/icons/diabetes.svg' },
    { name: 'Skin', icon: '/icons/skin.svg' },
    { name: 'Kidney', icon: '/icons/kidney.svg' },
    { name: 'Digestion', icon: '/icons/digestion.svg' },
    { name: 'Cancer', icon: '/icons/cancer.svg' }
  ];

  const healthCheckupPackages = [
    { name: 'Active Professional Health Checkup', price: '₹2899', originalPrice: '₹3200', discount: '9% off', testsIncluded: '98 tests', targetAge: '41 - 60 years' },
    { name: 'Advanced Young Indian Health Checkup', price: '₹1999', originalPrice: '₹2800', discount: '29% off', testsIncluded: '64 tests', targetAge: '21 - 40 years' },
    { name: 'Comprehensive Active Professional Health Checkup', price: '₹4399', originalPrice: '₹5500', discount: '20% off', testsIncluded: '111 tests', targetAge: '41 - 60 years' }
  ];

  
  // Filter the tests and checkup packages based on the search query
  const filteredTests = topBookedTests.filter(test => test.name.toLowerCase().includes(searchQuery));
  const filteredPackages = healthCheckupPackages.filter(packageItem => packageItem.name.toLowerCase().includes(searchQuery));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Title */}
      <div className="bg-blue-600 py-8">
        <h1 className="text-center text-4xl font-bold text-white">Lab Tests</h1>
        <p className="text-center text-lg text-white mt-2">Book reliable lab tests at your convenience</p>
      </div>

      {/* Centering the Search Bar */}
      <div className="flex justify-center items-center py-6">
        <input
          type="text"
          placeholder="Search for tests or packages..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-2xl px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Centering the Content */}
      <div className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-5xl">
          {/* Top Booked Diagnostic Tests Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Top Booked Diagnostic Tests</h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredTests.map((test, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-800">{test.name}</h3>
                  <p className="text-gray-600 mt-2">{test.description}</p>
                  <p className="text-sm text-gray-500">{test.reportTime}</p>
                  <p className="mt-4 text-lg font-semibold text-blue-600">{test.price}</p>
                  <button className="block mt-4 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Add</button>
                </div>
              ))}
            </div>
          </section>

          {/* Find Tests by Health Concern Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Find Tests by Health Concern</h2>
            <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {healthConcerns.map((concern, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
                  <img src={concern.icon} alt={concern.name} className="w-16 h-16" />
                  <h3 className="text-lg font-bold text-gray-800 mt-4">{concern.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Health Checkup Packages */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Popular Health Checkup Packages</h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredPackages.map((packageItem, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-800">{packageItem.name}</h3>
                  <p className="text-sm text-gray-500">Ideal for individuals aged {packageItem.targetAge}</p>
                  <p className="text-sm text-gray-500">{packageItem.testsIncluded} tests included</p>
                  <p className="mt-4 text-lg font-semibold text-blue-600">{packageItem.price}</p>
                  <p className="text-sm text-gray-500 line-through">{packageItem.originalPrice}</p>
                  <p className="text-sm text-green-600">{packageItem.discount}</p>
                  <button className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Book Now</button>
                </div>
              ))}
            </div>
          </section>

          {/* Why Book With Us Section */}
          <section className="py-10 bg-gray-50 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why book with us?</h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <img src="/icons/free-sample.svg" alt="Free Sample Collection" className="w-12 h-12 mb-2" />
                <p className="font-semibold text-gray-700">Home sample collection for FREE</p>
                <p className="text-sm text-gray-500">A certified professional will collect your sample from your preferred location</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/icons/report-day.svg" alt="Digital Report" className="w-12 h-12 mb-2" />
                <p className="font-semibold text-gray-700">Get your reports online in a day</p>
                <p className="text-sm text-gray-500">Access your reports from your personal dashboard</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/icons/save-health.svg" alt="Affordable Health Tests" className="w-12 h-12 mb-2" />
                <p className="font-semibold text-gray-700">Save up to 40% on health tests</p>
                <p className="text-sm text-gray-500">Get the best deals and save on your health tests</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LabTests;
