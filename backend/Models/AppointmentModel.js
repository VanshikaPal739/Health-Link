const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({

    doctor: { type: Types.ObjectId, ref: 'doctor' },
    patient: { type: Types.ObjectId, ref: 'user' },
    slot: { type: Types.ObjectId, ref: 'slot' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('appointment', mySchema);