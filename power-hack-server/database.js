// MongoDB Configuration
require('dotenv').config();
const mongoose = require('mongoose');
const DBLOCAL = `mongodb://localhost:27017/powerhack`
const DB = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.or4h7.mongodb.net/renterbd?retryWrites=true&w=majority`
module.exports = async () => {
    try {
        await mongoose.connect(DBLOCAL, {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        })
        console.log('Connected to Mongodb database')
    } catch (error) {
        console.log(error)
    }

}

