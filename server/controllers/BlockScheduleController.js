const BlockSchedule = require("../models/BlockScheduleModel");

module.exports.createBlockSchedule = async (req, res, next) => {
    try {
        const { userId, website, days, startTime, endTime } = req.body;

        if (!website || !days || !startTime || !endTime) {
            return res.json({ message: 'All fields are required' });
        }

        const blockSchedule = new BlockSchedule({
            userId: userId,
            website,
            days,
            timeFrame: {
                startTime,
                endTime,
            },
        });

        const savedSchedule = await blockSchedule.save();
        if (!savedSchedule) {
            return res.json({ message: 'Error creating schedule' });
        }

        res.status(201).json({ message: 'New block schedule created successfully', success: true, schedule: savedSchedule });
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getBlockSchedule = async (req, res, next) => {
    try {
        const { userId, day } = req.params;

        if (day) {
            const blockSchedule = await BlockSchedule.find({ userId: userId, days: day });
            if (!blockSchedule) {
                return res.json({ message: 'Error fetching schedule' });
            }
            res.status(200).json({ message: 'Block schedule fetched successfully', success: true, blockSchedule });
        } else {
            const blockSchedule = await BlockSchedule.find({ userId: userId });
        
        if (!blockSchedule) {
            return res.json({ message: 'Error fetching schedule' });
        }
        res.status(200).json({ message: 'Block schedule fetched successfully', success: true, blockSchedule });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.deleteBlockSchedule = async (req, res, next) => {
    try {
        const scheduleId = req.params.id;
    
        // Check if the schedule with the given ID exists
        const schedule = await BlockSchedule.findById(scheduleId);
    
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
    
        // Ensure that the user has the appropriate permissions to delete the schedule
        // You can check if the user ID in the request matches the user ID associated with the schedule
    
        // Perform the deletion
        await BlockSchedule.findByIdAndRemove(scheduleId);
    
        res.json({ message: "Schedule deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}