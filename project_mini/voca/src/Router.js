import { Route, Routes } from 'react-router-dom';
import Day from "./component/Day.tsx";
import DayList from "./component/DayList.tsx";
import NotFound from "./component/NotFound.tsx";
import CreateWord from "./component/CreateWord";
import CreateDay from './component/CreateDay';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<DayList />}/>
			<Route path="/create_word" element={<CreateWord />} />
			<Route path="/create_day" element={<CreateDay />} />
			<Route path="/day/:day" element={<Day />}/>
			<Route path='*' element={<NotFound />} />
		</Routes>
  );
}

export default Router;
