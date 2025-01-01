import AdminLayout from "@/layouts/admin-layout";
import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import RootLayout from "@/layouts/root-layout";
import VendorLayout from "@/layouts/vendor-layout";
import ForgotPassword from "@/pages/auth/forgot-password";
import Login from "@/pages/auth/login";
import ResetPassword from "@/pages/auth/reset-password";
import SignUp from "@/pages/auth/signup";
import Cart from "@/pages/cart";
import ChangePassword from "@/pages/change-password";
import { default as Checkout } from "@/pages/checkout";
import AdminCategories from "@/pages/dashboard/admin/admin-categories";
import AdminPayment from "@/pages/dashboard/admin/admin-payment";
import AdminProducts from "@/pages/dashboard/admin/admin-products";
import AdminReviews from "@/pages/dashboard/admin/admin-review";
import AdminVendors from "@/pages/dashboard/admin/admin-vendors";
import CreateCategory from "@/pages/dashboard/admin/create-category";
import Users from "@/pages/dashboard/admin/users";
import Settings from "@/pages/dashboard/setting";
import CreateCoupon from "@/pages/dashboard/vendor/create-coupon";
import CreateProduct from "@/pages/dashboard/vendor/create-product";
import Setup from "@/pages/dashboard/vendor/setup";
import VendorCoupon from "@/pages/dashboard/vendor/vendor-coupon";
import VendorProducts from "@/pages/dashboard/vendor/vendor-products";
import VendorProfile from "@/pages/dashboard/vendor/vendor-profile";
import VendorReviews from "@/pages/dashboard/vendor/vendor-reviews";
import FlashSale from "@/pages/flash-sale";
import Home from "@/pages/home";
import { default as MyOrders } from "@/pages/my-orders";
import MyProfile from "@/pages/my-profile";
import MyReviews from "@/pages/my-review";
import { default as Orders } from "@/pages/orders";
import PaymentSuccess from "@/pages/payment-success";
import ProductCompare from "@/pages/product-compare";
import ProductDetails from "@/pages/product-details";
import Products from "@/pages/products";
import RecentProducts from "@/pages/recent-product";

import Blogs from "@/pages/blogs";
import NotFound from "@/pages/not-found";
import Shop from "@/pages/shop";
import ShopDetails from "@/pages/shop-details";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./private-route";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
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
            path: "/cart",
            element: (
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            ),
          },
          {
            path: "/shops",
            element: <Shop />,
          },
          {
            path: "/blogs",
            element: <Blogs />,
          },
          {
            path: "/shops/:shopId",
            element: <ShopDetails />,
          },
          {
            path: "/my-orders",
            element: (
              <PrivateRoute requiredRoles={["CUSTOMER"]}>
                <MyOrders />
              </PrivateRoute>
            ),
          },
          {
            path: "/my-reviews",
            element: (
              <PrivateRoute requiredRoles={["CUSTOMER"]}>
                <MyReviews />
              </PrivateRoute>
            ),
          },

          {
            path: "/checkout",
            element: (
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            ),
          },
          {
            path: "payment/success",
            element: (
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            ),
          },
          {
            path: "my-profile",
            element: (
              <PrivateRoute requiredRoles={["CUSTOMER", "ADMIN"]}>
                <MyProfile />
              </PrivateRoute>
            ),
          },
          {
            path: "flash-sale",
            element: <FlashSale />,
          },
          {
            path: "recent-products",
            element: <RecentProducts />,
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
              {
                path: "/change-password",
                element: (
                  <PrivateRoute>
                    <ChangePassword />
                  </PrivateRoute>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "dashboard/admin",
        element: (
          <PrivateRoute requiredRoles={["ADMIN"]}>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            index: true,
            element: <Users />,
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
          {
            path: "shops",
            element: <AdminVendors />,
          },
          {
            path: "payments",
            element: <AdminPayment />,
          },
          {
            path: "reviews",
            element: <AdminReviews />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "dashboard/vendor",
        element: (
          <PrivateRoute requiredRoles={["VENDOR"]}>
            <VendorLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "setup",
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
            index: true,
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
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

export default router;
