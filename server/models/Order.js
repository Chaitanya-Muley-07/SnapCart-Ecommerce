const mongoose=require('mongoose');

const orderSchema=mongoose.Schema(
    {
      amount:{
        type:Number,
        required:true,
      },
      address:{
        type:String,
        required:true,
      },
      razorpayOrderId:{
        type:String,
        required:true,
      },
      razorpayPaymentId:{
        type:String,
        required:true,
      },
      razorpaySignature:{
        type:String,
        required:true,
      },
      products:[
        {
          _id: false,
            // one single instance of product ordered
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity:{
                type:Number,
                required:true,
            },
            color:{
                type:String,
                required:true,
            }

        }
      ],
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
      status:{
        type:String,
        enum:["pending","packed","in-transit","failed","completed"],
        default:"pending",
      }
    },
    {timestamps:true}
);

const Order=mongoose.model("Order",orderSchema);
module.exports=Order;