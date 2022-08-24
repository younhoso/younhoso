{
	/**
	 * discriminated union은 union타입에 차별화 되는 이름(key명)이 동일한 타입을 주므로써 간편하게 구분할수 있는것을 말합니다.
	 * function login -> success, fail
	 */
	type SuccessState = {
		result: 'success';
		response: {
			body: string;
		}
	};

	type FailState = {
		result: 'fail';
		reason: string;
	};
	type LoginState = SuccessState | FailState;
	function login(): LoginState {
		return {
			result: 'success',
			response: {
				body: 'logged in!'
			}
		}
	};
	// console.log(login());

	/**
	 * printLoginState(state: LoginState)
	 * success -> 🎉 body
	 * fail -> 😭 reason
	 */
	function printLoginState(state: LoginState) {
		if(state.result === 'success'){
			console.log(`🎉 ${state.response.body}`)
		} else {
			console.log(`😭 ${state.reason}`)
		}
	};

	// printLoginState(login());


	/**
	 * ex2)👇👇
	 */

	interface Square {
		kind: 'square';
		size: number;
	}

	interface Rectangle {
		kind: 'rectangle';
		width: number;
		height: number;
	}

	interface Circle {
		kind: "circle";
    radius: number;
	}

	type Shape = Square | Rectangle | Circle;

	function area ():Shape {
		return {
			kind: 'rectangle',
			width: 6,
			height: 6
		}
	}

	function areaState(s: Shape) {
		if(s.kind === 'square'){
			return s.size * s.size;
		} else if(s.kind === 'rectangle'){
			return s.width + s.height;
		}
	}

	console.log(areaState(area()));
}