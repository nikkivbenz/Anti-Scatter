const { getBlockSchedule, createBlockSchedule } = require("../controllers/BlockScheduleController");
const router = require("express").Router();

// Post Routes
router.post('/blockschedule', createBlockSchedule);

// Get Routes
router.get('/blockschedule', getBlockSchedule);

module.exports = router;