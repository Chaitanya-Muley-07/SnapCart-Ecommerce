import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice";
import cartSlice from"./slices/cartSlice";
import productSlice from "./slices/products"
export const store = configureStore({
  reducer: {
    auth:authSlice,
    cart:cartSlice,
    product:productSlice,
  },
})