const express=require('express');
const { addPincode, getPincode } = require('../controllers/pincodeControllers');
const verifyToken = require('../middlewares/verifyToken');
const router=express.Router();


router.post("/add-pincode",verifyToken,addPincode);
router.get("/get-pincode/:pincode",getPincode);
module.exports=router;