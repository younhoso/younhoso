import { createBrowserRouter } from "react-router-dom";
import Root from "./page/Root";
import Star from "./page/Star";
import Device from "./page/Device";
import InfiniteScroll from "./page/Infinite_scroll";

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
  {
    path: "/device",
    element: <Device />,
  },
  {
    path: "/infinite_scroll",
    element: <InfiniteScroll />,
  },
]);

export default router;