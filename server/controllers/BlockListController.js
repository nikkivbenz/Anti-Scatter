const BlockList = require("../models/BlockListModel");

// Creates a new block list given a user's id and a list of websites
module.exports.createBlockList = async (req, res, next) => {
    try {
        const { userId, blockWebsites } = req.body;

        if (!blockWebsites) {
            return res.json({ message: 'All fields are required' });
        }

        const blockList = new BlockList({
            userId: userId,
            blockWebsites,
        });

        const savedList = await blockList.save();
        if (!savedList) {
            return res.json({ message: 'Error creating list' });
        }

        res.status(201).json({ message: 'New block list created successfully', success: true, list: savedList });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Gets a user's block list given the user's id
module.exports.getBlockList = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const blockList = await BlockList.find({ userId: userId });
        if (!blockList) {
            return res.json({ message: 'Error fetching list' });
        }
        res.status(200).json({ message: 'Block list fetched successfully', success: true, blockList });

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Deletes a user's block list given the block list's id
module.exports.deleteBlockList = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedList = await BlockList.findByIdAndDelete(id);
        if (!deletedList) {
            return res.json({ message: 'Error deleting list' });
        }
        res.status(200).json({ message: 'Block list deleted successfully', success: true, deletedList });

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Updates a user's block list with a new list of websites given the block list's id
module.exports.updateBlockList = async (req, res, next) => {
    try {
        const { userId, blockWebsites } = req.body;

        const updatedList = await BlockList.findOneAndUpdate({ userId, blockWebsites });

        if (!updatedList) {
            return res.json({ message: 'Error finding/updating list' });
        }

        res.status(200).json({ message: 'Block list updated successfully', success: true, updatedList });

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}