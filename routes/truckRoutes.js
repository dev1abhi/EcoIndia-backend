const express = require('express');
const { startJourney } = require('../controllers/truckController');
const router = express.Router();

// Truck journey route
router.post('/start-journey', startJourney);

module.exports = router;
