'use client';
import React from 'react'
import { FaStethoscope, FaBars, FaTimes } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'

import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div>
        <h1> <div className="fixed top-0 left-0 right-0 z-50">
              <nav className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                      <FaStethoscope className="text-2xl mr-2" />
                      <span className="text-xl font-bold">DoctorConnect</span>
                    </div>
        
                    {/* Search Bar */}
                    <div className="hidden md:flex flex-grow mx-8">
                      <input
                        type="text"
                        placeholder="Search for doctors..."
                        className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                      />
                    </div>
        
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                      <a href="/" className="hover:text-gray-200">
                        Home
                      </a>
                      <a href="/browse-doctor" className="hover:text-gray-200">
                        All Doctors
                      </a>
                      <a href="/doctor/manage-slot" className="hover:text-gray-200">
                        Slots
                      </a>
                      <a href="/contact" className="hover:text-gray-200">
                        Contact
                      </a>
                      <a href="/doctor-signup" className="hover:text-gray-200">
                        Sign-Up
                      </a>
                      <button className="flex items-center space-x-1 hover:text-gray-300">
                        <IoLogOutOutline className="text-xl" />
                        <span>Logout</span>
                      </button>
                    </div>
        
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                      <button
                        onClick={toggleMobileMenu}
                        className="text-2xl focus:outline-none"
                      >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                      </button>
                    </div>
                  </div>
        
                  {/* Mobile Menu */}
                  {isMobileMenuOpen && (
                    <div className="md:hidden space-y-4 mt-2">
                      <div className="w-full px-4">
                        <input
                          type="text"
                          placeholder="Search for doctors..."
                          className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                      </div>
                      <a href="/" className="block px-4 py-2 hover:bg-blue-700">
                        Home
                      </a>
                      <a href="/doctors" className="block px-4 py-2 hover:bg-blue-700">
                        All Doctors
                      </a>
                      <a href="/specializations" className="block px-4 py-2 hover:bg-blue-700">
                        Specializations
                      </a>
                      <a href="/contact" className="block px-4 py-2 hover:bg-blue-700">
                        Contact
                      </a>
                      <button className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center space-x-1">
                        <IoLogOutOutline className="text-xl" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div></h1>
    </div>
  )
}

export default Navbar