import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoSelector, categoryState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryState);
  const toDos = useRecoilValue(toDoSelector);
  const onInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {currentTarget: {value}} = event;
    setCategory(value)
  }
  console.log(toDos)
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos?.map(toDo => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;