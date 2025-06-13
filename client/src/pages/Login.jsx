import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../redux/slices/authSlice";
const Login = () => {
  const [enabled, setEnabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    if (email.value.trim() === "" || password.value.trim() === "") {
      toast({
        title: "Please fill all the fields.",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/login", {
        email: email.value,
        password: password.value,
      });
      const data = await res.data;
     
      
      dispatch(
        setUserLogin({
          user: data.user,
          token: data.token,
          role: data.user.role, // since role is inside user
        })
      );

      toast({
        title: data.message,
      });
      navigate("/");
    } catch (error) {
      toast({
         title: error.response?.data?.message,
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
        <h1 className="text-2xl font-bold">Log into Your Account</h1>
        <form className="grid gap-3" action="" onSubmit={handleSubmit}>
          <Input placeholder="Email" type="email" name="email" />
          <Input placeholder="Password" type="password" name="password" />
          <Button>Login</Button>
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
  );
};

export default Login;
