import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Colors } from "../../constants/color";
import { useToast } from "../../hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  addToCart,
  emptyCart,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import useRazorpay from "../../hooks/use-razorpay";

const CartProduct = ({
  name,
  image,
  price,
  quantity,
  _id,
  rating,
  blacklisted,
  stock,
  color,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {generatePayment,verifyPayment}=useRazorpay();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleBuyNow =async () => {
   if(!isAuthenticated) {
     
       navigate("/login");
       return;
    }
    if(quantity>stock){
      toast({
        title: "Product out of stock",
        variant: "destructive",
      });
      return;
    }
    if (blacklisted) {
      toast({
        title: "Product isn't available for purchase",
        variant: "destructive",
      });
      return;
    }
    if(color==="")
    {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
     const order=await generatePayment(price*quantity);
     await verifyPayment(order, [{_id,quantity,color}], "123,main street,delhi");


  }
  return (
    <div className="border w-fit rounded-2xl overflow-clip grid z-1 relative hover:shadow-md">
      <img
        src={image}
        alt={name}
        className="w-[30rem] sm:w-[20rem] h-[20rem] object-cover rounded-t-2xl"
      />
      <div className="px-3 grid gap-1 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 rounded-xl">
        <h4 className="text-md text-yellow-400">{name.slice(0, 50)}...</h4>
        <span className="text-md font-semibold">Price: ₹{price}</span>
        <div className="flex justify-between my-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-5 bg-gray-100 rounded-lg px-3 py-2 w-fit">
              <Minus
                size={20}
                strokeWidth={5}
                stroke={Colors.customGray}
                onClick={() => {
                  quantity <= 1
                    ? toast({
                        title: "Minimum quantity reached!!",
                        variant: "destructive",
                      })
                    : dispatch(removeFromCart({ _id, quantity: 1, price }));
                }}
              />
              <span className="text-md text-black"> {quantity}</span>
              <Plus
                size={20}
                strokeWidth={5}
                stroke={Colors.customGray}
                onClick={() => {
                  stock === quantity
                    ? toast({
                        title: "Maximum quantity reached",
                        variant: "destructive",
                      })
                    : dispatch(addToCart({ _id, quantity: 1, price }));
                }}
              />
            </div>
            
          </div>
          <Button size="sm" className="font-semibold" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
     
    </div>
  );
};

export default CartProduct;
