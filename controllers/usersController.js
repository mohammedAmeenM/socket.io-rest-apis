const User = require("../models/authSchema");

const getusersSideBar = async (req, res) => {
  try {
    const logedUserId = req.userId;
    const filterUsers = await User.find({ _id: { $ne: logedUserId } }).select(
      "-password"
    );
    if (!filterUsers) {
      return res.status(404).json({
        status: "failure",
        message: "users not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully fetched users",
      filterUsers,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "internal server error",
      error_message: error.message,
    });
  }
};

module.exports = { getusersSideBar };
