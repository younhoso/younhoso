import {useParams} from "react-router-dom";
import Word from "./Word";
import {useGetFetch} from "../hooks/useFetch";

function Day() {
	const {day} = useParams();
	const words = useGetFetch(`http://localhost:3001/words?day=${day}`);

	return (
		<>
			<h2>Day {day}</h2>
			<table>
				<tbody>
					{words.map(word => (
						<Word word={word} key={word.id} />
					))}
				</tbody>
			</table>
		</>
	);
}
export default Day;