import styled, {css} from "styled-components"

const App = () => {
	return (
		<Wrapper>
			<Title>Hello test 입니다.</Title>;
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