const express = require('express');
const connectDB = require('./Model/Connection');
const app = express();
const cors = require('cors')
require('dotenv/config')

/* Connecting to the database. */
connectDB();

////////////////////////////   Middleware  //////////////////////////////

/* Allowing the server to accept requests from other domains. */
app.use(cors())


/* This is a middleware that allows us to accept data in JSON format. */
app.use(express.json({ extended: false }));


/* Telling the server to use the routes in the users.js file. */
app.use('/api', require('./Routes/users'));


/* Telling the server to use the routes in the posts.js file. */
app.use('/api', require('./Routes/posts'))


/* This is a way to set the port number for the server. */
const Port = process.env.PORT


/* This is a way to set the port number to listen to the server. */
app.listen(Port, () => console.log(`Server started on http://localhost:${Port}`));