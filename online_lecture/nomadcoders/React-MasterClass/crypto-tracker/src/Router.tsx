import { createBrowserRouter } from "react-router-dom";
import Coin from "./pages/Coin";
import Coins from "./pages/Coints";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Coins />,
  },
  {
    path: "/coin/:coinId",
    element: <Coin />,
  },
]);

export default router;
