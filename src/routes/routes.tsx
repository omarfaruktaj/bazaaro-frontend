import AuthLayout from "@/layouts/auth-layout";
import RootLayout from "@/layouts/root-layout";
import ForgotPassword from "@/pages/forgot-password";
import Home from "@/pages/home";
import Login from "@/pages/login";
import ResetPassword from "@/pages/reset-password";
import SignUp from "@/pages/signup";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
]);

export default router;
