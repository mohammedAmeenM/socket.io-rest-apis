const express = require('express');
const messageController = require ('../controllers/messageController');
const { verifyToken } = require('../middlewares/verifyTokens');
const messageRouter = express.Router();

messageRouter.post('/send/:id',verifyToken,messageController.sendMessage)
.get('/send/:id/',verifyToken,messageController.getMessages)

module.exports = messageRouter