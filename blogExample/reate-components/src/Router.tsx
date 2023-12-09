import { createBrowserRouter } from "react-router-dom";
import Root from "./page/Root";
import Star from "./page/Star";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "starrating",
        element: <Star />
      }
    ]
  },
]);

export default router;