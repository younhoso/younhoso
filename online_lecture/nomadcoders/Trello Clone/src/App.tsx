import { useRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ( { draggableId, destination, source} : DropResult ) => {
    if(!destination) return;
    // setToDos(oldToDos => {
    //   const toDosCopy = [...oldToDos];
    //   // 1) source.index 아이템 삭제하기
    //   toDosCopy.splice(source.index, 1);
    //   // 2) destination?.index으로 아이템을 다시 돌려두기
    //   toDosCopy.splice(destination?.index, 0, draggableId)
    //   return toDosCopy;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {
            Object.keys(toDos).map(boardId => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />)
          }
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

export default App;
