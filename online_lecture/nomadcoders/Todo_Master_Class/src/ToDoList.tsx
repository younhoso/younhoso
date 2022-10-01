import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget: { value }} = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(toDo.length < 10){
      return setToDoError("To Do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}
*/
function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch())
  return (
    <div>
      <form>
        <input {...register("Email")} placeholder="Email" />
        <input {...register("firstName")} placeholder="firstName" />
        <input {...register("lastName")} placeholder="lastName" />
        <input {...register("userName")} placeholder="userName" />
        <input {...register("password")} placeholder="password" />
        <input {...register("password1")} placeholder="password1" />
        <button>Add</button>
      </form>
    </div>
  )
}


export default ToDoList; 
