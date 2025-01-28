'use client';

import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = ({ doctorId, doctorName }) => {
    const [paymentMode, setPaymentMode] = useState(''); // Added for payment mode
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Backend request to create a payment order
            const { data } = await axios.post('/api/create-order', {
                amount: amount * 100, // Convert amount to paise for Razorpay
                doctorId,
                doctorName,
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Key ID
                amount: data.amount,
                currency: 'INR',
                name: 'HealthCareConnect',
                description: `Payment to Dr. ${doctorName}`,
                order_id: data.id,
                handler: async (response) => {
                    const verifyResponse = await axios.post('/api/verify-payment', {
                        ...response,
                        doctorId,
                        amount,
                    });

                    if (verifyResponse.data.success) {
                        alert('Payment Successful');
                    } else {
                        alert('Payment Verification Failed');
                    }
                },
                prefill: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#3399cc',
                },
                method: paymentMode === 'UPI' ? 'upi' : 'card', // Dynamic payment method
                upi: {
                    vpa: '', // If empty, it will allow the user to enter their UPI ID.
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Error processing payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Payment Gateway</h1>
            <form onSubmit={handlePayment}>
                <div className="mb-4">
                    <label className="block font-semibold">Amount:</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter amount"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Payment Mode:</label>
                    <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>
                {paymentMode === 'Card' && (
                    <>
                        <div className="mb-4">
                            <label className="block font-semibold">Card Number:</label>
                            <input
                                type="text"
                                placeholder="Enter card number"
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Expiry Date:</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">CVV:</label>
                            <input
                                type="text"
                                placeholder="Enter CVV"
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                    </>
                )}
                <button
                    type="submit"
                    className={`w-full py-2 text-white rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={loading || !paymentMode}
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
