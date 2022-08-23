import styled, {css} from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "./modules/configStore";
import { add } from "./modules/shoppingSlice";

interface RootState {
	shopping: any;
  startDate: string,
	endDate: string,
	timeUnit: string,
	category: string,
	keyword: string,
	device: string,
	gender: string,
	ages: []
}

const App = () => {
	const shop = useSelector((state: RootState) => state.shopping);

	const dispatch:AppDispatch = useDispatch();

	const handel = () => {
    dispatch(add({
			startDate: "Younhoso",
			endDate: "",
			timeUnit: "",
			category: "",
			keyword: "",
			device: "",
			gender: "",
			ages: []
		}))
  }

	return (
		<Wrapper>
			<Title>Hello test 입니다.</Title>
			<p>startDate: {shop.startDate}</p>
			<p>endDate: {shop.endDate}</p>
			<p>timeUnit: {shop.timeUnit}</p>
			<p>category: {shop.category}</p>
			<p>keyword: {shop.keyword}</p>
			<p>device: {shop.device}</p>
			<p>gender: {shop.gender}</p>
			<p>ages: {shop.ages}</p>
      <button onClick={handel}>이름 바꾸기</button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	${({theme}) => {
		const {darkTheme} = theme;
		return css`
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