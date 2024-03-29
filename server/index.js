const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require('path');
require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/AuthRoute');
const friendRoute = require('./routes/FriendRoute');
const blockScheduleRoute = require('./routes/BlockScheduleRoute');
const blockListRoute = require('./routes/BlockListRoute');


console.log(process.env.WEBPAGE_URL);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

app.use(
    cors({
        origin:  '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/friends", friendRoute);
app.use("/blockschedule", blockScheduleRoute);
app.use("/blocklist", blockListRoute);
