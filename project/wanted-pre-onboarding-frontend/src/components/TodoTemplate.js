import React from 'react';
import styled from 'styled-components';

const TodoTemplate = ({children}) => {
	return (
		<TodoTemplateBlock>{children}</TodoTemplateBlock>
	);
}


const TodoTemplateBlock = styled.div`
	width: 512px;
	height: 768px;
	position: relative;
	background: white;
	border-radius: 16px;
	box-shadow: 0 0 8px rgba(0,0,0, 0.04);
	margin: 0 auto;
	margin-top: 98px;
	margin-bottom: 32px;
	display: flex;
	flex-direction: column;
`
export default TodoTemplate;