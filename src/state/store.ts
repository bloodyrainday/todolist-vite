import { combineReducers, createStore } from "redux";
import { todolistReducer } from "./todolist-reducer";
import { tasksReducer } from "./task-reducer.";

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
