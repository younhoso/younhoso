import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ( {destination, source} : DropResult ) => {
    
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provider) => 
              <Board ref={provider.innerRef} {...provider.droppableProps}>
                {toDos.map((toDo, idx) => 
                  <Draggable draggableId={toDo} index={idx}>
                    {(provided) => (
                      <Card 
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >{toDo}
                      </Card>
                      )}
                  </Draggable>
                )}
                {provider.placeholder}
              </Board>
            }
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`

const Board = styled.div`
  padding: 20px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${props => props.theme.cardColor};
`;

export default App;
