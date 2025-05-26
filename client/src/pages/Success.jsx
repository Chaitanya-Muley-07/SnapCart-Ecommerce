import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Success = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(
      () => {
      setCount((prev) => prev - 1);
            }, 1000);


      setTimeout(()=>{
    window.location.href="/";
  },5000)

    return () =>{ clearInterval(interval)
      clearTimeout(timeout)
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
