import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { products } = useSelector((state) => state.product);
    if (!products || !Array.isArray(products)) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading products...
      </div>
    );
  }
  return (
    <div className="w-[93vw] grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto gap-5 place-content-center my-10">
      {products.map((product) => (
        <ProductCard key={product._id}
         {...product}
        />
      ))}

      {products.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
};

export default ProductList;
