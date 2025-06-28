const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Order = require("../models/Order");

const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");
const Product = require("../models/Product");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generatePayment = async (req, res) => {
  const  userId  = req.id;

  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      receipt: Math.random().toString(36).substring(2), // Unique receipt ID
    };

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    instance.orders.create(options, async (err, order) => {
      if (err) {
        console.error("Razorpay order creation error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Payment initiation failed" });
      }
      return res.status(200).json({
        success: true,
        message: "Order created successfully",
        data: {
          ...order,
          name: user.name,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const verifyPayment = async (req, res) => {
  const userId  = req.id;
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      amount,
      productArray,
      address,
    } = req.body;
      

    const formattedProductArray = productArray.map((product) => ({
  id: product._id, // 👈 this fixes your population issue
  quantity: product.quantity,
  color: product.color,
}));

    //signature generation
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

   
    const validatedPayment = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      signature,
      process.env.RAZORPAY_KEY_SECRET
    );
    if (!validatedPayment) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
    for (const product of productArray) {
      await User.findByIdAndUpdate(userId, {
        $push: { purchasedProducts: product },
      });

      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -product.quantity },
      });
    }

    await Order.create({
      amount:amount/100,
      address,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: signature,
      products: formattedProductArray,
      userId,
    });
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generatePayment,
  verifyPayment,
};