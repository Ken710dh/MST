import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./redux-tookit/todoListsSlice"
export const store = configureStore({
    reducer: {
        todoLists: todoReducer,
    }
})

//Infer the RootState 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;