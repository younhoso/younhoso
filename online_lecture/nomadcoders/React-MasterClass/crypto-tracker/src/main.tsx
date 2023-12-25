import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import CustomThemeProvider from "./provider/CustomThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <RouterProvider router={router} />
    </CustomThemeProvider>
  </React.StrictMode>
);
