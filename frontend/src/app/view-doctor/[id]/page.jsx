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
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [reviews, setReviews] = useState([]);
  const messageRef = useRef();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  // Fetch doctor details and reviews
  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getbyid/${id}`);
      setDoctor(response.data);
      setRating(response.data.rating || 3);
    } catch (err) {
      console.error('Error fetching doctor details:', err);
      toast.error('Failed to load doctor details');
    }
  };


  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/getbydoctor/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };


  const fetchSlotList = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slot/getbydoctorid/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setSlotList(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
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
      console.error('Error submitting review:', err);
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
      await axios.post(
        ` ${process.env.NEXT_PUBLIC_API_URL}/appointment/book`,
        { doctor: id, slot: selectedSlot },
        { headers: { 'x-auth-token': token } }
      );
      toast.success('Appointment booked successfully!');
      setIsOpen(false);
    } catch (err) {
      console.error('Error booking appointment:', err);
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Doctor Info */}
        <div className="relative h-72 bg-gradient-to-r from-green-400 to-blue-500">
          <img
            src={doctor.image || 'https://via.placeholder.com/250'}
            alt={doctor.name}
            className="w-full h-full object-cover opacity-80"
          />
          <h1 className="absolute bottom-5 left-5 text-4xl font-bold text-white">{doctor.name}</h1>
        </div>
        {/* Details */}
        <div className="p-6 flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1">
            <p className="text-xl">Specialization: {doctor.specialization}</p>
            <p className="text-xl">Experience: {doctor.experience} years</p>
            <p className="text-xl">Fee: ${doctor.fee}</p>
            <p className="text-xl">Bio: {doctor.bio}</p>
          </div>
          {/* Review Section */}
          <div className="flex-1">
            <h2 className="text-2xl">Leave a Review</h2>
            <StarRatings
              rating={rating}
              changeRating={setRating}
              numberOfStars={5}
              starRatedColor="gold"
            />
            <textarea ref={messageRef} placeholder="Write your review..." className="w-full mt-3"></textarea>
            <button onClick={submitRating} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
            {/* Reviews */}
            <div className="mt-4">
              <h2 className="text-2xl">Reviews</h2>
              {reviews.map((review, i) => (
                <div key={i}>
                  <p>{review.user?.name}: {review.comment}</p>
                  <StarRatings
                    rating={review.rating}
                    numberOfStars={5}
                    starRatedColor="gold"
                    starDimension="20px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Book Appointment */}
        <div className="p-6">
          <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">
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
                  onChange={(e) => {
                    setSelectedSlot(e.target.value);
                    setSelectedTime(e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select date and time slot</option>
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
  );
};

export default ViewDoctor;