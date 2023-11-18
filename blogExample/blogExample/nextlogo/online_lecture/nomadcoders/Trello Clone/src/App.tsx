import { useRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ( { draggableId, destination, source} : DropResult ) => {
    if(!destination) return;
    setToDos(allBoards => {
      const sourceBoard = [...allBoards[source.droppableId]];

      // 1) source.index 아이템 삭제하기
      sourceBoard.splice(source.index, 1);
      // 2) destination?.index위치에 삭제하지 말고 아이템(draggableId)을 추가 시켜라
      console.log(destination?.index)
      sourceBoard.splice(destination?.index, 0, draggableId)
      return {
        ...allBoards,
        [source.droppableId]: sourceBoard
      };
    });
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
