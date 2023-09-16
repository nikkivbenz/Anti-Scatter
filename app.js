var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bcrypt = require('bcrypt')

const connectDB = require('./config/dbconfig');
const User = require("./model/User");

connectDB();
const app = express();
  
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "wetheplugs",
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.UserModel.authenticate()));
passport.serializeUser(User.UserModel.serializeUser());
passport.deserializeUser(User.UserModel.deserializeUser());

//=====================
// ROUTES
//=====================
  
// Showing home page
app.get("/", function (req, res) {
    res.render("login", {error: null});
});
  
// Showing secret page
app.get("/home", isLoggedIn, function (req, res) {
    res.render("home");
});
  
// Showing register form
app.get("/register", function (req, res) {
    res.render("register", {error: null});
});
  
// Handling user signup
app.post("/register", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if (User.isValidEmail(email)) {
        try {
            const newUser = await User.createUser(email, username, password);
            console.log("New User Created: " + newUser);
            res.render("home");
        } catch (err) {
            res.render("register", {error: err});
        }
    } else {
        res.render("register", {error: "Invalid email address."});
    }
});

//Showing login form
app.get("/login", function (req, res) {
    res.render("login", {error: null});
});
  
//Handling user login
app.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await User.UserModel.findOne({email: req.body.email});

        if (user) {
            //check if password matches through bcrypt
            const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
            if (passwordMatch) {
                // log the user in
                req.login(user, function(err) {
                    if (err) { return next(err); }
                    return res.redirect('/home');
                });
            } else {
                res.render("login", {error: "Invalid email or password."});
            }
        } else {
            res.render("login", {error: "Invalid email or password."});
        }
    } catch (error) {
        res.status(400).json({error});
    }
});
  
//Handling user logout 
app.get("/logout", function (req, res) {
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login", {error: null});
}
  
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});