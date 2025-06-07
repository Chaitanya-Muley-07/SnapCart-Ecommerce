const Order = require('../models/Order')
const ROLES = require('../utils/constants');    
const User = require('../models/User');

const getOrdersByUserId= async (req, res) => {

  const userId = req.id;

  try {
    const orders = await Order.find({ userId }).populate('products.id', 'name price images category');
     
    
    if (!orders || orders.length === 0) {
      return res.status(500).json({ success: false, message: "No orders to show" });
    }
    
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders=async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }
    const {page,limit}=req.query;
  try {
    const orders=await Order.find().skip((page-1)*limit).limit(limit).populate('userId', 'name email').populate('products.id', 'name price images category').sort({ createdAt: -1 });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}