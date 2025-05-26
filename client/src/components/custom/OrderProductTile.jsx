import React from "react";

const OrderProductTile = () => {
  return (
    <div className="flex justify-between items-start sm:items-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img
          src="https://images.pexels.com/photos/28919439/pexels-photo-28919439/free-photo-of-latest-smartphone-on-display-at-tech-store.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="w-20 sm:w-24 rounded-lg"
        />
        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">
            CosmicByte Keyboard
          </h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color: <span style={{ backgroundColor: "#ffffff" }}>#ffffff</span>
            </span>
            <span className="hidden sm:block">|</span>

            <span className="font-semibold">
              Qty: <span className="font-medium text-customYellow">5</span>
            </span>
            <span className="hidden sm:block">|</span>

            <span className="font-semibold">
              Price: <span  className="font-medium text-customYellow">₹346</span>
            </span>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default OrderProductTile;
