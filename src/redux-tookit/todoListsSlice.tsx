import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFormattedDate } from "../moment";

const initialState: TodoStates = {
  todos: [],
};
interface TodoStates {
  todos: Todo[];
}
interface Todo {
  id: number;
  task: string;
  date: string;
  startdate: string;
  category: string;
  enddate: string;
  completed: boolean;
}
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),  
        task: action.payload,
        category: action.payload,
        startdate: action.payload,
        enddate: action.payload,
        date: getFormattedDate(),
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>)=>{
        state.todos = state.todos.filter((t)=> t.id !== action.payload)
        }  
    }
  },
);
//auto generate action
export const {addTodos, toggleTodo, deleteTodo} = todoSlice.actions
export default todoSlice.reducer
