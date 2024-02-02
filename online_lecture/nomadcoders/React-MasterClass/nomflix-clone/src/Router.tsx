
import { Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Search } from "./page/Search";
import { Tv } from "./page/Tv";

const routers = [
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/tv", element: <Tv /> },
];

function Router() {
  return (
    <Routes>
      {routers.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default Router;