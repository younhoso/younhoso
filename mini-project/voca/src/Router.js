import Day from "./component/Day.tsx";
import DayList from "./component/DayList.tsx";
import NotFound from "./component/NotFound.tsx";
import { Route, Routes } from 'react-router-dom';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<DayList />}/>
			<Route path="/day/:day" element={<Day />}/>
			<Route path='*' element={<NotFound />} />
		</Routes>
  );
}

export default Router;
