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
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("Email", { required: true })} placeholder="Email" />
        <input {...register("firstName", { required: true })} placeholder="firstName" />
        <input {...register("lastName", { required: true })} placeholder="lastName" />
        <input {...register("userName", { required: true })} placeholder="userName" />
        <input {...register("password", { required: true })} placeholder="password" />
        <input {...register("password1", { required: true })} placeholder="password1" />
        <button>Add</button>
      </form>
    </div>
  )
}


export default ToDoList; 
