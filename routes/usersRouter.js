const express = require("express");
const usersController = require("../controllers/usersController");
const { verifyToken } = require("../middlewares/verifyTokens");
const usersRouter = express.Router();


usersRouter.get('/sidebar',verifyToken,usersController.getusersSideBar)

module.exports = usersRouter;