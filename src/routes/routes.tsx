import AuthLayout from "@/layouts/auth-layout";
import RootLayout from "@/layouts/root-layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
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
        ],
      },
    ],
  },
]);

export default router;
