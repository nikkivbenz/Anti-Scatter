const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

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

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', User);

async function createUser(input_email, input_username, input_password) {
    try {
        const emailTaken = await UserModel.findOne({ email: input_email });
        if (emailTaken) {
            throw new Error("Email already in use");
        }

        const usernameTaken = await UserModel.findOne({ username: input_username });
        if (usernameTaken) {
            throw new Error("Username already in use");
        }

        const saltRounds = 10;
        const input_password_hash = bcrypt.hashSync(input_password, saltRounds);
    
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

function isValidEmail(input_email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    return emailRegex.test(input_email);
}

module.exports = {
    UserModel,
    createUser,
    isValidEmail
};
