{
	// JavaScrit ❌
	function jsAdd(num1, num2) {
		return num1 + num2
	}

	//TypeScript ✅
	function add(num1: number, num2: number):number {
		return num1 + num2;
	}

	// JavaScrit ❌
	function jsFetchNum(id) {
		// code ...
		// code ...
		// code ...
		return new Promise((resolve, reject) => {
			resolve(100)
		});
	}

	//TypeScript ✅ 
	//"인자로 문자열을 받아서 내부적으로 처리할것이고, Promise를 리턴하는구나->그리고 fetch가완료 되면 숫자의 데이터를 리턴하는구나"라고 예상할수 있습니다
	function fetchNum(id:string): Promise<number> {
		// code ...
		// code ...
		// code ...
		return new Promise((resolve, reject) => {
			resolve(100);
		});
	}

	// Optional parameter ✅
	function printName(firstName: string, lastName?: string){
		console.log(firstName);
		console.log(lastName);
	};

	printName('Trilex', 'Lab');
	printName('Younho1');
	printName('Younho2');

	//Default parameter ✅
	function printMessage(message: string = 'default message👋') {
		console.log(message);
	}
	printMessage();

	// Rest parameter ✅
	function addNumbers(...number: number[]):number {
		return number.reduce((a,b) => a + b);
	}
	console.log(addNumbers(1,2))
	console.log(addNumbers(1,2,4,6,7))
}