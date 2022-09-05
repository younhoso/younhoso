import React from 'react';
import Counter from '../components/Counter';
import {useSelector, useDispatch} from 'react-redux';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
	const number = useSelector(state => state.counter);
	console.log(number)
	const dispath = useDispatch();
	
	const onIncrease = () => {
		dispath(increase());
	};

	const onDecrease = () => {
		dispath(decrease());
	};

	return (
		<div>
			<Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
		</div>
	);
}
export default CounterContainer;