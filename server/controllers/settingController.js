const { ROLES } = require("../utils/constants");
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt=require('bcrypt');

const changeUsername = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  try {
    const { previousUsername, newUsername } = req.body;
    if (!newUsername || !previousUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username to change is required" });
    }
    const user = await Admin.findOneAndUpdate(
      {
        username: previousUsername,
      },
      { username: newUsername },
      { new: true }
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Username doesn't Exists" });

    return res.status(200).json({
      success: true,
      message: `New Username is ${newUsername}`,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  try {
    const { username, previousPassword, newPassword } = req.body;
    if (!newPassword || !previousPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Previous Password is required" });
    }
    const user = await Admin.findOne({
      username: username,
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isPasswordValid = await bcrypt.compare(
      previousPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Previous Password is Incorrect" });
    }
    const securePasword = await bcrypt.hash(newPassword, 10);
    user.password = securePasword;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports={changePassword,changeUsername};
