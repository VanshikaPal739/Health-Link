const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: Types.ObjectId, ref: "doctor" },
    status: { type: String, default: "booked" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('slot', mySchema);