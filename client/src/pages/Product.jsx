import React, { useState, useEffect } from "react";
import { starsGenerator } from "../constants/helper";
import { Circle, Heading1, Minus, Plus } from "lucide-react";
import { Colors } from "../constants/color";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import ReviewComponent from "../components/custom/ReviewComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setProducts } from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../hooks/use-toast";
import { addToCart } from "../redux/slices/cartSlice";
import useRazorpay from "../hooks/use-razorpay";

const Product = () => {
  const { toast } = useToast();
  const { productName } = useParams();
  const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState(1);
  const [pincode, setPinCode] = useState("");
  const [availibilityMessage, setAvailabilityMessage] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [productColor, setProductColor] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { generatePayment, verifyPayment } = useRazorpay();
  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL +
            `/get-product-by-name/${productName.split("-").join(" ")}`
        );
        const { data } = await res.data;
        setProduct(data);
      } catch (error) {}
    };
    fetchProductByName();
  }, [productName]);
  console.log(product);

  const calculateEMI = (price) => {
    return Math.round(price / 6);
  };

  const checkAvailability = async () => {
    if (pincode.trim() === "") {
      setAvailabilityMessage("Please enter a valid pincode.");
      return;
    }

    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/get-pincode/${pincode}`
      );

      const data = await res.data;
      console.log("API Response:", data); // debug log

      setAvailabilityMessage(data.message);
    } catch (error) {
      console.error("Error checking pincode availability:", error);

      setAvailabilityMessage(
        error.response?.data?.message || "Server error. Please try again later."
      );
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (productQuantity > product.stock) {
      toast({
        title: "Product out of stock",
        variant: "destructive",
      });
      return;
    }
    if (product.blacklisted) {
      toast({
        title: "Product isn't available for purchase",
        variant: "destructive",
      });
      return;
    }
    if (productColor === "") {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    const order = await generatePayment(product.price * productQuantity);
    await verifyPayment(
      order,
      [{ _id: product._id, quantity: productQuantity, color: productColor }],
      address
    );
    setPurchaseProduct(false);

  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (productColor === "") {
      toast({
        title: "Please select a color",

        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: productQuantity,
        color: productColor,
        image: product.images[0]?.url,
        stock: product.stock,
        blacklisted: product.blacklisted,
      })
    );

    setProductQuantity(1);
    toast({
      title: "Product added to cart successfully",
    });
  };

  return (
    <>
      <div>
        <main className="w-[93vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10 ">
          {/* left side */}

          <div className="grid sm:w-[50%] gap-3">
            <img
              className="w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none"
              src={product?.images?.[selectedImage]?.url}
              alt=""
            />

            <div className="grid grid-cols-4 gap-3">
              {Array.isArray(product?.images) &&
                product?.images.map(({ url, id }, index) => (
                  <img
                    src={url}
                    key={id}
                    onClick={() => setSelectedImage(index)}
                    className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                  />
                ))}
            </div>
          </div>

          {/* right side */}
          <div className="sm:w-[50%] lg:w-[30%] ">
            <div className="pb-5">
              <h2 className="font-extrabold text-2xl">{product?.name}</h2>
              <p className="my-2 text-sm">
                {isExpanded
                  ? product?.description
                  : product?.description?.split(" ").slice(0, 50).join(" ") +
                    "..."}

                {product?.description?.split(" ").length > 50 && (
                  <button
                    className="text-blue-500 ml-2 hover:underline"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </p>
              <div className="flex items-center">
                {starsGenerator(product?.rating, "0", 15)}
                <span className="text-md ml-1">
                  ({product?.reviews?.length})
                </span>
              </div>
            </div>
            <div className="py-5 border-t border-b">
              <h3 className="font-bold text-xl">
                Rs.{product?.price} or Rs.{calculateEMI(product?.price)}/month
              </h3>
              <p className="text-sm">
                Suggested payments with 6 months special financing
              </p>
            </div>
            <div className="py-5 border-b ">
              <h3 className="font-bold text-lg">Choose Color</h3>
              <div className="flex items-center my-2">
                {product?.colors?.length > 0 ? (
                  product?.colors.map((color, index) => (
                    <Circle
                      key={index + color}
                      fill={color}
                      strokeOpacity={0.2}
                      strokeWidth={0.2}
                      size={40}
                      onClick={() => setProductColor(color)}
                      className="cursor-pointer hover:scale-110 hover:brightness-50 transition-all ease-in-out duration-300"
                    />
                  ))
                ) : (
                  <h1>nothing</h1>
                )}
              </div>
              <div className="py-5">
                <div className="flex gap-3 items-center">
                  <div className="flex gap-5 items-center bg-gray-100 rounded-full px-3 py-2 w-fit">
                    <Minus
                      cursor={"pointer"}
                      stroke={Colors.customGray}
                      onClick={() =>
                        setProductQuantity((qty) => (qty > 1 ? qty - 1 : 1))
                      }
                    />
                    <span className="text-slate-950">{productQuantity}</span>
                    <Plus
                      cursor={"pointer"}
                      stroke={Colors.customGray}
                      onClick={() =>
                        setProductQuantity((qty) =>
                          qty < product.stock ? qty + 1 : product.stock
                        )
                      }
                    />
                  </div>
                </div>
                {product?.stock - productQuantity > 0 && (
                  <div className="grid text-sm font-semibold to-gray-600">
                    <span>
                      Only{" "}
                      <span className="text-customYellow">
                        {product?.stock - productQuantity} items{" "}
                      </span>
                      Left!!
                    </span>
                    <span>Don't miss it!</span>
                  </div>
                )}
              </div>
              <div className="grid gap-3 my-5">
                <div className=" flex gap-3">
                  <Input
                    placeholder="Enter your Pincode Here"
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                  <Button onClick={checkAvailability}>
                    Check Availability{" "}
                  </Button>
                </div>
                <p className="text-sm px-2">{availibilityMessage}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setPurchaseProduct(true)}>
                  Buy Now
                </Button>
                <Button variant="outline" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
              {purchaseProduct && (
                <div className="my-3 space-y-2">
                  <Input
                    placeholder="Enter Your Address Here..."
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button onClick={handleBuyNow}>Confirm Order </Button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/*review section*/}
        <ReviewComponent />
      </div>
    </>
  );
};

export default Product;
