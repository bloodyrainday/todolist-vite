import { TaskStorageType } from "../AppWithRedux";
import { AppRootState } from "./store";

export const selectsTasks = (state: AppRootState): TaskStorageType =>
  state.tasks;
