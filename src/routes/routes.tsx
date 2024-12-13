import AdminLayout from "@/layouts/admin-layout";
import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import VendorLayout from "@/layouts/vendor-layout";
import ForgotPassword from "@/pages/auth/forgot-password";
import Login from "@/pages/auth/login";
import ResetPassword from "@/pages/auth/reset-password";
import SignUp from "@/pages/auth/signup";
import AdminCategories from "@/pages/dashboard/admin/admin-categories";
import AdminProducts from "@/pages/dashboard/admin/admin-products";
import CreateCategory from "@/pages/dashboard/admin/create-category";
import Users from "@/pages/dashboard/admin/users";
import CreateCoupon from "@/pages/dashboard/vendor/create-coupon";
import CreateProduct from "@/pages/dashboard/vendor/create-product";
import Setup from "@/pages/dashboard/vendor/setup";
import VendorCoupon from "@/pages/dashboard/vendor/vendor-coupon";
import VendorProducts from "@/pages/dashboard/vendor/vendor-products";
import VendorProfile from "@/pages/dashboard/vendor/vendor-profile";
import VendorReviews from "@/pages/dashboard/vendor/vendor-reviews";
import Home from "@/pages/home";
import { default as Orders } from "@/pages/orders";
import ProductCompare from "@/pages/product-compare";
import ProductDetails from "@/pages/product-details";
import Products from "@/pages/products";

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
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/:productId",
            element: <ProductDetails />,
          },
          {
            path: "/compare-products",
            element: <ProductCompare />,
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
        path: "dashboard/admin",
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
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
      {
        path: "dashboard/vendor",
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
            element: <Orders />,
          },
          {
            path: "reviews",
            element: <VendorReviews />,
          },
          {
            path: "coupons",
            element: <VendorCoupon />,
          },
          {
            path: "coupons/create",
            element: <CreateCoupon />,
          },
        ],
      },
    ],
  },
]);

export default router;
