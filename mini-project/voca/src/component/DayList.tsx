import { Link } from "react-router-dom";
import {useGetFetch} from "../hooks/useFetch";
import styles from "./DayList.module.css"

function DayList() {
	const days = useGetFetch('http://localhost:3001/days');
	
	return (
		<div className={styles.list_day}>
			{days.map(day => (
				<li key={day.id}> 
					<Link to={`/day/${day.day}`}>Day {day.day}</Link>
				</li>
			))}
		</div>
	);
}
export default DayList;