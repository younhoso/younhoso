import React from "react";
import { Link } from "react-router-dom";
import styles from "./DayList.module.css"
import dummy from "../db/data.json";

function DayList() {
	return (
		<div className={styles.list_day}>
			{dummy.days.map(day => (
				<li key={day.id}> 
					<Link to={`/day/${day.day}`}>Day {day.day}</Link>
				</li>
			))}
		</div>
	);
}
export default DayList;