{
    function pipeOne(value) {
        return value;
    }
    function pipeTwo(value) {
        return value;
    }
    pipeOne(10);
    pipeTwo('10');
    pipeTwo(true);
    var pipeObjectOne = function (obj) {
        return obj;
    };
    pipeObjectOne({ id: 1, name: '김', zipcode: 50213 });
    pipeObjectOne({ id: 1, name: '김' });
    var State = /** @class */ (function () {
        function State(state, config) {
            this._state = state;
            this.config = config;
        }
        State.prototype.getState = function () {
            return this._state;
        };
        return State;
    }());
    var s1 = new State({
        zipcode: 50213,
        address: '서울시'
    }, {
        active: true
    });
    var s1Data = s1.getState();
    console.log(s1Data.address, s1.config.active);
}
//# sourceMappingURL=generic.js.map