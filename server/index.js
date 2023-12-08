// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const path = require('path');
// require('dotenv');
// const cookieParser = require('cookie-parser');
// const authRoute = require('./routes/AuthRoute');
// const friendRoute = require('./routes/FriendRoute');
// const blockScheduleRoute = require('./routes/BlockScheduleRoute');

// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("MongoDB is connected successfully"))
//     .catch((err) => console.error(err));

// app.listen(process.env.PORT || 4000, () => {
//     console.log(`Server is listening on port ${process.env.PORT}`);
// });

// app.use(
//     cors({
//         origin: [process.env.WEBPAGE_URL, "https://localhost:3000"],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true,
//     })
// );

// app.use(cookieParser());

// app.use(express.json());

// app.use("/", authRoute);
// app.use("/friends", friendRoute);
// app.use("/blockschedule", blockScheduleRoute);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/AuthRoute');
const friendRoute = require('./routes/FriendRoute');
const blockScheduleRoute = require('./routes/BlockScheduleRoute');

require('dotenv').config(); // You need to call .config() to actually load the environment variables

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

// Use CORS middleware before your route handlers
app.use(
    cors({
        origin: [process.env.WEBPAGE_URL, "http://localhost:3000"], // Make sure the localhost is using http unless you have SSL set up locally
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // If you are using cookies or authentication you might need this
    })
);

// Other middlewares
app.use(cookieParser());
app.use(express.json()); // For parsing application/json

// Your routes
app.use("/", authRoute);
app.use("/friends", friendRoute);
app.use("/blockschedule", blockScheduleRoute);

// Listen to the server after all the middleware is set up
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 4000}`);
});
