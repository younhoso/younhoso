/* eslint-disable @typescript-eslint/no-unused-expressions */
import {useParams, useNavigate} from "react-router-dom";
import Word from "./Word";
import {useGetFetch} from "../hooks/useFetch";

function Day() {
	const {day} = useParams();
	const navigate = useNavigate();
	const words = useGetFetch(`http://localhost:3001/words?day=${day}`);
	const days = useGetFetch(`http://localhost:3001/days`);

	function prev() {
		day <= '1' ? null : navigate(`/day/${Number(day)-1}`)
	}

	function next() {
		day >= String(days.length) ? null : navigate(`/day/${Number(day)+1}`)
	}

	return (
		<>
			<h2>Day {day}</h2>
			<button onClick={prev}>이전</button>
			<button onClick={next}>다음</button>
			{words.length === 0 && <span>Loading…</span>}
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