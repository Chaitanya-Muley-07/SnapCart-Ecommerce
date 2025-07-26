import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

const Success = () => {
  const [count, setCount] = useState(5);
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Payment Successful !",
      description: "Your payment has been processed successfully.",
      variant: "success",
    });
  }, [toast]);
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCount((prev) => prev - 1);
      },
      1000
    );


    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);




  return (
    <div className="flex  flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-3xl sm:text-5xl font-bold">Payment Successfull </h1>
      <Link to={"/"} className=" text-xs sm:text-base">
        Click here to go to Homepage (Redirecting you in {count} seconds)
      </Link>
    </div>
  );
};

export default Success;
