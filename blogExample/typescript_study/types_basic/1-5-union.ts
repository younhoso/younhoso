{
	/**
	 * Union Types === OR
	 * 발생할수 있는 모든 케이스중에 하나만 할당할수 있을때 활용하면 좋습니다.
	 */
	type Direction = 'left' | 'right' | 'up' | 'down';
	function move(direction: Direction) {
		console.log(direction);
	}
	move('down');

	type TileSize = 8 | 16 | 32;
	const tile: TileSize = 32;

	/**
	 * 실전 ex)
	 * function login -> success, fail
	 */
	type SuccessState = {
		response: {
			body: string;
		}
	};

	type FailState = {
		reason: string;
	};
	type LoginState = SuccessState | FailState
	function login(): LoginState {
		return {
			response: {
				body: 'logged in!',
			}
		}
	};

	/**
	 * printLoginState(state: LoginState)
	 * success -> 🎉 body
	 * fail -> 😭 reason
	 */
	function printLoginState(state: LoginState) {
		if('response' in state){
			console.log(`🎉 ${state.response.body}`)
		} else {
			console.log(`🎉 ${state.reason}`)
		}
	}

}