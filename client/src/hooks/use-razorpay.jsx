import axios from "axios";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { verify } from "jsonwebtoken";

const useRazorpay = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const generatePayment = async (amount) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/generate-payment",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      return data.data;
    } catch (error) {
      return toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (options, productArray, address) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      return toast({
        title: "Failed to load payment gateway",
        variant: "destructive",
      });
    }
    const paymentObject = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      ...options,
      image: "https://www.pexels.com/photo/flat-screen-monitor-1714204/",
      handler: async (response) => {
        try {
          const res = await axios.post(
            import.meta.env.VITE_API_URL + "/verify-payment",
            {
              razorpay_order_id: options.id,
              razorpay_payment_id: response.razorpay_payment_id,
              amount: options.amount,
              address: address,
              productArray: productArray,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          const { data } = await res.data;
          toast({
            title: data.message,
            variant: "success",
          });
          navigate("/success");
        } catch (error) {
          return toast({
            title: error.response.data.message,
            variant: "destructive",
          });
        }
      },
      notes: {
        address: "Razorpay Corporate Office",
      },

      theme: {
        color: "#3399cc",
      },
    });
  };

  return { generatePayment,verifyPayment};
};
export default useRazorpay;
