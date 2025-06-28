import React from "react";
import { Card } from "../ui/card";
import { Colors } from "../../constants/color";
import { ArrowDownToLine, Download, IndianRupee } from "lucide-react";
const OrderData = ({
  amount = 100,
  address = "Hingna Road,Ambazari,Nagpur",
  status = "pending",
  createdAt = "2021-09-01",
  updatedAt = "2021-09-01",
  products,
}) => {
    const color = Colors.customYellow;
    console.log("response coming:",products);
  return (
    <Card className="grid gap-2 p-3">
      {
        products.map((product) => (
          <div key={product._id} className="flex flex-col sm:flex-row justify-between sm:items-center border p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
    <div className="flex items-center gap-2">
      <img
        src={product?.images?.[0].url}
        alt={product?.name}
        className="w-20 h-20 rounded-lg"
      />
      <div className="grid gap-1">
        <h1 className="font-semibold text-sm sm:text-lg">
          {product?.name}
        </h1>
        <p className="flex text-xs sm:text-md gap-2 sm:gap-2 text-gray-500 sm:my-0">
            <span style={{ backgroundColor: "white"}} className="font-semibold">
              Color:{color}
            </span>
            <span className="hidden sm:block">|</span>
           
            <span className="text-semibold">
              Status:{" "}
              <span className=" capitalize">{status}</span>
            </span>
          </p>
      </div>
    </div>
    <div className=" flex sm:flex-col gap-3 sm:gap-0 mt-2 sm:mt-0 justify-end sm:items-center">
      <h2 className="text-md sm:text-xl font-bold flex items-center dark:text-customYellow ">
        <IndianRupee size={18} /> 499
      </h2>
      <p className="dark:text-customYellow text-end ">Qty:1</p>
    </div>
  </div>
        ))

      }
 
 
  <div className="flex flex-col sm:flex-row justify-between sm:itmes-center">
     <span>Ordered On: <span className="capitalize">i Jan 2025</span></span>
     <span className="hover:underline text-sm cursor-pointer flex items-center gap-1 text-customYellow"><Download size={20}/>Download Invoice</span>
  </div>
  <hr />
  <span>Delivery On: <span className="capitalize">05 Jan 2025</span></span>
</Card>

  );
};

export default OrderData;
