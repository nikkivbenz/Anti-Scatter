const { createBlockList, getBlockList, deleteBlockList, updateBlockList } = require('../controllers/BlockListController');
const router = require('express').Router();

// Post Routes
router.post('/', createBlockList);

// Get Routes
router.get('/:userId', getBlockList);

// Delete Routes
router.delete('/:id', deleteBlockList);

// Update Routes
router.put('/:id', updateBlockList);

module.exports = router;