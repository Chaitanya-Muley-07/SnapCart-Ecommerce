import React from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
const Settings = () => {

  const { toast } = useToast();
  
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[80vw] sm:justify-start">
      {/* username */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Change Username</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]">
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

          <Button type="submit"  >Change Username</Button>
        </form>
      </div>

      {/* password */}
      <div >
        <h2 className="text-2xl font-bold mb-3">Change Password</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]">
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

          <Button type="submit" >Change Password</Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
