const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    
    doctor: { type: Types.ObjectId, ref: 'doctor' },
    patientName: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    slot: { type: Types.ObjectId, required: true },
    contact: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('appointment', mySchema);

