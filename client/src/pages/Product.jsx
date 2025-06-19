import React, { useState } from "react";
import { starsGenerator } from "../constants/helper";
import { Circle, Minus, Plus } from "lucide-react";
import { Colors } from "../constants/color";
import {Input} from "../components/ui/input"
import { Button } from "../components/ui/button";
import ReviewComponent from "../components/custom/ReviewComponent";
import { useParams } from "react-router-dom";


const imagesArray = [
  {
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 1,
  },
  {
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 2,
  },
  {
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 3,
  },
  {
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 4,
  },
];

const productStock=10;


const Product = () => {
  const {productName}=useParams();
  console.log("Product Name:", productName);
  const [productQuantity,setProductQuantity]=useState(10);
  const [pincode,setPinCode]=useState("");
  const [availibilityMessage,setAvailabilityMessage]=useState("");
  const [purchaseProduct,setPurchaseProduct]=useState(false);
  const [address,setAddress]=useState("");
  return (
    <>
      <div>
        <main className="w-[93vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10 ">
          {/* left side */}

          <div className="grid sm:w-[50%] gap-3">
            <img
              className="w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none"
              src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <div className="grid grid-cols-4 gap-3">
              {imagesArray.map(({ url, id }) => (
                <img
                  src={url}
                  key={id}
                  className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                />
              ))}
            </div>
          </div>

          {/* right side */}
          <div className="sm:w-[50%] lg:w-[30%] ">
            <div className="pb-5">
              <h2 className="font-extrabold text-2xl">My first Keyboard</h2>
              <p className="my-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore, reiciendis quas. Vitae pariatur, praesentium ipsam
                ipsum deserunt dolores natus reprehenderit.
              </p>
              <div className="flex items-center">
                {starsGenerator(4.5, "0", 15)}
                <span className="text-md ml-1">(2)</span>
              </div>
            </div>
            <div className="py-5 border-t border-b">
              <h3 className="font-bold text-xl">Rs.560 or Rs.36/month</h3>
              <p className="text-sm">
                Suggested payments with 6 months special financing
              </p>
            </div>
            <div className="py-5 border-b ">
              <h3 className="font-bold text-lg">Choose Color</h3>
              <div className="flex items-center my-2">
                <Circle
                  fill={Colors.customGray}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                />
                <Circle
                  fill={Colors.customBlack}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                />
                <Circle
                  fill={Colors.customYellow}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                />
                <Circle
                  fill={Colors.customIsabelline}
                  strokeOpacity={0.2}
                  strokeWidth={0.2}
                  size={40}
                />
              </div>
              <div className="py-5">
                <div className="flex gap-3 items-center">
                  <div className="flex gap-5 items-center bg-gray-100 rounded-full px-3 py-2 w-fit">
                    <Minus cursor={"pointer"}  stroke={Colors.customGray} 
                    onClick={()=>setProductQuantity((qty)=>qty>1?qty-1:1)} />
                    <span className="text-slate-950">{productQuantity}</span>
                    <Plus cursor={"pointer"} stroke={Colors.customGray}   onClick={()=>setProductQuantity((qty)=>qty<productStock?qty+1:productStock)} />
                  </div>
                </div>
                {
                  productStock-productQuantity>0 && (
                  <div className="grid text-sm font-semibold to-gray-600">
                    <span>
                      Only{" "} 
                      <span className="text-customYellow">{productStock-productQuantity} items{" "}</span>
                       Left!!
                       </span>
                       <span>Don't miss it!</span>
                  </div>
                  )}
              </div>
              <div className="grid gap-3 my-5">
                <div className=" flex gap-3">
                  <Input placeholder='Enter your Pincode Here' onChange={(e)=>setPinCode(e.target.value)} />
                  <Button>Check Availability</Button>

                </div>
                <p className="text-sm px-2">
                  {availibilityMessage}
                </p>
                 
              </div>
              <div className="flex gap-3">
                <Button onClick={()=>setPurchaseProduct(true)}>Buy Now</Button>
                <Button>Add to Cart</Button>
              </div>
              {
                purchaseProduct && (
                <div className="my-3 space-y-2">
                    <Input placeholder='Enter Your Address Here...' onChange={(e)=>setAddress(e.target.value)}/>
                    <Button>Confirm Order </Button>

                </div>
                )}
            </div>
          </div>
        </main>

        {/*review section*/}
        <ReviewComponent/>
      </div>
    </>
  );
};

export default Product;
