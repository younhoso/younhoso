{
	/**
	 * Tuple은 배열인데 서로 다른 타입을 함께 가질수 있는 배열입니다.
	 * 결론 부터 말하면 Tuple을 사용하는것은 권장하지 않습니다. 
	 * 배열안에 접근할때 [0], [1]이런식(인텍스)으로 접근해야 하므로 코드의 가독성이 떨어집니다.
	 * 왠만하면 먼저 interface 혹은 class로 사용하는것을 추천합니다.
	 */
	const address: [number, string, string] = [14023, '서울시', '송파구'];
	let [zipcode, address1] = address;

	zipcode = '123';

	type BookInfo = [string, string, number];
	const BookData: BookInfo[] = [
		['헨리 8세', '세익스피어', 1884],
		['헨리 8세', '세익스피어', 1884]
	];

	BookData.push(['a', 'b', 123]);
//---------------------------------------------------------
	type Address = [number, string, string];

	function getArrayOne(): Address{
		return [14023, '서울시','송파구'];
	};

	let address2 = getArrayOne()[2];

	address2 = 12
 }