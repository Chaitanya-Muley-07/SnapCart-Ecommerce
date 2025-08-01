const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],

        },
        password:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            unique:true,
        },
        otp:{
            type:Number,
            default:0,
        },
        role:{
            type:String,
            default:"user",
            enum:["user","admin"],
        },
        purchasedProducts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
        ],
    },
    {timestamps:true}
);

const User=mongoose.model("User",userSchema);
module.exports=User;