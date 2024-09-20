const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

// Define routes
router.get('/events/:id', eventController.eventAdd);
router.delete('/events/:id', eventController.eventDelete);

module.exports = router;