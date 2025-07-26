import React from "react";
import { Colors } from "../../constants/color";

const CheckoutProduct = ({
  name = "Custom Keyboard",
  price = 200,
  quantity = 2,
  image = {
    url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  color = Colors.customYellow,
  
}) => {
    console.log("Image prop:", image);
  return (
 

    <div className="flex justify-between items-start p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center">
        <img src={image} alt={name} className="w-20 sm:w-24 rounded-lg m-2" />
        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">{name.slice(0, 20)}</h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span style={{ backgroundColor: color }} className="font-semibold">
              Color:{color}
            </span>
            <span className="hidden sm:block">|</span>
            <span className="text-semibold">
              Qty:{" "}
              <span className="font-medium text-customYellow">{quantity}</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="text-semibold">
              Price:{" "}
              <span className="font-medium text-customYellow">{price}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
