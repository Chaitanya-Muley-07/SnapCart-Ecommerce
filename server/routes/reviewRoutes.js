const express= require('express');
const router=express.Router();
const verifyToken=require("../middlewares/verifyToken");
const {createReview,updateReview,deleteReview,getReviews,replyReview}=require("../controllers/reviewController")

router.post("/create-review", verifyToken, createReview);
router.put("/update-review/:id", verifyToken, updateReview);
router.delete("/delete-review/:id", verifyToken, deleteReview);
router.get("/get-reviews/:id", getReviews);
router.put("/reply-review/:id", verifyToken, replyReview);
module.exports = router;