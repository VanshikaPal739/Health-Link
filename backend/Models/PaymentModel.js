const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Doctor model
        required: true,
    },
    amount: {type: Number,required: true,},

    paymentStatus: {type: String,
        enum: ['Pending', 'Success', 'Failed'],
        default: 'Pending',
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentMethod: {type: String,
        enum: ['Card', 'UPI', 'Net Banking', 'Wallet'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
