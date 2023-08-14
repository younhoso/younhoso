{
    /**
     * 컨텍스트는 2가지 종류가 있습니다.
     * execution 컨텍스트와, lexical 컨텍스트 이렇게 2가지가 있는데요.
     * execution 컨텍스트를 우리가 보통 실행 컨텍스트라고 부릅니다.
     * 실행 컨텍스트가 기본 컨텍스트입니다.
     */
    var person = {
        name: 'Triplexlab',
        age: 35,
        getAge: function () {
            return this.age;
        }
    };
    person.age;
    person.getAge();
    var age = person.getAge;
    age.call(person);
    var Person = /** @class */ (function () {
        function Person(name, age) {
            var _this = this;
            this.getName = function () { return _this.name; };
            this.name = name;
            this.age = age;
        }
        Person.prototype.getAge = function () {
            return this.age;
        };
        return Person;
    }());
    var p1 = new Person('Triplexlab', 30);
    console.log(p1.getAge());
    var myAge = p1.getAge;
    console.log(myAge());
    var x = p1.getName;
    console.log(x());
}
//# sourceMappingURL=context.js.map