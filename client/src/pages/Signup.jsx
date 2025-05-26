import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
const Signup = () => {

  const [enabled,setEnabled]=useState(false);
  return (
    <>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
        <h1 className="text-2xl font-bold">Register Your Account</h1>
        <form className="grid gap-3" action="">
          <Input placeholder="Enter Your Name" type="text" name="name" />
          <Input placeholder="Email" type="email" name="email" />
          <Input placeholder="Mobile Number" type="tel" name="phone" />
          <Input placeholder="Password" type="password" name="password" />
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={(e)=>setEnabled(e)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </div>
          <Button disabled={!enabled}>Sign Up</Button>
          <div className="flex gap-2 items-center">
            
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Already have an Account?
              </label>
            <Link to={`/login`}>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Login
              </label>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
