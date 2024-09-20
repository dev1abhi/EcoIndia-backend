// routes/binRoutes.js
const express = require('express');
const { addBin, getAllBins } = require('../controllers/binController'); // Import the controller functions

const router = express.Router();

// Route to add a new bin
router.post('/add-bin', addBin);

// Route to fetch all bin locations
router.get('/all-bins', getAllBins);

module.exports = router;
