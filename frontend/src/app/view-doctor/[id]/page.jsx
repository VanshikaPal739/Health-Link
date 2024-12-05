'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const ViewDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [rating, setRating] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [slotList, setSlotList] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reviews, setReviews] = useState([]);
  const messageRef = useRef();

  // Fetch token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Fetch reviews for the doctor
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/getbydoctor/${id}`);
      setReviews(res.data); // Assuming reviews is an array in the response
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getbyid/${id}`)
        .then((response) => {
          setDoctor(response.data);
          setRating(response.data.rating || 3);
          fetchReviews();
        })
        .catch((err) => {
          console.error('Error fetching doctor details:', err);
          toast.error('Failed to load doctor details');
        });
    }
  }, [id]);

// Fetch slots for the particular doctor
const fetchSlotList = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/slot/getbydoctorid/${id}`, // Updated endpoint
      {
        headers: {
          'x-auth-token': token, // Pass token for authentication
        },
      }
    );

    if (response.data && Array.isArray(response.data)) {
      setSlotList(response.data); // Ensure the response is an array and update state
    } else {
      throw new Error('Invalid response format'); // Handle unexpected response format
    }
  } catch (error) {
    console.error('Error fetching slots:', error);
    toast.error('Failed to fetch slots');
    setSlotList([]); // Fallback to an empty array
  }
};

// Use useEffect to call the fetchSlotList function
useEffect(() => {
  if (id && token) {
    fetchSlotList(); // Fetch slots when doctor ID and token are available
  }
}, [id, token]);


  const submitRating = () => {
    const comment = messageRef.current.value;
    if (!comment) {
      toast.error('Please provide a comment!');
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/review/add`,
        {
          doctor: id,
          rating: rating,
          comment: comment,
        },
        { headers: { 'x-auth-token': token } }
      )
      .then(() => {
        toast.success('Review submitted');
        messageRef.current.value = '';
        setRating(3); // Reset rating after submission
        fetchReviews(); // Reload reviews after submitting a new one
      })
      .catch((err) => {
        console.error('Error submitting review:', err);
        if (err.response && err.response.status === 401) {
          toast.error('Session expired. Please log in again.');
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      });
  };

  const bookAppointment = () => {
    if (!selectedSlot) {
      toast.error('Please select a slot');
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/appointment/book`,
        { doctorId: id, slot: selectedSlot, time: selectedTime },
        { headers: { 'x-auth-token': token } }
      )
      .then(() => {
        toast.success('Appointment booked successfully!');
        setIsOpen(false); // Close dialog after booking
      })
      .catch((err) => {
        console.error('Error booking appointment:', err);
        toast.error('Failed to book appointment');
      });
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 animate-pulse">
        {/* Skeleton Loading */}
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
          <h1 className="absolute bottom-5 left-5 text-4xl font-bold text-white drop-shadow-lg">
            {doctor.name}
          </h1>
        </div>

        {/* Content Section */}
        <div className="p-6 md:flex md:space-x-6 bg-gray-50">
          <div className="flex-1 space-y-4">
            <p className="text-2xl font-semibold text-gray-800">
              Specialization: <span className="font-normal text-gray-600">{doctor.specialization}</span>
            </p>
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

            {/* Displaying Reviews */}
            <div className="bg-gray-700 rounded-lg shadow-lg p-4 mt-6">
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="mb-4 border-b border-gray-600 pb-2">
                    <p className="text-lg text-gray-300">
                      <strong>{review.user?.name}:</strong> {review.comment}
                    </p>
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="3px"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No reviews yet.</p>
              )}
            </div>

            {/* Book Appointment Button with Dialog */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              >
                Book Appointment
              </button>
            </div>

            {/* Dialog for Booking Confirmation */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="max-w-lg mx-auto bg-white rounded-lg p-6 shadow-lg space-y-4">
                  <DialogTitle className="text-lg font-semibold text-center">
                    Clinic Appointment
                  </DialogTitle>
                  <p className="text-center text-gray-600">
                    Book an appointment with <span className="font-bold">{doctor.name}</span>
                  </p>

                  {/* Doctor Details */}
                  <div className="text-center space-y-2">
                    <p className="text-lg text-gray-700">
                      Specialization: <span className="font-semibold">{doctor.specialization}</span>
                    </p>
                    <p className="text-lg text-gray-700">
                      Consultation Fee: <span className="font-semibold">${doctor.fee}</span>
                    </p>
                  </div>

                  {/* Slot Dropdown */}
                  <div>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a time slot</option>
                      {slotList.length > 0 ? (
                        slotList.map((slot) => (
                          <option key={slot._id} value={slot.time}>
                            {slot.time}
                          </option>
                        ))
                      ) : (
                        <option disabled>No slots available</option>
                      )}
                    </select>

                  </div>

                  {/* Confirmation Button */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={bookAppointment}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctor;
