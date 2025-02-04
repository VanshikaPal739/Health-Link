'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyPaymentPage = ({ userId }) => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/payment/${userId}`);
                setPaymentDetails(response.data);
            } catch (error) {
                setError('Failed to load payment details');
                console.error('Error fetching payment details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [userId]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
            <div className="border-b pb-4 mb-4">
                <p className="font-semibold">User Name:</p>
                <p>{paymentDetails?.userName}</p>
            </div>
            <div className="border-b pb-4 mb-4">
                <p className="font-semibold">Transaction ID:</p>
                <p>{paymentDetails?.transactionId}</p>
            </div>
            <div className="border-b pb-4 mb-4">
                <p className="font-semibold">Payment Status:</p>
                <p className={`font-bold ${paymentDetails?.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
                    {paymentDetails?.status}
                </p>
            </div>
            <div>
                <p className="font-semibold">Amount:</p>
                <p>&#8377; {paymentDetails?.amount}</p>
            </div>
        </div>
    );
};

export default VerifyPaymentPage;
