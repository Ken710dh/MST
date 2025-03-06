import { useCallback, useState } from "react";
import "./App.css";
import InputField from "./components/blog/InputField";
import { addTodos } from "./redux-tookit/todoListsSlice";
import { useDispatch, useSelector } from "react-redux";
import DaiLyList from "./components/blog/DaiLyList";
import { RootState } from "./store";
import { Todo } from "./model";
const App: React.FC = () => {
  // //data type in ts
  // const name: string= "Hoang"
  // const num: number = 5

  // //object
  //  interface Person{
  //   name: string,
  //   age: number
  // }
  // const person1: Person= {
  //   name: "Hoang",
  //   age: 24
  // }
  // //array
  // let hobbies: string[] = ["eating", "hanging out", "swimming"]
  // console.log(hobbies);

  // //tuple (the amount of variable with different data type )
  // let role: [number, string, boolean]
  // role = [24, "hoang", false]
  // console.log(role)
  // // union
  // let num2: number | string
  // // any type
  // let variable: any
  // //function
  // let printName: (num: string, character: string) => void;
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todoLists.todos);
  const handleAddTodo = useCallback(
    (todo: Todo) => {
      dispatch(addTodos(todo));
    },
    [dispatch]
  );

  return (
    <>
      <div className=" w-full h-screen flex flex-col items-center">
        <h1 className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-center text-transparent text-[40px] font-bold">
          DaiLy Task
        </h1>
        <div className=" w-[80%] h-[80%] grid grid-cols-7">
          <div className="col-span-2 rounded  bg-white p-4 flex  border border-gray-300 flex flex-col">
            <InputField handleAddTodo={handleAddTodo} />
          </div>
          <div className="col-span-5 rounded bg-white border border-gray-300">
            <DaiLyList dailytasks={todos} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
