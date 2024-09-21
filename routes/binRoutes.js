// routes/binRoutes.js
const express = require('express');
const {  getAllBins, createBin } = require('../controllers/binController'); // Import the controller functions

const router = express.Router();

//To create a bin using the user's default location and number, send a POST request to /api/bins/create-bin with the user's ID.
// Route to add a new bin
router.post('/create-bin', createBin);

// Route to fetch all bin locations
router.get('/all-bins', getAllBins);

module.exports = router;
