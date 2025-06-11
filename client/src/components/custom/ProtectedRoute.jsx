import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  // Admin logged in but accessing login page
  if (isAuthenticated && role === "admin" && pathname === "/admin/login") {
    return <Navigate to="/admin/dashboard" />;
  }

  // User trying to access admin dashboard or login
  if (
    isAuthenticated &&
    role === "user" &&
    (pathname.startsWith("/admin/dashboard") || pathname === "/admin/login")
  ) {
    return <Navigate to="/" />;
  }

  // Unauthenticated trying to access admin dashboard
  if (!isAuthenticated && pathname.startsWith("/admin/dashboard")) {
    return <Navigate to="/admin/login" />;
  }

  // Authenticated user trying to access login/signup
  if (
    isAuthenticated &&
    role === "user" &&
    (pathname === "/login" || pathname === "/signup")
  ) {
    return <Navigate to="/" />;
  }

  // User trying to access /orders without login
  if (!isAuthenticated && pathname === "/orders") {
    return <Navigate to="/login" />;
  }

  // User trying to access /checkout with empty cart
  if (isAuthenticated && cartItems.length === 0 && pathname === "/checkout") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
