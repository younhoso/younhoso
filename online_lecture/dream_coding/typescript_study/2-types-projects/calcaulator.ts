{
	/**
	 * Let's make a calculator
	 */

	type Types = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder'
	const calculate = (a: Types, b: number, c: number):number => {
		switch(a){
			case 'add':
				return b + c
			case 'substract':
				return b - c
			case 'multiply':
				return b * c
			case 'divide':
				return b / c
			case 'remainder':
				return b % c
			default: 
				throw Error('unknew Error')
		}
	}

	 console.log(calculate('add', 1, 3)); // 4
	 console.log(calculate('substract', 3, 1)); // 2
	 console.log(calculate('multiply', 4, 2)); // 8
	 console.log(calculate('divide', 4, 2)); // 2
	 console.log(calculate('remainder', 5, 2)); // 1
}