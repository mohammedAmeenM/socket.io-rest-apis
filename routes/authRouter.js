const express = require('express');
const authController = require ('../controllers/authContoller');
const authRouter = express.Router();

authRouter.post('/signup',authController.createUser)
.post('/login',authController.loginUser)


module.exports = authRouter