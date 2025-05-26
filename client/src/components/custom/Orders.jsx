import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import OrderProductTile from "./OrderProductTile";

const Orders = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 ml-3">Orders</h1>
      <div className="flex flex-col gap-5 mx-auto my-10">
        <div className=" space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>

            <div className="grid space-y-1 gap-2 sm:w-[80vw]">
              <Card className="space-y-2 p-3 shadow-md">
                <div className="grid sm:grid-cols-3 gap-2">
                  {/* Multiple  ordered Products */}
                  <OrderProductTile />
                  <OrderProductTile />
                  <OrderProductTile />
                </div>
                <hr />
                <div>
                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                    <span className="font-bold">Total:</span>
                    <span className="font-sm text-customGray">₹54566</span>
                  </p>

                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                    <span className="font-bold">Address:</span>
                    <span className="font-sm text-customGray ">
                      Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor
                      sit amet.{" "}
                    </span>
                  </p>

                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                    <span className="font-bold">Name:</span>
                    <span className="font-sm text-customGray ">
                      Chaitanya Muley{" "}
                    </span>
                  </p>

                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                    <span className="font-bold">Email:</span>
                    <span className="font-sm text-customGray ">
                      chaitanya.muley9124@gmail.com{" "}
                    </span>
                  </p>

                  <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                    <span className="font-bold">Payment Id:</span>
                    <span className="font-sm text-customGray ">
                      27048028409273{" "}
                    </span>
                  </p>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="capitalize">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="packed">Packed</SelectItem>
                    <SelectItem value="in-transit">In-Transit</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>
          </div>
        </div>
        <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious Link to="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink Link to="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext Link to="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

      </div>
    </>
  );
};

export default Orders;
