import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogout } from "../../redux/slices/authSlice";
const LogOutToggle = ({user}) => {

  const dispatch=useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
         
          <AvatarFallback className="text-xl dark:text-slate-300"> {user?.name
    ?.trim()
    .split(" ")
    .filter(Boolean) // removes empty strings from extra spaces
    .map((n) => n[0])
    .join("")
    .toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={()=>dispatch(setUserLogout())}>Logout</DropdownMenuItem>
        <Link to="/orders">
          <DropdownMenuItem>My Orders</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogOutToggle;
