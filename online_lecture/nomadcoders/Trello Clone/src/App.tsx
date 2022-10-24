import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provider) => <ul>
            <ul ref={provider.innerRef} {...provider.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(provided) => (
                  <li 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    >
                      <span {...provided.dragHandleProps}>🔥</span>
                      One
                    </li>
                  )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(provided) => (
                  <li 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    >
                      <span {...provided.dragHandleProps}>🔥</span>
                      Two
                    </li>
                  )}
              </Draggable>
            </ul>
          </ul>}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
