import { Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { Search } from "./page/Search";
import { Tv } from "./page/Tv";
import { Header } from "./components/Header";

const routers = [
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/tv", element: <Tv /> },
];

function App() {
  return (
    <>
      <Header />
      <Routes>
        {routers.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
