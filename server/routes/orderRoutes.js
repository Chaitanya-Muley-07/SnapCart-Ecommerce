const router = require('express').Router();
const { getOrdersByUserId, getAllOrders, updateOrderStatus, getMetrics } = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');
//user route
router.get("/get-orders-by-user-id",verifyToken,getOrdersByUserId);
//admin routes
router.get("/get-all-orders",verifyToken,getAllOrders);
router.put("/update-order-status/:paymentId",verifyToken,updateOrderStatus);
router.get("/get-metrics",verifyToken,getMetrics);
module.exports=router;