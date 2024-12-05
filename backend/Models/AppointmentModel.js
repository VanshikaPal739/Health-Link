const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    
    doctor: { type: Types.ObjectId, ref: 'doctor'},
    patientName: { type: String },
    time: { type: String, required: true},
    slot: { type: Types.ObjectId, ref: 'slot'},
    contact: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('appointment', mySchema);

