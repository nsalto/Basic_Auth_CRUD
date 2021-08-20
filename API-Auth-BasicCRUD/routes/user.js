const express = require('express');
const router = express.Router();

// Import controller
const userController = require('../controllers/user');

router.route('/register')
    .post(userController.registerUser)

router.route('/login')
    .post(userController.loginUser)


module.exports = router;