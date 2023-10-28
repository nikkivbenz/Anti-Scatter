const { getBlockSchedule, createBlockSchedule, deleteBlockSchedule } = require("../controllers/BlockScheduleController");
const router = require("express").Router();

// Post Routes
router.post('/', createBlockSchedule);

// Get Routes
router.get('/:userId/:day?', getBlockSchedule);

// Delete Routes
router.delete('/:id', deleteBlockSchedule);

module.exports = router;