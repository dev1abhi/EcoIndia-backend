const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define routes
router.post('/createuser', userController.userAdd);
router.delete('/deleteuser/:id', userController.userDelete);

module.exports = router;