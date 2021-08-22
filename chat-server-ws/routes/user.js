const express = require('express');
const userRoutes = express.Router();

// Import controller
const userController = require('../controllers/user');

userRoutes.route('/register')
    .post(userController.registerUser)

userRoutes.route('/login')
    .post(userController.loginUser)


module.exports = userRoutes;