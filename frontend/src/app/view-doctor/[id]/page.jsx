'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ViewDoctor = () => {
  
  const { id } = useParams(); // Get doctor ID from the URL
  const [doctor, setDoctor] = useState(null); // State to hold doctor details
  const [rating, setRating] = useState(3); // Default rating value
  const [isOpen, setIsOpen] = useState(false)
  const messageRef = useRef();

  // Fetch token from localStorage once the component mounts
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Fetch doctor details based on the ID from URL params
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getbyid/${id}`)
        .then((response) => {
          setDoctor(response.data); // Set the fetched doctor details
          setRating(response.data.rating || 3); // Set the initial rating from doctor data
        })
        .catch((err) => {
          console.error("Error fetching doctor details:", err);
          toast.error('Failed to load doctor details');
        });
    }
  }, [id]);

  // Submit review function
  const submitRating = () => {
    const comment = messageRef.current.value;

    if (!comment) {
      toast.error("Please provide a comment!");
      return;
    }

    console.log("Submitting review with:", { doctor: id, rating, comment });

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/review/add`,
        {
          doctor: id,
          rating: rating,
          comment: comment,
        },
        {
          headers: { 'x-auth-token': token },
        }
      )
      .then(() => {
        toast.success('Review submitted');
        messageRef.current.value = ''; // Clear the comment box
      })
      .catch((err) => {
        console.error("Error submitting review:", err.response || err);
        toast.error('Some error occurred');
      });
  };

  // Show skeleton while loading doctor data
  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 animate-pulse">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-72 bg-gray-200">
            <div className="w-full h-full rounded-t-lg opacity-80"></div>
            <div className="absolute bottom-5 left-5 h-16 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="p-6 md:flex md:space-x-6 bg-gray-50">
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="flex-1 mt-6 md:mt-0">
              <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="mb-4 h-12 bg-gray-200 rounded w-full"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="mt-3 h-10 bg-gray-200 rounded w-full"></div>
              <div className="mt-6 h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section with Image */}
        <div className="relative h-72 bg-gradient-to-r from-green-400 to-blue-500">
          <img
            src={doctor.image || 'https://via.placeholder.com/250'}
            alt={doctor.name}
            className="w-full h-full object-cover rounded-t-lg opacity-80"
          />
          <h1 className="absolute bottom-5 left-5 text-4xl font-bold text-white drop-shadow-lg">{doctor.name}</h1>
        </div>

        {/* Content Section */}
        <div className="p-6 md:flex md:space-x-6 bg-gray-50">
          <div className="flex-1 space-y-4">
            <p className="text-2xl font-semibold text-gray-800">Specialization: <span className="font-normal text-gray-600">{doctor.specialization}</span></p>
            <p className="text-lg text-gray-700">Experience: {doctor.experience} years</p>
            <p className="text-lg text-gray-700">Consultation Fee: ${doctor.fee}</p>
            <p className="text-lg text-gray-700">Address: {doctor.address}</p>
            <p className="text-lg text-gray-700">Contact: {doctor.contact}</p>
            <p className="text-lg text-gray-700">Bio: {doctor.bio}</p>
          </div>

          {/* Review Section */}
          <div className="flex-1 mt-6 md:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Review</h2>
            <div className="mb-4 flex items-center justify-center">
              <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={setRating}
                numberOfStars={5}
              />
              <span className="text-lg text-gray-500 ml-2">{rating}/5</span>
            </div>

            <textarea
              ref={messageRef}
              placeholder="Share your experience..."
              className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-gray-600"
            ></textarea>

            <button
              onClick={submitRating}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-300"
            >
              Submit Review
            </button>

            <div className="mt-6 text-center">
              <a
                href={`/book-appointment/${id}`}
                className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctor;
