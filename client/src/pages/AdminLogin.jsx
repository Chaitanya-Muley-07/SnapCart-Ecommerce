import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
const AdminLogin = () => {
  const [enabled,setEnabled]=useState(false);
  return (
    <>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
             <h1 className="text-2xl font-bold">Log into Your Account</h1>
             <form className="grid gap-3" action="">
               <Input placeholder="Username" type="text" name="username" />
               <Input placeholder="Password" type="password" name="password" />
               <Button >Login</Button>
             </form>
           </div>
    </>
  )
}

export default AdminLogin