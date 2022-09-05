import React from 'react';
import Counter from '../components/Counter';
import {useSelector, useDispatch} from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';

const CounterContainer = () => {
	const number = useSelector(state => state.counter);
	const dispath = useDispatch();
	
	const onIncrease = () => {
		dispath(increaseAsync());
	};

	const onDecrease = () => {
		dispath(decreaseAsync());
	};

	return (
		<div>
			<Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
		</div>
	);
}
export default CounterContainer;