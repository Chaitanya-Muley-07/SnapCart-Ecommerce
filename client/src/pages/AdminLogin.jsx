import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setUserLogin } from "../redux/slices/authSlice";
const AdminLogin = () => {
  const [enabled,setEnabled]=useState(false);
  const {toast}=useToast();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogin=async (e)=>{
    e.preventDefault();
    const { username, password } = e.target.elements;
    if (username.value.trim() === "" || password.value.trim() === "") {
      toast({
        title: "Please fill all the fields.",
        variant: "destructive",
      });

      return;
    }
    try{
       const res = await axios.post(import.meta.env.VITE_API_URL + "/admin-login", {
        username: username.value,
        password: password.value,
       });
       const data = await res.data;
       dispatch(setUserLogin({
        user: data.user,
        token: data.token,
        role: data.user.role, // since role is inside user
      }));
      toast({
        title: data.message,
      });
      navigate("/admin/dashboard");
    }catch(error){
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }

  }
  return (
    <>
    
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
             <h1 className="text-2xl font-bold">Log into Your Account</h1>
             <form className="grid gap-3" action="" onSubmit={handleLogin}>
               <Input placeholder="Username" type="text" name="username" />
               <Input placeholder="Password" type="password" name="password" />
               <Button type='submit' >Login</Button>
             </form>
           </div>
    </>
  )
}

export default AdminLogin