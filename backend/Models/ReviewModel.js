const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    doctor: { type: Types.ObjectId, ref: 'doctor' },
    rating: Number,
    comment: String,
    createdAt: { type: Date, dafault: Date.now }
});

module.exports = model('review', mySchema);