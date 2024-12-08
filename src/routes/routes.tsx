import RootLayout from "@/layouts/root-layout";
import Home from "@/pages/home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
