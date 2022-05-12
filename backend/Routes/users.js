const express = require('express');
const User = require('../Model/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken')


/* Schema for validating the user REGISTRATION input. */
const register_schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().min(7).required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().min(8).max(13).required(),
})


/* Schema for validating the user LOGIN input. */
const login_schema = Joi.object({
    email: Joi.string().email().min(7).required(),
    password: Joi.string().min(6).required()
})


/* This is a get request that is being sent to the server to get 
back All the Users in the database */
router.get('/users', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }
})



/* This is a get request that is being sent to the server to get 
back a specific User in the database */
router.get('/users/:userId', async(req, res) => {
    try {
        const usersById = await User.findById(req.params.userId)
        res.json(usersById)
    } catch (err) {
        res.json({ message: err })
    }
})



/* This is a delete request that is being sent to the server
to delete a specific user in the database by ID */
router.delete('/users/:userId', async(req, res) => {
    try {
        const usersById = await User.remove({ _id: req.params.userId })
        res.json(usersById)
    } catch (err) {
        res.json({ message: err })
    }
})



/* This is a delete request that is being sent to the server
to Update a specific user in the database by ID */
router.patch('/users/:userId', async(req, res) => {
    try {
        const updateUsersById = await User.updateOne({ _id: req.params.userId }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        })
        res.json(updateUsersById)
    } catch (err) {
        res.json({ message: err })
    }
})


/* This is a submit post request that is being sent to the server
to register users into the database */
router.post('/users/register', async(req, res) => {

    // USER REGISTER VALIDATION 
    const { error } = register_schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json('Account already exist! Try signing up')

    //Hash the passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //CREATING NEW USER
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        phone_number: req.body.phone_number,
        date: req.body.date
    })

    /* This is a try catch block that is used to catch any errors that 
    may occur when saving the user to the database. */
    try {
        const savedUser = await user.save()
        res.json({ user_id: savedUser.id })
    } catch (err) {
        res.json({ message: err })
    }

});



/* This is a submit post request that is being sent to the server
to post users into the database */
router.post('/users/login', async(req, res) => {

    // USER LOGIN VALIDATION 
    const { error } = login_schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    //Checking if the user email exists
    const userExist = await User.findOne({ email: req.body.email })
    if (!userExist) return res.status(400).json('Email not found! Try creating an account!')

    //Checking if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, userExist.password)
    if (!validPassword) return res.status(400).json('Invalid Password!')

    //Create and assign a token for the user section
    const token = jwt.sign({ _id: userExist._id }, process.env.SECRET_TOKEN)
    res.header('auth-token', token).json(token)

});


module.exports = router