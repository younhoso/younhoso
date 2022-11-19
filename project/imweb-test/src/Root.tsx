import Head from "./components/Head";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
			<Head />
			<Outlet />
    </div>
  );
}

export default Root;