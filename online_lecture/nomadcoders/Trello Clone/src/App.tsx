import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DragabbleCard from "./Components/DragabbleCard";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ( { draggableId, destination, source} : DropResult ) => {
    if(!destination) return;
    setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];
      // 1) source.index 아이템 삭제하기
      toDosCopy.splice(source.index, 1);
      // 2) destination?.index으로 아이템을 다시 돌려두기
      toDosCopy.splice(destination?.index, 0, draggableId)
      return toDosCopy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provider) => 
              <Board ref={provider.innerRef} {...provider.droppableProps}>
                {toDos.map((toDo, idx) => 
                  <DragabbleCard key={toDo} toDo={toDo} idx={idx} />
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

export default App;
