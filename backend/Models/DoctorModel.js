const { Schema, model } = require('../connection');


const mySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    bio: { type: String },
    image: {type: String},
    avatar: { type: String },
    contact: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now }
});


module.exports = model('doctor', mySchema);


