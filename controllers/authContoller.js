const User = require("../models/authSchema");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const createUser = async (req, res) => {
  try {
    const values = req.body;
    const user = new User({ ...values });
    await user.save();
    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "Something went wrong",
      });
    }
    const token = generateToken(user._id);
    res.status(201).json({
      status: "success",
      message: "Successfully created user",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "internal server error",
      error_message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        status: "failure",
        message: " Invalied email or password",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      status: "success",
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "internal server error",
      error_message: error.message,
    });
  }
};

module.exports = { createUser, loginUser };
