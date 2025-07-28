import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/use-toast";
import { setProducts } from "../../redux/slices/productSlice";
import useErrorLogout from "../../hooks/use-error-logout";
import { ToastAction } from "@/components/ui/toast";

const AllProducts = () => {
  const { products } = useSelector((state) => state.product);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { handleErrorLogout } = useErrorLogout();
  const [editFormCategory, setEditFormCategory] = useState(editingProduct?.category || "");

  useEffect(() => {
    const getFilterProducts = async () => {
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          `/get-products?category=${category}&search=${searchTerm}`
      );
      const data = response.data;
      dispatch(setProducts(data.data));
    };
    getFilterProducts();
  }, [searchTerm, category]);

  const blacklistProduct = async (id) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/blacklist-product/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
          action: (
            <ToastAction
              altText="Undo Changes"
              onClick={() => removeFromBlacklist(id)}
            >
              Undo Changes
            </ToastAction>
          ),
        });
        // Optionally, you can refresh the product list or update the state
        dispatch(
          setProducts(
            products.map((p) =>
              p._id === id ? { ...p, blacklisted: true } : p
            )
          )
        );
      }
    } catch (error) {
      handleErrorLogout(error, "Failed to blacklist product");
    }
  };

  const removeFromBlacklist = async (id) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/remove-from-blacklist/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      dispatch(
        setProducts(
          products.map((p) => (p._id === id ? { ...p, blacklisted: false } : p))
        )
      );
      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        });
      }
    } catch (error) {
      handleErrorLogout(error, "Failed to remove product from blacklist");
    }
  };

  const handleEdit = async (product) => {
     

    setEditingProduct(product);
    setIsEditModalOpen(true);
    setEditFormCategory(product.category);
    
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
     
    const formData = new FormData(e.target);
    const updatedProduct = {
      ...editingProduct,
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      category:  editFormCategory,
    };
  
    dispatch(
      setProducts(
        products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      )
    );
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/update-product/${editingProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditingProduct(null);
      setIsEditModalOpen(false);
      const data = response.data;
      toast({
        title:data.message,
      })
    } catch (error) {
      handleErrorLogout(error, "Failed to update product");
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-8 -z-10">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="mb-8">
        <form action="" className="flex gap-4 items-end sm:w-[80vw]">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="search"
            >
              Search Products
            </label>
            <div className="relative">
              <Input
                type="text"
                id="search"
                placeholder="Search by Name or Description"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                size={20}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="w-48 ">
            <Label htmlFor="category">Category</Label>
            <Select
              className="mt-3"
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger className="w-[180px]" id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="headset">Headset</SelectItem>
                  <SelectItem value="keyboard">Keyboard</SelectItem>
                  <SelectItem value="mouse">Mouse</SelectItem>
                  <SelectItem value="monitor">Monitor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
      {products?.length === 0 ? (
        <p>No products found,try adjusting your search criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-2 sm:mx-0">
          {products?.map((product) => (
            <Card className="flex flex-col" key={product._id}>
              <div className=" relative">
                <img
                  src={product?.image.url}
                  alt={product.name}
                  className="rounded-t-lg w-full h-auto object-cover"
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="text-lg font-semibold mb-2">
                  {product?.name.length > 20
                    ? product?.name.slice(0, 20) + "..."
                    : product?.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {product?.description.length > 100
                    ? product?.description.slice(0, 100) + "..."
                    : product.description}
                </p>
                <p className="text-lg font-bold  mb-4">
                  ₹{product?.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" onClick={() => handleEdit(product)}>
                  <Edit />
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    !product.blacklisted
                      ? blacklistProduct(product._id)
                      : removeFromBlacklist(product._id);
                  }}
                >
                  {!product.blacklisted
                    ? "Blacklist Product"
                    : "Remove from Blacklist"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form action="" onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 items-center">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingProduct?.name}
                />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows="7"
                  name="description"
                  defaultValue={editingProduct?.description}
                />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  defaultValue={editingProduct?.price}
                />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editFormCategory}
                  onValueChange={(value) => setEditFormCategory(value)}
                >
                  <SelectTrigger className="w-[180px]">
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
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
