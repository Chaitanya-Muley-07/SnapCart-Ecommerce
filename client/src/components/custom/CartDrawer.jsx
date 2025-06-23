import React from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import {Badge} from "@/components/ui/badge"
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
const CartDrawer = () => {
  const{cartItems,totalQuantity,totalPrice}=useSelector((state)=>state.cart)
  return (
    <Drawer>
      <DrawerTrigger className='relative'>
         {
          totalQuantity > 0 && (
            <Badge className="absolute px-1 py-0">
              {totalQuantity}
            </Badge>
          )
        }
        <ShoppingCart
          className="text-grey-800 dark:text-white hover:scale-105 transition-all ease-in-out cursor-pointer "
          strokeWidth={1.3}
          size={28}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            Total Items:{totalQuantity}, Total Price: ₹{totalPrice}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col sm:flex-row justify-start gap-3 h-[70-vh] overflow-y-scroll sm:overflow-y-hidden sm:h-auto mx-3">
         {
          cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartProduct key={item._id} {...item} />
            ))
          ) : (
            <p className="text-sm">Your cart is empty.</p>
          )}
        </div>
        <DrawerFooter>
          <Button >CheckOut</Button>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
