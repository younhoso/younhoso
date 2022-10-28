import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({toDos, boardId}: IBoardProps) {
  return(
    <Droppable droppableId={boardId}>
      {(provider) => 
        <Wraper ref={provider.innerRef} {...provider.droppableProps}>
          {toDos.map((toDo, idx) => 
            <DragabbleCard key={toDo} toDo={toDo} idx={idx} />
          )}
          {provider.placeholder}
        </Wraper>
      }
    </Droppable>
  )
}

const Wraper = styled.div`
  padding: 20px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

export default Board;