import styled from "styled-components";
import Menu from "./Menu";

function Head() {
  return (
		<>
			<HeadInner>
				<a>아임웹 프론트엔드 과제</a>
			</HeadInner>
			<Menu />
		</>
  )
}

const HeadInner = styled.div`
	height: 69px;
	line-height: 69px;
	text-align: center;
	border-bottom:1px solid #c5c5c5;
	a {
		font-size: 24px;
		letter-spacing: 0px;
		font-weight: bold;
		font-style: normal;
		color: #212121;
		line-height: inherit;
	}
`

export default Head;