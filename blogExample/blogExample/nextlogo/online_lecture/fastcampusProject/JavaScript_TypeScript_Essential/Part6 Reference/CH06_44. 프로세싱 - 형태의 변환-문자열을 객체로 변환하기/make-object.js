class HeaderListData {
	constructor(source, separator = ','){
		const rawData = source.split('\n');

		this.headers = rawData[0].split(separator);
		this.rows = rawData
									.filter((row, index) => index > 0)
									.map(row => row.split(separator));
	}
	
	row = index => this.rows[index] // [ ['Title', '보헤미안 랩소디'], ['Release', '2018.10.31'], ['Ticketing Rate', '11.5%'], ['Director','브라이언 싱어'] ]
				.map((row, index) => [this.headers[index], row]);

	get length() {
		return this.rows.length
	}

	get columnLength() {
		return this.headers.length;
	}
}

export default class MakeObject extends HeaderListData {
	toObject = index => this // {'Ticketing Rate': '11.5%', Director: '브라이언 싱어', Release: '2018.10.31', Title: 보헤미안 랩소디}
			.row(index)
			.reduce((a, [key, value]) => ({...a, [key]: value}), {})

	toAllObject = () => Array(this.length) //[<3 empty items>]
			.fill(0) // [0, 0, 0]
			.map((item, index) => {
				return this.toObject(index)
			})
}