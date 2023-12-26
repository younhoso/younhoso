import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import CustomThemeProvider from "./provider/CustomThemeProvider";
import ReactQueryProvider from "./provider/ReactQueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <CustomThemeProvider>
        <RouterProvider router={router} />
      </CustomThemeProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
