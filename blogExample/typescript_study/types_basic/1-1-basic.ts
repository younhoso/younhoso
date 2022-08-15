{
	/**
	 * JavaScript 
	 * Primitive: Number, sting, boolean, bigint, symbol, null, undefined
	 * Object: funciton, array...
	 */

	// number
	const num: number = -6;

	//string
	const str: string = 'hello';

	//boolean
	const boal: boolean = false;

	//undefined
	let name: undefined; // ❌
	let age: number | undefined // ✅ 이렇게 age변수에는 숫자가 있을수도 있고, 값이 아직 초기화되지 않을수도 있어 (옵션얼 타입을때 이런식으로 많이 선언을 합니다.)
	age = undefined; 
	age = 1;

	//null
	let person: null; // ❌
	let person2: string | null; // ✅ person2변수에는 숫자가 있을수도 있고, null이 있을 수도 있다. 
}