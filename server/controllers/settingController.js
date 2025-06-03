const { ROLES } = require("../utils/constants");
const User = require("../models/User");
const Admin = require("../models/Admin");

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

    return res.status(200).json({success:true,message:`New Username is ${newUsername}`,
        user:{
            username:user.username,
            role:user.role,
        }})
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
