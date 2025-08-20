import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import envConfig from "./config/env-config.ts";
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/routes.tsx";

const tagManagerArgs = {
  gtmId: envConfig.GTM_ID,
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
