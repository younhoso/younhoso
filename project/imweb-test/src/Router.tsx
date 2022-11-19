import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import NotFound from './page/NotFound';
import Home from './page/Home';
import Cards from './components/Cards';

const router = createBrowserRouter([
	{
		path: "/",
    element: <Root />,
		children: [
			{
        path: "",
        element: <Home />
      },
			{
        path: "Cards",
        element: <Cards txt={'leel'} />
      },
		],
    errorElement: <NotFound />
	}
]);

export default router;