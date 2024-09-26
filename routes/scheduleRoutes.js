const express = require('express');
const { createScheduledRequest, getRequests, getRequest, deleteRequest } = require('../controllers/scheduledrequests');
const router = express.Router();

// Route to create a scheduled request
router.post('/createscheduledrequest', createScheduledRequest);
router.get('/requests', getRequests);
router.get('/requests/:email', getRequest);
router.delete('/requests/:email', deleteRequest);

module.exports = router;
