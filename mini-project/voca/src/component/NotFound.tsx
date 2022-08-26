import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmptyPage() {
	const navigate = useNavigate();
	useEffect(()=> {
		setTimeout(()=> {
			navigate('/')
		}, 3000);
	},[])
	return (
		<div>
			<h2>잘못된 접근입니다.</h2>
			<div className='timesale'><h2>3초후에 매인페이지로 이동합니다.</h2></div>
		</div>
	);
}
export default EmptyPage;