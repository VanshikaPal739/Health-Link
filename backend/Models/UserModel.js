const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, requiired: true },
    phone: { type: String },
    bio: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now }

});

module.exports = model('user', mySchema);