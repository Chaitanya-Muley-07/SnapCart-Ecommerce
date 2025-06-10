import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link ,useNavigate } from "react-router-dom";
import { useState,} from "react";
import { useToast } from "@/hooks/use-toast"


const Signup = () => {

  const [enabled,setEnabled]=useState(false);
  const {toast}=useToast();
  const navigate=useNavigate();
  const handleSubmit=async (e) => {
    e.preventDefault();
    //return dom elements here in frontend,to access the values add .value
    const {name,email,phone,password}=e.target.elements;
    if(name.value.trim()===""||email.value.trim()===""||phone.value.trim()===""||password.value.trim()===""){
        toast({
      title: "Please fill all the fields.",
      variant: "destructive",
      
    });
    return;
  }
    try{
      const res=await axios.post(import.meta.env.VITE_API_URL+"/signup",{
        name:name.value,
        email:email.value,
        phone:phone.value,
        password:password.value,
      });

      const data=await res.data;
      toast({
        title: data.message,
      });
      navigate("/login");
      
    }catch(error)
    {
      toast({
        title:error.data.response.message,
        variant: "destructive",
      })
    }
    
  }
  return (
    <>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
        <h1 className="text-2xl font-bold">Register Your Account</h1>
        <form className="grid gap-3" action="" onSubmit={handleSubmit}>
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
          <Button type='submit' disabled={!enabled}>Sign Up</Button>
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
