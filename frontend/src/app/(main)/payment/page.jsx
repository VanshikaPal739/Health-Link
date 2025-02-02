'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = ({ doctorId, doctorName }) => {
    const [paymentMode, setPaymentMode] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/create-order", {
                amount: Number(amount) * 100, // Convert to paise
                doctorId,
                doctorName,
            });

            const { order } = response.data;

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
                amount: order.amount,
                currency: 'INR',
                name: 'HealthCareConnect',
                description: `Payment to Dr. ${doctorName}`,
                order_id: order.id,
                handler: async (response) => {
                    const verifyResponse = await axios.post("http://localhost:5000/verify-payment", {
                        ...response,
                        doctorId,
                        amount: order.amount,
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
                method: paymentMode.toLowerCase(), // Razorpay supports 'card', 'upi', etc.
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
                        type="number"
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

