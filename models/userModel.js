const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    isAdmin: { type: Boolean, default: false }, // False by default
    isLoggedIn: { type: Boolean, default: false }, // False by default
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
