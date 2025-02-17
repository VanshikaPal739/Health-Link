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
  const [reviews, setReviews] = useState([]);
  const messageRef = useRef();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getbyid/${id}`);
      setDoctor(response.data);
      setRating(response.data.rating || 3);
    } catch (err) {
      toast.error('Failed to load doctor details');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/getbydoctor/${id}`);
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    }
  };

  const fetchSlotList = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slot/getbydoctorid/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setSlotList(response.data);
    } catch (error) {
      toast.error('Failed to fetch slots');
    }
  };

  const submitRating = async () => {
    const comment = messageRef.current.value;
    if (!comment) {
      toast.error('Please provide a comment!');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review/add`,
        { doctor: id, rating, comment },
        { headers: { 'x-auth-token': token } }
      );
      toast.success('Review submitted');
      messageRef.current.value = '';
      setRating(3);
      fetchReviews();
    } catch (err) {
      toast.error('Failed to submit review');
    }
  };

  const bookAppointment = async () => {
    if (!selectedSlot) {
      toast.error('Please select a slot');
      return;
    }

    if (!token) {
      toast.error('User not authenticated. Please log in.');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/appointment/book`,
        { doctor: id, slot: selectedSlot },
        { headers: { 'x-auth-token': token } }
      );
      toast.success('Appointment booked successfully!');
      setIsOpen(false);
    } catch (err) {
      toast.error('Failed to book appointment');
    }
  };

  useEffect(() => {
    if (id) {
      fetchDoctorDetails();
      fetchReviews();
      fetchSlotList();
    }
  }, [id]);

  if (!doctor) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="flex h-screen">
      {/* Left-Side Navbar */}
      <nav className="w-64 bg-blue-600 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <a href="#home" className="hover:bg-blue-500 p-2 rounded block">
              Home
            </a>
          </li>
          <li>
            <a href="#profile" className="hover:bg-blue-500 p-2 rounded block">
              Profile
            </a>
          </li>
          <li>
            <a href="#settings" className="hover:bg-blue-500 p-2 rounded block">
              Settings
            </a>
          </li>
          <li>
            <a href="#help" className="hover:bg-blue-500 p-2 rounded block">
              Help
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Page</h2>
        <p className="text-lg">
          This is the main content area. You can add your components, tables,
          or other elements here.
        </p>
        

      <div className="min-h-screen flex flex-col items-center bg-gray-100">
  {/* Main Content Wrapper */}
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-8 px-4">
    {/* Left Side - Doctor Information */}
    <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center">
        {/* Doctor Image */}
        <img
          src={doctor.image || 'https://via.placeholder.com/150'}
          alt={doctor.name}
          className="w-40 h-40 rounded-full border border-gray-300"
        />
        {/* Doctor Details */}
        <div className="ml-8">
          <h1 className="text-3xl font-semibold">{doctor.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{doctor.specialization}</p>
          <p className="mt-2 text-gray-700">{doctor.bio}</p>
          <p className="mt-2 text-gray-600">Experience: {doctor.experience} years</p>
          <p className="mt-2 text-gray-600">Consultation Fee: ${doctor.fee}</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600"
          >
            Book Appointment
          </button>
               {/* Booking Dialog */}
<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <DialogTitle className="text-lg font-bold text-center">Book Appointment</DialogTitle>
            <p className="text-gray-600 text-center mt-2">
              Select a slot to book an appointment with <strong>{doctor.name}</strong>.
            </p>
            <div className="mt-4">
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select a slot</option>
                {slotList.length > 0 ? (
                  slotList.map((slot) => (
                    <option key={slot._id} value={slot._id}>
                      {slot.time} {slot.period} on {slot.date}
                    </option>
                  ))
                ) : (
                  <option disabled>No slots available</option>
                )}
              </select>
            </div>
            <div className="mt-6 text-center">
              <button 
                onClick={bookAppointment} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
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

    {/* Right Side - Reviews and Rating */}
    <div className="space-y-8">
      {/* Leave a Review */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <StarRatings
          rating={rating}
          changeRating={setRating}
          numberOfStars={5}
          starRatedColor="gold"
          starDimension="30px"
          starSpacing="5px"
        />
        <textarea
          ref={messageRef}
          placeholder="Write your review..."
          className="w-full border rounded-md p-3 mt-4"
        ></textarea>
        <button
          onClick={submitRating}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Submit Review
        </button>
      </div>

      {/* Patient Stories */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Patient Stories</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-6 text-left">
              <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
              <p className="text-gray-600">{review.comment}</p>
              <StarRatings
                rating={review.rating}
                numberOfStars={5}
                starDimension="20px"
                starSpacing="4px"
                starRatedColor="gold"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
     
    </div>
  );
};

export default ViewDoctor;
