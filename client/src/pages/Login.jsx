import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
   const [enabled,setEnabled]=useState(false);
  return (
    <>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
             <h1 className="text-2xl font-bold">Log into Your Account</h1>
             <form className="grid gap-3" action="">
               <Input placeholder="Email" type="email" name="email" />
               <Input placeholder="Password" type="password" name="password" />
               <Button >Login</Button>
               <div className="flex gap-2 items-center">
                 
                   <label
                     htmlFor="terms"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                   >
                     Don't have an Account?
                   </label>
                 <Link to={`/signup`}>
                   <label
                     htmlFor="terms"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                   >
                     Sign up
                   </label>
                 </Link>
               </div>
             </form>
           </div>
    </>
  )
}

export default Login
