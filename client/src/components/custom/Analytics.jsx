import React from "react";
import { SidebarInset } from "../ui/sidebar";
import { Activity, CreditCard, IndianRupee, Users } from "lucide-react";
import { Chart1 } from "./Chart1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Analytics = () => {
  return (
    <div className="w-screen md:w-[90vw] xl:w-[80vw] flex justify-center items-center">
      <SidebarInset>
        <div className="flex flex-col flex-1 gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Total Sales</h3>
                <IndianRupee size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">₹4376</span>
                <span className="text-xs font-semibold text-gray-400">
                  + 80% from Last Month
                </span>
              </div>
            </div>

            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Users</h3>
                <Users size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">+ 500</span>
                <span className="text-xs font-semibold text-gray-400">
                  + 80% from Last Month
                </span>
              </div>
            </div>

            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold"> Sales</h3>
                <CreditCard size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">₹4376</span>
                <span className="text-xs font-semibold text-gray-400">
                  + 80% from Last Month
                </span>
              </div>
            </div>

            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Active Now</h3>
                <Activity size={16} />
              </div>
              <div className="grid mt-2">
                <span className="text-2xl font-bold">76</span>
                <span className="text-xs font-semibold text-gray-400">
                  + 80% from Last Month
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Chart1 />
            <div className="p-5 bg-muted/50 rounded-lg">
              <h3 className="font-bold text-xl">Recent Sales</h3>
              <p className="text-sm mt-1 my-8">You make 40 sales this Month</p>
              <div className="flex flex-1 flex-col gap-4">
                <div className="h-fit py-1 w-full xl:w-[30rem] rounded-lg flex justify-between items-center">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div >
                      <h3 className="text-md dont-bold capitalize">Chaitanya Muley</h3>
                      <p className="text-sm text-gray-400 ">chaitanya123@gmail.com</p>
                    </div>
                  </div>
                  <h3 className="font-bold">₹4376</h3>
                </div>
                <div className="h-fit py-1 w-full xl:w-[30rem] rounded-lg flex justify-between items-center">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div >
                      <h3 className="text-md dont-bold capitalize">Chaitanya Muley</h3>
                      <p className="text-sm text-gray-400 ">chaitanya123@gmail.com</p>
                    </div>
                  </div>
                  <h3 className="font-bold">₹4376</h3>
                </div>
                <div className="h-fit py-1 w-full xl:w-[30rem] rounded-lg flex justify-between items-center">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div >
                      <h3 className="text-md dont-bold capitalize">Chaitanya Muley</h3>
                      <p className="text-sm text-gray-400 ">chaitanya123@gmail.com</p>
                    </div>
                  </div>
                  <h3 className="font-bold">₹4376</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default Analytics;
