const Pincode = require("../models/Pincode");
const {ROLES}=require("../utils/constants")


const addPincode = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access Denied" });
  }

  const { pincodes } = req.body;
  if (!pincodes || pincodes.length === 0) {
    return res.status(400).json({ message: "Please provide pincodes" });
  }
  try {
    const existingPincodes = await Pincode.find({
      pincode: { $in: pincodes.map((p) => p.pincode) },
    });

    const existingPincodesValues = existingPincodes.map((p) => p.pincode);

    const newPincodes = pincodes.filter(
      (p) => !existingPincodesValues.includes(p.pincode)
    );
    if (newPincodes.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "All pincodes already exists" });
    }
     await Pincode.insertMany(newPincodes);
    return res
      .status(200)
      .json({ success: true, message: "Pincodes added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPincode=async (req,res)=>{
  const{pincode}=req.params;
  try{
     const existingPincode=await Pincode.find({pincode:pincode});
     if(existingPincode.length===0)
     {
      return res.status(404).json({success:false,message:"No delivery at this pincode"})
     }
     return res.status(200).json({success:true,message:"Delivery Available"})
  }catch(error)
  {
    return res.status(500).json({ success: false, message: error.message });
  }
}
module.exports={getPincode,addPincode};
