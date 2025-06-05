const express= require('express');
const router=express.Router();
const verifyToken=require("../middlewares/verifyToken");
const { createProduct } = require('../controllers/productController');
const multer=require('../middlewares/multer');
const upload = require('../middlewares/multer');

router.post("/create-product",verifyToken,upload.array('images',4),createProduct);


module.exports=router;