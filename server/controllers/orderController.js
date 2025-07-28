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
const getMetrics = async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }

  const { startDate, endDate } = req.query;

  try {
    const start = new Date(startDate || new Date().setMonth(new Date().getMonth() - 1));
    const end = new Date(endDate || new Date());

    // Calculate total sales
    const ordersInRange = await Order.find({
      createdAt: { $gte: start, $lte: end },
    });
    const totalSales = ordersInRange.reduce((acc, order) => acc + order.amount, 0);

    // Calculate this month's orders
    const thisMonthOrders = ordersInRange;

    // Get the last month
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

    // Calculate last month's orders
    const lastMonthOrders = await Order.find({
      createdAt: { $gte: lastMonth, $lte: start },
    });

    // Calculate total amount of this month's orders
    const totalThisMonth = thisMonthOrders.reduce((acc, order) => acc + order.amount, 0);

    // Calculate total amount of last month's orders
    const totalLastMonth = lastMonthOrders.reduce((acc, order) => acc + order.amount, 0);

    // Calculate growth
    const salesGrowth = totalLastMonth
      ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100
      : 0;

    // Calculate users
    const thisMonthUsers = await User.find({
      createdAt: { $gte: start, $lte: end },
    });

    const lastMonthUsers = await User.find({
      createdAt: { $gte: lastMonth, $lte: start },
    });

    const usersGrowth = lastMonthUsers.length
      ? ((thisMonthUsers.length - lastMonthUsers.length) / lastMonthUsers.length) * 100
      : 0;

    // Calculate users purchased last hour
    const lastHour = new Date(new Date().setHours(new Date().getHours() - 1));

    const lastHourOrders = await Order.find({
      createdAt: { $gte: lastHour, $lte: new Date() },
    });

    const previousDayOrders = await Order.find({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

    const lastHourGrowth = previousDayOrders.length
      ? (lastHourOrders.length / previousDayOrders.length) * 100
      : 0;

    // Recent sales
    const recentOrders = await Order.find()
      .populate({
        path: "userId",
        select: "name email",
      })
      .select("amount")
      .sort({ createdAt: -1 })
      .limit(9);

    // products delivered in last 6 months with their category and count according to month
    const sixMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 6));

    const sixMonthsOrders = await Order.find({
      createdAt: { $gte: sixMonthsAgo },
    }).populate({
      path: "products.id",
      select: "category",
    });

    // get them month wise for eg ; {jan : {keyboard : 1, mouse :1, headset 2}}
    const monthWise = sixMonthsOrders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });

      order.products.forEach((product) => {
        if (!acc[month]) {
          acc[month] = {};
        }

        if (!acc[month][product.id.category]) {
          acc[month][product.id.category] = 1;
        } else {
          acc[month][product.id.category]++;
        }
      });

      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      data: {
        totalSales: {
          count: totalSales,
          growth: salesGrowth,
        },
        users: {
          count: thisMonthUsers.length,
          growth: usersGrowth,
        },
        sales: {
          count: totalThisMonth,
          growth: salesGrowth,
        },
        activeNow: {
          count: lastHourOrders.length,
          growth: lastHourGrowth,
        },
        recentSales: {
          count: totalThisMonth,
          users: recentOrders,
        },
        sixMonthsBarChartData: monthWise,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  getMetrics,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
};
