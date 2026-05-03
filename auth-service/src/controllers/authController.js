const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { username, pin } = req.body;

    if (!username || !pin) {
      return res.status(400).json({
        success: false,
        message: "Username and PIN are required"
      });
    }

    const user = await User.findOne({ username, pin });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or PIN"
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        accountNumber: user.accountNumber
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message
    });
  }
};