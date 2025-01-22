const { Schema, model, Types } = require('../connection');
// const { report } = require('../Routers/AppointmentRouter');

const mySchema = new Schema({

    doctor: { type: Types.ObjectId, ref: 'doctor' },
    patient: { type: Types.ObjectId, ref: 'user' },
    slot: { type: Types.ObjectId, ref: 'slot' },
    status: { type: String, default: 'booked' },
    report: { type: String, default: '' },
    prescription: { type: String, default: '' },
    prescribedTest: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('appointment', mySchema);