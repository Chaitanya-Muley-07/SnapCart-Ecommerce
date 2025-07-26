import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
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
} from "@/components/ui/pagination";
import OrderProductTile from "./OrderProductTile";
import useErrorLogout from "../../hooks/use-error-logout";
import { useState } from "react";
import { set } from "mongoose";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleErrorLogout } = useErrorLogout();
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("hey there");
      try {
        console.log("hey there");
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/get-all-orders?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { data, pagination } = res.data;
        setOrders(data);
        setTotalPages(pagination.totalPages);
        setCurrentPage(pagination.currentPage);
        // Add this before the orders fetch

        console.log("Full response:", res.data);
        console.log("Orders data:", data);
        console.log("Pagination:", pagination);
      } catch (error) {
        handleErrorLogout(error, error.response.data.message);
      }
    };
    fetchOrders();
  }, [currentPage]);

  const updateOrderStatus = async (status, paymentId) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/update-order-status/${paymentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      handleErrorLogout(error, error.response.data.message);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 ml-3">Orders</h1>
      <div className="flex flex-col gap-5 mx-auto my-10">
        <div className=" space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>

            <div className="grid space-y-1 gap-2 sm:w-[80vw]">
              {orders.length === 0 ? (
                <h2 className="text-primary text-3xl">
                  Nothing to Show,Please add some Products...{" "}
                </h2>
              ) : (
                orders.map((item) => (
                  <Card key={item._id} className="space-y-2 p-3 shadow-md">
                    <div className="grid sm:grid-cols-3 gap-2">
                      {/* Multiple  ordered Products */}
                      {item.products?.map((product) => (
                        <OrderProductTile key={product._id} {...product} />
                      ))}
                    </div>
                    <hr />
                    <div>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Total:</span>
                        <span className="font-sm text-customGray">
                          ₹{item?.amount}
                        </span>
                      </p>

                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                        <span className="font-bold">Address:</span>
                        <span className="font-sm text-customGray ">
                          {item?.address}{" "}
                        </span>
                      </p>

                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                        <span className="font-bold">Name:</span>
                        <span className="font-sm text-customGray ">
                          {item?.userId?.name}{" "}
                        </span>
                      </p>

                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                        <span className="font-bold">Email:</span>
                        <span className="font-sm text-customGray ">
                          {item?.userId?.email}{" "}
                          {console.log(item?.userId?.email)}
                        </span>
                      </p>

                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3 ">
                        <span className="font-bold">Payment Id:</span>
                        <span className="font-sm text-customGray ">
                          {item?.razorpayPaymentId}{" "}
                        </span>
                      </p>
                    </div>
                    <Select
                      defaultValue={item.status} // ✅ Shows current status
                      onValueChange={(value) => {
                        if (
                          confirm("Are you sure you want to update the status?")
                        ) {
                          updateOrderStatus(value, item.razorpayPaymentId);
                        }
                      }}
                    >
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
                ))
              )}
            </div>
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Orders;
