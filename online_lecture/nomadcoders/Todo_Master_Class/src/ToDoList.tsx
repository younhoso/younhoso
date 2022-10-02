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

interface IForm {
  email: string;
  firstName: string;
  lastName?: string;
  userName: string;
  password: string;
  password1: string;
}

const initDefault = {
  defaultValues: {
    email: "@naver.com"
  }
}

function ToDoList() {
  const { register, handleSubmit, formState: {errors} } = useForm<IForm>(initDefault);
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors)

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { 
          required: "Email is required", 
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "Only naver.com emails allowed"
          }})} 
        placeholder="email" 
        />
        <span>{errors.email?.message}</span>
        <input {...register("firstName", { required: "write here" })} placeholder="firstName" />
        <span>{errors.firstName?.message}</span>
        <input {...register("lastName", { required: "write here" })} placeholder="lastName" />
        <span>{errors.lastName?.message}</span>
        <input {...register("userName", { required: "write here", minLength: 10 })} placeholder="userName" />
        <span>{errors.userName?.message}</span>
        <input {...register("password", { required: "write here", minLength: 5 })} placeholder="password" />
        <span>{errors.password?.message}</span>
        <input {...register("password1",{
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Your password is too short.",
          },
        })} 
        placeholder="password1" />
        <span>{errors.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  )
}

export default ToDoList; 
