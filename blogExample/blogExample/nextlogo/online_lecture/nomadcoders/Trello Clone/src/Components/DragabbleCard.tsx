import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDragabbleCardProps {
	toDo: string,
	index: number
}

function DragabbleCard({toDo, index}: IDragabbleCardProps) {
	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(provided) => (
				<Card 
					ref={provided.innerRef} 
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					>{toDo}
				</Card>
			)}
		</Draggable>
	)
}

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

export default React.memo(DragabbleCard);