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
  const [activeTab, setActiveTab] = useState('profile');
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

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Count reviews by rating
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => Math.floor(r.rating) === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  // Component for Add Review Block
  const AddReviewBlock = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Share Your Experience</h2>
      <div className="text-center mb-4">
        <p className="text-gray-600 mb-2">How would you rate your experience?</p>
        <StarRatings
          rating={rating}
          changeRating={setRating}
          numberOfStars={5}
          starRatedColor="gold"
          starDimension="32px"
          starSpacing="4px"
          name="rating"
        />
      </div>
      <textarea
        ref={messageRef}
        placeholder={`What was your experience with Dr. ${doctor?.name?.split(' ')[0] || 'the doctor'}?`}
        className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 min-h-24"
        rows={5}
      ></textarea>
      <button
        onClick={submitRating}
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:-translate-y-1"
      >
        Submit Your Review
      </button>
    </div>
  );

  // Component for Reviews List Block
  const ReviewsListBlock = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Patient Reviews</h2>
        <div className="flex items-center">
          <StarRatings
            rating={Number(avgRating) || 0}
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="gold"
          />
          <span className="ml-2 text-gray-600 font-medium">{avgRating} out of 5</span>
        </div>
      </div>
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium text-lg mr-4">
                  {(review.user?.name?.[0] || 'A').toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{review.user?.name || 'Anonymous'}</p>
                  <div className="flex items-center">
                    <StarRatings
                      rating={review.rating}
                      numberOfStars={5}
                      starDimension="16px"
                      starSpacing="1px"
                      starRatedColor="gold"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 pl-16">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-600 text-lg">No reviews available yet.</p>
          <p className="text-gray-500 mt-1">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );

  // Component for Rating Summary Block
  const RatingSummaryBlock = () => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Rating Summary</h2>
      
      <div className="flex items-center mb-4">
        <div className="text-3xl font-bold text-gray-800 mr-3">{avgRating}</div>
        <div>
          <StarRatings
            rating={Number(avgRating) || 0}
            numberOfStars={5}
            starDimension="18px"
            starSpacing="1px"
            starRatedColor="gold"
          />
          <p className="text-sm text-gray-500 mt-1">{reviews.length} reviews</p>
        </div>
      </div>
      
      {ratingCounts.map(({stars, count, percentage}) => (
        <div key={stars} className="flex items-center mb-2">
          <div className="w-16 text-sm text-gray-600">{stars} stars</div>
          <div className="flex-1 mx-2 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${stars >= 4 ? 'bg-green-400' : stars >= 3 ? 'bg-yellow-400' : 'bg-red-400'}`} 
              style={{width: `${percentage}%`}}
            ></div>
          </div>
          <div className="w-12 text-xs text-gray-600 text-right">{count} ({Math.round(percentage)}%)</div>
        </div>
      ))}
    </div>
  );

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
          </div>
          <p className="text-lg text-blue-600 font-medium mt-4">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left-Side Navbar */}
        <nav className="lg:w-64 bg-white lg:bg-gradient-to-b from-blue-600 to-indigo-800 text-white flex lg:flex-col p-4 shadow-lg z-10 overflow-x-auto lg:overflow-x-visible">
          <h1 className="text-xl font-bold mb-0 lg:mb-6 text-blue-600 lg:text-white mr-auto">HealthConsult</h1>
          <ul className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
            <li>
              <a href="#home" className="hover:bg-blue-500 p-2 rounded block transition-colors text-blue-600 lg:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#doctors" className="hover:bg-blue-500 p-2 rounded block transition-colors text-blue-600 lg:text-white bg-blue-100 lg:bg-blue-700">
                Doctors
              </a>
            </li>
            <li>
              <a href="#appointments" className="hover:bg-blue-500 p-2 rounded block transition-colors text-blue-600 lg:text-white">
                Appointments
              </a>
            </li>
            <li>
              <a href="#settings" className="hover:bg-blue-500 p-2 rounded block transition-colors text-blue-600 lg:text-white">
                Settings
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="container mx-auto">
            {/* Header & Doctor Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 relative">
                <div className="absolute -bottom-16 left-8">
                  <img
                    src={doctor.image || 'https://via.placeholder.com/150'}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>
              </div>
              <div className="pt-20 pb-6 px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
                    <p className="text-indigo-600 font-medium">{doctor.specialization}</p>
                    <div className="flex items-center mt-2">
                      <StarRatings
                        rating={Number(avgRating) || 0}
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="gold"
                      />
                      <span className="ml-2 text-gray-600">{avgRating} ({reviews.length} reviews)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow hover:from-green-600 hover:to-emerald-700 transition-all transform hover:-translate-y-1 font-medium"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8">
                  <button 
                    onClick={() => setActiveTab('profile')} 
                    className={`py-4 px-4 focus:outline-none ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => setActiveTab('reviews')} 
                    className={`py-4 px-4 focus:outline-none ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-4 text-gray-800">About  {doctor.name.split(' ')[0]}</h2>
                      <p className="text-gray-700 mb-6">{doctor.bio || "Dr. " + doctor.name + " is a highly skilled healthcare professional dedicated to providing excellent patient care."}</p>
                      
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Professional Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Specialization</div>
                          <div className="font-medium text-gray-800">{doctor.specialization}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Experience</div>
                          <div className="font-medium text-gray-800">{doctor.experience} years</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Consultation Fee</div>
                          <div className="font-medium text-gray-800">${doctor.fee}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-24 text-gray-500">Address</div>
                          <div className="font-medium text-gray-800">{doctor.address || "Medical Center"}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-24 text-gray-500">Email</div>
                          <div className="font-medium text-gray-800">{doctor.email || "doctor@example.com"}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-24 text-gray-500">Contact</div>
                          <div className="font-medium text-gray-800">{doctor.contact || "Not Available"}</div>
                        </div>
                      </div>

                      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Available Slots</h3>
                        {slotList.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {slotList.slice(0, 4).map((slot) => (
                              <div key={slot._id} className="bg-white p-2 rounded border border-blue-200 text-sm">
                                {slot.time} {slot.period} on {slot.date}
                              </div>
                            ))}
                            {slotList.length > 4 && (
                              <button 
                                onClick={() => setIsOpen(true)}
                                className="text-blue-600 underline text-sm"
                              >
                                +{slotList.length - 4} more slots
                              </button>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-600">No slots available at the moment</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Reviews List */}
                    <div className="lg:col-span-2">
                      <ReviewsListBlock />
                    </div>
                    
                    {/* Right Column: Add Review + Rating Summary */}
                    <div className="space-y-6">
                      <AddReviewBlock />
                      {reviews.length > 0 && <RatingSummaryBlock />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full">
            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Book Appointment</DialogTitle>
            <p className="text-gray-600 mb-6">
              Select a time slot to book with <span className="font-medium text-blue-600"> {doctor.name}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
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
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsOpen(false)} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={bookAppointment} 
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-700"
              >
                Confirm Booking
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewDoctor;