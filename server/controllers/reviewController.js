const { ROLES } = require("../utils/constants");
const Review=require('../models/Review');
const Product=require('../models/Product');
const createReview =async (req,res)=>{
    if(req.role!==ROLES.user)
    {
        return res.status(401).json({success:false,message:"Access Denied"});
    }
    const userId=req.id;
    try{
        const{productId,review,rating}=req.body;
        const newReview=await Review.create({
         productId,
         review,
         userId,
         rating,
        });
        newReview.populate("userId","name");

        let product=await Product.findByIdandUpdate(productId,{
           $push:{ reviews:newReview._id},
        });

        await product.calculateRating();
        return res.status(201).json({
            success:true,
            message:"Thanks for the review",
            data:newReview;
        })
    }catch(error)
    {
        return res.status(500).json({success:false,message:error.message});
    }

};

const replyReview=async(req,res)=>{
     if(req.role!==ROLES.user)
    {
        return res.status(401).json({success:false,message:"Access Denied"});
    }
    const userId=req.id;
    try{
        const{review}=req.body;
        
        
    }catch(error)
    {
        return res.status(500).json({success:false,message:error.message});
    }
}
