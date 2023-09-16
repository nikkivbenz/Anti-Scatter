/*
    This file is used to connect to the MongoDB database.
    It uses the mongoose library to connect to the database.
    It uses the dotenv library to access the environment variables.
*/

// Importing modules
const mongoose = require('mongoose');
require('dotenv').config();

// Creating the connectDB function
const connectDB = async () => {
    try {
        // Connect to the database with the MONGO_URI environment variable
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected!`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// Exporting the connectDB function
module.exports = connectDB;