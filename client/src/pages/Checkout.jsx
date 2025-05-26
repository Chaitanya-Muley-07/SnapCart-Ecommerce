import React from "react";
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


const Checkout = () => {
  return (
    <>
      <div className="mx-auto w-[90vw] sm:w-[60vw] flex justify-between items-center sm:my-20">
        <div className="flex flex-col sm:flex-row gap-5 mx-auto my-10">
          {/*product details */}
          <div className="space-y-8">
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-medium">Order Summary</h2>
              <div className="space-y-1 text-3xl">
                <CheckoutProduct />
                <CheckoutProduct />
              </div>
              <hr />
              <div className="p-3 rounded-md">
                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">
                    Subtotal:{" "}
                  </span>
                  <span className="font-bold">₹599</span>
                </p>

                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">Tax: </span>
                  <span className="font-bold">₹5</span>
                </p>

                <p className="flex justify-between items-center">
                  <span className="font-semibold text-customGray">
                    Shipping:{" "}
                  </span>
                  <span className="font-bold">₹5</span>
                </p>
              </div>
              <hr />
              <p className="flex justify-between items-cente px-3">
                <span className="font-semibold ">Total: </span>
                <span className="font-bold">₹600</span>
              </p>
            </div>
          </div>

          {/*product details */}
          <div className="w-[90vw] sm:w-[20vw]">
            <Card className="p-4 shadow-md space-y-4 ">
             <h2 className="text-xl font-medium">Billing Information</h2>
             <div className="space-y-2">

             <Label htmlFor="name">Full Name</Label>
             <Input id='name' placeholder='Chaitanya Muley' className='w-full' />

             <Label htmlFor="email">Email</Label>
             <Input id='email' type='email' placeholder='muleychaitanya123@gmail.com' className='w-full' />

             <Label htmlFor="address">Shipping Address</Label>
             <Textarea rows='7'id='address' placeholder='168 Lakshminarayan nagar,Nagpur' 
             className='w-full'/>

             </div>
             <Button className="w-full">Place Order</Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
