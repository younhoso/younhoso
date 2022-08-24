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

	// ❌ 타입스크립트에서 자바스크립트 라이브러리를 이용하는 경우에 자바스크립트에서 리턴하는 타입이 모를수도 있기때문에 그때 unknown을 사용할수 있는데
	// 이제 이런 부분도 가능하면 구체적으로 타입을 지정해서 사용하는것이 좋습니다.
	// unknown (unknown은 왠만하면 쓰지 않는것이 좋습니다.)
	let notSure: unknown = 0;
	notSure = 'he';
	notSure = true;

	// ❌ 어떤 타입이든 다 담을수 있다라는 추상적인 타입입니다.
	// any (any은 왠만하면 쓰지 않는것이 좋습니다.)
	let anything: any = 0;
	anything = 'hello';

	// void (함수에서 아무것도 리턴하지 않으면 void입니다. void는 타입 생략이 가능합니다.)
	function print(): void {
		console.log('hello');
		return;
	}

	let unusable : void = undefined; // ❌변수에서 void는 사용하지 않습니다.

	// never (함수에서 리턴하지 않을때 사용합니다.)
	function throwError(message: string): never { //이함수는 절때 리턴하는 값이 없는 경우
		throw new Error(message);
	}

	let neverEnding: never; // ❌ 이렇게 변수에 never를 쓰는 경우는 없습니다.

	// object // ❌ (원시 타입을 제외한 모든 object타입을 할당할수가 있습니다. 배열도 전달할수 있습니다.)
	let obj: object; //(이 처럼 광범위한 추상적인 어떤타입이든 다 다음수 있다라는 이런 타입은 왠만하면 쓰지 않는것이 좋습니다.)
	function acceptSomeObject(obj: object) {}
	acceptSomeObject({name: 'TriplexLab'});
	acceptSomeObject([1,2,3,'TriplexLab']);
}