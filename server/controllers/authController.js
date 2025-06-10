const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    let user = await User.findOne({ email: email });
    //if old user trying to register
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Please try with different email" });
    }
    //new user for registration
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    //wrong password?
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //corect password
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      success: true,
      message: "User logged in in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const adminSignup = async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username: username });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: "Please try with different username",
      });
    }
    const securePassword = await bcrypt.hash(password, 10);
    admin = new Admin({
      username: username,
      password: securePassword,
    });
    await admin.save();
    return res.status(201).json({
      success: true,
      message: "Admin signed-up successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username: username });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "User loggen in successfully",
      token,
      user: {
        id: admin._id,
        name: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { signup, login,adminSignup,adminLogin };
