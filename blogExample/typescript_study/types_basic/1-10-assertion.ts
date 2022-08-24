{
	/**
	 * Type Assertions ❌
	 */
	// ex) 👇
	function jsStrFunc():any {
		return 'hello';
	};

	const result = jsStrFunc();
	result //👈🏻여기서 result은 string타입이 아니라 any타입이기 때문에 문자열 API를 사용할수 없습니다.
	(result as string)

	const button = document.querySelector('class')!;
	button.nodeValue
}