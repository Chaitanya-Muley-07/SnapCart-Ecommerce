import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Loader2, Upload, X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import useErrorLogout from "../../hooks/use-error-logout";
import axios from "axios";

const CreateProducts = () => {
  const fileInputRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const {toast} = useToast();
  const {handleErrorLogout} = useErrorLogout();

  const addColor = () => {
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleImageUpload =  (e) => {
       const files=e.target.files;
       if(files){
        const newImages=Array.from(files).map((file)=>{
          return {
            preview:URL.createObjectURL(file),
            file,
          };
        });
        setImages((prevImages) => [...prevImages, ...newImages]).slice(0,4); // Limit to 4 images
        e.target.value = null; // Reset the input value
       }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price=e.target.price.value;
    const stock = e.target.stock.value;
    const category = e.target.category.value;
    if(!name || !description ||!category|| !price || !stock || colors.length === 0 || images.length === 0) {
      return toast({
        title: "Error",
        description: "Please fill all the fields and add at least one color and one image.",
        variant: "destructive",
      });
    }
    if(name.trim()==="" || description.trim()==="" || category.trim()==="" || price<=0|| stock<=0){
      return toast({
        title: "Error",
        description: "Please fill all the fields with valid values.",
        variant: "destructive",
      });
    }
    if(images.length<4){
      return toast({
        title: "Error",
        description: "Please upload at least 4 images.",
        variant: "destructive",
      });
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description); 
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    colors.forEach((color) => formData.append("colors", color));
    images.forEach((image) => {
      formData.append("images", image.file);
    });
    try{
      const response=await axios.post(import.meta.env.VITE_API_URL + "/create-product",formData,{
        headers:{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }

      );
      const data=response.data;
      toast({
        title: " Product Added Successfully",
        description:data.message,
       
       });
    }catch(error){
      
      return handleErrorLogout(error,"Failed to add product");
      
    }finally{
      setIsLoading(false);
    }

  }
  if(isLoading){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin"/>
      </div>
    )
  }
  return (
    <div className="w-full max-w-2xl -z-10">
      <CardHeader>
        <CardTitle className="text-3xl">Add New Product </CardTitle>
        <CardDescription>
          Enter the details of the Product you want to add to your store
        </CardDescription>
              <hr />
      </CardHeader>


      <form  onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:w-[70vw]">
          <CardContent className="w-full">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                placeholder="Enter Product Name"
                id="name"
                name="name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea
              rows="7"
                placeholder="Enter Product Description"
                id="description"
                name="description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Product Price</Label>
              <Input
                placeholder="0.00"
                id="price"
                name="price"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Product Stock</Label>
              <Input
                placeholder="20"
                id="stock"
                name="stock"
                min="0"
                required
              />
            </div>
          </CardContent>

          <CardContent className="w-full">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headset">Headset</SelectItem>
                  <SelectItem value="keyboard">Keyboard</SelectItem>
                  <SelectItem value="mouse">Mouse</SelectItem>
                  <SelectItem value="monitor">Monitor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Colors</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-md"
                />
                <Button variant="outline" onClick={addColor}>
                  Add Color
                </Button>
              </div>
          
            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((color, index) => (
                <div
                  key="index"
                  className="flex items-center bg-gray-100 rounded-full pl-2 pr-1 py-1"
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-sm mr-1 dark:text-slate-900">
                    {color}
                  </span>
                  <Button
                    variant="ghost"
                    className="h-6 w-6 p-0 rounded-full"
                    onClick={() => removeColor(color)}
                  >
                    <X className="h-4 w-4">
                      <span className="sr-only">Remove Color</span>
                    </X>
                  </Button>
                </div>
              ))}
            </div>

            {/* images */}

            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">

                   <img
                    src={image?.preview}
                    alt={`Product image ${index+1}`}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(0)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
                
               ))}
                
                {images.length<4&&(<Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-[100px] h-[100px]"
                    variant="outline"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="sr-only">Upload Image</span>
                  </Button>)}
                  
               
              </div>
              <Input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
              <p className="text-sm  mt-2">
                Upload upto 4 images.Supported Format:JPEG,PNG,GIF
              </p>
            </div>
            </div>
          </CardContent>
        </div>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading} >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animated-spin"/>}
          {isLoading ? "Adding Product...":"Add Product"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreateProducts;
