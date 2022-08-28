import { useEffect, useState } from "react";

interface IProps {
	word: IWord
}

export interface IWord {
	id: number,
	day: string,
	eng: string,
	kor: string,
	isDone: boolean
}

function Word({word:w}: IProps) {
	const [word, setWord] = useState(w)
	const [isShow, setIsShow] = useState(false);
	const [isDone, setIsDone] = useState(word.isDone);

	function toggleShow() {
		setIsShow(!isShow)
	};

	function toggleDone() {
		fetch(`http://localhost:3001/words/${word.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...word,
				isDone: !isDone
			}),
		})
		.then(res => {
			if(res.ok){
				setIsDone(!isDone);
			}
		});
	};

	async function del() {
		if(window.confirm('삭제 하시겠습니까?')){
			const res = await fetch(`http://localhost:3001/words/${word.id}`, {
				method: 'DELETE'
			})
			if(res.ok){
				setWord({...word, id: 0})
			}
		}
	};

	if(word.id === 0){
		return null; //이때 null을 리턴해주면 아무것도 표현하지 않습니다.
	}

	return (
		<tr className={isDone ? "off" : ""}>
			<td><input type="checkbox" checked={isDone} onChange={toggleDone}/></td>
			<td>{word.eng}</td>
			<td>{isShow && word.kor}</td>
			<td>
				<button onClick={toggleShow} >뜻 {isShow ? '숨기기' : '보기'}</button>
				<button onClick={del} className="btn_del">삭제</button>
			</td>
		</tr>
	);
}
export default Word;