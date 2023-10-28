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

        res.status(201).json({ message: 'Block Schedule created successfully', success: true, schedule: savedSchedule });
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getBlockSchedule = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const blockSchedule = await BlockSchedule.find({ userId: userId });
        
        if (!blockSchedule) {
            return res.json({ message: 'Error fetching schedule' });
        }
        res.status(200).json({ message: 'Block Schedule fetched successfully', success: true, blockSchedule });

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
