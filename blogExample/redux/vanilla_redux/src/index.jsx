import {legacy_createStore as createStore} from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

let count = 0;

const updateText = () => {
	number.innerText = count
}

const handleAdd = () => {
	count++;
	updateText()
}

const handleMinus = () => {
	count--;
	updateText()
}


add.addEventListener('click', handleAdd)
minus.addEventListener('click', handleMinus)