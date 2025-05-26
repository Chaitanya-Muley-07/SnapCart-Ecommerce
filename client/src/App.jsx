import Home from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/custom/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Footer from "./components/custom/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import Error from "./pages/Error";
import Success from "./pages/Success";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import CreateProducts from "./components/custom/CreateProducts";
import AllProducts from "./components/custom/AllProducts";
import Analytics from "./components/custom/Analytics";
import Settings from "./components/custom/Settings";
import Orders from "./components/custom/Orders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
     <HomeLayout children={<Home/>}/>
      ),
    },
    {
      path: "/signup",
      element: (
      <HomeLayout children={<Signup/>}/>
      ),
    },
    {
      path: "/login",
      element: (
       <HomeLayout children={<Login />}/>
         
      ),
    },
    {
      path: "/product",
      element: (
         <HomeLayout children={<Product/>}/>
      ),
    },
    {
      path: "/checkout",
      element: (
           <HomeLayout children={<Checkout/>}/>
      ),
    },
    {
      path: "/admin/login",
      element: (
        <>
          <Navbar />
          <AdminLogin />
          <Footer />
        </>
      ),
    },
{
      path: "/admin/dashboard",
      element: (
        <>
         <AdminLayout children={<CreateProducts/>}/>
        </>
      ),
    },
{
      path: "/admin/dashboard/all-products",
      element: (
        <>
         <AdminLayout children={<AllProducts/>}/>
        </>
      ),
    },
{
      path: "/admin/dashboard/orders",
      element: (
        <>
         <AdminLayout children={<Orders/>}/>
        </>
      ),
    },
{
      path: "/admin/dashboard/analytics",
      element: (
        <>
         <AdminLayout children={<Analytics/>}/>
        </>
      ),
    },
{
      path: "/admin/dashboard/settings",
      element: (
        <>
         <AdminLayout children={<Settings/>}/>
        </>
      ),
    },
    {
      path: "/*",
      element: (
        <>
          <Error />
        </>
      ),
    },
    {
      path: "/success",
      element: (
        <>
          <Success />
        </>
      ),
    },
  ]);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
