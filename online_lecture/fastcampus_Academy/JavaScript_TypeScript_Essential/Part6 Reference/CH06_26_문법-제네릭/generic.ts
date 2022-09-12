{
	type User = {
		id: number;
		name: string;
	}

	type Address = {
		zipcode: number;
		address: string;
	}

	function pipeOne(value: any) {
		return value;
	}

	function pipeTwo<T>(value: T): T{
		return value;
	}

	pipeOne(10);
	pipeTwo('10');
	pipeTwo(true);
	
	const pipeObjectOne = <T>(obj: T):T => {
		return obj
	}

	pipeObjectOne({id:1, name: '김', zipcode: 50213});
	pipeObjectOne<User>({id:1, name: '김'});

	class State<S, Config={}> {
		private _state: S;
		config: Config;

		constructor(state: S, config: Config){
			this._state = state;
			this.config = config;
		}

		getState(): S {
			return this._state
		}
	}

	const s1 = new State<Address, {active: boolean}>({
		zipcode: 50213,
		address: '서울시'
	}, {
		active: true
	});
	const s1Data = s1.getState();
	console.log(s1Data.address, s1.config.active)


	function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key){
		return obj[key];
	}

	let x = {a: 1, b: 2, c: 3, d: 4};

	getProperty(x, "a")
	getProperty(x, "m")

	interface KeyPair<T, U>{
		key: T;
		value: U;
	}

	const kv1 : KeyPair<number, string> = {key: 1, value: 'Kim'};
	const kv2 : KeyPair<number, number> = {key: 2, value : 123456};

}