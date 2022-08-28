import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useGetFetch } from "../hooks/useFetch";

function CreateWord() {
	const days = useGetFetch("http://localhost:3001/days");
	const navigate = useNavigate();
	const engRef = useRef(null);
	const korRef = useRef(null);
	const dayRef = useRef(null);

	function onSubmit(e: React.FormEvent){
		e.preventDefault();
		(async () => {
			const res = await fetch(`http://localhost:3001/words`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					day: dayRef.current.value,
					eng: engRef.current.value,
					kor: korRef.current.value,
					isDone: false
				}),
			})
			if(res.ok){
				alert("생성이 완료 되었습니다.");
				navigate(`/day/${dayRef.current.value}`)
			}
		})()
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="input_area">
				<label>Eng</label>
				<input type="text" placeholder='computer' ref={engRef}/>
			</div>
			<div className="input_area">
				<label>Kor</label>
				<input type="text" placeholder='컴퓨터' ref={korRef}/>
			</div>
			<div className="input_area">
				<label>Day</label>
				<select ref={dayRef}>
					{days.map(day => (
						<option key={day.id} value={day.day}>{day.day}</option>
					))}
				</select>
			</div>
			<button>저장</button>
		</form>
	);
}
export default CreateWord;