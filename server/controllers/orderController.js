const Order = require("../models/Order");
const ROLES = require("../utils/constants");
const User = require("../models/User");

const getOrdersByUserId = async (req, res) => {
  const userId = req.id;

  try {
    const orders = await Order.find({ userId })
      .populate({
        path: "products.id",
        select: "name price images category",
      })
     
  
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

// const getAllOrders = async (req, res) => {
//       console.log("=== getAllOrders DEBUG ===");
//     console.log("req.role:", req.role);
//     console.log("typeof req.role:", typeof req.role);
//     console.log("req.role === 'admin':", req.role === 'admin');
//     console.log("req.role.trim() === 'admin':", req.role?.trim() === 'admin');
//   if (req.role !== ROLES.admin) {
//     return res.status(403).json({
//       success: false,
//       message: "You are not authorized to perform this resource",
//     });
//   }
//   const { page, limit } = req.query;
//   try {
//     const orders = await Order.find()
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .populate("userId", "name email")
//       .populate("products.id", "name price images category")
//       .sort({ createdAt: -1 });
//     if (!orders || orders.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No orders found" });
//     }
//     return res.status(200).json({
//       success: true,
//       data: orders,
//       pagination: {
//         totalOrders: await Order.countDocuments(),
//         totalPages: Math.ceil((await Order.countDocuments()) / limit),
//         currentPage: Number(page),
//         pageSize: limit,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
const getAllOrders = async (req, res) => {
    
    
    try {
       
        
        // Role check
        if (req.role !== 'admin') {
            
            return res.status(403).json({
                success: false,
                message: "you are not authorized to perform this resource"
            });
        }
       
        
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        console.log("Query params - page:", page, "limit:", limit, "skip:", skip);

        // Fetch orders from database
        const orders = await Order.find({})
            .populate('products.id') // Populate product details
            .populate('userId', 'name email') // Populate user details
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const totalOrders = await Order.countDocuments({});
        const totalPages = Math.ceil(totalOrders / limit);

        // Create pagination object
        const pagination = {
            currentPage: page,
            totalPages: totalPages,
            totalOrders: totalOrders,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };
        
        
        
        
        res.status(200).json({
            success: true,
            data: orders,
            pagination: pagination
        });
        
    } catch (error) {
        console.log("Caught error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// const updateOrderStatus = async (req, res) => {
//   if (req.role !== ROLES.admin) {
//     return res.status(403).json({
//       success: false,
//       message: "You are not authorized to perform this resource",
//     });
//   }

//   const { paymentId } = req.params;
//   const { status } = req.body;

//   try {
//     const order = await Order.findOneAndUpdate(
//       { razorpayPaymentId: paymentId },
//       { status },
//       { new: true }
//     );
//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Order status updated successfully",
//       data: order,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
const updateOrderStatus = async (req, res) => {
  
 


  if (req.role !== 'admin') {
    console.log(" Authorization failed");
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
const getMetrics = async (req, res) => {};

module.exports = {
  getMetrics,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
};
