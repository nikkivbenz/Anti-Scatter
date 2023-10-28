const { getBlockSchedule, createBlockSchedule } = require("../controllers/BlockScheduleController");
const router = require("express").Router();

// Post Routes
router.post('/blockschedule', createBlockSchedule);

// Get Routes
router.get('/blockschedule/:userId', getBlockSchedule);

module.exports = router;