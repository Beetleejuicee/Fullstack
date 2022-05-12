const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add a first-name"],
        max: 255,
        min: 6
    },
    lastName: {
        type: String,
        required: [true, "Please add a last-name"],
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        max: 255,
        min: 9
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        unique: false,
        max: 1024,
        min: 8
    },
    phone_number: {
        type: String,
        required: [true, "Please add a phone number"],
        unique: true,
        min: 8
    },
    date: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true
});

module.exports = User = mongoose.model('user', user);