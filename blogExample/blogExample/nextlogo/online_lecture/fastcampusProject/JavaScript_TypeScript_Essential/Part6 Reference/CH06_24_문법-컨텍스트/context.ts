{
	/**
	 * 컨텍스트는 2가지 종류가 있습니다.
	 * execution 컨텍스트와, lexical 컨텍스트 이렇게 2가지가 있는데요.
	 * execution 컨텍스트를 우리가 보통 실행 컨텍스트라고 부릅니다.
	 * 실행 컨텍스트가 기본 컨텍스트입니다.
	 */
	const person = {
		name: 'Triplexlab',
		age: 35,
		getAge() {
			return this.age;
		}
	};

	person.age;
	person.getAge();

	const age = person.getAge;
	age.call(person);

class Person {
	name: String;
	age: number;
	constructor(name: string, age: number){
		this.name = name;
		this.age = age;
	}

	getAge(){
		return this.age;
	}

	getName = () => this.name;
}

 const p1 =	new Person('Triplexlab', 30);
 console.log(p1.getAge())

 const myAge = p1.getAge;
 console.log(myAge());

 const x = p1.getName;
 console.log(x());
}