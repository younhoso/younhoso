import styled, {css} from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, changeName } from "@/modules/shoppingSlice"

const App = () => {
	const shopping = useSelector((state:RootState) => state.shopping.startDate);
	const dispatch = useDispatch();

	const handel = () => {
    dispatch(changeName("Younhoso!!"))
  }

	return (
		<Wrapper>
			<Title>Hello test 입니다.</Title>
			<p>name: {shopping}</p>
      <button onClick={handel}>이름 바꾸기</button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	${({theme}) => {
		const {darkTheme} = theme;
		return css`
			display: flex;
			height: 100vh;
			width: 100vw;
			justify-content: center;
			align-items: center;
			background-color: ${darkTheme.backgroundColor};
		`
	}};
`;

const Title = styled.div`
	${({theme}) => {
		const {darkTheme} = theme;
		return css`
			color: ${darkTheme.textColor};
		`
	}}
`
export default App;