/*
    This file contains the User model and functions to create a new user and check if an email is valid.
    The User model is used to create a new user in the database.
    The createUser function is used to create a new user in the database.
    The isValidEmail function is used to check if an email is valid.
*/

// Importing modules
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

// Creating the User Schema
const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    }
});

// Adding passport-local-mongoose to User Schema
User.plugin(passportLocalMongoose);

// Creating the User model
const UserModel = mongoose.model('User', User);

// Creating the createUser function
async function createUser(input_email, input_username, input_password) {
    try {
        // Check if email or username is already taken
        const emailTaken = await UserModel.findOne({ email: input_email });
        if (emailTaken) {
            throw new Error("Email already in use");
        }

        const usernameTaken = await UserModel.findOne({ username: input_username });
        if (usernameTaken) {
            throw new Error("Username already in use");
        }

        // Hash the password
        const saltRounds = 10;
        const input_password_hash = bcrypt.hashSync(input_password, saltRounds);
    
        // Create the new user with the hashed password
        const newUser = await UserModel.create({
            email: input_email,
            username: input_username,
            password: input_password_hash
        });
    
        return newUser;
    } catch (err) {
        console.log("Error creating user");
        throw err;
    }
}

// Creating the isValidEmail function
function isValidEmail(input_email) {
    // Regex for email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    return emailRegex.test(input_email);
}

// Exporting the User model and functions
module.exports = {
    UserModel,
    createUser,
    isValidEmail
};
