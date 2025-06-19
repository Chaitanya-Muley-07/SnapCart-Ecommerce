import React from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import useErrorLogout from "../../hooks/use-error-logout";
import axios from "axios";
const Settings = () => {
  const { toast } = useToast();
  const { handleErrorLogout } = useErrorLogout();

  const changeUserName = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const previousUsername = formData.get("previousUsername");
    const newUsername = formData.get("newUsername");
    if (!newUsername || !previousUsername) {
      toast({
        title: "Please fill all the fields.",
        description: "Both previous and new usernames are required.",

        variant: "destructive",
      });
      return;
    }
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/change-username",
        {
          previousUsername,
          newUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
     

      if (!data.user) {
        
        return toast({
          title: "Unexpected Error",
          description: "No user data received from server.",
          variant: "destructive",
        });
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      e.target.reset();
      return toast({
        title: "Success",
        description: data.message,
      });
    } catch (error) {
      
      handleErrorLogout(error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const previousPassword = formData.get("previousPassword");
    const newPassword = formData.get("newPassword");
    if (!newPassword) {
      toast({
        title: "Password to change cannot be empty",
        description: "Please enter a new password.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/change-password",
        {
          username: JSON.parse(localStorage.getItem("user")).username,
          previousPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      e.target.reset();
      return toast({
        title: "Success",
        description: data.message,
      });
    } catch (error) {
     
      if (error.response) {
        console.error("🌐 Response status:", error.response.status);
        console.error("📨 Response data:", error.response.data);
      } else {
        console.error("📛 Error message:", error.message);
      }

      handleErrorLogout(error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[80vw] sm:justify-start">
      {/* username */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Change Username</h2>
        <form
          className="grid gap-3 w-[80vw] sm:w-[30vw]"
          onSubmit={changeUserName}
        >
          <Input
            type="text"
            placeholder="Enter previous username"
            name="previousUsername"
          />

          <Input
            type="text"
            placeholder="Enter new username"
            name="newUsername"
          />

          <Button type="submit">Change Username</Button>
        </form>
      </div>

      {/* password */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Change Password</h2>
        <form
          className="grid gap-3 w-[80vw] sm:w-[30vw]"
          onSubmit={changePassword}
        >
          <Input
            type="text"
            placeholder="Enter previous Password"
            name="previousPassword"
          />

          <Input
            type="text"
            placeholder="Enter new Password"
            name="newPassword"
          />

          <Button type="submit">Change Password</Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
