import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFormattedDate } from "../moment";
import { Todo } from "../model";

const initialState: TodoStates = {
  todos: [],
};
interface TodoStates {
  todos: Todo[];
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo>) => {
      state.todos.push({
        id: Date.now(),
        task: action.payload.task,
        category: action.payload.category,
        date: getFormattedDate(),
        startdate: action.payload.startdate,
        enddate: action.payload.enddate,
        completed: false,
      });
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.task = action.payload.task;
        todo.category = action.payload.category;
        todo.startdate = action.payload.startdate;
        todo.enddate = action.payload.enddate;
      }
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
  },
});
//auto generate action
export const { addTodos, editTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
