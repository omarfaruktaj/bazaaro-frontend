import AdminLayout from "@/layouts/admin-layout";
import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import VendorLayout from "@/layouts/vendor-layout";
import AdminCategories from "@/pages/admin/admin-categories";
import AdminProducts from "@/pages/admin/admin-products";
import CreateCategory from "@/pages/admin/create-category";
import ForgotPassword from "@/pages/auth/forgot-password";
import Login from "@/pages/auth/login";
import ResetPassword from "@/pages/auth/reset-password";
import SignUp from "@/pages/auth/signup";
import Home from "@/pages/home";
import CreateProduct from "@/pages/vendor/create-product";
import Setup from "@/pages/vendor/setup";
import VendorOrders from "@/pages/vendor/vendor-orders";
import VendorProducts from "@/pages/vendor/vendor-products";
import VendorProfile from "@/pages/vendor/vendor-profile";
import VendorReviews from "@/pages/vendor/vendor-reviews";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },

          {
            element: <AuthLayout />,
            children: [
              {
                path: "/signup",
                element: <SignUp />,
              },
              {
                path: "/login",
                element: <Login />,
              },
              {
                path: "/forgot-password",
                element: <ForgotPassword />,
              },
              {
                path: "/reset-password",
                element: <ResetPassword />,
              },
            ],
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "categories",
            element: <AdminCategories />,
          },
          {
            path: "categories/create",
            element: <CreateCategory />,
          },
        ],
      },
      {
        path: "vendor",
        element: <VendorLayout />,
        children: [
          {
            path: "shop/setup",
            element: <Setup />,
          },
          {
            path: "shop-info",
            element: <VendorProfile />,
          },
          {
            path: "products",
            element: <VendorProducts />,
          },
          {
            path: "products/create",
            element: <CreateProduct />,
          },
          {
            path: "orders",
            element: <VendorOrders />,
          },
          {
            path: "reviews",
            element: <VendorReviews />,
          },
        ],
      },
    ],
  },
]);

export default router;
