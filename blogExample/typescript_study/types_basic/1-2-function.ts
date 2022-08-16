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
}