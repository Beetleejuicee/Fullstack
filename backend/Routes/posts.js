const express = require('express');
const User = require('../Model/User');
const router = express.Router();
const verify = require('./verifyToken')



// // /* This is a get request that is being sent to the server to get 
// back All the Goals in the database */
router.get('/posts', verify, async(req, res) => {
    try {
        res.json(req.user)
        User.findOne({ _id: req.user._id })
    } catch (err) {
        res.json({ message: err })
    }
});


module.exports = router;