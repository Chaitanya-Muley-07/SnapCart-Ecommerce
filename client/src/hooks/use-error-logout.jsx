import { useDispatch } from "react-redux";
import { setUserLogout } from "../redux/slices/authSlice";
import { useToast } from "./use-toast";

const useErrorLogout = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleErrorLogout = (error, errorTitle = "Error occurred") => {
    const status = error?.response?.status;

    if (status === 400) {
      dispatch(setUserLogout());
      toast({
        title: "Session expired",
        description: "Please login again to continue.",
        variant: "destructive",
      });
    } else {
      toast({
        title: errorTitle,
        description: error?.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return { handleErrorLogout };
};

export default useErrorLogout;
