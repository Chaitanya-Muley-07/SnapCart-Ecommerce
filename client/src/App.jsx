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
import About from "./pages/About";
import FAQSection from "./pages/FAQ";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MyOrders from "./pages/MyOrders";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/custom/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomeLayout children={<Home />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/about",
      element: (
        <ProtectedRoute>
          <HomeLayout children={<About />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/faq",
      element: (
        <ProtectedRoute>
          <HomeLayout children={<FAQSection />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <ProtectedRoute>
          <HomeLayout children={<Signup />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <HomeLayout children={<Login />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/product",
      element: (
        
          <HomeLayout children={<Product />} />
        
      ),
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <HomeLayout children={<Checkout />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <HomeLayout children={<MyOrders />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/login",
      element: (
        <ProtectedRoute>
          <Navbar />
          <AdminLogin />
          <Footer />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<CreateProducts />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/all-products",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<AllProducts />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/orders",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Orders />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/analytics",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Analytics />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/settings",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Settings />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/success",
      element: (
       
          <Success />
       
      ),
    },
    {
      path: "/*",
      element: <Error />,
    },
  ]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <Toaster />
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;