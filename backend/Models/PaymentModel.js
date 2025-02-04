const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true },

    doctorId: { type: Types.ObjectId, ref: 'Doctor', required: true },
    amount: {type: Number,required: true,},

    paymentStatus: {type: String,
        enum: ['Pending', 'Success', 'Failed'],
        default: 'Pending',
    },
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: {type: String, required: true,
        enum: ['Card', 'UPI', 'Net Banking', 'Wallet'],  
    },
    createdAt: {type: Date, default: Date.now,}
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
