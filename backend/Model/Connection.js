const mongoose = require('mongoose');


const connectionParameters = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.URI, connectionParameters)
        console.log('Database connected successfully...!')
    } catch {
        console.log('Database not connected')
    }
};

module.exports = connectDB;