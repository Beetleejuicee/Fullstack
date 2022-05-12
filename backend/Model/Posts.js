const mongoose = require('mongoose');

const post = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: {
        type: String,
        required: true,
    },
    postlName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = Goal = mongoose.model('post', post);