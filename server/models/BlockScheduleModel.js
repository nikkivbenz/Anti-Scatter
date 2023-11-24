const mongoose = require('mongoose');
const User = require("./UserModel");

// Define BlockSchedule schema
const BlockScheduleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "User is required"],
    },
    website: {
        type: String,
        required: [true, "Website is required"],
        unique: [true, "Website already exists"],
    },
    days: {
        type: [String],
        validate: {
            validator: (days) => {
                const validDays = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];
                return days.every((day) => validDays.includes(day));
            },
            message: "At least one day is required",
        },
        required: [true, "Day is required"],
    },
    timeFrame: {
        startTime: {
            type: String,
            required: [true, "Start time is required"],
        },
        endTime: {
            type: String,
            required: [true, "End time is required"],
        }
    },
});

const BlockSchedule = mongoose.model("BlockSchedule", BlockScheduleSchema);

module.exports = BlockSchedule;