import React, { use } from "react";
import CheckoutProduct from "@/components/custom/CheckoutProduct";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Input } from "../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useErrorLogout from "../hooks/use-error-logout";
import useRazorpay from "../hooks/use-razorpay";
import { emptyCart } from "../redux/slices/cartSlice";


const Checkout = () => {
 
  const [address, setAddress] = useState("");
  const{cartItems,totalQuantity,totalPrice}=useSelector((state)=>state.cart);
  const {user}=useSelector((state)=>state.auth);
  const {toast} = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {handleErrorLogout} = useErrorLogout();
  const {generatePayment,verifyPayment}=useRazorpay();
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to cart before checkout",
        variant: "destructive",
      });
      return;
    }

    if (!address || address.trim() === "") {
      toast({
        title: "Address is required",
        description: "Please enter your shipping address",
        variant: "destructive",
      });
      return;
    }

   const productArray=cartItems.map((item) => {
      return {
        id: item._id,
        quantity: item.quantity,
        color: item.color,
      };
    });

    try {
      const options=await generatePayment(totalPrice);
      const success = await verifyPayment(
        options,
        productArray,
        address
      );
      if (success) {
        dispatch(emptyCart());
        navigate("/success");
      }
    } catch (error) {
      handleErrorLogout(error);
    }
  };

  return (
    <>
      <div className="mx-auto w-[90vw] sm:w-[60vw] flex justify-between items-center sm:my-20">
        <div className="flex flex-col sm:flex-row gap-5 mx-auto my-10">
          {/*product details */}
          <div className="space-y-8">
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-medium">Order Summary</h2>
              <div className="space-y-1 text-3xl">
               {
                cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <CheckoutProduct key={item?.id} {...item} />
                  ))
                ) : (
                  <p className="text-sm">Your cart is empty.</p>
                )
               }
              </div>
              <hr />
              <div className="p-3 rounded-md">
                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">
                    Subtotal:{" "}
                  </span>
                  <span className="font-bold">₹{totalPrice}</span>
                </p>

                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">Tax: </span>
                  <span className="font-bold">₹0</span>
                </p>

                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">
                    Shipping:{" "}
                  </span>
                  <span className="font-bold">₹0</span>
                </p>
              </div>
              <hr />
              <p className="flex justify-between items-cente px-3">
                <span className="font-semibold ">Total: </span>
                <span className="font-bold">₹{totalPrice}</span>
              </p>
            </div>
          </div>

          {/*product details */}
          <div className="w-[90vw] sm:w-[20vw]">
            <Card className="p-4 shadow-md space-y-4 ">
             <h2 className="text-xl font-medium">Billing Information</h2>
             <div className="space-y-2">

             <Label htmlFor="name">Full Name</Label>
             <Input id='name' placeholder='Chaitanya Muley' className='w-full' value={user.name}/>

             <Label htmlFor="email">Email</Label>
             <Input id='email' type='email' placeholder='muleychaitanya123@gmail.com' className='w-full' value={user.email}/>

             <Label htmlFor="address">Shipping Address</Label>
             <Textarea rows='7'id='address' placeholder='168 Lakshminarayan nagar,Nagpur' 
             className='w-full' value={address} onChange={(e) => setAddress(e.target.value)}/>

             </div>
             <Button className="w-full" onClick={handleCheckout}>Place Order</Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
