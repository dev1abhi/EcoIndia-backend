const express = require('express');
const litterLogController = require('../controllers/litterLogController');
const router = express.Router();

// Define routes for litter logs
router.post('/litterlogadd', litterLogController.litterLogAdd);
router.delete('/litterlogdelete/:id', litterLogController.litterLogDelete);

module.exports = router;