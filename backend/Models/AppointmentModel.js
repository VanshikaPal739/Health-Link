const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    
    doctor: { type: Types.ObjectId, ref: 'doctor' },
    patientName: { type: String },
    time: { type: Types.ObjectId, ref: 'slot'},
    slot: { type: Types.ObjectId, required: true },
    contact: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('appointment', mySchema);

