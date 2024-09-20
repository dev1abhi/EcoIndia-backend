const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define routes
router.post('/createuser', userController.userAdd);

router.delete('/deleteuser/:email', userController.userDelete);

module.exports = router;