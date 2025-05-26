import React from "react";
import { SidebarInset } from "../ui/sidebar";
import { Activity, CreditCard,  IndianRupee, Users } from "lucide-react";
const Analytics = () => {
  return (
    <div className="w-screen md:w-[90vw] xl:w-[80vw] flex  justify-center items-center">
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
                <span className="text-xs font-semibold text-gray-400">+ 80% from Last Month</span>
                
              </div>

            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="h-fit rounded-xl bg-muted/50 p-4">

              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Users</h3>
                <Users size={16} />
              </div>

              <div className="grid mt-2">
                <span className="text-2xl font-bold">+ 500</span>
                <span className="text-xs font-semibold text-gray-400">+ 80% from Last Month</span>
                
              </div>

            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="h-fit rounded-xl bg-muted/50 p-4">

              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold"> Sales</h3>
                <CreditCard size={16} />
              </div>

              <div className="grid mt-2">
                <span className="text-2xl font-bold">₹4376</span>
                <span className="text-xs font-semibold text-gray-400">+ 80% from Last Month</span>
                
              </div>

            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="h-fit rounded-xl bg-muted/50 p-4">

              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Active Now</h3>
                <Activity size={16} />
              </div>

              <div className="grid mt-2">
                <span className="text-2xl font-bold">76</span>
                <span className="text-xs font-semibold text-gray-400">+ 80% from Last Month</span>
                
              </div>

            </div>
          </div>

        </div>
      </SidebarInset>
    </div>
  );
};

export default Analytics;
