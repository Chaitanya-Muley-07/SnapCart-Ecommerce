const Order = require("../models/Order");
const ROLES = require("../utils/constants");
const User = require("../models/User");

const getOrdersByUserId = async (req, res) => {
  const userId = req.id;

  try {
     const orders = await Order.find({ userId })
      .populate({
        path: "products.id",
        select: "name price images category"
      })
      .lean(); // Add lean() for better performance

    console.log("Orders with populated products:", JSON.stringify(orders, null, 2));

    if (!orders || orders.length === 0) {
      return res
        .status(500)
        .json({ success: false, message: "No orders to show" });
    }

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this resource",
    });
  }
  const { page, limit } = req.query;
  try {
    const orders = await Order.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId", "name email")
      .populate("products.id", "name price images category")
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }
    return res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        totalOrders: await Order.countDocuments(),
        totalPages: Math.ceil((await Order.countDocuments()) / limit),
        currentPage: Number(page),
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this resource",
    });
  }

  const { paymentId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findOneAndUpdate(
      { razorpayPaymentId: paymentId },
      { status },
      { new: true }
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMetrics = async (req, res) => {
};

module.exports = {
  getMetrics,getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
};